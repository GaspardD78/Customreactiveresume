<div align="center">

  <h1>Reactive Resume Optimiser</h1>

  <p>Un créateur de CV optimisé par l'IA. Créez, analysez et optimisez vos CV pour chaque offre d'emploi.</p>

</div>

---

## Qu'est-ce que Reactive Resume Optimiser ?

Reactive Resume Optimiser est un outil complet de gestion de candidatures et d'optimisation de CV, basé sur le projet open-source Reactive Resume. En plus de la création classique de CV, il intègre des fonctionnalités d'intelligence artificielle pour maximiser vos chances de décrocher un entretien.

**Fonctionnalités clés :**

- Plusieurs modèles de CV, sections par glisser-déposer, export PDF/JSON
- Import de CV assisté par IA (PDF, Word)
- Mode sombre, support multilingue, auto-hébergement
- Respect de la vie privée : open-source (MIT), aucun tracking, aucune publicité

### Fonctionnalités IA (nouveau)

- **Espace candidatures** : centralisez toutes vos candidatures avec suivi complet (statut, historique, contacts, notes, prochaines actions)
- **Parsing intelligent d'offres d'emploi** : collez le texte d'une offre et l'IA extrait automatiquement les informations structurées (poste, entreprise, compétences requises, nice-to-have, etc.)
- **Analyse ATS du CV** : score d'optimisation 0-100 par offre, basé sur la correspondance des mots-clés (50%), la structure (25%) et la complétude (25%), avec suggestions détaillées bloc par bloc
- **Génération de lettre de motivation** : lettre personnalisée générée par l'IA avec un ton naturel et humain (anti-détection IA)
- **Fork de CV optimisé** : dupliquez automatiquement un CV et adaptez-le pour une offre spécifique

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

## Installation sur Windows (pas a pas)

Ce guide est pour **Windows 10 ou 11**. Aucune connaissance technique prealable n'est necessaire. Suivez chaque etape dans l'ordre.

### Etape 1 -- Installer Git

Git est un outil qui permet de telecharger le code du projet.

