# Thermomètre — squelette Expo

Base TypeScript pour une application mobile Expo avec navigation déjà câblée via **Expo Router**.

## Ce qui est déjà en place

- Onglets : **Accueil**, **Historique**, **Appareils**, **Réglages**
- Navigation Stack pour les écrans secondaires : détail d'un appareil, ajout d'un appareil, détails d'une mesure et écran À propos
- Routes dynamiques avec paramètres (`devices/[deviceId]`, `measurements/[measurementId]`)
- Dossiers séparés pour composants, services API, hooks, types, constantes et utilitaires
- Un service API centralisé et configuré via `EXPO_PUBLIC_API_URL`
- Écrans de démonstration sans données métier définitives : tu peux remplacer leur contenu par tes vrais composants

## Démarrage

Il faut Node.js installé. Depuis ce dossier :

```bash
npm install
npx expo start
```

Scanne le QR code avec Expo Go, ou appuie sur `w` pour ouvrir la version web si les dépendances web sont installées.

Si les versions Expo ont évolué au moment où tu l'installes, le plus fiable est de créer d'abord un projet Expo Router officiel puis de copier les dossiers `app/` et `src/` de ce squelette dedans :

```bash
npx create-expo-app@latest thermometre-mobile --template default
```

Ensuite copie `app/`, `src/`, `app.json`, `tsconfig.json` et adapte `package.json` si nécessaire. Expo documente la navigation par fichiers : https://docs.expo.dev/develop/app-navigation/

## Configurer l'API

Crée un fichier `.env` à la racine :

```env
EXPO_PUBLIC_API_URL=http://192.168.1.13:4000
```

Remplace l'adresse par l'IP locale de la machine qui exécute ton backend. Le téléphone et le PC doivent être sur le même réseau Wi-Fi pour utiliser une adresse locale.

Le service se trouve dans `src/services/api/client.ts`. Les routes API actuelles sont des exemples adaptés à ton backend connu :
- `GET /mesures/latest`
- `GET /mesures/history?limit=100`
- `POST /mesures`

À adapter à la forme exacte des réponses JSON de ton serveur.

## Ajouter une page

Crée un fichier sous `app/`. Le chemin du fichier devient automatiquement la route. Par exemple `app/account/profile.tsx` devient `/account/profile`.

Pour une page accessible depuis les onglets, ajoute son entrée dans `app/(tabs)/_layout.tsx`. Pour un écran secondaire, ajoute son fichier sous `app/` et configure son titre dans `app/_layout.tsx`.

## Organisation

- `app/` : routes et layouts Expo Router
- `src/components/` : composants UI réutilisables
- `src/services/api/` : appels réseau
- `src/hooks/` : hooks métier
- `src/types/` : types TypeScript
- `src/constants/` : couleurs et configuration
- `src/utils/` : fonctions utilitaires
