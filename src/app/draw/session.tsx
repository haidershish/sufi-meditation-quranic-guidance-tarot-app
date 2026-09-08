import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { CardFace, CardBack } from "@/components/CardFace";
import { CardZoom } from "@/components/CardZoom";
import { GuideSections } from "@/components/GuideSections";
import { useApp } from "@/context/app";
import { getCard } from "@/content/deck";
import { SPREADS } from "@/domain/spreads";
import { completeSession } from "@/domain/session";
import { clearDraft, getDraft } from "@/state/draft";
import { storage } from "@/storage/storage";
import { appPath } from "@/platform/paths";
import { lightTap, selection, success } from "@/platform/haptics";
import type { DeckCard, ReadingSession } from "@/domain/types";

export default function Session() {
  const { palette, prefs } = useApp();
  const { width } = useWindowDimensions();
  const [session] = useState<ReadingSession | null>(() => getDraft());
  const [revealed, setRevealed] = useState(0);
  const [journal, setJournal] = useState("");
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState<{ card: DeckCard; concealed: boolean } | null>(null);

  useEffect(() => {
    if (!session) router.replace(appPath("/", Platform.OS) as never);
  }, [session]);
  if (!session) return null;

  const spread = SPREADS[session.spreadId];
  const total = session.cards.length;
  const allRevealed = revealed >= total;
  const cardW = Math.min(total === 1 ? 220 : 150, (width - 60) / Math.max(total, 1));
  const questions = session.questions ?? spread.positions.map((p) => p.prompt);

  const revealNext = () => {
    if (revealed < total) { setRevealed((r) => r + 1); selection(prefs.haptics); }
  };
  const save = async () => {
    setSaving(true);
    const completed = completeSession(session, journal.trim() || undefined);
    await storage.saveSession(completed);
    clearDraft(); success(prefs.haptics);
    router.replace(appPath(`/journal/${completed.id}`, Platform.OS) as never);
  };
  const discard = () => { clearDraft(); lightTap(prefs.haptics); router.replace(appPath("/", Platform.OS) as never); };

  return (
    <Screen scroll>
      <View style={[styles.context, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="label" style={{ color: palette.gold }}>YOUR QUESTION{questions.length > 1 ? "S" : ""}</T>
        {questions.map((q, i) => <T key={`${i}-${q}`} bold>{questions.length > 1 ? `${i + 1}. ` : ""}{q}</T>)}
        {session.intention ? <><T variant="label" style={{ color: palette.gold, marginTop: 8 }}>YOUR INTENTION</T><T>{session.intention}</T></> : null}
      </View>

      <View style={styles.cards}>
        {session.cards.map((dc, i) => {
          const card = getCard(dc.cardId);
          const shown = i < revealed;
          return (
            <View key={dc.cardId} style={{ alignItems: "center", gap: 8, flex: 1 }}>
              {shown ? (
                <Pressable onPress={() => setZoom({ card, concealed: false })} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}>
                  <CardFace card={card} width={cardW} height={cardW * 1.62} />
                </Pressable>
              ) : <CardBack width={cardW} height={cardW * 1.62} />}
              <T variant="label" style={{ color: palette.gold }}>{questions[i]}</T>
              {!shown ? (
                <Button label="Meditate on image" variant="secondary" onPress={() => setZoom({ card, concealed: true })} />
              ) : (
                <T variant="caption" muted>Tap card to enlarge</T>
              )}
            </View>
          );
        })}
      </View>

      {!allRevealed ? (
        <View style={{ marginTop: 28, gap: 12 }}>
          <Button label={`Reveal (${total - revealed} left)`} onPress={revealNext} />
          {total > 1 ? <Button label="Reveal all" variant="secondary" onPress={() => { setRevealed(total); lightTap(prefs.haptics); }} /> : null}
        </View>
      ) : (
        <View style={{ marginTop: 28 }}>
          <T variant="heading" bold style={{ marginBottom: 16 }}>Read & reflect</T>
          {session.cards.map((dc, i) => {
            const card = getCard(dc.cardId);
            return (
              <View key={dc.cardId} style={[styles.cardRead, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
                  <Pressable onPress={() => setZoom({ card, concealed: false })} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}>
                    <CardFace card={card} width={92} height={92 * 1.62} />
                  </Pressable>
                  <View style={{ flex: 1, justifyContent: "center", gap: 2 }}>
                    <T variant="label" style={{ color: palette.gold }}>{questions[i]}</T>
                    <T variant="heading" bold>{card.title}</T>
                    <T variant="caption" muted>{card.transliteration}</T>
                    <T variant="caption" muted>Tap image to enlarge</T>
                  </View>
                </View>
                <GuideSections guide={card.guide} />
              </View>
            );
          })}
          <T variant="label" style={{ color: palette.textMuted, marginTop: 24, marginBottom: 8 }}>YOUR REFLECTION (PRIVATE, SAVED ON THIS DEVICE)</T>
          <TextInput value={journal} onChangeText={setJournal} placeholder="What did you notice? What would you like to carry forward?" placeholderTextColor={palette.textSubtle} multiline style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]} />
          <View style={{ marginTop: 20, gap: 12 }}><Button label="Save reading" onPress={save} disabled={saving} /><Button label="Discard" variant="ghost" onPress={discard} /></View>
        </View>
      )}
      {zoom ? <CardZoom card={zoom.card} visible onClose={() => setZoom(null)} concealIdentity={zoom.concealed} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  context: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 5, marginBottom: 22 },
  cards: { justifyContent: "center", flexDirection: "row", flexWrap: "wrap", gap: 16 },
  cardRead: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  input: { borderRadius: 14, borderWidth: 1, padding: 14, minHeight: 120, textAlignVertical: "top", fontSize: 16 },
});
