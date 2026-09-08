import { describe, expect, it } from "vitest";
import {
  MEDITATION_SOURCE,
  MEDITATION_THRESHOLD_SECS,
  meditations,
  meditationCategories,
} from "../src/content/meditations";

const expectedSourcePaths = [
  "01-your-life-loving-boundaries-raw.mp3",
  "01-your-life-loving-boundaries.mp3",
  "02-your-path-is-not-late-raw.mp3",
  "02-your-path-is-not-late.mp3",
  "03-calm-before-study-or-exam-raw.mp3",
  "03-calm-before-study-or-exam.mp3",
  "04-homesickness-and-belonging-raw.mp3",
  "04-homesickness-and-belonging.mp3",
  "Audio Recordings (draft - first submission)/For Sadia/Copy of Ill-health and Viruses.mp4",
  "Audio Recordings (draft - first submission)/Hajra/WhatsApp Audio 2021-07-17 at 20.04.04.mp4",
  "Audio Recordings (draft - first submission)/Nameera/fear and Ill-health and Viruses.mp4",
  "Audio Recordings (draft - first submission)/Nameera/staying positive in Ill-health and Viruses times.mp4",
  "Breathing and Visualization Meditation #1.m4a",
  "Breathing and Visualization#2.m4a",
  "Joint family - Delilah - slightly slower.mp3",
  "monsoon-night-aimee-pilot-8min.mp3",
  "Setting boundaries - Delilah - slightly slower.mp3",
  "Study and work stress - Delilah - slightly slower.mp3",
].sort();

const expectedDurations = new Map([
  ["01-your-life-loving-boundaries-raw.mp3", 347.58525],
  ["01-your-life-loving-boundaries.mp3", 482.73059],
  ["02-your-path-is-not-late-raw.mp3", 342.308563],
  ["02-your-path-is-not-late.mp3", 482.092063],
  ["03-calm-before-study-or-exam-raw.mp3", 352.287313],
  ["03-calm-before-study-or-exam.mp3", 489.257619],
  ["04-homesickness-and-belonging-raw.mp3", 344.16325],
  ["04-homesickness-and-belonging.mp3", 484.717029],
  ["Audio Recordings (draft - first submission)/For Sadia/Copy of Ill-health and Viruses.mp4", 334.058667],
  ["Audio Recordings (draft - first submission)/Hajra/WhatsApp Audio 2021-07-17 at 20.04.04.mp4", 206.541497],
  ["Audio Recordings (draft - first submission)/Nameera/fear and Ill-health and Viruses.mp4", 321.152],
  ["Audio Recordings (draft - first submission)/Nameera/staying positive in Ill-health and Viruses times.mp4", 334.058667],
  ["Breathing and Visualization Meditation #1.m4a", 451.235896],
  ["Breathing and Visualization#2.m4a", 372.346396],
  ["Joint family - Delilah - slightly slower.mp3", 279.248938],
  ["monsoon-night-aimee-pilot-8min.mp3", 485.179615],
  ["Setting boundaries - Delilah - slightly slower.mp3", 264.59425],
  ["Study and work stress - Delilah - slightly slower.mp3", 247.95425],
]);

describe("meditation content manifest", () => {
  it("represents every source recording over 150 seconds exactly once", () => {
    const sourcePaths = meditations.map(({ sourceRelativePath }) => sourceRelativePath).sort();

    expect(sourcePaths).toHaveLength(expectedSourcePaths.length);
    expect(new Set(sourcePaths).size).toBe(sourcePaths.length);
    expect(sourcePaths).toEqual(expectedSourcePaths);
  });

  it("keeps every entry playable and metadata-valid", () => {
    const ids = meditations.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const meditation of meditations) {
      expect(meditation.id.trim()).not.toBe("");
      expect(meditation.title.trim()).not.toBe("");
      expect(meditationCategories).toContain(meditation.category);
      expect(["final", "pilot", "candidate", "raw", "draft"]).toContain(meditation.status);
      expect(meditation.durationSecs).toBeGreaterThan(MEDITATION_THRESHOLD_SECS);
      expect(meditation.durationSecs).toBe(expectedDurations.get(meditation.sourceRelativePath));
      expect(meditation.source).toBe(MEDITATION_SOURCE);
      expect(meditation.sourceRelativePath).not.toMatch(/^[/\\]|\.\.[/\\]/);
      expect(meditation.asset).toBeTruthy();
    }
  });
});
