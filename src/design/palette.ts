// Design tokens — a unified Sufi palette: deep indigo, night teal, parchment,
// brass, and terracotta. Card art remains the focal point; ornament stays quiet.

export type Palette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  accentSoft: string;
  teal: string;
  terracotta: string;
  gold: string;
  silver: string;
  border: string;
  cardBack: string;
  cardBackPattern: string;
  danger: string;
};

export const light: Palette = {
  background: "#F4EBDD", // parchment
  surface: "#FFF9EE",
  surfaceAlt: "#E8DCC7",
  text: "#142B42", // deep indigo
  textMuted: "#48606B",
  textSubtle: "#718087",
  accent: "#183F52",
  accentSoft: "#D9E5E1",
  teal: "#185A5B", // night teal
  terracotta: "#B9573B",
  gold: "#A77B28", // brass
  silver: "#8E9894",
  border: "#D2BE9D",
  cardBack: "#142B42",
  cardBackPattern: "#185A5B",
  danger: "#A63C32",
};

export const dark: Palette = {
  background: "#0E202D",
  surface: "#15333A",
  surfaceAlt: "#20454A",
  text: "#F4EBDD", // parchment
  textMuted: "#CAD9D2",
  textSubtle: "#9FB3AA",
  accent: "#2A7774",
  accentSoft: "#21434D",
  teal: "#65A6A3", // night teal
  terracotta: "#D1785B",
  gold: "#D8AE5D", // brass
  silver: "#A7B8B1",
  border: "#36545A",
  cardBack: "#122C3B",
  cardBackPattern: "#27696B",
  danger: "#D96D55",
};
