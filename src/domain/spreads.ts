import type { SpreadDefinition, SpreadId } from "./types";

// Neutral, non-predictive reflection language for each position.
export const SPREADS: Record<SpreadId, SpreadDefinition> = {
  single: {
    id: "single",
    name: "One card",
    description: "A single prompt for the moment at hand.",
    positions: [
      {
        key: "card",
        label: "What is present",
        prompt: "What is present for you right now?",
      },
    ],
  },
  "three-card": {
    id: "three-card",
    name: "Three cards",
    description: "Three prompts to orient a reflection.",
    positions: [
      {
        key: "present",
        label: "What is present",
        prompt: "What is present for you right now?",
      },
      {
        key: "attention",
        label: "What needs attention",
        prompt: "What is asking for your attention?",
      },
      {
        key: "support",
        label: "What may support the next step",
        prompt: "What may support your next step?",
      },
    ],
  },
};

export const SPREAD_LIST: SpreadDefinition[] = [SPREADS.single, SPREADS["three-card"]];
