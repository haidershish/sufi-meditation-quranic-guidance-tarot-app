import { Platform, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { meditations } from "@/content/meditations";
import type { MeditationStatus } from "@/content/meditations";
import { appPath } from "@/platform/paths";

export default function Meditations() {
  const { palette } = useApp();

  return (
    <Screen scroll>
      <T variant="body" muted>
        Guided practices from Khushaamdeed for rest, steadiness, belonging, and care.
      </T>
      <T variant="caption" muted style={styles.count}>
        {meditations.length} recordings · All recordings longer than 2.5 minutes
      </T>

      <View style={styles.list}>
        {meditations.map((meditation) => {
          const status = statusLabel(meditation.status);
          return (
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
              accessibilityLabel={`Open ${meditation.title}, ${status}`}
            >
              <View style={styles.itemHeader}>
                <T variant="heading" bold style={{ color: palette.text, flex: 1 }}>
                  {meditation.title}
                </T>
                <T
                  variant="label"
                  bold
                  style={{ color: statusColor(meditation.status, palette.terracotta, palette.teal) }}
                >
                  {meditation.status.toUpperCase()}
                </T>
              </View>
              <T variant="caption" muted>
                {categoryLabel(meditation.category)} · {formatTime(meditation.durationSecs)}
              </T>
              <T variant="caption" style={{ color: statusColor(meditation.status, palette.terracotta, palette.teal) }}>
                {status}
              </T>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

function statusLabel(status: MeditationStatus): string {
  if (status === "final") return "Final recording";
  return `${status[0].toUpperCase()}${status.slice(1)} recording — not final`;
}

function statusColor(status: MeditationStatus, pending: string, approved: string): string {
  return status === "final" ? approved : pending;
}

function categoryLabel(category: string): string {
  return category
    .split("-")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function formatTime(seconds: number): string {
  const whole = Math.max(0, Math.round(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  count: { marginTop: 6 },
  list: { gap: 12, marginTop: 20 },
  item: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 6 },
  itemHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
});
