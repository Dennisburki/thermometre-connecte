import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Page introuvable" }} />
      <Text style={styles.title}>Cette page n’existe pas.</Text>
      <Link href="/" style={styles.link}>Retour à l’accueil</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: 16 },
  link: { color: colors.primary, fontWeight: "600" }
});
