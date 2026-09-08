// Design tokens — deck palette: deep indigo, muted teal, terracotta, ivory,
// silver, and restrained gold. Card art is the focal point; ornament is quiet.

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
  background: "#F6F2EA", // ivory
  surface: "#FFFFFF",
  surfaceAlt: "#EDE7DB",
  text: "#1B284F", // deep indigo
  textMuted: "#41507A",
  textSubtle: "#6F7789",
  accent: "#1B284F",
  accentSoft: "#E3E7F1",
  teal: "#3E7C7B",
  terracotta: "#C1663F",
  gold: "#A8852E",
  silver: "#A8ADB8",
  border: "#DDD6C7",
  cardBack: "#1B284F",
  cardBackPattern: "#2C3D6B",
  danger: "#B3402E",
};

export const dark: Palette = {
  background: "#12162A",
  surface: "#1B2140",
  surfaceAlt: "#232A4A",
  text: "#F1EDE1", // ivory
  textMuted: "#C6C1B0",
  textSubtle: "#8C8A80",
  accent: "#7C92D8",
  accentSoft: "#2A3352",
  teal: "#6FA9A7",
  terracotta: "#D98A63",
  gold: "#C7A44F",
  silver: "#9AA0AE",
  border: "#2D3454",
  cardBack: "#232A4A",
  cardBackPattern: "#2F3A66",
  danger: "#D96A55",
};
