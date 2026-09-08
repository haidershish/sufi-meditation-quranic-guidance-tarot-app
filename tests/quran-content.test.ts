import { describe, expect, it } from "vitest";
import bundle from "../src/content/quran-bundle.json";

describe("generated Quran content", () => {
  it("contains the complete structurally verified corpus", () => {
    expect(bundle.verses).toHaveLength(6236);
    expect(new Set(bundle.verses.map((verse) => verse.surah)).size).toBe(114);
    expect(bundle.verses.every((verse) => verse.verified)).toBe(true);
    expect(bundle.verses.every((verse) => /[\u0600-\u06ff]/u.test(verse.arabic))).toBe(true);
    expect(bundle.verses.every((verse) => verse.english.trim().length > 0)).toBe(true);
    expect(bundle.verses.every((verse) => Array.isArray(verse.pdfPages))).toBe(true);
  });

  it("keeps citation and verification metadata", () => {
    expect(bundle.source.title).toBe("The Holy Quran - Arabic Text and English Translation");
    expect(bundle.source.url).toBe("https://files.alislam.cloud/pdf/Holy-Quran-English.pdf");
    expect(bundle.source.sha256).toBe("77F19BAFBD239D6DB9C600AA8FC4257453BA14CC46B97C6D49997472D1F84210");
    expect(bundle.source.translator).toBe("Maulawi Sher Ali");
    expect(bundle.source.publisher).toBe("Islam International Publications Ltd.");
    expect(bundle.source.pageCount).toBe(1028);
    expect(bundle.source.verified).toBe(false);
    expect(bundle.source.structuredSources.arabic.endpoint).toContain("quran-uthmani");
    expect(bundle.source.structuredSources.english.endpoint).toContain("en.yusufali");
    expect(bundle.source.structuredSources.english.translator).toBe("Abdullah Yusuf Ali");
    expect(bundle.source.structuredSources.arabic.documentation).toBe("https://alquran.cloud/api");
    expect(bundle.source.structuredSources.english.usageNotice).toContain("alquran.cloud/terms-and-conditions");
    expect(bundle.source.verification.scholarValidated).toBe(false);
  });

  it("keeps a stable contiguous surah/ayah sequence", () => {
    for (let index = 1; index < bundle.verses.length; index += 1) {
      const previous = bundle.verses[index - 1];
      const current = bundle.verses[index];
      if (current.surah === previous.surah) {
        expect(current.ayah).toBe(previous.ayah + 1);
      } else {
        expect(current.surah).toBe(previous.surah + 1);
        expect(current.ayah).toBe(1);
      }
    }
    expect(bundle.verses[0]).toMatchObject({ surah: 1, ayah: 1 });
    expect(bundle.verses.at(-1)).toMatchObject({ surah: 114, ayah: 6 });
  });
});
