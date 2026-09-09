import { useEffect, useRef, type ReactNode } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/app";
import { AppNav } from "./AppNav";

type Props = { children: ReactNode; scroll?: boolean; center?: boolean };

export function Screen({ children, scroll = true, center = false }: Props) {
  const { palette, prefs } = useApp();
  const ornamentOpacity = useRef(new Animated.Value(0.42)).current;
  useEffect(() => {
    if (prefs.reduceMotion) {
      ornamentOpacity.stopAnimation();
      ornamentOpacity.setValue(0.72);
      return;
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(ornamentOpacity, { toValue: 0.9, duration: 7000, useNativeDriver: false }),
      Animated.timing(ornamentOpacity, { toValue: 0.55, duration: 7000, useNativeDriver: false }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [ornamentOpacity, prefs.reduceMotion]);

  const content = center ? <View style={styles.center}>{children}</View> : children;
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.background }]} edges={["top", "left", "right", "bottom"]}>
      <View style={[styles.frame, { borderColor: palette.border }]}>
        <View style={styles.ornaments}>
          {CORNERS.map((corner) => (
            <Animated.View key={corner.key} style={[styles.corner, corner.position, { borderColor: palette.gold, opacity: ornamentOpacity }]}>
              <View style={[styles.cornerInner, { borderColor: palette.teal }]} />
            </Animated.View>
          ))}
        </View>
        {scroll ? (
          <ScrollView style={styles.scroll} contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.content}>{content}</View>
          </ScrollView>
        ) : (
          <View style={[styles.body, styles.fill]}><View style={[styles.content, styles.fill]}>{content}</View></View>
        )}
        <AppNav />
      </View>
    </SafeAreaView>
  );
}

export const AppShell = Screen;

const CORNERS = [
  { key: "top-left", position: { top: 14, left: 14 } },
  { key: "top-right", position: { top: 14, right: 14, transform: [{ rotate: "90deg" }] } },
  { key: "bottom-left", position: { bottom: 76, left: 14, transform: [{ rotate: "-90deg" }] } },
  { key: "bottom-right", position: { bottom: 76, right: 14, transform: [{ rotate: "180deg" }] } },
] as const;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  frame: { flex: 1, position: "relative", margin: 8, borderWidth: 1, borderRadius: 28, overflow: "hidden" },
  ornaments: { ...StyleSheet.absoluteFill, zIndex: 0 },
  corner: { position: "absolute", width: 64, height: 64, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerInner: { width: 18, height: 18, marginTop: 16, marginLeft: 16, borderWidth: 1, transform: [{ rotate: "45deg" }] },
  scroll: { flex: 1, zIndex: 1 },
  body: { paddingHorizontal: 24, paddingVertical: 22 },
  content: { width: "100%", maxWidth: 960, alignSelf: "center" },
  fill: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
