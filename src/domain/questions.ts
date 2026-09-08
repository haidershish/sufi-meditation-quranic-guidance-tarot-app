import type { SpreadId } from "./types";

export type QuestionSet = {
  id: string;
  title: string;
  description: string;
  questions: string[];
};

const QUESTION_SETS: Record<SpreadId, QuestionSet[]> = {
  single: [
    {
      id: "clarity",
      title: "Clarity for today",
      description: "Notice what matters most in the present moment.",
      questions: ["What would be helpful for me to notice today?"],
    },
    {
      id: "decision",
      title: "A decision",
      description: "Reflect without asking the card to decide for you.",
      questions: ["What perspective may help me approach this decision carefully?"],
    },
    {
      id: "relationship",
      title: "A relationship",
      description: "Consider your part, needs, and boundaries.",
      questions: ["What deserves my attention in this relationship?"],
    },
  ],
  "three-card": [
    {
      id: "present-attention-support",
      title: "Present · Attention · Support",
      description: "A balanced view of what is happening now.",
      questions: [
        "What is present?",
        "What needs attention?",
        "What may support the next step?",
      ],
    },
    {
      id: "situation-pattern-action",
      title: "Situation · Pattern · Action",
      description: "Look at the situation, your recurring response, and a grounded action.",
      questions: [
        "What is important in this situation?",
        "What pattern may be shaping my response?",
        "What grounded action can I take next?",
      ],
    },
    {
      id: "self-other-boundary",
      title: "Self · Other · Boundary",
      description: "Useful for relationships and difficult conversations.",
      questions: [
        "What am I bringing to this relationship?",
        "What perspective or need should I make room for?",
        "What boundary or conversation may support mutual dignity?",
      ],
    },
  ],
};

export function getQuestionSets(spreadId: SpreadId): QuestionSet[] {
  return QUESTION_SETS[spreadId];
}

export function resolveQuestions(
  spreadId: SpreadId,
  customQuestions: string[],
  selectedSet = 0,
): string[] {
  const needed = spreadId === "single" ? 1 : 3;
  const cleaned = customQuestions.slice(0, needed).map((q) => q.trim());
  if (cleaned.length === needed && cleaned.every(Boolean)) return cleaned;
  return QUESTION_SETS[spreadId][selectedSet]?.questions ?? QUESTION_SETS[spreadId][0].questions;
}
