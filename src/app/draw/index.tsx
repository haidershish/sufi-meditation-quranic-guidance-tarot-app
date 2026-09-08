import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { Button } from "@/components/Button";
import { useApp } from "@/context/app";
import { allCards, deckVersion } from "@/content/deck";
import { SPREADS, SPREAD_LIST } from "@/domain/spreads";
import { getQuestionSets, resolveQuestions } from "@/domain/questions";
import { drawCards } from "@/domain/draw";
import { createSession } from "@/domain/session";
import { setDraft } from "@/state/draft";
import { cryptoRandom } from "@/platform/random";
import { appPath } from "@/platform/paths";
import { lightTap, selection } from "@/platform/haptics";
import type { SpreadId } from "@/domain/types";
import { Platform } from "react-native";

export default function ChooseSpread() {
  const { palette, prefs } = useApp();
  const [spreadId, setSpreadId] = useState<SpreadId>("single");
  const [selectedSet, setSelectedSet] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [questions, setQuestions] = useState([""]);
  const [intention, setIntention] = useState("");
  const sets = getQuestionSets(spreadId);

  useEffect(() => {
    setSelectedSet(0);
    setCustomMode(false);
    setQuestions(Array(spreadId === "single" ? 1 : 3).fill(""));
  }, [spreadId]);

  const draw = () => {
    const spread = SPREADS[spreadId];
    const cards = drawCards(allCards.map((c) => c.id), spread, cryptoRandom);
    const resolved = resolveQuestions(spreadId, customMode ? questions : [], selectedSet);
    setDraft(createSession(spread.id, deckVersion, cards, intention.trim() || undefined, resolved));
    lightTap(prefs.haptics);
    router.push(appPath("/draw/session", Platform.OS) as never);
  };

  return (
    <Screen scroll>
      <T variant="body" muted>Choose a spread, then choose a suggested question set or write your own.</T>

      <View style={{ gap: 12, marginTop: 20 }}>
        {SPREAD_LIST.map((spread) => {
          const active = spread.id === spreadId;
          return (
            <Pressable
              key={spread.id}
              onPress={() => { setSpreadId(spread.id); selection(prefs.haptics); }}
              style={[styles.spread, { backgroundColor: active ? palette.accentSoft : palette.surface, borderColor: active ? palette.accent : palette.border }]}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <T variant="heading" bold>{spread.name}</T>
              <T variant="caption" muted>{spread.description}</T>
            </Pressable>
          );
        })}
      </View>

      <T variant="heading" bold style={{ marginTop: 24 }}>Your question</T>
      <T variant="caption" muted style={{ marginBottom: 10 }}>Choose one of three common approaches.</T>
      <View style={{ gap: 10 }}>
        {sets.map((set, index) => {
          const active = !customMode && selectedSet === index;
          return (
            <Pressable
              key={set.id}
              onPress={() => { setSelectedSet(index); setCustomMode(false); selection(prefs.haptics); }}
              style={[styles.option, { backgroundColor: active ? palette.accentSoft : palette.surface, borderColor: active ? palette.accent : palette.border }]}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <T bold>{set.title}</T>
              <T variant="caption" muted>{set.description}</T>
              {set.questions.map((q, i) => <T key={q} variant="caption" style={{ color: palette.gold }}>{i + 1}. {q}</T>)}
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => setCustomMode(true)}
          style={[styles.option, { backgroundColor: customMode ? palette.accentSoft : palette.surface, borderColor: customMode ? palette.accent : palette.border }]}
          accessibilityRole="radio"
          accessibilityState={{ selected: customMode }}
        >
          <T bold>Write my own {spreadId === "single" ? "question" : "three questions"}</T>
        </Pressable>
      </View>

      {customMode ? (
        <View style={{ gap: 10, marginTop: 12 }}>
          {questions.map((question, index) => (
            <TextInput
              key={index}
              value={question}
              onChangeText={(text) => setQuestions((current) => current.map((q, i) => i === index ? text : q))}
              placeholder={spreadId === "single" ? "What would you like to reflect on?" : `Question ${index + 1}`}
              placeholderTextColor={palette.textSubtle}
              multiline
              style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]}
            />
          ))}
        </View>
      ) : null}

      <T variant="label" style={{ color: palette.textMuted, marginTop: 24, marginBottom: 8 }}>Your intention (optional)</T>
      <TextInput
        value={intention}
        onChangeText={setIntention}
        placeholder="What are you bringing to this reflection?"
        placeholderTextColor={palette.textSubtle}
        multiline
        style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]}
      />

      <View style={{ marginTop: 24 }}><Button label="Draw" onPress={draw} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  spread: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 6 },
  option: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 4 },
  input: { borderRadius: 14, borderWidth: 1, padding: 14, minHeight: 72, textAlignVertical: "top", fontSize: 16 },
});
