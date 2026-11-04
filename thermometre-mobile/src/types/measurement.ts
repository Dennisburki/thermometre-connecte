export type Measurement = {
  _id?: string;
  temperature: number;
  humidity: number;
  pressure?: number;
  createdAt?: string;
  deviceId?: string;
  date: string;
  slotKey?: string | null;
  data?: {
    temperature?: number;
  };
};

export type MeasurementHistoryResponse = {
  count: number;
  data: Measurement[];
};

export type ChartValue = {
  value: number;
  label: string;
};