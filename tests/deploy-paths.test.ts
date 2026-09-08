import { describe, expect, it } from "vitest";
import { appPath } from "../src/platform/paths";


describe("GitHub Pages navigation", () => {
  it("leaves app routes logical because Expo applies its configured base URL", () => {
    expect(appPath("/draw", "web", "/sufi-contemplative-tarot-app")).toBe("/draw");
  });

  it("keeps native routes unchanged", () => {
    expect(appPath("/draw", "android", "/sufi-contemplative-tarot-app")).toBe("/draw");
  });
});
