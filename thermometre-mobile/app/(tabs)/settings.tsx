
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TextInput, Pressable, } from "react-native";
import {Link} from "expo-router";
import {Screen} from "@/components/layout/Screen";
import {Card} from "@/components/ui/Card";
import {colors} from "@/constants/colors";
import {getReadAccessToken, setReadAccessToken, removeReadAccessToken, getApiBaseUrl} from "@/services/api/client";

export default function SettingsScreen()
{
  const [ token, setToken ] = useState("");
  const [ hasToken, setHasToken ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ loading, setLoading ] = useState(false);

  useEffect(() =>
  {
    async function loadToken()
    {
      try
      {
        const savedToken = await getReadAccessToken();
        setHasToken(!!savedToken);
      } catch
      {
        setMessage("Impossible de vérifier le jeton enregistré.");
      }
    }

    loadToken();
  }, []);

  async function saveToken()
  {
    const cleanToken = token.trim();

    if (cleanToken.length < 32)
    {
      setMessage("Le jeton semble trop court.");
      return;
    }

    setLoading(true);
    setMessage("");

    try
    {
      await setReadAccessToken(cleanToken);
      setHasToken(true);
      setToken("");
      setMessage("Jeton enregistré avec succès.");
    } catch
    {
      setMessage("Impossible d'enregistrer le jeton.");
    } finally
    {
      setLoading(false);
    }
  }

  async function deleteToken()
  {
    setLoading(true);
    setMessage("");

    try
    {
      await removeReadAccessToken();
      setHasToken(false);
      setToken("");
      setMessage("Jeton supprimé.");
    } catch
    {
      setMessage("Impossible de supprimer le jeton.");
    } finally
    {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Réglages</Text>
      <Text style={styles.subtitle}>
        Configuration de l’application.
      </Text>

      <Card style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>Accès au thermomètre</Text>
          <Text style={styles.description}>
            {hasToken
              ? "Un jeton de lecture est enregistré sur ce téléphone."
              : "Aucun jeton de lecture configuré."}
          </Text>
          <Text
            style={[
              styles.status,
              hasToken ? styles.statusActive : styles.statusInactive,
            ]}
          >
            {hasToken ? "Accès configuré" : "Accès non configuré"}
          </Text>
        </View>
      </Card>

      <Card style={styles.tokenCard}>
        <Text style={styles.label}>Jeton de lecture</Text>
        <Text style={styles.description}>
          Saisis le jeton partagé pour autoriser ce téléphone à consulter
          les mesures.
        </Text>

        <TextInput
          style={styles.input}
          value={token}
          onChangeText={setToken}
          placeholder="Coller le jeton ici"
          placeholderTextColor={colors.muted}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Pressable
          style={[ styles.button, loading && styles.buttonDisabled ]}
          onPress={saveToken}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enregistrement..." : "Enregistrer le jeton"}
          </Text>
        </Pressable>

        {hasToken && (
          <Pressable
            style={[ styles.deleteButton, loading && styles.buttonDisabled ]}
            onPress={deleteToken}
            disabled={loading}
          >
            <Text style={styles.deleteButtonText}>
              Supprimer le jeton
            </Text>
          </Pressable>
        )}

        {message !== "" && (
          <Text style={styles.message}>{message}</Text>
        )}
      </Card>

      <Link href="/about" asChild>
        <Card style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.label}>À propos</Text>
            <Text style={styles.description}>
              Version et informations du projet
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Card>
      </Link>

      
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {color: colors.text, fontSize: 26, fontWeight: "800", },
  subtitle: {color: colors.muted, fontSize: 14, marginTop: 6, marginBottom: 20, },
  row: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, },
  rowText: {flex: 1, },
  label: {color: colors.text, fontSize: 15, fontWeight: "700", },
  description: {color: colors.muted, fontSize: 13, marginTop: 5, },
  chevron: {color: colors.muted, fontSize: 26, marginLeft: 12, },
  tokenCard: {marginBottom: 12, padding: 16, flexDirection: "column", alignItems: "stretch", },
  input: {borderWidth: 1, borderColor: colors.muted, borderRadius: 8, padding: 12, marginTop: 14, color: colors.text, fontSize: 13, },
  button: {backgroundColor: colors.text, padding: 13, borderRadius: 8, alignItems: "center", marginTop: 12, },
  buttonText: {color: "#FFFFFF", fontWeight: "700", },
  buttonDisabled: {opacity: 0.5, },
  deleteButton: {padding: 12, alignItems: "center", marginTop: 6, },
  deleteButtonText: {color: "#D9534F", fontWeight: "600", },
  status: {fontSize: 12, fontWeight: "700", marginTop: 8, },
  statusActive: {color: "#26965B", },
  statusInactive: {color: "#D28B32", },
  message: {color: colors.muted, fontSize: 13, marginTop: 12, },
});
