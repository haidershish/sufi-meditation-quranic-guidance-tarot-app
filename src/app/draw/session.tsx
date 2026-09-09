import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, View, useWindowDimensions, type ViewStyle } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { CardFace, CardBack } from "@/components/CardFace";
import { CardZoom } from "@/components/CardZoom";
import { GuideSections } from "@/components/GuideSections";
import { CardCrossExamination } from "@/components/CardCrossExamination";
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
  const [activePrompt, setActivePrompt] = useState(0);
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
  const narrow = width < 620;
  const wideReading = Platform.OS === "web" && width >= 760;
  const stickyRailStyle = wideReading ? ({ position: "sticky", top: 24 } as unknown as ViewStyle) : undefined;
  const cardW = total === 1 ? Math.min(300, width - 72) : narrow ? Math.min(250, width - 72) : Math.min(220, (width - 96) / Math.max(total, 1));
  const readingThumbW = Math.min(138, Math.max(116, width * 0.32));
  const questions = session.questions ?? spread.positions.map((p) => p.prompt);

  const selectPrompt = (index: number) => {
    setActivePrompt(index);
    setRevealed((current) => Math.max(current, index + 1));
    selection(prefs.haptics);
  };
  const revealNext = () => {
    if (revealed < total) {
      setActivePrompt(revealed);
      setRevealed((r) => r + 1);
      selection(prefs.haptics);
    }
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
      <View style={[styles.promptNav, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="label" style={{ color: palette.gold }}>REFLECTION PROMPTS</T>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptItems}>
          {questions.map((question, index) => {
            const active = activePrompt === index;
            return (
              <Pressable key={`${index}-${question}`} onPress={() => selectPrompt(index)} style={({ pressed }) => [styles.promptItem, { backgroundColor: active ? palette.accentSoft : palette.surfaceAlt, borderColor: active ? palette.accent : palette.border, opacity: pressed ? 0.78 : 1 }]} accessibilityRole="button" accessibilityLabel={`Prompt ${index + 1}: ${question}`} accessibilityState={{ selected: active }}>
                <T variant="label" bold style={{ color: active ? palette.accent : palette.gold }}>{String(index + 1).padStart(2, "0")}</T>
                <T variant="caption" numberOfLines={1} style={{ color: palette.text }}>{question}</T>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={[styles.context, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <T variant="label" style={{ color: palette.gold }}>YOUR QUESTION{questions.length > 1 ? "S" : ""}</T>
        {questions.map((q, i) => <T key={`${i}-${q}`} bold>{questions.length > 1 ? `${i + 1}. ` : ""}{q}</T>)}
        {session.intention ? <View style={[styles.intention, { borderLeftColor: palette.gold }]}><T variant="label" style={{ color: palette.gold }}>YOUR INTENTION</T><T bold>{session.intention}</T></View> : null}
      </View>

      <View style={[styles.cards, total > 1 && narrow && styles.cardsStack]}>
        {session.cards.map((dc, i) => {
          const card = getCard(dc.cardId);
          const shown = i < revealed;
          return (
            <View key={dc.cardId} style={[styles.revealCard, narrow && styles.revealCardNarrow]}>
              {shown ? <Pressable onPress={() => setZoom({ card, concealed: false })} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}><CardFace card={card} width={cardW} height={cardW * 1.62} /></Pressable> : <CardBack width={cardW} height={cardW * 1.62} />}
              <T variant="label" style={{ color: palette.gold }}>{questions[i]}</T>
              {!shown ? <Button label="Meditate on image" variant="secondary" onPress={() => setZoom({ card, concealed: true })} /> : <T variant="caption" muted>Tap card to enlarge</T>}
            </View>
          );
        })}
      </View>

      {!allRevealed ? (
        <View style={{ marginTop: 28, gap: 12 }}>
          <Button label={`Reveal (${total - revealed} left)`} onPress={revealNext} />
          {total > 1 ? <Button label="Reveal all" variant="secondary" onPress={() => { setRevealed(total); setActivePrompt(total - 1); lightTap(prefs.haptics); }} /> : null}
        </View>
      ) : (
        <View style={{ marginTop: 28 }}>
          <T variant="heading" bold style={{ marginBottom: 16 }}>Read & reflect</T>
          {session.cards.map((dc, i) => {
            const card = getCard(dc.cardId);
            return (
              <View key={dc.cardId} style={[styles.cardRead, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <View style={wideReading ? styles.readLayout : undefined}>
                  <View style={wideReading ? styles.readCopy : undefined}>
                    <View style={styles.readHeader}>
                      {!wideReading ? <Pressable onPress={() => setZoom({ card, concealed: false })} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}><CardFace card={card} width={readingThumbW} height={readingThumbW * 1.62} /></Pressable> : null}
                      <View style={{ flex: 1, justifyContent: "center", gap: 2 }}><T variant="label" style={{ color: palette.gold }}>{questions[i]}</T><T variant="heading" bold>{card.title}</T><T variant="caption" muted>{card.transliteration}</T>{!wideReading ? <T variant="caption" muted>Tap image to enlarge</T> : null}</View>
                    </View>
                    <CardCrossExamination card={card} />
                    <GuideSections guide={card.guide} />
                  </View>
                  {wideReading ? <View style={[styles.readRail, stickyRailStyle]}><Pressable onPress={() => setZoom({ card, concealed: false })} accessibilityRole="button" accessibilityLabel={`Enlarge ${card.title}`}><CardFace card={card} width={150} height={150 * 1.62} /></Pressable><T variant="caption" muted>Tap image to enlarge</T></View> : null}
                </View>
              </View>
            );
          })}
          <T variant="label" style={{ color: palette.textMuted, marginTop: 24, marginBottom: 8 }}>YOUR REFLECTION (PRIVATE, SAVED ON THIS DEVICE)</T>
          <TextInput accessibilityLabel="Your reflection (private, saved on this device)" value={journal} onChangeText={setJournal} placeholder="What did you notice? What would you like to carry forward?" placeholderTextColor={palette.textSubtle} multiline style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]} />
          <View style={{ marginTop: 20, gap: 12 }}><Button label="Save reading" onPress={save} disabled={saving} /><Button label="Discard" variant="ghost" onPress={discard} /></View>
        </View>
      )}
      {zoom ? <CardZoom card={zoom.card} visible onClose={() => setZoom(null)} concealIdentity={zoom.concealed} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptNav: { borderRadius: 16, borderWidth: 1, padding: 12, gap: 8, marginBottom: 14 },
  promptItems: { gap: 8 },
  promptItem: { minWidth: 146, maxWidth: 220, borderRadius: 12, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 8, gap: 3 },
  context: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 5, marginBottom: 22 },
  intention: { borderLeftWidth: 2, paddingLeft: 12, gap: 2, marginTop: 8 },
  cards: { justifyContent: "center", flexDirection: "row", flexWrap: "wrap", gap: 16 },
  cardsStack: { flexDirection: "column", alignItems: "center" },
  revealCard: { alignItems: "center", gap: 8, flex: 1 },
  revealCardNarrow: { width: "100%", flex: undefined },
  cardRead: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  readLayout: { flexDirection: "row", alignItems: "flex-start", gap: 24 },
  readCopy: { flex: 1, minWidth: 0 },
  readHeader: { flexDirection: "row", gap: 12, marginBottom: 16 },
  readRail: { width: 160, alignItems: "center", gap: 8 },
  input: { borderRadius: 14, borderWidth: 1, padding: 14, minHeight: 120, textAlignVertical: "top", fontSize: 16 },
});
