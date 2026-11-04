
import * as SecureStore from "expo-secure-store";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.13:4000";

const READ_TOKEN_KEY = "thermometre_read_token";

export type ApiOptions = RequestInit & {
  timeoutMs?: number;
  auth?: boolean;
};

// Enregistrer le jeton de lecture sur le téléphone.
export async function setReadAccessToken(token: string)
{
  await SecureStore.setItemAsync(READ_TOKEN_KEY, token);
}

// Récupérer le jeton enregistré.
export async function getReadAccessToken()
{
  return SecureStore.getItemAsync(READ_TOKEN_KEY);
}

// Supprimer le jeton enregistré.
export async function removeReadAccessToken()
{
  await SecureStore.deleteItemAsync(READ_TOKEN_KEY);
}

export async function apiRequest<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T>
{
  const {
    timeoutMs = 10000,
    auth = true,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try
  {
    const token = auth ? await getReadAccessToken() : null;

    const response = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(fetchOptions.body
          ? {"Content-Type": "application/json"}
          : {}),
        ...(token
          ? {Authorization: `Bearer ${token}`}
          : {}),
        ...fetchOptions.headers,
      },
    });

    if (!response.ok)
    {
      throw new Error(
        `Erreur API ${response.status} : ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } finally
  {
    clearTimeout(timeout);
  }
}

export const api = {
  getLatestMeasurement: <T>() =>
    apiRequest<T>("/mesures/latest"),

  getMeasurementHistory: <T>(limit = 100) =>
    apiRequest<T>(
      `/mesures/history?limit=${encodeURIComponent(limit)}`
    ),

  createMeasurement: <T>(payload: unknown) =>
    apiRequest<T>("/mesures", {
      method: "POST",
      body: JSON.stringify(payload),
      auth: false,
    }),
};

export function getApiBaseUrl()
{
  return API_URL;
}
