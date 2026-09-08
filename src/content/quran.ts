import bundle from "./quran-bundle.json";
import type { Rng } from "../platform/random";
import { randomInt } from "../platform/random";

export type QuranVerse = {
  surah: number;
  ayah: number;
  arabic: string;
  english: string;
  pdfPages: number[];
  verified: boolean;
};

export type QuranPassage = {
  surah: number;
  startAyah: number;
  endAyah: number;
  verses: QuranVerse[];
};

export type QuranSource = {
  title: string;
  url: string;
  sha256: string;
  translator: string;
  publisher: string;
  pageCount: number;
  verified: boolean;
  structuredSources: {
    arabic: { attribution: string; documentation: string; endpoint: string; usageNotice: string };
    english: { attribution: string; documentation: string; endpoint: string; translator: string; usageNotice: string };
  };
};

type QuranBundle = { schemaVersion: number; source: QuranSource; verses: QuranVerse[] };

const quran = bundle as QuranBundle;
export const quranSource = quran.source;
export const quranVerses = quran.verses;

function isVerifiedArabic(text: string): boolean {
  return /[\u0600-\u06ff]/.test(text);
}

export function eligiblePassages(verses: QuranVerse[]): QuranPassage[] {
  const ordered = [...verses]
    .filter((verse) => verse.verified && isVerifiedArabic(verse.arabic) && Boolean(verse.english.trim()))
    .sort((a, b) => a.surah - b.surah || a.ayah - b.ayah);

  return ordered.flatMap((start, index) => {
    const window = ordered.slice(index, index + 5);
    const continuous = window.length === 5 && window.every(
      (verse, offset) => verse.surah === start.surah && verse.ayah === start.ayah + offset,
    );
    return continuous ? [{ surah: start.surah, startAyah: start.ayah, endAyah: start.ayah + 4, verses: window }] : [];
  });
}

export function drawQuranPassage(verses: QuranVerse[] = quranVerses, rng?: Rng): QuranPassage | null {
  const passages = eligiblePassages(verses);
  return passages.length ? passages[randomInt(passages.length, rng)] : null;
}
