import { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { AppIcon, type IconName } from "@/components/AppIcon";
import { useApp } from "@/context/app";
import { MEDITATION_THRESHOLD_SECS, meditations } from "@/content/meditations";
import type { MeditationCategory } from "@/content/meditations";
import { appPath } from "@/platform/paths";

type Topic = "all" | MeditationCategory;

const TOPICS: { key: Topic; label: string; icon: IconName }[] = [
  { key: "all", label: "All", icon: "spark" },
  { key: "nature-and-rest", label: "Rest", icon: "meditation" },
  { key: "boundaries", label: "Boundaries", icon: "tarot" },
  { key: "path-and-timing", label: "Path", icon: "guidance" },
  { key: "study-and-work", label: "Study", icon: "library" },
  { key: "belonging", label: "Belonging", icon: "home" },
  { key: "breathing-and-visualization", label: "Breath", icon: "meditation" },
  { key: "health-and-illness", label: "Care", icon: "guidance" },
  { key: "family", label: "Family", icon: "home" },
  { key: "unspecified", label: "Other", icon: "spark" },
];
const AVAILABLE_MEDITATIONS = meditations.filter((meditation) => meditation.durationSecs >= MEDITATION_THRESHOLD_SECS);
const AVAILABLE_TOPICS = TOPICS.filter((topic) => topic.key === "all" || AVAILABLE_MEDITATIONS.some((meditation) => meditation.category === topic.key));

export default function Meditations() {
  const { palette } = useApp();
  const [topic, setTopic] = useState<Topic>("all");
  const visibleMeditations = useMemo(
    () => AVAILABLE_MEDITATIONS.filter((meditation) => topic === "all" || meditation.category === topic),
    [topic],
  );

  return (
    <Screen scroll>
      <T variant="body" muted>
        Guided practices from Khushaamdeed for rest, steadiness, belonging, and care.
      </T>
      <T variant="caption" muted style={styles.count}>
        {visibleMeditations.length} recording{visibleMeditations.length === 1 ? "" : "s"} · Khushaamdeed practices 2.5 min+
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
              <AppIcon name={item.icon} size={16} color={active ? palette.accent : palette.textMuted} />
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
                <AppIcon name={topicIcon(meditation.category)} size={28} color={palette.teal} />
                <T variant="heading" bold style={{ color: palette.text, flex: 1 }}>
                  {meditation.title}
                </T>
              </View>
              <T variant="caption" muted>
                {categoryLabel(meditation.category)} · {formatTime(meditation.durationSecs)}
              </T>
              <T variant="caption" style={{ color: palette.gold, textTransform: "uppercase", letterSpacing: 1 }}>
                {meditation.status}
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

function topicIcon(category: MeditationCategory): IconName {
  return TOPICS.find((topic) => topic.key === category)?.icon ?? "meditation";
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
