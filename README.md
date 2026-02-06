<div align="center">
  <a href="https://rxresu.me">
    <img src="public/opengraph/banner.jpg" alt="Reactive Resume" />
  </a>

  <h1>Reactive Resume</h1>

  <p>Un créateur de CV gratuit et open-source. Créez, modifiez et partagez votre CV facilement.</p>

  <p>
    <a href="https://rxresu.me"><strong>Essayer en ligne</strong></a>
    ·
    <a href="https://docs.rxresu.me"><strong>Documentation</strong></a>
    ·
    <a href="https://discord.gg/EE8yFqW4"><strong>Discord</strong></a>
  </p>
</div>

---

## Qu'est-ce que Reactive Resume ?

Reactive Resume vous permet de créer des CV professionnels avec un aperçu en temps réel. Choisissez un modèle, remplissez vos informations, exportez en PDF. Aucun compte requis pour une utilisation basique.

**Fonctionnalités clés :** plusieurs modèles, sections par glisser-déposer, export PDF/JSON, import de CV assisté par IA, mode sombre, support multilingue, auto-hébergement.

Respect de la vie privée : open-source (MIT), aucun tracking, aucune publicité, vos données restent les vôtres.

## Modèles

<table>
  <tr>
    <td align="center">
      <img src="public/templates/jpg/azurill.jpg" alt="Azurill" width="150" />
      <br /><sub><b>Azurill</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/bronzor.jpg" alt="Bronzor" width="150" />
      <br /><sub><b>Bronzor</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/chikorita.jpg" alt="Chikorita" width="150" />
      <br /><sub><b>Chikorita</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/ditto.jpg" alt="Ditto" width="150" />
      <br /><sub><b>Ditto</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="public/templates/jpg/gengar.jpg" alt="Gengar" width="150" />
      <br /><sub><b>Gengar</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/glalie.jpg" alt="Glalie" width="150" />
      <br /><sub><b>Glalie</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/kakuna.jpg" alt="Kakuna" width="150" />
      <br /><sub><b>Kakuna</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/lapras.jpg" alt="Lapras" width="150" />
      <br /><sub><b>Lapras</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="public/templates/jpg/leafish.jpg" alt="Leafish" width="150" />
      <br /><sub><b>Leafish</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/onyx.jpg" alt="Onyx" width="150" />
      <br /><sub><b>Onyx</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/pikachu.jpg" alt="Pikachu" width="150" />
      <br /><sub><b>Pikachu</b></sub>
    </td>
    <td align="center">
      <img src="public/templates/jpg/rhyhorn.jpg" alt="Rhyhorn" width="150" />
      <br /><sub><b>Rhyhorn</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="public/templates/jpg/ditgar.jpg" alt="Ditgar" width="150" />
      <br /><sub><b>Ditgar</b></sub>
    </td>
  </tr>
</table>

---

## Installation sur Windows (pas à pas)

Ce guide est pour **Windows 10 ou 11**. Aucune connaissance technique préalable n'est nécessaire. Suivez chaque étape dans l'ordre.

### Étape 1 — Installer Git

Git est un outil qui permet de télécharger le code du projet.

