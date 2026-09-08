import { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { meditations } from "@/content/meditations";
import type { MeditationCategory } from "@/content/meditations";
import { appPath } from "@/platform/paths";

type Topic = "all" | MeditationCategory;

const TOPICS: { key: Topic; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "✦" },
  { key: "nature-and-rest", label: "Rest", icon: "◌" },
  { key: "boundaries", label: "Boundaries", icon: "◇" },
  { key: "path-and-timing", label: "Path", icon: "↗" },
  { key: "study-and-work", label: "Study", icon: "▱" },
  { key: "belonging", label: "Belonging", icon: "⌂" },
  { key: "breathing-and-visualization", label: "Breath", icon: "≈" },
  { key: "health-and-illness", label: "Care", icon: "+" },
  { key: "family", label: "Family", icon: "⌂" },
];
const PUBLIC_MEDITATIONS = meditations.filter((meditation) => meditation.status === "final");
const AVAILABLE_TOPICS = TOPICS.filter((topic) => topic.key === "all" || PUBLIC_MEDITATIONS.some((meditation) => meditation.category === topic.key));

export default function Meditations() {
  const { palette } = useApp();
  const [topic, setTopic] = useState<Topic>("all");
  const visibleMeditations = useMemo(
    () => PUBLIC_MEDITATIONS.filter((meditation) => topic === "all" || meditation.category === topic),
    [topic],
  );

  return (
    <Screen scroll>
      <T variant="body" muted>
        Guided practices from Khushaamdeed for rest, steadiness, belonging, and care.
      </T>
      <T variant="caption" muted style={styles.count}>
        {visibleMeditations.length} recording{visibleMeditations.length === 1 ? "" : "s"} · All practices longer than 2.5 minutes
      </T>

      <View style={styles.topics}>
        {AVAILABLE_TOPICS.map((item) => {
          const active = item.key === topic;
          return (
            <Pressable
              key={item.key}
              onPress={() => setTopic(item.key)}
              style={[styles.topic, { backgroundColor: active ? palette.accentSoft : palette.surface, borderColor: active ? palette.accent : palette.border }]}
              accessibilityRole="button"
              accessibilityLabel={`${item.label} meditation topic`}
              accessibilityState={{ selected: active }}
            >
              <T variant="label" style={{ color: active ? palette.accent : palette.textMuted }} accessibilityElementsHidden>{item.icon}</T>
              <T variant="label" style={{ color: active ? palette.accent : palette.text }}>{item.label}</T>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {visibleMeditations.map((meditation) => (
            <Pressable
              key={meditation.id}
              onPress={() => router.push(appPath(`/meditations/${meditation.id}`, Platform.OS) as never)}
              style={({ pressed }) => [
                styles.item,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Open ${meditation.title}`}
            >
              <View style={styles.itemHeader}>
                <T variant="title" style={{ color: palette.teal, lineHeight: 32 }} accessibilityElementsHidden>
                  {topicIcon(meditation.category)}
                </T>
                <T variant="heading" bold style={{ color: palette.text, flex: 1 }}>
                  {meditation.title}
                </T>
              </View>
              <T variant="caption" muted>
                {categoryLabel(meditation.category)} · {formatTime(meditation.durationSecs)}
              </T>
            </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function categoryLabel(category: string): string {
  return category
    .split("-")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function topicIcon(category: MeditationCategory): string {
  return TOPICS.find((topic) => topic.key === category)?.icon ?? "◌";
}

function formatTime(seconds: number): string {
  const whole = Math.max(0, Math.round(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  count: { marginTop: 6 },
  topics: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 18 },
  topic: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 20, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  list: { gap: 12, marginTop: 20 },
  item: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 6 },
  itemHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
});
