import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";

export default function MeasurementDetailsScreen() {
  const { measurementId } = useLocalSearchParams<{ measurementId: string }>();
  return (
    <Screen>
      <Text style={styles.title}>Détail de la mesure</Text>
      <Card>
        <Text style={styles.label}>Identifiant de route</Text>
        <Text style={styles.value}>{measurementId}</Text>
        <Text style={styles.note}>Remplace ce contenu par la température, l’humidité, la pression et la date.</Text>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: "800", marginBottom: 20 },
  label: { color: colors.muted, fontSize: 12, marginBottom: 6 },
  value: { color: colors.text, fontSize: 18, fontWeight: "700" },
  note: { color: colors.muted, marginTop: 12, lineHeight: 20 }
});
