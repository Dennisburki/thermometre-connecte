import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";

export default function DevicesScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text style={styles.title}>Mes appareils</Text>
          <Text style={styles.subtitle}>Tes thermomètres connectés.</Text>
        </View>
        <Link href="/devices/add" asChild>
          <Button label="+ Ajouter" />
        </Link>
      </View>
      <Card>
        {/* <EmptyState
          title="Aucun appareil configuré"
          description="L’ajout et l’association des thermomètres seront branchés ici."
        /> */}
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 },
  heading: { flex: 1 },
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 6 }
});
