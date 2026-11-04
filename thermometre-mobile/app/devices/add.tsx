import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors } from "@/constants/colors";

export default function AddDeviceScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Ajouter un appareil</Text>
      <Card>
        {/* <EmptyState
          title="Association à implémenter"
          description="Cet écran accueillera la découverte ou la configuration d’un thermomètre."
        /> */}
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 24, fontWeight: "800", marginBottom: 20 } });
