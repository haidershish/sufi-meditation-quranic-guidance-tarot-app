import { Platform, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { appPath } from "@/platform/paths";

export default function Home() {
  const { palette } = useApp();

  return (
    <Screen scroll>
      <View style={styles.hero}>
        <T variant="title" bold style={{ color: palette.accent }}>
          Sufi Meditation, Quranic Guidance, & Tarot
        </T>
        <T variant="body" muted>
          Three contemplative paths for stillness, discernment, and reflection.
        </T>
      </View>

      <View style={styles.navGrid}>
        <NavCard
          label="Meditation"
          caption="Guided practices for rest and presence"
          onPress={() => router.push(appPath("/meditations", Platform.OS) as never)}
        />
        <NavCard
          label="Tarot"
          caption="Reflect with the 78-card contemplative deck"
          onPress={() => router.push(appPath("/draw", Platform.OS) as never)}
        />
        <NavCard
          label="Quranic Guidance"
          caption="Receive a five-verse passage for reflection"
          onPress={() => router.push(appPath("/guidance", Platform.OS) as never)}
        />
      </View>

      <T variant="caption" muted style={styles.footer}>
        For reflection and personal discernment—not fortune-telling or a substitute for prayer, scholarship, or professional advice.
      </T>
    </Screen>
  );
}

function NavCard({ label, caption, onPress }: { label: string; caption: string; onPress: () => void }) {
  const { palette } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navCard,
        { backgroundColor: palette.surface, borderColor: palette.border, opacity: pressed ? 0.85 : 1 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <T variant="heading" bold style={{ color: palette.text }}>
        {label}
      </T>
      <T variant="caption" muted>
        {caption}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 8, marginTop: 16 },
  navGrid: {
    gap: 12,
    marginTop: 28,
  },
  navCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 6,
  },
  footer: { marginTop: 28, textAlign: "center", opacity: 0.8 },
});
