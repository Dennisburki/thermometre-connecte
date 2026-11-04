import {Tabs} from "expo-router";
import {colors} from "@/constants/colors";
import ReloadSVG from "@/assets/svg/reloadSVG";
import HomeSVG from "@/assets/svg/homeSVG";
import ChartSVG from "@/assets/svg/chartSVG";
import SettingsSVG from "@/assets/svg/settingsSVG";
import DeviceSVG from "@/assets/svg/deviceSVG";

export default function TabLayout()
{
  return (
    <Tabs
      screenOptions={{
        headerStyle: {backgroundColor: colors.background},
        headerTintColor: colors.text,
        headerTitleStyle: {fontWeight: "700"},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {backgroundColor: colors.surface, borderTopColor: colors.border},
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Accueil", tabBarLabel: "Accueil", tabBarIcon: ({color, size}) => HomeSVG(size.toString(), size.toString(), color.toString())
      }} />
      <Tabs.Screen name="history" options={{
        title: "Historique", tabBarLabel: "Historique", tabBarIcon: ({color, size}) => ChartSVG(size.toString(), size.toString(), color.toString())
      }} />
      <Tabs.Screen name="devices" options={{
        title: "Appareils", tabBarLabel: "Appareils", tabBarIcon: ({color, size}) => DeviceSVG(size.toString(), size.toString(), color.toString())
      }} />
      <Tabs.Screen name="settings" options={{
        title: "Réglages", tabBarLabel: "Réglages", tabBarIcon: ({color, size}) => SettingsSVG(size.toString(), size.toString(), color.toString())
      }} />
    </Tabs>
  );
}
