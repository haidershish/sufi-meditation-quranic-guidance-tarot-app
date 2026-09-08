import { useCallback, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { T } from "@/components/T";
import { useApp } from "@/context/app";
import { storage } from "@/storage/storage";
import { getCard } from "@/content/deck";
import { SPREADS } from "@/domain/spreads";
import type { ReadingSession } from "@/domain/types";
import { appPath } from "@/platform/paths";

export default function Journal() {
  const { palette } = useApp();
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      storage.listSessions().then((list) => {
        setSessions(list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)));
        setLoaded(true);
      });
    }, []),
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.background }]} edges={["top", "left", "right"]}>
      {loaded && sessions.length === 0 ? (
        <View style={styles.empty}>
          <T variant="body" muted>
            No saved readings yet.
          </T>
          <T variant="caption" muted>
            Draw a card to begin a reflection.
          </T>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(s) => s.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const spread = SPREADS[item.spreadId];
            const titles = item.cards.map((c) => getCard(c.cardId).title).join(" · ");
            return (
              <Pressable
                onPress={() => router.push(appPath(`/journal/${item.id}`, Platform.OS) as never)}
                style={({ pressed }) => [
                  styles.item,
                  { backgroundColor: palette.surface, borderColor: palette.border, opacity: pressed ? 0.85 : 1 },
                ]}
                accessibilityRole="button"
              >
                <T variant="heading" bold style={{ color: palette.text }}>
                  {spread.name}
                </T>
                <T variant="caption" muted>
                  {new Date(item.createdAt).toLocaleString()}
                </T>
                <T variant="body" style={{ color: palette.text }} numberOfLines={2}>
                  {titles}
                </T>
                {item.journalText ? (
                  <T variant="caption" style={{ color: palette.teal }}>
                    ✎ journaled
                  </T>
                ) : null}
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  list: { padding: 20, gap: 12 },
  item: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 4 },
});
