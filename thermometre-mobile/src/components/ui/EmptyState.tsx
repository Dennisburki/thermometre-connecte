import {StyleSheet, Text, View} from "react-native";
import {colors} from "@/constants/colors";
import {useHistory} from "@/hooks/useHistory";
import {LineChart} from "react-native-gifted-charts";
import {MeasurementHistoryResponse} from "@/types/measurement";

type ChartValue = {
  value: number;
  label: string;
};
type Props = {title: string; description: string, values: ChartValue[], readingCategory: string, loading: boolean};

export function EmptyState({title, description, values, readingCategory, loading}: Props)
{

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{readingCategory}</Text>
      {values.length > 0 ?
        <LineChart
          areaChart
          curved
          xAxisLabelTextStyle={{color: 'gray', fontSize: 12}}
          yAxisTextStyle={{color: 'gray', fontSize: 12}}
          yAxisTextNumberOfLines={1}
          data={values}
          startFillColor="rgb(46, 241, 255)"
          startOpacity={0.5}
          endOpacity={0.3}
          color={'#17bfd5'}
          showValuesAsDataPointsText
          thickness={1.5}
          formatYLabel={(label) => {return parseInt(label, 10).toString();}}
          textShiftY={-2}
          textShiftX={-5}
          textFontSize={13}
          textColor1="gray"
        />
        : loading ?
          <Text>Chargement...</Text>
          :

          <>
            <View style={styles.symbol}><Text style={styles.symbolText}>⌁</Text></View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </>

      }

    </View>
  );
}
const styles = StyleSheet.create({
  container: {alignItems: "center", paddingVertical: 18, paddingHorizontal: 0, overflow: "hidden", },
  symbol: {width: 48, height: 48, borderRadius: 24, backgroundColor: "#EDF2FF", alignItems: "center", justifyContent: "center", marginBottom: 14},
  symbolText: {fontSize: 26, color: colors.primary},
  title: {color: colors.text, fontWeight: "700", fontSize: 16, textAlign: "center"},
  description: {color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 8}
});
