# 🪙 Expense Tracker - Mobile App

Une application mobile de gestion de finances personnelles moderne, performante et minimaliste. Suivez vos revenus et vos dépenses en temps réel avec une interface élégante en noir et blanc.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=D04A37)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

##  Fonctionnalités

### - Authentification
- Inscription et connexion sécurisées via **Supabase Auth**.
- Gestion de session persistante avec **Zustand** et **AsyncStorage**.
- Validation de formulaire robuste avec **React Hook Form**.

### - Tableau de Bord (Home)
- Calcul automatique de la **Balance Totale**.
- Visualisation rapide du total des **Revenus** et des **Dépenses**.
- Affichage des 5 dernières transactions récentes.

### - Gestion des Transactions
- Liste complète des transactions triées par date (récentes en haut).
- **CRUD Complet** : Ajouter, Modifier et Supprimer des transactions.
- Catégorisation intelligente avec icônes dynamiques.
- Sélecteur de date intégré (`react-native-paper-dates`).

### - Profil Utilisateur
- Personnalisation du profil (Nom, Email, Mot de passe).
- Menu de navigation intuitif.
- Déconnexion sécurisée.

## - Design & UI
- **Thème** : Minimaliste "Black & White" (Noir & Blanc).
- **Composants** : Basés sur `React Native Paper` pour une expérience native fluide.
- **Feedback** : Notifications instantanées via `react-native-toast-message`.

## - Stack Technique

- **Framework** : Expo (React Native)
- **Navigation** : Expo Router (File-based routing)
- **Backend-as-a-Service** : Supabase (Auth, PostgreSQL, RLS)
- **State Management** : Zustand
- **Formulaires** : React Hook Form + Zod
- **Dates** : Day.js
- **UI Kit** : React Native Paper

## - Installation et Lancement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   Créez un fichier `.env` à la racine et ajoutez vos clés Supabase :
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anonyme
   ```

4. **Lancer l'application**
   ```bash
   npx expo start
   ```

## - Structure du Projet

```text
├── app/                  # Routes et écrans (Expo Router)
│   ├── (auth)/           # Login, Register
│   └── user/             # Home, Transactions, Profile, Edit
├── components/           # Composants UI réutilisables (CardItem, Button...)
├── services/             # Logique API et appels Supabase
├── store/                # État global (Auth Store avec Zustand)
├── utils/                # Configuration Supabase et helpers
├── interfaces/           # Types TypeScript (ITransaction, IUser)
└── constants/            # Catégories, types et styles globaux
```

## - Configuration de la Base de Données

Le projet nécessite deux tables principales dans Supabase :

1. **user_profile** : Liée à `auth.users` via l'ID.
   - `id` (uuid, primary key)
   - `name` (text)
   - `email` (text)

2. **transaction** :
   - `id` (bigint, primary key)
   - `user_id` (uuid, foreign key)
   - `name` (text)
   - `amount` (numeric)
   - `type` (text: 'income' | 'expense')
   - `category` (text)
   - `date` (timestamp)
   - `created_at` (timestamp)

