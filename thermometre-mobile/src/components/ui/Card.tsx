import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

type Props = PropsWithChildren<{ style?: ViewStyle; onPress?: () => void }>;

export function Card({ children, style, onPress }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.card, style]}>
      {children}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    shadowColor: "#182544",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  }
});
