import {Link} from "expo-router";
import {StyleSheet, Text, View, Pressable} from "react-native";
import {Screen} from "@/components/layout/Screen";
import {Card} from "@/components/ui/Card";
import {colors} from "@/constants/colors";
import {useLatestMeasurement} from "@/hooks/useLatestMeasurement";
import {Button} from "@/components/ui/Button";
import ReloadSVG from "@/assets/svg/reloadSVG";
import ChartSVG from "@/assets/svg/chartSVG";
import DeviceSVG from "@/assets/svg/deviceSVG";

export default function HomeScreen()
{

  const {measurement, refresh} = useLatestMeasurement();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>VUE D’ENSEMBLE</Text>
        <Button
          onPress={refresh}
          label="Rafraîchir"
          svg={ReloadSVG("25", "25", "white")}
        />
      </View>
      <Text style={styles.title}>Mon thermomètre</Text>
      <Text style={styles.subtitle}>Le tableau de bord de ton appareil.</Text>

      <Card>
        <Text style={styles.cardLabel}>TEMPÉRATURE ACTUELLE</Text>
        <Text style={styles.temperature}>{measurement?.data ? measurement?.data.temperature : "--.-"}°C</Text>
        <Text style={styles.muted}>Rafraîchis pour voir la dernière mesure.</Text>
      </Card>

      <View style={styles.grid}>
        <Link href="/(tabs)/history" asChild>
          <Card style={styles.smallCard}>
            <Text style={styles.icon}>{ChartSVG("25", "25", "blue")}</Text>
            <Text style={styles.cardTitle}>Historique</Text>
            <Text style={styles.muted}>Consulter les mesures</Text>
          </Card>
        </Link>
        <Link href="/(tabs)/devices" asChild>
          <Card style={styles.smallCard}>
            <Text style={styles.icon}>{DeviceSVG("25", "25", "blue")}</Text>
            <Text style={styles.cardTitle}>Appareils</Text>
            <Text style={styles.muted}>Gérer les thermomètres</Text>
          </Card>
        </Link>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  eyebrow: {color: colors.primary, fontSize: 11, fontWeight: "800", letterSpacing: 1.5},
  title: {color: colors.text, fontSize: 28, fontWeight: "800", marginTop: 8},
  subtitle: {color: colors.muted, fontSize: 14, marginTop: 6, marginBottom: 22},
  cardLabel: {color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1},
  temperature: {color: colors.text, fontSize: 52, fontWeight: "800", marginVertical: 8},
  muted: {color: colors.muted, fontSize: 13, lineHeight: 19},
  grid: {flexDirection: "row", gap: 12, marginTop: 12},
  smallCard: {flex: 1, minHeight: 135},
  icon: {fontSize: 24, color: colors.primary, marginBottom: 12},
  cardTitle: {fontSize: 15, color: colors.text, fontWeight: "700", marginBottom: 5},
  footer: {color: colors.muted, fontSize: 12, marginTop: 24, lineHeight: 18},
  header: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"}
});
