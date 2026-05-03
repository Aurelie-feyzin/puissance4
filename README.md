# 🎮 Puissance 4 / Connect Four – JavaScript AI

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-build-purple)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-black)](https://aurelie-feyzin.github.io/puissance4/)
[![Play Online](https://img.shields.io/badge/Play%20Online-Connect%204-blue?style=for-the-badge)](https://aurelie-feyzin.github.io/puissance4/)

A browser-based **Connect Four game** with an AI opponent, playable directly online.

---

# 🇬🇧 English

## About the project

This project is a **Connect Four game playable in the browser**, built with **JavaScript / TypeScript** and a simple web interface.

The AI opponent can play at several difficulty levels.

⚠️ **Important:**
This project was developed **entirely with the help of the free version of ChatGPT**, without using paid AI tools or external game engines.

The goal was to explore **how far a small complete game project can be built using only the free ChatGPT as a development assistant.**

---

## Game Architecture

A simple architecture diagram:

```
+-----------------+
|     UI Layer    |  <-- renders board, handles clicks
+--------+--------+
         |
         v
+-----------------+
|  Game Logic     |  <-- validates moves, updates board
+--------+--------+
         |
         v
+-----------------+
|      AI         |  <-- chooses moves based on difficulty
+-----------------+
```

---

## AI Difficulty Levels

| Level  | Description                                       |
| ------ | ------------------------------------------------- |
| Easy   | Random valid moves                                |
| Medium | Heuristic: blocks opponent & favors center column |
| Hard   | Minimax depth 4                                   |
| Expert | Minimax depth 6                                   |

This allows the player to progressively challenge the AI.

---

## Features

- Playable directly in the browser
- AI opponent with multiple difficulty levels
- Responsive UI (desktop + mobile)
- Lightweight implementation
- Deployed with GitHub Pages

---

## Live Demo

Play the game here:

➡️ https://aurelie-feyzin.github.io/puissance4/

---

## How to run locally

Clone the repository:

```bash
git clone https://github.com/aurelie-feyzin/puissance4.git
```

Go into the project folder:

```bash
cd puissance4
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## Technologies

- JavaScript / TypeScript
- HTML / CSS
- Vite
- GitHub Pages

---

# 🇫🇷 Français

## À propos du projet

Ce projet est un **jeu Puissance 4 jouable dans le navigateur**, développé en **JavaScript / TypeScript** avec une interface web simple.

L’IA peut jouer à **plusieurs niveaux de difficulté**.

⚠️ **Important :**
Ce projet a été réalisé **entièrement avec l’aide de la version gratuite de ChatGPT**, sans utiliser d’outils IA payants ni de moteur de jeu externe.

L’objectif était d’explorer **jusqu’où il est possible de développer un petit jeu complet uniquement avec ChatGPT (version gratuite) comme assistant de programmation.**

---

## Architecture du jeu

Diagramme simple :

```
+-----------------+
| Interface UI    |  <-- affiche le plateau, gère les clics
+--------+--------+
         |
         v
+-----------------+
| Logique du jeu  |  <-- valide les coups, met à jour le plateau
+--------+--------+
         |
         v
+-----------------+
| IA              |  <-- choisit les coups selon la difficulté
+-----------------+
```

---

## Niveaux de difficulté de l'IA

| Niveau | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| Easy   | Coups aléatoires                                                 |
| Medium | Heuristique : bloque l’adversaire & favorise la colonne centrale |
| Hard   | Minimax profondeur 4                                             |
| Expert | Minimax profondeur 6                                             |

Cela permet d’augmenter progressivement le niveau de challenge.

---

## Fonctionnalités

- Jeu jouable directement dans le navigateur
- IA avec plusieurs niveaux de difficulté
- Interface responsive (desktop + mobile)
- Implémentation simple et légère
- Déploiement via GitHub Pages

---

## Démo

Le jeu est disponible ici :

➡️ https://aurelie-feyzin.github.io/puissance4/

---

## Lancer le projet en local

Cloner le dépôt :

```bash
git clone https://github.com/aurelie-feyzin/puissance4
```

Entrer dans le dossier :

```bash
cd puissance4
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

Puis ouvrir :

```
http://localhost:5173
```

---

## Technologies utilisées

- JavaScript / TypeScript
- HTML / CSS
- Vite
- GitHub Pages
