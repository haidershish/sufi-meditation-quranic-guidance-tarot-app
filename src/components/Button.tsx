import { Pressable, StyleSheet, View } from "react-native";
import type { ReactNode } from "react";
import { useApp } from "@/context/app";
import { T } from "./T";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: ReactNode;
  disabled?: boolean;
};

export function Button({ label, onPress, variant = "primary", icon, disabled }: Props) {
  const { palette } = useApp();
  const bg =
    variant === "primary"
      ? palette.accent
      : variant === "danger"
        ? palette.danger
        : variant === "secondary"
          ? palette.surfaceAlt
          : "transparent";
  const fg =
    variant === "primary" || variant === "danger"
      ? "#F6F2EA"
      : variant === "ghost"
        ? palette.accent
        : palette.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: bg,
          borderColor: variant === "ghost" ? palette.border : "transparent",
          borderWidth: variant === "ghost" ? 1 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <T style={{ color: fg }} bold>
        {label}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    minHeight: 50,
  },
  icon: { marginRight: 2 },
});
