import {Pressable, StyleSheet, Text, View} from "react-native";
import {colors} from "@/constants/colors";

type Props = {label: string; onPress?: () => void, svg?: any};

export function Button({label, onPress, svg}: Props)
{
  return (
    <Pressable onPress={onPress} style={({pressed}) => [ styles.button, pressed && styles.pressed ]}>
      <View style={{justifyContent: svg ? "space-between" : "center", flexDirection: "row", alignItems: "center"}}>
        {svg && <Text>{svg}</Text>}
        <Text style={styles.text}>{label}</Text>
      </View>

    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 12, alignItems: "center", justifyContent: "center"},
  pressed: {opacity: 0.8},
  text: {color: "#FFFFFF", fontWeight: "700", fontSize: 15}
});
