import { Modal, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useApp } from "@/context/app";
import type { DeckCard } from "@/domain/types";
import { cardArt } from "@/content/art";
import { T } from "./T";
import { AppIcon } from "./AppIcon";

export function CardZoom({
  card,
  visible,
  onClose,
  concealIdentity = false,
}: {
  card: DeckCard;
  visible: boolean;
  onClose: () => void;
  concealIdentity?: boolean;
}) {
  const { palette } = useApp();
  const { width, height } = useWindowDimensions();
  const source = cardArt[card.id];
  const imageWidth = Math.min(width - 32, (height - 130) / 1.62, 720);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: "rgba(5, 8, 20, 0.96)" }]}>
        <Pressable style={styles.close} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close image">
          <AppIcon name="close" size={22} color="#F6F2EA" />
        </Pressable>
        {source ? (
          <Image
            source={source}
            style={{ width: imageWidth, height: imageWidth * 1.62, borderRadius: 16 }}
            contentFit="contain"
            accessibilityLabel={concealIdentity ? "Card artwork for quiet observation" : `${card.title} artwork`}
          />
        ) : (
          <View style={[styles.missing, { borderColor: palette.gold }]}>
            <T color="#F6F2EA">Artwork forthcoming</T>
          </View>
        )}
        <T variant="caption" color="#D8D1C0" style={{ textAlign: "center", maxWidth: 560 }}>
          {concealIdentity
            ? "Observe without naming or interpreting yet. Notice color, distance, light, posture, and what first draws your attention."
            : "Tap Close when you are ready to return to the reading."}
        </T>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 14 },
  close: { position: "absolute", right: 22, top: 22, padding: 12, zIndex: 2 },
  missing: { width: 250, height: 405, borderWidth: 1, borderRadius: 16, alignItems: "center", justifyContent: "center" },
});
