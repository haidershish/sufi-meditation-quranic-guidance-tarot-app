import { Platform, View, StyleSheet, useWindowDimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { CardFace } from "@/components/CardFace";
import { GuideSections } from "@/components/GuideSections";
import { CardCrossExamination } from "@/components/CardCrossExamination";
import { useApp } from "@/context/app";
import { getCard, deckVersion } from "@/content/deck";
import { SPREADS } from "@/domain/spreads";
import { createSession } from "@/domain/session";
import { setDraft } from "@/state/draft";
import { lightTap } from "@/platform/haptics";
import { hasArt } from "@/content/art";
import { appPath } from "@/platform/paths";

export default function CardDetail() {
  const { palette, prefs } = useApp();
  const { width } = useWindowDimensions();
  const { cardId } = useLocalSearchParams<{ cardId: string }>();
  const card = getCard(cardId ?? "");

  const reflect = () => {
    const spread = SPREADS.single;
    setDraft(
      createSession(spread.id, deckVersion, [{ cardId: card.id, position: spread.positions[0].key, order: 0 }]),
    );
    lightTap(prefs.haptics);
    router.push(appPath("/draw/session", Platform.OS) as never);
  };

  const meta = card.arcana === "Core Arcana" ? card.arcana : `${card.suit} · ${card.rank}`;

  return (
    <Screen scroll>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <CardFace card={card} width={Math.min(280, width - 64)} height={Math.min(280, width - 64) * 1.62} />
        {!hasArt(card.id) ? (
          <T variant="caption" muted style={{ marginTop: 8 }}>
            Artwork is being prepared.
          </T>
        ) : null}
      </View>

      <T variant="heading" bold style={{ color: palette.text, textAlign: "center" }}>
        {card.title}
      </T>
      <T variant="body" muted style={{ textAlign: "center" }}>
        {card.transliteration}
      </T>
      <T variant="label" style={{ color: palette.gold, textAlign: "center", marginBottom: 20 }}>
        {meta}
      </T>

      <CardCrossExamination card={card} />
      <GuideSections guide={card.guide} />

      <View style={{ marginTop: 28, gap: 12 }}>
        <Button label="Reflect on this card" onPress={reflect} />
        <Button label="Back to library" variant="secondary" onPress={() => router.back()} />
      </View>

      <T variant="caption" muted style={styles.footer}>
        For contemplation, not prediction, religious guidance, or claims about the unseen.
      </T>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: { marginTop: 24, textAlign: "center", opacity: 0.8 },
});
