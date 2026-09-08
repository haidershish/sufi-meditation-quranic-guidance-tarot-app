import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

function canHaptic(enabled: boolean): boolean {
  return enabled && Platform.OS !== "web";
}

export function lightTap(enabled: boolean): void {
  if (!canHaptic(enabled)) return;
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    /* no-op */
  }
}

export function selection(enabled: boolean): void {
  if (!canHaptic(enabled)) return;
  try {
    Haptics.selectionAsync();
  } catch {
    /* no-op */
  }
}

export function success(enabled: boolean): void {
  if (!canHaptic(enabled)) return;
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    /* no-op */
  }
}
