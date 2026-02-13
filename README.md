# 🇲🇦 Carte Météo Interactive du Maroc

![Bannière du Projet](https://github.com/merouan-dev/morocco-weather-map/blob/main/screenshots/image%20copy.png)

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Une application web moderne et interactive offrant des prévisions météorologiques en temps réel pour les principales villes du Maroc. Conçue avec une esthétique soignée inspirée des couleurs nationales et utilisant les dernières technologies web pour une performance optimale.

[Voir la Démo en Ligne](https://morocco-weather-map.vercel.app/)

## 📋 Table des Matières
- [Aperçu](#aperçu)
- [Captures d'Écran](#captures-décran)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Personnalisation](#personnalisation)
- [Déploiement](#déploiement)
- [Contribuer](#contribuer)
- [Auteur](#auteur)

---

## ✨ Fonctionnalités

### 🗺️ Cartographie
- [x] Carte interactive centrée sur le Maroc (Leaflet)
- [x] 20+ villes majeures avec marqueurs dynamiques
- [x] Zoom et navigation fluides
- [x] Basculement automatique jour/nuit

### 🌤️ Données Météorologiques
- [x] **API Open-Meteo** (Gratuit, sans clé API)
- [x] Température en temps réel
- [x] Conditions météo avec icônes dynamiques (Lucide React)
- [x] Humidité, vitesse du vent, pression
- [x] Heures de lever et coucher du soleil
- [x] Prévisions graphiques sur 24h

### 🎨 Interface Utilisateur
- [x] Design moderne "Glassmorphism"
- [x] **Mode Sombre/Clair** (Dark Mode) natif
- [x] Animations fluides (Framer Motion)
- [x] Palette de couleurs marocaines (Rouge & Vert)
- [x] Typographie adaptée (Noto Naskh Arabic)

### 🔧 Technique
- [x] Architecture Next.js 14 App Router
- [x] Gestion d'état globale avec Zustand
- [x] Mise en cache des données avec TanStack Query
- [x] Totalement responsive (Mobile First)

---

## 🛠️ Technologies Utilisées

### Core
- **Next.js 14** - Framework React
- **TypeScript** - Tyage statique
- **Tailwind CSS v4** - Styling utilitaire

### Bibliothèques
- **Leaflet & React-Leaflet** - Cartes interactives
- **Framer Motion** - Animations
- **Zustand** - Gestion d'état (State Management)
- **TanStack Query** - Fetching et Caching
- **Recharts** - Graphiques de données
- **Lucide React** - Icônes vectorielles

### APIs
- **Open-Meteo API** - Données météo (Open Source)

---

## 📦 Installation

### Prérequis
- Node.js (v18.0+)
- npm ou yarn

### Étape 1: Cloner le Projet
```bash
git clone https://github.com/merouan-dev/morocco-weather-map.git
```

### Étape 2: Installer les Dépendances
```bash
npm install
```

### Étape 3: Configuration (Optionnel)
Ce projet utilise **Open-Meteo**, il ne nécessite donc **aucune clé API** pour fonctionner immédiatement ! 🚀

Cependant, vous pouvez configurer certaines options dans `.env.local` si nécessaire.

### Étape 4: Lancer le Projet
```bash
npm run dev
```

L'application sera accessible sur: `http://localhost:3000`

---

## 📁 Structure du Projet

```bash
morocco-weather-map/
├── 📸 screenshots/           # Images pour README
├── 📂 app/                   # Next.js App Router
│   ├── layout.tsx            # Layout principal (Providers, Fonts)
│   └── page.tsx              # Page d'accueil (Map, Sidebar, WeatherCard)
├── 📂 components/
│   ├── 📂 layout/            # Header, Footer
│   ├── 📂 map/               # MapWrapper, WeatherMap
│   ├── 📂 sidebar/           # Sidebar, CityList
│   └── 📂 weather/           # WeatherCard
├── 📂 data/
│   └── moroccanCities.json   # Données des villes
├── 📂 hooks/
│   └── useWeatherData.ts     # React Query Hook
├── 📂 services/
│   └── weatherAPI.ts         # Intégration Open-Meteo
├── 📂 stores/
│   └── weatherStore.ts       # Zustand Store
├── 📂 public/
│   └── icons/                # Assets statiques
└── 📄 README.md
```


## 🎨 Personnalisation

### Ajouter une Ville
Modifiez le fichier `data/moroccanCities.json` :

```json
{
  "id": 99,
  "name": "Dakhla",
  "nameFr": "Dakhla",
  "nameEn": "Dakhla",
  "lat": 23.70,
  "lon": -15.95,
  "isCapital": false,
  "region": "Dakhla-Oued Ed-Dahab"
}
```



## 🤝 Contribuer

Les contributions sont les bienvenues !
1. Fork le projet.
2. Créez votre branche (`git checkout -b feature/AmazingFeature`).
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`).
4. Push vers la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

---

## 👥 Contributors & Auteur

| Avatar | Nom Complet | GitHub | Rôle |
|--------|------------|--------|------|
| <img src="https://github.com/merouan-dev.png" width="50" height="50" style="border-radius:50%;" /> | Merouane Errachidi | [merouan-dev](https://github.com/merouan-dev) | Auteur du projet |
| <img src="https://github.com/Ayoub-glitsh.png" width="50" height="50" style="border-radius:50%;" /> | Ayoub Aguezar | [Ayoub-glitsh](https://github.com/Ayoub-glitsh) | Contributeur |









---

## 📄 Licence
Ce projet est sous licence MIT.
