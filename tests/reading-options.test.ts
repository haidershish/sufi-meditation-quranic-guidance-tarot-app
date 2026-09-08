import { describe, expect, it } from "vitest";
import { getQuestionSets, resolveQuestions } from "../src/domain/questions";


describe("reading question options", () => {
  it("offers three suggested sets for each spread", () => {
    expect(getQuestionSets("single")).toHaveLength(3);
    expect(getQuestionSets("three-card")).toHaveLength(3);
    expect(getQuestionSets("single").every((set) => set.questions.length === 1)).toBe(true);
    expect(getQuestionSets("three-card").every((set) => set.questions.length === 3)).toBe(true);
  });

  it("uses three custom questions for a three-card reading", () => {
    expect(resolveQuestions("three-card", ["My situation?", "My obstacle?", "My next step?"])).toEqual([
      "My situation?",
      "My obstacle?",
      "My next step?",
    ]);
  });

  it("falls back to the selected suggested set for blank custom questions", () => {
    expect(resolveQuestions("single", ["  "], 1)).toEqual(getQuestionSets("single")[1].questions);
  });
});
