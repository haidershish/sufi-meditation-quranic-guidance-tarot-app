import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View, useWindowDimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { CardFace } from "@/components/CardFace";
import { CardZoom } from "@/components/CardZoom";
import { GuideSections } from "@/components/GuideSections";
import { useApp } from "@/context/app";
import { getCard } from "@/content/deck";
import { SPREADS } from "@/domain/spreads";
import { storage } from "@/storage/storage";
import { lightTap } from "@/platform/haptics";
import { appPath } from "@/platform/paths";
import type { DeckCard, ReadingSession } from "@/domain/types";

export default function SessionDetail() {
  const { palette, prefs } = useApp();
  const { width } = useWindowDimensions();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const [session, setSession] = useState<ReadingSession | null>(null);
  const [journal, setJournal] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [zoom, setZoom] = useState<DeckCard | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    storage.getSession(sessionId).then((s) => { setSession(s); setJournal(s?.journalText ?? ""); });
  }, [sessionId]);

  if (!session) return <Screen><T variant="body" muted>Loading…</T></Screen>;
  const spread = SPREADS[session.spreadId];
  const questions = session.questions ?? spread.positions.map((p) => p.prompt);
  const thumbnailWidth = Math.min(138, Math.max(116, width * 0.32));

  const save = async () => {
    const updated = { ...session, journalText: journal.trim() || undefined };
    await storage.saveSession(updated); setSession(updated); lightTap(prefs.haptics);
  };
  const del = () => {
    if (!confirming) { setConfirming(true); setTimeout(() => setConfirming(false), 4000); return; }
    storage.deleteSession(session.id).then(() => router.replace(appPath("/journal", Platform.OS) as never));
  };

  return (
    <Screen scroll>
      <T variant="body" muted>{new Date(session.createdAt).toLocaleString()} · {spread.name}</T>
      <View style={[styles.context, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="label" style={{ color: palette.gold }}>YOUR QUESTION{questions.length > 1 ? "S" : ""}</T>
        {questions.map((q, i) => <T key={`${i}-${q}`} bold>{questions.length > 1 ? `${i + 1}. ` : ""}{q}</T>)}
        {session.intention ? <><T variant="label" style={{ color: palette.gold, marginTop: 8 }}>YOUR INTENTION</T><T>{session.intention}</T></> : null}
      </View>

      {session.cards.map((dc, i) => {
        const card = getCard(dc.cardId);
        return (
          <View key={dc.cardId} style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
              <Pressable onPress={() => setZoom(card)} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}>
                <CardFace card={card} width={thumbnailWidth} height={thumbnailWidth * 1.62} />
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

      <T variant="label" style={{ color: palette.textMuted, marginTop: 24, marginBottom: 8 }}>YOUR REFLECTION</T>
      <TextInput value={journal} onChangeText={setJournal} placeholder="Add or edit your reflection…" placeholderTextColor={palette.textSubtle} multiline style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]} />
      <View style={{ marginTop: 20, gap: 12 }}>
        <Button label="Save reflection" onPress={save} />
        <Button label={confirming ? "Tap again to confirm delete" : "Delete reading"} variant="danger" onPress={del} />
      </View>
      {zoom ? <CardZoom card={zoom} visible onClose={() => setZoom(null)} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  context: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 5, marginTop: 14 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 16 },
  input: { borderRadius: 14, borderWidth: 1, padding: 14, minHeight: 110, textAlignVertical: "top", fontSize: 16 },
});
