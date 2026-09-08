import { describe, expect, it } from "vitest";
import { appPath } from "../src/platform/paths";


describe("GitHub Pages navigation", () => {
  it("leaves app routes logical because Expo applies its configured base URL", () => {
    expect(appPath("/draw", "web", "/sufi-meditation-quranic-guidance-tarot-app")).toBe("/draw");
  });

  it("keeps native routes unchanged", () => {
    expect(appPath("/draw", "android", "/sufi-meditation-quranic-guidance-tarot-app")).toBe("/draw");
  });
});
