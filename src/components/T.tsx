import type { ReactNode } from "react";
import { Text, type TextProps, type TextStyle } from "react-native";
import { useApp } from "@/context/app";

type Variant = "title" | "heading" | "body" | "caption" | "label";

const SIZE: Record<Variant, number> = {
  title: 30,
  heading: 20,
  body: 16,
  caption: 13,
  label: 12,
};

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  muted?: boolean;
  bold?: boolean;
  children: ReactNode;
};

export function T({ variant = "body", color, muted, bold, style, children, ...rest }: Props) {
  const { palette, textScale } = useApp();
  const resolved: TextStyle = {
    fontSize: SIZE[variant] * textScale,
    lineHeight: SIZE[variant] * textScale * 1.45,
    fontWeight: bold ? "600" : "400",
    color: color ?? (muted ? palette.textMuted : palette.text),
  };
  return (
    <Text style={[resolved, style]} {...rest}>
      {children}
    </Text>
  );
}
