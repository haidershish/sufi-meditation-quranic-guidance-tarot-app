import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { CardGuide } from "@/domain/types";
import { useApp } from "@/context/app";
import { T } from "./T";
import { AppIcon } from "./AppIcon";

const SECTIONS: { key: keyof CardGuide; label: string }[] = [
  { key: "theme", label: "Card theme" },
  { key: "descriptionOfImage", label: "Description of Image" },
  { key: "invitation", label: "The invitation" },
  { key: "outOfBalance", label: "When out of balance" },
  { key: "contemplate", label: "Contemplate" },
  { key: "practice", label: "Practice" },
  { key: "intention", label: "Intention" },
  { key: "visualMeditation", label: "Visual meditation" },
];

export function GuideSections({ guide }: { guide: CardGuide }) {
  const { palette } = useApp();
  const [expanded, setExpanded] = useState<(keyof CardGuide)[]>(["theme", "invitation", "practice"]);

  return (
    <View style={{ gap: 14 }}>
      {SECTIONS.map((s) => (
        <View key={s.key} style={[styles.block, { borderLeftColor: palette.gold }]}>
          <Pressable
            onPress={() => setExpanded((current) => current.includes(s.key) ? current.filter((key) => key !== s.key) : [...current, s.key])}
            accessibilityRole="button"
            accessibilityLabel={`${s.label} section`}
            accessibilityState={{ expanded: expanded.includes(s.key) }}
            style={styles.heading}
          >
            <T variant="label" style={{ color: palette.gold, letterSpacing: 1, textTransform: "uppercase" }}>
              {s.label}
            </T>
            <AppIcon name={expanded.includes(s.key) ? "close" : "expand"} size={18} color={palette.gold} />
          </Pressable>
          {expanded.includes(s.key) ? (
            <T variant="body" style={{ color: palette.text }}>
              {guide[s.key]}
            </T>
          ) : null}
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
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 28,
  },
});
