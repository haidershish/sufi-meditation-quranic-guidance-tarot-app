import { StyleSheet, View } from "react-native";
import type { CardGuide } from "@/domain/types";
import { useApp } from "@/context/app";
import { T } from "./T";

const SECTIONS: { key: keyof CardGuide; label: string }[] = [
  { key: "theme", label: "Card theme" },
  { key: "invitation", label: "The invitation" },
  { key: "outOfBalance", label: "When out of balance" },
  { key: "contemplate", label: "Contemplate" },
  { key: "practice", label: "Practice" },
  { key: "intention", label: "Intention" },
  { key: "visualMeditation", label: "Visual meditation" },
];

export function GuideSections({ guide }: { guide: CardGuide }) {
  const { palette } = useApp();
  return (
    <View style={{ gap: 14 }}>
      {SECTIONS.map((s) => (
        <View key={s.key} style={[styles.block, { borderLeftColor: palette.gold }]}>
          <T variant="label" style={{ color: palette.gold, letterSpacing: 1, textTransform: "uppercase" }}>
            {s.label}
          </T>
          <T variant="body" style={{ color: palette.text }}>
            {guide[s.key]}
          </T>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderLeftWidth: 2,
    paddingLeft: 12,
    gap: 4,
  },
});
