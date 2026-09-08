import type { ReactNode } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { selection } from "@/platform/haptics";
import type { UserPreferences } from "@/domain/types";

const THEMES: { key: UserPreferences["theme"]; label: string }[] = [
  { key: "system", label: "System" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

const SCALES: { key: UserPreferences["textScale"]; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "large", label: "Large" },
];

export default function Settings() {
  const { palette, prefs, setPrefs } = useApp();

  return (
    <Screen scroll>
      <Section label="Appearance">
        <T variant="body" muted>
          Theme
        </T>
        <View style={styles.segment}>
          {THEMES.map((t) => (
            <Segment
              key={t.key}
              label={t.label}
              active={prefs.theme === t.key}
              onPress={() => {
                setPrefs({ theme: t.key });
                selection(prefs.haptics);
              }}
            />
          ))}
        </View>

        <T variant="body" muted style={{ marginTop: 16 }}>
          Text size
        </T>
        <View style={styles.segment}>
          {SCALES.map((s) => (
            <Segment
              key={s.key}
              label={s.label}
              active={prefs.textScale === s.key}
              onPress={() => {
                setPrefs({ textScale: s.key });
                selection(prefs.haptics);
              }}
            />
          ))}
        </View>
      </Section>

      <Section label="Motion & feedback">
        <ToggleRow
          label="Reduce motion"
          caption="Minimize card and screen animations"
          value={prefs.reduceMotion}
          onValueChange={(v) => setPrefs({ reduceMotion: v })}
        />
        <ToggleRow
          label="Haptics"
          caption="Subtle vibration on actions (mobile)"
          value={prefs.haptics}
          onValueChange={(v) => setPrefs({ haptics: v })}
        />
      </Section>

      <Section label="Privacy">
        <T variant="body" muted>
          Your journal entries and readings stay on this device. Nothing is uploaded,
          analyzed, or shared in this app.
        </T>
      </Section>

      <T variant="caption" muted style={{ marginTop: 20, textAlign: "center", opacity: 0.7 }}>
        Sufi Contemplative Tarot — for reflection, not prediction.
      </T>
    </Screen>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  const { palette } = useApp();
  return (
    <View style={[styles.section, { borderColor: palette.border }]}>
      <T variant="label" style={{ color: palette.gold, letterSpacing: 1, textTransform: "uppercase" }}>
        {label}
      </T>
      {children}
    </View>
  );
}

function Segment({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { palette } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.segmentBtn,
        { backgroundColor: active ? palette.accent : palette.surfaceAlt, borderColor: palette.border },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <T variant="body" style={{ color: active ? "#F6F2EA" : palette.text }}>
        {label}
      </T>
    </Pressable>
  );
}

function ToggleRow({
  label,
  caption,
  value,
  onValueChange,
}: {
  label: string;
  caption: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  const { palette } = useApp();
  return (
    <View style={styles.toggleRow}>
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="body" style={{ color: palette.text }}>
          {label}
        </T>
        <T variant="caption" muted>
          {caption}
        </T>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.border, true: palette.teal }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    paddingVertical: 18,
    gap: 10,
  },
  segment: {
    flexDirection: "row",
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
});
