import { useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { guidanceCopy } from "@/content/guidance";
import { drawQuranPassage, quranSource, type QuranPassage } from "@/content/quran";
import { useApp } from "@/context/app";
import { lightTap } from "@/platform/haptics";

export default function QuranicGuidance() {
  const { palette, prefs } = useApp();
  const [passage, setPassage] = useState<QuranPassage | null>(null);
  const [attempted, setAttempted] = useState(false);

  const draw = () => {
    setPassage(drawQuranPassage());
    setAttempted(true);
    lightTap(prefs.haptics);
  };

  return (
    <Screen>
      <View style={styles.stack}>
        <T variant="title" bold style={{ color: palette.accent }}>Quranic Guidance</T>
        <T>{guidanceCopy.opening}</T>
        <T muted>{guidanceCopy.practice}</T>
        <Button label="Receive five continuous verses" onPress={draw} />

        {passage ? (
          <View style={[styles.passage, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <T variant="heading" bold>{`Surah ${passage.surah}, verses ${passage.startAyah}-${passage.endAyah}`}</T>
            {passage.verses.map((verse) => (
              <View key={`${verse.surah}:${verse.ayah}`} style={styles.verse}>
                <T style={[styles.arabic, { color: palette.teal }]}>{verse.arabic}</T>
                <T>{verse.english}</T>
                <T variant="caption" muted>{`${verse.surah}:${verse.ayah}`}</T>
              </View>
            ))}
          </View>
        ) : attempted ? (
          <View style={[styles.notice, { backgroundColor: palette.surfaceAlt, borderColor: palette.border }]}>
            <T bold>Verified verse data is not installed yet.</T>
            <T muted>
              The supplied PDF is retained as a provenance reference, but it cannot safely produce canonical verse text. Add a licensed, verse-structured Arabic and translation source before this feature is activated.
            </T>
          </View>
        ) : null}

        <View style={[styles.notice, { borderColor: palette.border }]}>
          <T variant="caption">{guidanceCopy.disclaimer}</T>
          <T variant="caption" muted style={styles.review}>{guidanceCopy.review}</T>
        </View>
        <T variant="caption" muted onPress={() => Linking.openURL(quranSource.structuredSources.english.documentation)} accessibilityRole="link">
          Arabic: Uthmani text via AlQuran Cloud. English: {quranSource.structuredSources.english.translator} via AlQuran Cloud.
        </T>
        <T variant="caption" muted onPress={() => Linking.openURL(quranSource.url)} accessibilityRole="link">
          PDF provenance reference: {quranSource.title} ({quranSource.translator}); it is not the displayed translation.
        </T>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 16, marginTop: 8 },
  passage: { borderWidth: 1, borderRadius: 18, gap: 16, padding: 18 },
  verse: { gap: 6 },
  arabic: { fontSize: 24, lineHeight: 42, textAlign: "right" },
  notice: { borderWidth: 1, borderRadius: 14, gap: 8, padding: 14 },
  review: { marginTop: 8 },
});
