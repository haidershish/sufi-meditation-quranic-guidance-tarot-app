import { View } from "react-native";
import { Screen } from "@/components/Screen";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { frontMatter } from "@/content/deck";

export default function About() {
  const { palette } = useApp();
  return (
    <Screen scroll>
      <T variant="title" bold style={{ color: palette.accent }}>
        {frontMatter.title}
      </T>
      <T variant="body" muted style={{ marginTop: 4 }}>
        {frontMatter.subtitle}
      </T>

      {frontMatter.sections.map((s) => (
        <View key={s.title} style={{ marginTop: 22, gap: 6 }}>
          <T variant="heading" bold style={{ color: palette.text }}>
            {s.title}
          </T>
          <T variant="body" style={{ color: palette.textMuted }}>
            {s.body}
          </T>
        </View>
      ))}

      {frontMatter.closingNote ? (
        <T variant="body" bold style={{ color: palette.text, marginTop: 24 }}>
          {frontMatter.closingNote}
        </T>
      ) : null}

      <T variant="caption" muted style={{ marginTop: 20, textAlign: "center", opacity: 0.8 }}>
        {frontMatter.footer}
      </T>
    </Screen>
  );
}
