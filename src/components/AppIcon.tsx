import { StyleSheet, View } from "react-native";
import { useApp } from "@/context/app";

export type IconName = "home" | "meditation" | "guidance" | "tarot" | "library" | "journal" | "settings" | "close" | "back" | "spark" | "expand";

type Props = { name: IconName; size?: number; color?: string };

/** Small code-native icons: crisp on web, Android, and iOS without font glyph drift. */
export function AppIcon({ name, size = 22, color }: Props) {
  const { palette } = useApp();
  const ink = color ?? palette.gold;
  const s = size;
  const common = { borderColor: ink };

  if (name === "close" || name === "back") {
    return (
      <View style={[styles.icon, { width: s, height: s }]}>
        <View style={[styles.diagonal, common, { width: s * 0.72, left: s * 0.14, top: s * 0.46, transform: [{ rotate: name === "close" ? "45deg" : "-45deg" }] }]} />
        <View style={[styles.diagonal, common, { width: s * 0.72, left: s * 0.14, top: s * 0.46, transform: [{ rotate: name === "close" ? "-45deg" : "45deg" }] }]} />
        {name === "back" ? <View style={[styles.diagonal, common, { width: s * 0.42, left: s * 0.14, top: s * 0.46, transform: [{ rotate: "45deg" }] }]} /> : null}
      </View>
    );
  }

  if (name === "expand") {
    return (
      <View style={[styles.icon, { width: s, height: s }]}>
        <View style={[styles.diagonal, common, { width: s * 0.62, left: s * 0.19, top: s * 0.46 }]} />
        <View style={[styles.diagonal, common, { width: s * 0.62, left: s * 0.19, top: s * 0.46, transform: [{ rotate: "90deg" }] }]} />
      </View>
    );
  }

  if (name === "home") {
    return <View style={[styles.icon, { width: s, height: s }]}><View style={[styles.roof, common, { width: s * 0.52, height: s * 0.52, left: s * 0.24, top: s * 0.1 }]} /><View style={[styles.homeBody, common, { width: s * 0.56, height: s * 0.42, left: s * 0.22, top: s * 0.44 }]} /></View>;
  }

  if (name === "meditation") {
    return <View style={[styles.icon, styles.center, { width: s, height: s }]}><View style={[styles.circle, common, { width: s * 0.7, height: s * 0.7 }]} /><View style={[styles.dot, { width: s * 0.18, height: s * 0.18, backgroundColor: ink }]} /></View>;
  }

  if (name === "guidance") {
    return <View style={[styles.icon, { width: s, height: s }]}><View style={[styles.book, common, { width: s * 0.34, height: s * 0.64, left: s * 0.12, top: s * 0.18 }]} /><View style={[styles.book, common, { width: s * 0.34, height: s * 0.64, right: s * 0.12, top: s * 0.18 }]} /><View style={[styles.bookLine, common, { left: s * 0.48, top: s * 0.18, height: s * 0.64 }]} /></View>;
  }

  if (name === "tarot") {
    return <View style={[styles.icon, styles.center, { width: s, height: s }]}><View style={[styles.card, common, { width: s * 0.58, height: s * 0.74 }]}><View style={[styles.star, common, { width: s * 0.2, height: s * 0.2, left: s * 0.19, top: s * 0.26 }]} /></View></View>;
  }

  if (name === "library") {
    return <View style={[styles.icon, { width: s, height: s }]}>{[0, 1, 2].map((i) => <View key={i} style={[styles.card, common, { width: s * 0.42, height: s * 0.62, left: s * (0.1 + i * 0.18), top: s * (0.16 + (i % 2) * 0.05) }]} />)}</View>;
  }

  if (name === "journal") {
    return <View style={[styles.icon, { width: s, height: s }]}><View style={[styles.notebook, common, { width: s * 0.66, height: s * 0.72, left: s * 0.2, top: s * 0.14 }]} />{[0, 1, 2].map((i) => <View key={i} style={[styles.line, { backgroundColor: ink, width: s * 0.38, left: s * 0.32, top: s * (0.32 + i * 0.14) }]} />)}</View>;
  }

  if (name === "settings") {
    return <View style={[styles.icon, styles.center, { width: s, height: s }]}><View style={[styles.circle, common, { width: s * 0.58, height: s * 0.58 }]} /><View style={[styles.dot, { width: s * 0.18, height: s * 0.18, backgroundColor: ink }]} />{[0, 1, 2, 3].map((i) => <View key={i} style={[styles.tick, { backgroundColor: ink, transform: [{ rotate: `${i * 90}deg` }] }]} />)}</View>;
  }

  return <View style={[styles.icon, styles.center, { width: s, height: s }]}><View style={[styles.star, common, { width: s * 0.42, height: s * 0.42 }]} /><View style={[styles.diagonal, common, { width: s * 0.76, left: s * 0.12, top: s * 0.46, transform: [{ rotate: "90deg" }] }]} /></View>;
}

const styles = StyleSheet.create({
  icon: { position: "relative" },
  center: { alignItems: "center", justifyContent: "center" },
  diagonal: { position: "absolute", borderTopWidth: 2 },
  roof: { position: "absolute", borderLeftWidth: 2, borderTopWidth: 2, transform: [{ rotate: "45deg" }] },
  homeBody: { position: "absolute", borderWidth: 2, borderTopWidth: 0 },
  circle: { borderWidth: 2, borderRadius: 999 },
  dot: { position: "absolute", borderRadius: 999 },
  book: { position: "absolute", borderWidth: 1.5, borderRadius: 2 },
  bookLine: { position: "absolute", borderLeftWidth: 1.5 },
  card: { position: "absolute", borderWidth: 1.5, borderRadius: 3 },
  star: { position: "absolute", borderWidth: 1.5, transform: [{ rotate: "45deg" }] },
  notebook: { position: "absolute", borderWidth: 1.5, borderRadius: 2 },
  line: { position: "absolute", height: 1 },
  tick: { position: "absolute", width: 2, height: 6, top: 1, left: "50%" },
});
