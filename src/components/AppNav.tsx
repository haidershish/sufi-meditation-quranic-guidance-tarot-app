import { Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { router, usePathname } from "expo-router";
import { appPath } from "@/platform/paths";
import { useApp } from "@/context/app";
import { AppIcon, type IconName } from "./AppIcon";
import { T } from "./T";

const ITEMS: { path: string; label: string; icon: IconName }[] = [
  { path: "/", label: "Home", icon: "home" },
  { path: "/meditations", label: "Meditate", icon: "meditation" },
  { path: "/guidance", label: "Guidance", icon: "guidance" },
  { path: "/draw", label: "Tarot", icon: "tarot" },
  { path: "/library", label: "Library", icon: "library" },
  { path: "/journal", label: "Journal", icon: "journal" },
  { path: "/settings", label: "Settings", icon: "settings" },
];

export function AppNav() {
  const { palette } = useApp();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const compact = width < 680;
  return (
    <View style={[styles.nav, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.items} keyboardShouldPersistTaps="handled">
        {ITEMS.map((item) => {
          const active = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return (
            <Pressable
              key={item.path}
              onPress={() => { if (!active) router.replace(appPath(item.path, Platform.OS) as never); }}
              style={({ pressed }) => [styles.item, compact && styles.itemCompact, { opacity: pressed ? 0.7 : 1, backgroundColor: active ? palette.accentSoft : "transparent" }]}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
            >
              <AppIcon name={item.icon} size={compact ? 18 : 20} color={active ? palette.accent : palette.gold} />
              <T variant="label" bold={active} style={{ color: active ? palette.accent : palette.textMuted }}>{item.label}</T>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { borderTopWidth: 1, minHeight: 64 },
  items: { flexGrow: 1, justifyContent: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 8 },
  item: { minWidth: 78, alignItems: "center", justifyContent: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12 },
  itemCompact: { minWidth: 68, paddingHorizontal: 5 },
});
