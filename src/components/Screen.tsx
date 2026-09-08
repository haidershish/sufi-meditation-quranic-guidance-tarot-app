import { useEffect, useRef, type ReactNode } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/app";

type Props = {
  children: ReactNode;
  scroll?: boolean;
  center?: boolean;
};

export function Screen({ children, scroll = true, center = false }: Props) {
  const { palette, prefs } = useApp();
  const ornamentOpacity = useRef(new Animated.Value(0.42)).current;

  useEffect(() => {
    if (prefs.reduceMotion) {
      ornamentOpacity.stopAnimation();
      ornamentOpacity.setValue(0.42);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(ornamentOpacity, { toValue: 0.68, duration: 7000, useNativeDriver: false }),
        Animated.timing(ornamentOpacity, { toValue: 0.42, duration: 7000, useNativeDriver: false }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [ornamentOpacity, prefs.reduceMotion]);

  const content = center ? (
    <View style={styles.center}>{children}</View>
  ) : (
    children
  );
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.background }]} edges={["top", "left", "right"]}>
      <View style={styles.frame}>
        <View pointerEvents="none" style={styles.ornaments}>
          {CORNERS.map((corner) => (
            <Animated.View
              key={corner.key}
              style={[styles.corner, corner.position, { borderColor: palette.gold, opacity: ornamentOpacity }]}
            >
              <View style={[styles.cornerInner, { borderColor: palette.teal }]} />
            </Animated.View>
          ))}
        </View>
        {scroll ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>{content}</View>
          </ScrollView>
        ) : (
          <View style={[styles.body, { flex: 1 }]}><View style={styles.content}>{content}</View></View>
        )}
      </View>
    </SafeAreaView>
  );
}

const CORNERS = [
  { key: "top-left", position: { top: 8, left: 8 } },
  { key: "top-right", position: { top: 8, right: 8, transform: [{ rotate: "90deg" }] } },
  { key: "bottom-left", position: { bottom: 8, left: 8, transform: [{ rotate: "-90deg" }] } },
  { key: "bottom-right", position: { bottom: 8, right: 8, transform: [{ rotate: "180deg" }] } },
] as const;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  frame: { flex: 1, position: "relative" },
  ornaments: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 },
  corner: {
    position: "absolute",
    width: 26,
    height: 26,
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  cornerInner: {
    width: 8,
    height: 8,
    marginTop: 8,
    marginLeft: 8,
    borderWidth: 1,
    transform: [{ rotate: "45deg" }],
  },
  body: { paddingHorizontal: 20, paddingVertical: 16 },
  content: { width: "100%", maxWidth: 960, alignSelf: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
