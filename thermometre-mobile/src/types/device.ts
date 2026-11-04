export type Device = {
  id: string;
  name: string;
  status: "online" | "offline" | "unknown";
  lastSeen?: string;
};
