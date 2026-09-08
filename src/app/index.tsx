import { Platform, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { useApp } from "@/context/app";
import { allCards, deckVersion } from "@/content/deck";
import { SPREADS } from "@/domain/spreads";
import { drawCards } from "@/domain/draw";
import { createSession } from "@/domain/session";
import { setDraft } from "@/state/draft";
import { cryptoRandom } from "@/platform/random";
import { lightTap } from "@/platform/haptics";
import { appPath } from "@/platform/paths";
import { getQuestionSets } from "@/domain/questions";

export default function Home() {
  const { palette, prefs } = useApp();

  const quickDraw = () => {
    const spread = SPREADS.single;
    const cards = drawCards(allCards.map((c) => c.id), spread, cryptoRandom);
    setDraft(createSession(spread.id, deckVersion, cards, undefined, getQuestionSets("single")[0].questions));
    lightTap(prefs.haptics);
    router.push(appPath("/draw/session", Platform.OS) as never);
  };

  return (
    <Screen scroll>
      <View style={styles.hero}>
        <T variant="title" bold style={{ color: palette.accent }}>
          Sufi Contemplative Tarot
        </T>
        <T variant="body" muted>
          A 78-card guide for reflection, journaling, and careful conversation.
        </T>
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>
        <Button label="Draw a card" onPress={quickDraw} />
        <Button label="Choose a spread" variant="secondary" onPress={() => router.push(appPath("/draw", Platform.OS) as never)} />
      </View>

      <View style={styles.navGrid}>
        <NavCard label="Library" caption="Browse all 78 cards" onPress={() => router.push(appPath("/library", Platform.OS) as never)} />
        <NavCard label="Journal" caption="Past readings" onPress={() => router.push(appPath("/journal", Platform.OS) as never)} />
        <NavCard label="About & Guide" caption="How to use the deck" onPress={() => router.push(appPath("/about", Platform.OS) as never)} />
        <NavCard label="Settings" caption="Theme & preferences" onPress={() => router.push(appPath("/settings", Platform.OS) as never)} />
      </View>

      <T variant="caption" muted style={styles.footer}>
        For contemplation, not prediction, religious guidance, or claims about the unseen.
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  navCard: {
    flexBasis: "47%",
    flexGrow: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },
  footer: { marginTop: 28, textAlign: "center", opacity: 0.8 },
});