1. Allez sur [git-scm.com/download/win](https://git-scm.com/download/win)
2. Cliquez sur **"Click here to download"** — l'installateur se télécharge automatiquement
3. Lancez l'installateur (fichier `.exe`)
4. Cliquez sur **Next** à chaque écran — les options par défaut conviennent
5. Cliquez sur **Install**, puis **Finish**

**Vérification :** ouvrez le **menu Démarrer**, tapez `cmd`, ouvrez l'**Invite de commandes**, et tapez :

```
git --version
```

Vous devriez voir quelque chose comme `git version 2.xx.x`. Si c'est le cas, Git est installé.

### Étape 2 — Installer Node.js

Node.js exécute le code de l'application.

1. Allez sur [nodejs.org](https://nodejs.org/)
2. Téléchargez la version **LTS** (le gros bouton vert à gauche)
3. Lancez l'installateur (fichier `.msi`)
4. Cliquez sur **Next** à chaque écran — gardez toutes les options par défaut
5. **Important :** à l'écran "Tools for Native Modules", cochez la case **"Automatically install the necessary tools"** si elle apparaît
6. Cliquez sur **Install**, puis **Finish**

**Vérification :** fermez et rouvrez l'Invite de commandes, puis tapez :

```
node --version
```

Vous devriez voir `v24.x.x` ou supérieur.

### Étape 3 — Activer pnpm

pnpm est le gestionnaire de paquets utilisé par ce projet. Il est fourni avec Node.js, il suffit de l'activer.

Ouvrez l'Invite de commandes et tapez :

```
corepack enable
corepack prepare pnpm@latest --activate
```

**Vérification :**

```
pnpm --version
```

Vous devriez voir un numéro de version comme `10.x.x`.

### Étape 4 — Installer Docker Desktop

Docker exécute la base de données et les autres services nécessaires à l'application.

1. Allez sur [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Cliquez sur **"Download for Windows"**
3. Lancez l'installateur
4. Quand demandé, gardez **"Use WSL 2 instead of Hyper-V"** coché (recommandé)
5. Cliquez sur **OK**, puis laissez l'installation se terminer
6. **Redémarrez votre ordinateur** quand demandé
7. Après le redémarrage, Docker Desktop s'ouvre automatiquement. Acceptez les conditions d'utilisation
8. Attendez que l'indicateur en bas à gauche de Docker Desktop affiche **"Engine running"** (icône verte)

> **Note :** Si Docker vous demande d'installer ou mettre à jour WSL 2, suivez le lien fourni, installez la mise à jour, puis redémarrez à nouveau.

**Vérification :** ouvrez l'Invite de commandes et tapez :

```
docker --version
```

Vous devriez voir `Docker version 2x.x.x`.

### Étape 5 — Télécharger le projet

Ouvrez l'Invite de commandes. Choisissez où vous voulez le dossier du projet (par exemple, votre dossier Documents) :

```
cd %USERPROFILE%\Documents
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
```

Ceci crée un dossier appelé `Customreactiveresume` avec tous les fichiers du projet.

### Étape 6 — Configurer le fichier d'environnement

Le projet a besoin d'un fichier de configuration appelé `.env`.

```
copy .env.example .env
```

C'est tout. Les valeurs par défaut fonctionnent pour le développement local — aucune modification nécessaire.

> **Pour les utilisateurs avancés :** ouvrez `.env` dans un éditeur de texte (le Bloc-notes fonctionne) si vous souhaitez personnaliser les paramètres. Pour la production, remplacez `AUTH_SECRET` par une clé aléatoire forte.

### Étape 7 — Démarrer les services (base de données, etc.)

Assurez-vous que **Docker Desktop est en cours d'exécution** (vérifiez l'icône verte dans la barre des tâches), puis tapez :

```
docker compose -f compose.dev.yml up -d
```

Ceci télécharge et démarre 5 services en arrière-plan :

| Service | Fonction | Adresse |
|---------|----------|---------|
| PostgreSQL | Base de données | localhost:5432 |
| Browserless | Génération de PDF | localhost:4000 |
| SeaweedFS | Stockage de fichiers | localhost:8333 |
| Mailpit | Capture des emails de test | [localhost:8025](http://localhost:8025) |
| Adminer | Panneau d'administration de la BDD | [localhost:8080](http://localhost:8080) |

La première fois, cela télécharge plusieurs images — attendez la fin. Vérifiez que tout fonctionne :

```
docker compose -f compose.dev.yml ps
```

Tous les services devraient afficher **"running"** ou **"healthy"**.

### Étape 8 — Installer les dépendances du projet

```
pnpm install
```

Ceci télécharge toutes les bibliothèques de code nécessaires au projet. Attendez la fin de l'opération.

### Étape 9 — Configurer la base de données

```
pnpm db:push
```

Ceci crée les tables de la base de données. Vous devriez voir une sortie se terminant par un message de succès.

### Étape 10 — Démarrer l'application

```
pnpm dev
```

Attendez de voir un message indiquant que le serveur est prêt sur le port 3000, puis ouvrez votre navigateur et allez sur :

**http://localhost:3000**

Vous devriez voir la page d'accueil de Reactive Resume. Cliquez sur **Sign Up** pour créer votre compte.

> **Astuce :** Les emails de test (pour la vérification du compte) sont capturés par Mailpit. Ouvrez [http://localhost:8025](http://localhost:8025) pour les consulter.

### Arrêt et redémarrage

**Pour arrêter l'application :** appuyez sur `Ctrl + C` dans l'Invite de commandes où `pnpm dev` est en cours d'exécution.

**Pour arrêter les services en arrière-plan :**

```
docker compose -f compose.dev.yml down
```

**Pour tout redémarrer plus tard :**

1. Ouvrez Docker Desktop (attendez l'icône verte)
2. Ouvrez l'Invite de commandes
3. Naviguez vers le dossier du projet : `cd %USERPROFILE%\Documents\Customreactiveresume`
4. Démarrez les services : `docker compose -f compose.dev.yml up -d`
5. Démarrez l'application : `pnpm dev`
6. Ouvrez http://localhost:3000

### Dépannage

| Problème | Solution |
|----------|----------|
| Commande `docker` introuvable | Assurez-vous que Docker Desktop est en cours d'exécution. Redémarrez l'Invite de commandes. |
| Commande `pnpm` introuvable | Relancez `corepack enable`. Redémarrez l'Invite de commandes. |
| Commande `node` introuvable | Réinstallez Node.js depuis [nodejs.org](https://nodejs.org/). Redémarrez l'Invite de commandes. |
| Port déjà utilisé | Un autre programme utilise ce port. Arrêtez-le, ou changez le port dans `.env`. |
| Les services Docker ne démarrent pas | Vérifiez que Docker Desktop est en cours d'exécution (icône verte). Essayez `docker compose -f compose.dev.yml down` puis `up -d` à nouveau. |
| `pnpm dev` affiche des erreurs | Assurez-vous que les étapes 7, 8 et 9 se sont terminées sans erreurs. Réessayez `pnpm install`. |
| Impossible d'accéder à localhost:3000 | Attendez que le serveur de développement ait complètement démarré. Vérifiez les messages d'erreur dans le terminal. |
| Erreur de migration « relation already exists » | Les migrations sont idempotentes (`IF NOT EXISTS`). Si l'erreur persiste, exécutez `pnpm db:push` pour synchroniser le schéma directement. |

---

## Installation sur macOS / Linux

<details>
<summary>Cliquez pour développer</summary>

### Prérequis

- **Node.js** 24+ — [nodejs.org](https://nodejs.org/)
- **pnpm** — `corepack enable && corepack prepare pnpm@latest --activate`
- **Docker** & Docker Compose — [docs.docker.com/get-docker](https://docs.docker.com/get-docker/)
- **Git** — [git-scm.com](https://git-scm.com/)

### Démarrage rapide

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
docker compose -f compose.dev.yml up -d
pnpm install
pnpm db:push
pnpm dev
```

Ouvrez http://localhost:3000.

</details>

---

## Intégration IA (optionnel)

Reactive Resume peut utiliser l'IA pour analyser des CV PDF/Word et les convertir en données structurées. Deux options :

### Option A — Groq (cloud, offre gratuite)

1. Créez un compte sur [console.groq.com](https://console.groq.com)
2. Allez dans **API Keys** > **Create API Key** > copiez la clé
3. Dans l'application : **Dashboard > Settings > AI**
4. Fournisseur : **Groq**, Modèle : `llama-3.3-70b-versatile`, collez votre clé API
5. Cliquez sur **Test Connection**, puis activez les fonctionnalités IA

Modèles recommandés : `llama-3.3-70b-versatile` (meilleure qualité), `llama-3.1-8b-instant` (plus rapide).

> Votre clé API reste dans votre navigateur. Elle n'est jamais envoyée aux serveurs de Reactive Resume.

### Option B — Ollama (local, entièrement privé)

1. Téléchargez Ollama depuis [ollama.ai/download](https://ollama.ai/download) et installez-le
2. Ouvrez l'Invite de commandes et exécutez :
   ```
   ollama pull llama3.2
   ```
3. Dans l'application : **Dashboard > Settings > AI**
4. Fournisseur : **Ollama (Local)**, Modèle : `llama3.2`
5. Cliquez sur **Test Connection**, puis activez les fonctionnalités IA

Modèles : `llama3.2:1b` (~2 Go RAM), `llama3.2` (~4 Go), `llama3.1` (~8 Go, meilleure qualité).

---

## Commandes de développement

```bash
pnpm dev              # Démarrer le serveur de développement (port 3000)
pnpm build            # Compiler pour la production
pnpm start            # Démarrer le serveur de production
pnpm lint             # Linter avec Biome
pnpm typecheck        # Vérification des types TypeScript
pnpm db:push          # Pousser les changements de schéma
pnpm db:generate      # Générer les fichiers de migration
pnpm db:migrate       # Exécuter les migrations
pnpm db:studio        # Ouvrir Drizzle Studio
pnpm lingui:extract   # Extraire les chaînes i18n
```

## Auto-hébergement avec Docker

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
# Modifiez .env avec les valeurs de production (vrai AUTH_SECRET, URLs appropriées)
docker compose up -d
```

Accessible sur http://localhost:3000.

## Contribuer

1. Forkez le dépôt
2. Créez une branche de fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

[MIT](./LICENSE)
