import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_SURAHS = 114;
const EXPECTED_AYAHS = 6236;
const PDF_SOURCE = {
  title: "The Holy Quran - Arabic Text and English Translation",
  url: "https://files.alislam.cloud/pdf/Holy-Quran-English.pdf",
  sha256: "77F19BAFBD239D6DB9C600AA8FC4257453BA14CC46B97C6D49997472D1F84210",
  translator: "Maulawi Sher Ali",
  publisher: "Islam International Publications Ltd.",
  pageCount: 1028,
  verified: false,
};
const API_DOCUMENTATION = "https://alquran.cloud/api";
const API_TERMS = "https://alquran.cloud/terms-and-conditions";
const ARABIC_ENDPOINT = "https://api.alquran.cloud/v1/quran/quran-uthmani";
const ENGLISH_ENDPOINT = "https://api.alquran.cloud/v1/quran/en.yusufali";

async function fetchEdition(endpoint, identifier) {
  const response = await fetch(endpoint, { headers: { accept: "application/json" } });
  const body = await response.text();
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error(`AlQuran Cloud returned non-JSON from ${endpoint}`);
  }
  if (!response.ok || payload.code !== 200 || payload.status !== "OK") {
    throw new Error(`AlQuran Cloud request failed (${response.status}) for ${endpoint}`);
  }
  if (payload.data?.edition?.identifier !== identifier || !Array.isArray(payload.data?.surahs)) {
    throw new Error(`Unexpected ${identifier} response schema from ${endpoint}`);
  }
  return payload.data;
}

function hasArabic(text) {
  return /[\u0600-\u06ff]/u.test(text);
}

function mergeExactAyahs(arabicData, englishData) {
  if (arabicData.surahs.length !== EXPECTED_SURAHS || englishData.surahs.length !== EXPECTED_SURAHS) {
    throw new Error("Expected exactly 114 surahs in both editions");
  }

  const verses = [];
  for (let surahIndex = 0; surahIndex < EXPECTED_SURAHS; surahIndex += 1) {
    const arabicSurah = arabicData.surahs[surahIndex];
    const englishSurah = englishData.surahs[surahIndex];
    const expectedSurah = surahIndex + 1;
    if (arabicSurah.number !== expectedSurah || englishSurah.number !== expectedSurah) {
      throw new Error(`Surah numbering mismatch at index ${surahIndex}`);
    }
    if (!Array.isArray(arabicSurah.ayahs) || !Array.isArray(englishSurah.ayahs)) {
      throw new Error(`Missing ayah arrays in surah ${expectedSurah}`);
    }
    if (arabicSurah.ayahs.length !== englishSurah.ayahs.length) {
      throw new Error(`Ayah count mismatch in surah ${expectedSurah}`);
    }

    const expectedGlobalStart = verses.length + 1;
    for (let ayahIndex = 0; ayahIndex < arabicSurah.ayahs.length; ayahIndex += 1) {
      const arabicAyah = arabicSurah.ayahs[ayahIndex];
      const englishAyah = englishSurah.ayahs[ayahIndex];
      if (
        arabicAyah.number !== expectedGlobalStart + ayahIndex ||
        englishAyah.number !== expectedGlobalStart + ayahIndex ||
        arabicAyah.number !== englishAyah.number ||
        arabicAyah.numberInSurah !== englishAyah.numberInSurah ||
        arabicAyah.numberInSurah !== ayahIndex + 1
      ) {
        throw new Error(`Ayah numbering mismatch at ${expectedSurah}:${ayahIndex + 1}`);
      }
      const arabic = typeof arabicAyah.text === "string" ? arabicAyah.text.replace(/^\uFEFF/u, "") : "";
      const english = typeof englishAyah.text === "string" ? englishAyah.text.trim() : "";
      if (!hasArabic(arabic) || !english) {
        throw new Error(`Empty or invalid text at ${expectedSurah}:${ayahIndex + 1}`);
      }
      verses.push({
        surah: expectedSurah,
        ayah: ayahIndex + 1,
        arabic,
        english,
        pdfPages: [],
        verified: true,
      });
    }
  }

  if (verses.length !== EXPECTED_AYAHS) {
    throw new Error(`Expected ${EXPECTED_AYAHS} ayahs, got ${verses.length}`);
  }
  return verses;
}

const arabicData = await fetchEdition(ARABIC_ENDPOINT, "quran-uthmani");
const englishData = await fetchEdition(ENGLISH_ENDPOINT, "en.yusufali");
const verses = mergeExactAyahs(arabicData, englishData);
const output = {
  schemaVersion: 1,
  source: {
    ...PDF_SOURCE,
    structuredSources: {
      arabic: {
        identifier: arabicData.edition.identifier,
        endpoint: ARABIC_ENDPOINT,
        documentation: API_DOCUMENTATION,
        attribution: "AlQuran.cloud / Islamic Network; Uthmani Arabic text sourced from Tanzil.net and Quran Academy per the current terms.",
        usageNotice: `Follow the current terms at ${API_TERMS}; preserve Uthmani diacritics and orthography.`,
      },
      english: {
        identifier: englishData.edition.identifier,
        endpoint: ENGLISH_ENDPOINT,
        documentation: API_DOCUMENTATION,
        translator: "Abdullah Yusuf Ali",
        attribution: "Abdullah Yusuf Ali translation via AlQuran.cloud / Islamic Network.",
        usageNotice: `Follow the current terms at ${API_TERMS}; attribute the translator by name.`,
      },
    },
    usageNotice: "The supplied PDF is retained as provenance only; verse text is sourced from the structured AlQuran Cloud editions above. The PDF has no asserted page mapping for these API records.",
    verification: {
      method: "Exact nested surah/ayah merge after API structural checks",
      expectedSurahs: EXPECTED_SURAHS,
      expectedAyahs: EXPECTED_AYAHS,
      actualSurahs: arabicData.surahs.length,
      actualAyahs: verses.length,
      scholarValidated: false,
    },
  },
  verses,
};

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const outputPath = join(repoRoot, "src", "content", "quran-bundle.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Wrote ${verses.length} verified structural records to ${outputPath}`);
