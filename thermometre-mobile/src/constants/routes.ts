/**
 * Référence pratique des chemins Expo Router.
 * Les fichiers dans app/ définissent réellement les routes.
 */
export const routes = {
  home: "/(tabs)",
  history: "/(tabs)/history",
  devices: "/(tabs)/devices",
  settings: "/(tabs)/settings",
  addDevice: "/devices/add",
  deviceDetails: (deviceId: string) => `/devices/${encodeURIComponent(deviceId)}`,
  measurementDetails: (measurementId: string) => `/measurements/${encodeURIComponent(measurementId)}`,
  about: "/about",
} as const;
