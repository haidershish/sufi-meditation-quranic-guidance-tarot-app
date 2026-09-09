import { StyleSheet, View } from "react-native";
import type { DeckCard } from "@/domain/types";
import { useApp } from "@/context/app";
import { T } from "./T";

type Props = { card: DeckCard };

export function CardCrossExamination({ card }: Props) {
  const { palette } = useApp();

  return (
    <View style={[styles.panel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <View style={styles.header}>
        <View style={[styles.stepMark, { backgroundColor: palette.accentSoft, borderColor: palette.gold }]}>
          <T variant="label" bold style={{ color: palette.gold }}>↔</T>
        </View>
        <View style={{ flex: 1 }}>
          <T variant="heading" bold>Cross-examine the card</T>
          <T variant="caption" muted>Let the image earn the meaning. Read this before accepting the guidebook.</T>
        </View>
      </View>

      <View style={[styles.claim, { borderLeftColor: palette.teal }]}>
        <T variant="label" style={{ color: palette.teal }}>1 · IMAGE EVIDENCE</T>
        <T variant="body">{card.guide.descriptionOfImage}</T>
      </View>

      <View style={[styles.claim, { borderLeftColor: palette.gold }]}>
        <T variant="label" style={{ color: palette.gold }}>2 · GUIDEBOOK CLAIM</T>
        <T variant="body" bold>{card.guide.theme}</T>
        <T variant="body">{card.guide.invitation}</T>
      </View>

      <View style={[styles.claim, { borderLeftColor: palette.terracotta }]}>
        <T variant="label" style={{ color: palette.terracotta }}>3 · THE BRIDGE</T>
        <T variant="body">{card.guide.visualMeditation}</T>
      </View>

      <View style={[styles.check, { backgroundColor: palette.surfaceAlt }]}>
        <T variant="label" style={{ color: palette.textMuted }}>4 · PRESSURE-TEST IT</T>
        <T variant="body">
          Which exact detail in the image supports the claim? What detail complicates or resists it? If nothing earns the connection, keep your own reading and treat this card as needing revision.
        </T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 16, marginBottom: 18 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepMark: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  claim: { borderLeftWidth: 2, paddingLeft: 12, gap: 4 },
  check: { borderRadius: 12, padding: 12, gap: 4 },
});
