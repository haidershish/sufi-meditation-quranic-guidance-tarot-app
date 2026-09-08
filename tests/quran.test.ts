import { describe, expect, it } from "vitest";
import { drawQuranPassage, eligiblePassages, type QuranVerse } from "../src/content/quran";
import { mulberry32 } from "../src/platform/random";

const verses: QuranVerse[] = Array.from({ length: 6 }, (_, index) => ({
  surah: 1,
  ayah: index + 1,
  arabic: "بِسْمِ",
  english: `Verse ${index + 1}`,
  pdfPages: [1],
  verified: true,
}));

describe("Quranic Guidance", () => {
  it("draws exactly five verified consecutive verses from one surah", () => {
    const passage = drawQuranPassage(verses, mulberry32(7));
    expect(passage?.verses).toHaveLength(5);
    expect(passage?.verses.map((verse) => `${verse.surah}:${verse.ayah}`)).toEqual(
      [`1:${passage?.startAyah}`, `1:${(passage?.startAyah ?? 0) + 1}`, `1:${(passage?.startAyah ?? 0) + 2}`, `1:${(passage?.startAyah ?? 0) + 3}`, `1:${(passage?.startAyah ?? 0) + 4}`],
    );
  });

  it("rejects gaps, cross-surah windows, unverified text, and non-Arabic records", () => {
    expect(eligiblePassages([{ ...verses[0], arabic: "not Arabic" }, ...verses.slice(1, 4)])).toEqual([]);
    expect(drawQuranPassage([{ ...verses[0], ayah: 1 }, { ...verses[1], ayah: 3 }])).toBeNull();
    expect(drawQuranPassage(verses.map((verse) => ({ ...verse, verified: false })))).toBeNull();
    expect(drawQuranPassage([...verses.slice(0, 4), { ...verses[4], surah: 2, ayah: 1 }])).toBeNull();
  });
});
