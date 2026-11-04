import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";

type Props = PropsWithChildren<{ scroll?: boolean }>;

export function Screen({ children, scroll = true }: Props) {
  if (!scroll) return <View style={styles.fixed}>{children}</View>;
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36, flexGrow: 1 },
  fixed: { flex: 1, padding: 20, backgroundColor: colors.background }
});
