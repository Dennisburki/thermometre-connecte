export function formatTemperature(value?: number | null) {
  return typeof value === "number" ? `${value.toFixed(1)} °C` : "—";
}
export function formatDate(value?: string | null) {
  if (!value) return "Date inconnue";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date inconnue" : date.toLocaleString("fr-FR");
}
