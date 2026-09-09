import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { useApp } from "@/context/app";
import type { DeckCard } from "@/domain/types";
import { cardArt } from "@/content/art";
import { AppIcon } from "./AppIcon";

// Designed placeholder card-back: a quiet geometric motif (eight-point star /
// echo field) rendered in code — no image needed for missing art.
export function CardBack({ width = 120, height = 200 }: { width?: number; height?: number }) {
  const { palette } = useApp();
  return (
    <View
      style={[
        styles.back,
        {
          width,
          height,
          backgroundColor: palette.cardBack,
          borderColor: palette.gold,
        },
      ]}
    >
      <View style={[styles.ringOuter, { borderColor: palette.gold }]}>
        <View style={[styles.ringInner, { borderColor: palette.cardBackPattern }]}>
          <AppIcon name="spark" size={Math.max(24, height * 0.16)} color={palette.gold} />
        </View>
      </View>
    </View>
  );
}

export function CardFace({ card, width = 120, height = 200 }: { card: DeckCard; width?: number; height?: number }) {
  const { palette } = useApp();
  const source = cardArt[card.id];
  const hasArt = card.artwork.status === "approved" && source != null;

  if (!hasArt) {
    return (
      <View style={[styles.placeholder, { width, height, backgroundColor: palette.surfaceAlt, borderColor: palette.border }]}>
        <Text style={{ color: palette.textSubtle, fontSize: 13, textAlign: "center", padding: 8 }}>
          {card.title}
        </Text>
        <Text style={{ color: palette.textSubtle, fontSize: 11, textAlign: "center", opacity: 0.7 }}>
          artwork forthcoming
        </Text>
      </View>
    );
  }

  return <CardImage source={source} width={width} height={height} />;
}

function CardImage({ source, width, height }: { source: number; width: number; height: number }) {
  return (
    <Image
      source={source}
      style={{ width, height, borderRadius: 12 }}
      contentFit="cover"
      transition={120}
    />
  );
}

const styles = StyleSheet.create({
  back: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ringOuter: {
    width: "62%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    width: "58%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