1. Allez sur [git-scm.com/download/win](https://git-scm.com/download/win)
2. Cliquez sur **"Click here to download"** -- l'installateur se telecharge automatiquement
3. Lancez l'installateur (fichier `.exe`)
4. Cliquez sur **Next** a chaque ecran -- les options par defaut conviennent
5. Cliquez sur **Install**, puis **Finish**

**Verification :** ouvrez le **menu Demarrer**, tapez `cmd`, ouvrez l'**Invite de commandes**, et tapez :

```
git --version
```

Vous devriez voir quelque chose comme `git version 2.xx.x`. Si c'est le cas, Git est installe.

### Etape 2 -- Installer Node.js

Node.js execute le code de l'application.

1. Allez sur [nodejs.org](https://nodejs.org/)
2. Telechargez la version **LTS** (le gros bouton vert a gauche)
3. Lancez l'installateur (fichier `.msi`)
4. Cliquez sur **Next** a chaque ecran -- gardez toutes les options par defaut
5. **Important :** a l'ecran "Tools for Native Modules", cochez la case **"Automatically install the necessary tools"** si elle apparait
6. Cliquez sur **Install**, puis **Finish**

**Verification :** fermez et rouvrez l'Invite de commandes, puis tapez :

```
node --version
```

Vous devriez voir `v24.x.x` ou superieur.

### Etape 3 -- Activer pnpm

pnpm est le gestionnaire de paquets utilise par ce projet. Il est fourni avec Node.js, il suffit de l'activer.

Ouvrez l'Invite de commandes et tapez :

```
corepack enable
corepack prepare pnpm@latest --activate
```

**Verification :**

```
pnpm --version
```

Vous devriez voir un numero de version comme `10.x.x`.

### Etape 4 -- Installer Docker Desktop

Docker execute la base de donnees et les autres services necessaires a l'application.

1. Allez sur [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Cliquez sur **"Download for Windows"**
3. Lancez l'installateur
4. Quand demande, gardez **"Use WSL 2 instead of Hyper-V"** coche (recommande)
5. Cliquez sur **OK**, puis laissez l'installation se terminer
6. **Redemarrez votre ordinateur** quand demande
7. Apres le redemarrage, Docker Desktop s'ouvre automatiquement. Acceptez les conditions d'utilisation
8. Attendez que l'indicateur en bas a gauche de Docker Desktop affiche **"Engine running"** (icone verte)

> **Note :** Si Docker vous demande d'installer ou mettre a jour WSL 2, suivez le lien fourni, installez la mise a jour, puis redemarrez a nouveau.

**Verification :** ouvrez l'Invite de commandes et tapez :

```
docker --version
```

Vous devriez voir `Docker version 2x.x.x`.

### Etape 5 -- Telecharger le projet

Ouvrez l'Invite de commandes. Choisissez ou vous voulez le dossier du projet (par exemple, votre dossier Documents) :

```
cd %USERPROFILE%\Documents
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
```

Ceci cree un dossier appele `Customreactiveresume` avec tous les fichiers du projet.

### Etape 6 -- Configurer le fichier d'environnement

Le projet a besoin d'un fichier de configuration appele `.env`.

```
copy .env.example .env
```

C'est tout. Les valeurs par defaut fonctionnent pour le developpement local -- aucune modification necessaire.

> **Pour les utilisateurs avances :** ouvrez `.env` dans un editeur de texte (le Bloc-notes fonctionne) si vous souhaitez personnaliser les parametres. Pour la production, remplacez `AUTH_SECRET` par une cle aleatoire forte.

### Etape 7 -- Demarrer les services (base de donnees, etc.)

Assurez-vous que **Docker Desktop est en cours d'execution** (verifiez l'icone verte dans la barre des taches), puis tapez :

```
docker compose -f compose.dev.yml up -d
```

Ceci telecharge et demarre 5 services en arriere-plan :

| Service | Fonction | Adresse |
|---------|----------|---------|
| PostgreSQL | Base de donnees | localhost:5432 |
| Browserless | Generation de PDF | localhost:4000 |
| SeaweedFS | Stockage de fichiers | localhost:8333 |
| Mailpit | Capture des emails de test | [localhost:8025](http://localhost:8025) |
| Adminer | Panneau d'administration de la BDD | [localhost:8080](http://localhost:8080) |

La premiere fois, cela telecharge plusieurs images -- attendez la fin. Verifiez que tout fonctionne :

```
docker compose -f compose.dev.yml ps
```

Tous les services devraient afficher **"running"** ou **"healthy"**.

### Etape 8 -- Installer les dependances du projet

```
pnpm install
```

Ceci telecharge toutes les bibliotheques de code necessaires au projet. Attendez la fin de l'operation.

### Etape 9 -- Configurer la base de donnees

```
pnpm db:push
```

Ceci cree les tables de la base de donnees. Vous devriez voir une sortie se terminant par un message de succes.

### Etape 10 -- Demarrer l'application

```
pnpm dev
```

Attendez de voir un message indiquant que le serveur est pret sur le port 3000, puis ouvrez votre navigateur et allez sur :

**http://localhost:3000**

Vous devriez voir la page d'accueil de Reactive Resume Optimiser. Cliquez sur **Sign Up** pour creer votre compte.

> **Astuce :** Les emails de test (pour la verification du compte) sont captures par Mailpit. Ouvrez [http://localhost:8025](http://localhost:8025) pour les consulter.

### Arret et redemarrage

**Pour arreter l'application :** appuyez sur `Ctrl + C` dans l'Invite de commandes ou `pnpm dev` est en cours d'execution.

**Pour arreter les services en arriere-plan :**

```
docker compose -f compose.dev.yml down
```

**Pour tout redemarrer plus tard :**

1. Ouvrez Docker Desktop (attendez l'icone verte)
2. Ouvrez l'Invite de commandes
3. Naviguez vers le dossier du projet : `cd %USERPROFILE%\Documents\Customreactiveresume`
4. Demarrez les services : `docker compose -f compose.dev.yml up -d`
5. Demarrez l'application : `pnpm dev`
6. Ouvrez http://localhost:3000

### Depannage

| Probleme | Solution |
|----------|----------|
| Commande `docker` introuvable | Assurez-vous que Docker Desktop est en cours d'execution. Redemarrez l'Invite de commandes. |
| Commande `pnpm` introuvable | Relancez `corepack enable`. Redemarrez l'Invite de commandes. |
| Commande `node` introuvable | Reinstallez Node.js depuis [nodejs.org](https://nodejs.org/). Redemarrez l'Invite de commandes. |
| Port deja utilise | Un autre programme utilise ce port. Arretez-le, ou changez le port dans `.env`. |
| Les services Docker ne demarrent pas | Verifiez que Docker Desktop est en cours d'execution (icone verte). Essayez `docker compose -f compose.dev.yml down` puis `up -d` a nouveau. |
| `pnpm dev` affiche des erreurs | Assurez-vous que les etapes 7, 8 et 9 se sont terminees sans erreurs. Reessayez `pnpm install`. |
| Impossible d'acceder a localhost:3000 | Attendez que le serveur de developpement ait completement demarre. Verifiez les messages d'erreur dans le terminal. |
| Erreur de migration "relation already exists" | Les migrations sont idempotentes (`IF NOT EXISTS`). Si l'erreur persiste, executez `pnpm db:push` pour synchroniser le schema directement. |

---

## Installation sur macOS / Linux

<details>
<summary>Cliquez pour developper</summary>

### Prerequis

- **Node.js** 24+ -- [nodejs.org](https://nodejs.org/)
- **pnpm** -- `corepack enable && corepack prepare pnpm@latest --activate`
- **Docker** & Docker Compose -- [docs.docker.com/get-docker](https://docs.docker.com/get-docker/)
- **Git** -- [git-scm.com](https://git-scm.com/)

### Demarrage rapide

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

## Integration IA

Reactive Resume Optimiser utilise l'IA pour analyser des CV, parser des offres d'emploi, calculer des scores ATS et generer des lettres de motivation. Configurez un fournisseur IA pour activer ces fonctionnalites.

### Option A -- Groq (cloud, offre gratuite)

1. Creez un compte sur [console.groq.com](https://console.groq.com)
2. Allez dans **API Keys** > **Create API Key** > copiez la cle
3. Dans l'application : **Dashboard > Settings > AI**
4. Fournisseur : **Groq**, Modele : `llama-3.3-70b-versatile`, collez votre cle API
5. Cliquez sur **Test Connection**, puis activez les fonctionnalites IA

Modeles recommandes : `llama-3.3-70b-versatile` (meilleure qualite), `llama-3.1-8b-instant` (plus rapide).

> Votre cle API reste dans votre navigateur. Elle n'est jamais envoyee aux serveurs de l'application.

### Option B -- Ollama (local, entierement prive)

1. Telechargez Ollama depuis [ollama.ai/download](https://ollama.ai/download) et installez-le
2. Ouvrez l'Invite de commandes et executez :
   ```
   ollama pull llama3.2
   ```
3. Dans l'application : **Dashboard > Settings > AI**
4. Fournisseur : **Ollama (Local)**, Modele : `llama3.2`
5. Cliquez sur **Test Connection**, puis activez les fonctionnalites IA

Modeles : `llama3.2:1b` (~2 Go RAM), `llama3.2` (~4 Go), `llama3.1` (~8 Go, meilleure qualite).

---

## Utilisation de l'optimiseur de candidatures

### 1. Creer une candidature

1. Allez dans **Dashboard > Applications**
2. Cliquez sur **Nouvelle candidature**
3. Collez le texte de l'offre d'emploi (depuis APEC, HelloWork, LinkedIn, Indeed, ou tout autre site)
4. L'IA parse automatiquement l'offre et extrait : poste, entreprise, localisation, type de contrat, salaire, competences requises, nice-to-have
5. Selectionnez un CV existant a lier a cette candidature
6. Cliquez sur **Creer**

### 2. Analyser votre CV (score ATS)

1. Ouvrez une candidature
2. Allez dans l'onglet **Analyse IA**
3. Cliquez sur **Lancer l'analyse**
4. L'IA compare votre CV avec l'offre et fournit :
   - **Score global** (0-100) : correspondance mots-cles (50%), structure (25%), completude (25%)
   - **Mots-cles** : trouves / manquants avec synonymes detectes
   - **Lacunes** : competences manquantes par gravite (critique, moderee, mineure)
   - **Suggestions** : reformulations bloc par bloc avec texte original et proposition

### 3. Generer une lettre de motivation

1. Allez dans l'onglet **Lettre de motivation**
2. Ajoutez des instructions optionnelles (ton formel, mettre en avant telle experience, etc.)
3. Cliquez sur **Generer**
4. La lettre est generee avec un ton naturel et humain, sans formules generiques detectables par les filtres anti-IA

### 4. Creer un CV optimise

1. Apres l'analyse ATS, cliquez sur **Creer un CV optimise**
2. Un duplicata de votre CV est cree avec le nom de l'entreprise en suffixe
3. Modifiez ce CV dans le builder en suivant les suggestions de l'analyse

### 5. Suivre vos candidatures

L'onglet **Suivi** permet de :
- Changer le statut (brouillon, postule, entretien, test technique, offre, accepte, refuse, retire)
- Consulter l'historique des changements de statut
- Ajouter des notes et contacts
- Definir la prochaine action et sa date

---

## Commandes de developpement

```bash
pnpm dev              # Demarrer le serveur de developpement (port 3000)
pnpm build            # Compiler pour la production
pnpm start            # Demarrer le serveur de production
pnpm lint             # Linter avec Biome
pnpm typecheck        # Verification des types TypeScript
pnpm db:push          # Pousser les changements de schema
pnpm db:generate      # Generer les fichiers de migration
pnpm db:migrate       # Executer les migrations
pnpm db:studio        # Ouvrir Drizzle Studio
pnpm lingui:extract   # Extraire les chaines i18n
```

## Auto-hebergement avec Docker

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
# Modifiez .env avec les valeurs de production (vrai AUTH_SECRET, URLs appropriees)
docker compose up -d
```

Accessible sur http://localhost:3000.

## Contribuer

1. Forkez le depot
2. Creez une branche de fonctionnalite (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalite'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

[MIT](./LICENSE)
