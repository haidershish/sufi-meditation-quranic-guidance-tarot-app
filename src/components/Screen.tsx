import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/app";

type Props = {
  children: ReactNode;
  scroll?: boolean;
  center?: boolean;
};

export function Screen({ children, scroll = true, center = false }: Props) {
  const { palette } = useApp();
  const content = center ? (
    <View style={styles.center}>{children}</View>
  ) : (
    children
  );
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.background }]} edges={["top", "left", "right"]}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={[styles.body, { flex: 1 }]}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  body: { paddingHorizontal: 20, paddingVertical: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
