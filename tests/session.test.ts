import { describe, expect, it } from "vitest";
import { createSession } from "../src/domain/session";


describe("reading session questions", () => {
  it("stores the user's questions and intention with the reading", () => {
    const session = createSession(
      "three-card",
      "1.0.0",
      [
        { cardId: "A", position: "present", order: 0 },
        { cardId: "B", position: "attention", order: 1 },
        { cardId: "C", position: "support", order: 2 },
      ],
      "Move with care",
      ["What is happening?", "What needs care?", "What next?"],
    );

    expect(session.intention).toBe("Move with care");
    expect(session.questions).toEqual(["What is happening?", "What needs care?", "What next?"]);
  });
});
