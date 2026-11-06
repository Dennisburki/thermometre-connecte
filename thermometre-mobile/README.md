# Thermomètre connecté

Projet personnel de thermomètre connecté permettant de mesurer la température, l'humidité et la pression atmosphérique, avec consultation des relevés depuis une application mobile.

## Fonctionnalités

- Mesure de la température, de l'humidité et de la pression.
- Affichage des données sur un écran OLED.
- Transmission des mesures via Wi-Fi et HTTPS.
- Consultation des dernières mesures et de l'historique.
- Stockage des données dans MongoDB.
- Gestion des accès à l'API par tokens.

## Technologies

| Partie | Technologies |
|---|---|
| Objet connecté | Raspberry Pi Pico 2 W, MicroPython, BME280 |
| Backend | Node.js, Express, MongoDB Atlas |
| Application mobile | React Native, Expo, TypeScript |
| Hébergement | Render, Expo EAS |

## Architecture

Le Pico 2 W récupère les données du capteur BME280 et les transmet à une API Node.js via HTTPS.

L'API enregistre les mesures dans MongoDB Atlas. L'application mobile communique avec cette API pour afficher les relevés et leur historique.

## Déploiement

- API hébergée sur Render.
- Base de données sur MongoDB Atlas.
- Application Android compilée avec Expo EAS.

## À propos

Ce projet me permet de mettre en pratique le développement full-stack, de la programmation embarquée à la conception d'API et au développement mobile.