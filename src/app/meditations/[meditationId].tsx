import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { useApp } from "@/context/app";
import { meditationsById } from "@/content/meditations";
import { appPath } from "@/platform/paths";

export default function MeditationDetail() {
  const { palette } = useApp();
  const { meditationId } = useLocalSearchParams<{ meditationId: string }>();
  const meditation = meditationsById.get(meditationId ?? "");
  const player = useAudioPlayer(meditation?.asset ?? null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  if (!meditation || meditation.status !== "final") {
    return (
      <Screen>
        <T variant="heading" bold>
          Meditation not found
        </T>
        <T variant="body" muted style={{ marginTop: 8 }}>
          This recording is not available in the current Khushaamdeed collection.
        </T>
        <View style={{ marginTop: 24 }}>
          <Button label="Back to meditations" onPress={() => router.replace(appPath("/meditations", Platform.OS) as never)} />
        </View>
      </Screen>
    );
  }

  const total = status.duration > 0 ? status.duration : meditation.durationSecs;
  const elapsed = Math.min(Math.max(status.currentTime, 0), total);
  const ready = status.isLoaded && !status.error;
  const finished = total > 0 && elapsed >= total - 0.25;
  const togglePlayback = async () => {
    if (!ready) return;
    if (status.playing) {
      player.pause();
      return;
    }
    if (finished) await player.seekTo(0);
    player.play();
  };

  return (
    <Screen scroll>
      <T variant="title" bold style={{ color: palette.accent }}>
        {meditation.title}
      </T>
      <T variant="body" muted style={{ marginTop: 6 }}>
        {categoryLabel(meditation.category)} · {formatTime(meditation.durationSecs)}
      </T>

      <View style={[styles.metaBox, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="label" bold style={{ color: palette.gold }}>
          GUIDED PRACTICE
        </T>
        <T variant="caption" muted>
          From {meditation.source} · {categoryLabel(meditation.category)}
        </T>
      </View>

      <View style={[styles.player, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="heading" bold>
          Foreground playback
        </T>
        <T variant="caption" muted>
          Playback stops when you leave this screen. No background or lock-screen controls are enabled.
        </T>
        <View style={styles.timeRow}>
          <T variant="body" style={{ color: palette.text }}>
            {formatTime(elapsed)}
          </T>
          <T variant="body" muted>
            {formatTime(total)}
          </T>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: palette.surfaceAlt }]} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: elapsed }}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${total > 0 ? Math.min(100, (elapsed / total) * 100) : 0}%`,
                backgroundColor: palette.teal,
              },
            ]}
          />
        </View>
        {status.error ? (
          <T variant="caption" style={{ color: palette.danger }}>
            This recording could not be loaded on this device.
          </T>
        ) : null}
        <Button
          label={status.playing ? "Pause" : finished ? "Play again" : ready ? "Play" : "Loading…"}
          onPress={togglePlayback}
          disabled={!ready}
        />
      </View>

      <Button label="Back to meditations" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
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
  metaBox: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 6, marginTop: 20 },
  player: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 14, marginTop: 16 },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  progressTrack: { height: 8, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
});
