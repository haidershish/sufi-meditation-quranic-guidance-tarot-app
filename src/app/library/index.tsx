import { useMemo, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { T } from "@/components/T";
import { CardFace } from "@/components/CardFace";
import { useApp } from "@/context/app";
import { allCards, SUITS } from "@/content/deck";
import { selection } from "@/platform/haptics";
import { appPath } from "@/platform/paths";

type Filter = "all" | "core" | (typeof SUITS)[number];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "core", label: "Core Arcana" },
  ...SUITS.map((s) => ({ key: s as Filter, label: s })),
];

export default function Library() {
  const { palette, prefs } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCards.filter((c) => {
      if (filter === "core" && c.arcana !== "Core Arcana") return false;
      if (filter !== "all" && filter !== "core" && c.suit !== filter) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.transliteration.toLowerCase().includes(q) ||
        c.guide.theme.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.background }]} edges={["top", "left", "right"]}>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search title, subtitle, or theme"
          placeholderTextColor={palette.textSubtle}
          style={[styles.search, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]}
        />
        <View style={styles.chips}>
          {FILTERS.map((f) => {
            const active = f.key === filter;
            return (
              <Pressable
                key={f.key}
                onPress={() => {
                  setFilter(f.key);
                  selection(prefs.haptics);
                }}
                style={[
                  styles.chip,
                  { backgroundColor: active ? palette.accent : palette.surfaceAlt, borderColor: palette.border },
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <T variant="label" style={{ color: active ? "#F6F2EA" : palette.text }}>
                  {f.label}
                </T>
              </Pressable>
            );
          })}
        </View>
        <T variant="caption" muted>
          {results.length} card{results.length === 1 ? "" : "s"}
        </T>
      </View>

      <FlatList
        data={results}
        keyExtractor={(c) => c.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(appPath(`/library/${item.id}`, Platform.OS) as never)}
            style={{ flex: 1, alignItems: "center", gap: 6 }}
            accessibilityRole="button"
            accessibilityLabel={item.title}
          >
            <CardFace card={item} width={104} height={168} />
            <T variant="caption" muted numberOfLines={1}>
              {item.title}
            </T>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  searchWrap: { paddingHorizontal: 20, paddingTop: 12, gap: 12 },
  search: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
  grid: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8, gap: 16 },
  row: { gap: 10, marginBottom: 16 },
});
