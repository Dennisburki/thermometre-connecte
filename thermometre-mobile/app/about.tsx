import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";

export default function AboutScreen() {
  return (
    <Screen>
      <Text style={styles.title}>À propos</Text>
      <Card>
        <Text style={styles.name}>Thermomètre</Text>
        <Text style={styles.text}>Application mobile en cours de développement.</Text>
        <Text style={styles.text}>Expo + React Native + TypeScript.</Text>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: "800", marginBottom: 20 },
  name: { color: colors.text, fontSize: 18, fontWeight: "700", marginBottom: 8 },
  text: { color: colors.muted, lineHeight: 21, marginTop: 4 }
});
