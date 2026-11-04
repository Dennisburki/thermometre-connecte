import {Link, useRouter} from "expo-router";
import {StyleSheet, Text, View} from "react-native";
import {Screen} from "@/components/layout/Screen";
import {Card} from "@/components/ui/Card";
import {EmptyState} from "@/components/ui/EmptyState";
import {colors} from "@/constants/colors";
import {useHistory} from "@/hooks/useHistory";
import {Button} from "@/components/ui/Button";
import ReloadSVG from "@/assets/svg/reloadSVG";
import {useState} from "react";
import {ChartValue} from "@/types/measurement";

type DisplaySetting = "today" | "threeDays" | "sevenDays";

export default function HistoryScreen()
{
  const router = useRouter();
  const {history, refresh, loading} = useHistory();

  const [ displaySetting, setDisplaySetting ] = useState<DisplaySetting>("today");

  const getDate = (daysAgo: number = 0) =>
  {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[ 0 ];
  };

  const today = getDate();
  const threeDaysAgo = getDate(2);
  const sevenDaysAgo = getDate(6);

  const getChartData = (category: "temperature" | "humidity"): ChartValue[] =>
  {
    return history?.data
      ?.filter((e) =>
      {
        const date = new Date(e.date).toISOString().split("T")[ 0 ];

        if (displaySetting === "today") return date === today;
        if (displaySetting === "threeDays") return date >= threeDaysAgo && date <= today;
        if (displaySetting === "sevenDays") return date >= sevenDaysAgo && date <= today;

        return false;
      })
      .map((e) =>
      {
        const hour = e.slotKey?.split("-")[ 3 ] ?? "--";

        return {
          value: Number(e[ category ].toFixed(category === "temperature" ? 1 : 0)),
          label: "",
          date: e.date,
          hour,
          labelComponent: () => (
            <View style={{alignItems: "center"}}>
              <Text style={{color: "gray", fontSize: 12}}>{hour}h</Text>
              <Text style={{fontSize: 9, color: colors.muted}}>
                {e.date.slice(8, 10)}/{e.date.slice(5, 7)}
              </Text>
            </View>
          ),
        };
      })
      .sort((a, b) =>
        `${a.date} ${a.hour}`.localeCompare(`${b.date} ${b.hour}`)
      )
      .map(({date, hour, ...rest}) => rest) ?? [];
  };
  const tempData = getChartData("temperature");
  const humidityData = getChartData("humidity");

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Historique</Text>
        <Button
          onPress={refresh}
          label="Rafraîchir"
          svg={ReloadSVG("25", "25", "white")}
        />
      </View>
      <Text style={styles.subtitle}>Toutes les mesures enregistrées.</Text>
      <View style={styles.periodSelector}>
        {([
          {label: "Aujourd'hui", value: "today"},
          {label: "3 jours", value: "threeDays"},
          {label: "7 jours", value: "sevenDays"},
        ] as {label: string; value: DisplaySetting}[]).map((option) => (
          <Text
            key={option.value}
            onPress={() => setDisplaySetting(option.value)}
            style={[
              styles.periodOption,
              displaySetting === option.value && styles.periodOptionActive,
            ]}
          >
            {option.label}
          </Text>
        ))}
      </View>
      <View style={{gap: 10}}>
        <Card>
          <EmptyState
            title="Aucune mesure affichée"
            readingCategory="Température"
            description="Les mesures s'afficheront une fois les relevés effectués."
            values={tempData}
            loading={loading}
          />

        </Card>
        <Card>
          <EmptyState
            title="Aucune mesure affichée"
            readingCategory="Humidité"
            description="Les mesures s'afficheront une fois les relevés effectués."
            values={humidityData}
            loading={loading}
          />
        </Card>
      </View>
      <View style={styles.actions}>
        <Link href="/measurements/demo-measurement" style={styles.link}>Ouvrir un exemple de détail →</Link>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: {color: colors.text, fontSize: 26, fontWeight: "800"},
  subtitle: {color: colors.muted, fontSize: 14, marginTop: 6, marginBottom: 20},
  actions: {marginTop: 16},
  link: {color: colors.primary, fontWeight: "700"},
  header: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
  periodSelector: {flexDirection: "row", backgroundColor: "#EDF2FF", borderRadius: 10, padding: 4, marginBottom: 16, gap: 4, },
  periodOption: {flex: 1, textAlign: "center", paddingVertical: 9, borderRadius: 8, color: colors.muted, fontSize: 13, fontWeight: "600", },
  periodOptionActive: {backgroundColor: colors.primary, color: "white", },
});
