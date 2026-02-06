<div align="center">

  <h1>Custom Reactive Resume</h1>

  <p>A free, open-source resume builder. Create, update, and share your resume easily.</p>

</div>

---

## What is Reactive Resume?

Reactive Resume lets you build professional resumes with a real-time preview. Pick a template, fill in your details, export to PDF. No account required for basic use.

**Key features:** multiple templates, drag-and-drop sections, PDF/JSON export, AI-powered resume import, dark mode, multi-language support, self-hosting.

Privacy-first: open-source (MIT), no tracking, no ads, your data stays yours.

## Templates

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

## Installation on Windows (step by step)

This guide is for **Windows 10 or 11**. No prior technical knowledge is needed. Follow each step in order.

### Step 1 — Install Git

Git is a tool that downloads the project code.

1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. Click **"Click here to download"** — the installer downloads automatically
3. Run the installer (`.exe` file)
4. Click **Next** on every screen — the default options are fine
5. Click **Install**, then **Finish**

**Check it works:** open the **Start menu**, type `cmd`, open **Command Prompt**, and type:

```
git --version
```

You should see something like `git version 2.xx.x`. If so, Git is installed.

### Step 2 — Install Node.js

Node.js runs the application code.

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (the big green button on the left)
3. Run the installer (`.msi` file)
4. Click **Next** on every screen — keep all defaults
5. **Important:** on the "Tools for Native Modules" screen, check the box **"Automatically install the necessary tools"** if it appears
6. Click **Install**, then **Finish**

**Check it works:** close and reopen Command Prompt, then type:

```
node --version
```

You should see `v24.x.x` or higher.

### Step 3 — Enable pnpm

pnpm is the package manager used by this project. It comes bundled with Node.js, you just need to enable it.

Open Command Prompt and type:

```
corepack enable
corepack prepare pnpm@latest --activate
```

**Check it works:**

```
pnpm --version
```

You should see a version number like `10.x.x`.

### Step 4 — Install Docker Desktop

Docker runs the database and other services the application needs.

1. Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Click **"Download for Windows"**
3. Run the installer
4. When asked, keep **"Use WSL 2 instead of Hyper-V"** checked (recommended)
5. Click **OK**, then let it install
6. **Restart your computer** when prompted
7. After restart, Docker Desktop opens automatically. Accept the terms of service
8. Wait until the bottom-left indicator in Docker Desktop shows **"Engine running"** (green icon)

> **Note:** If Docker asks you to install or update WSL 2, follow the link it gives you, install the update, then restart again.

**Check it works:** open Command Prompt and type:

```
docker --version
```

You should see `Docker version 2x.x.x`.

### Step 5 — Download the project

Open Command Prompt. Choose where you want the project folder (for example, your Documents folder):

```
cd %USERPROFILE%\Documents
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
```

This creates a folder called `Customreactiveresume` with all the project files.

### Step 6 — Configure the environment file

The project needs a configuration file called `.env`.

```
copy .env.example .env
```

That's it. The default values work for local development — no need to change anything.

> **For advanced users:** open `.env` in a text editor (Notepad works) if you want to customize settings. For production, replace `AUTH_SECRET` with a strong random key.

### Step 7 — Start the services (database, etc.)

Make sure **Docker Desktop is running** (check the green icon in the system tray), then type:

```
docker compose -f compose.dev.yml up -d
```

This downloads and starts 5 services in the background:

| Service | What it does | Address |
|---------|-------------|---------|
| PostgreSQL | Database | localhost:5432 |
| Browserless | Generates PDFs | localhost:4000 |
| SeaweedFS | File storage | localhost:8333 |
| Mailpit | Captures test emails | [localhost:8025](http://localhost:8025) |
| Adminer | Database admin panel | [localhost:8080](http://localhost:8080) |

The first time, this downloads several images — wait for it to finish. Check everything is running:

```
docker compose -f compose.dev.yml ps
```

All services should show **"running"** or **"healthy"**.

### Step 8 — Install project dependencies

```
pnpm install
```

This downloads all the code libraries the project needs. Wait for it to finish.

### Step 9 — Set up the database

```
pnpm db:push
```

This creates the database tables. You should see output ending with a success message.

### Step 10 — Start the application

```
pnpm dev
```

Wait until you see a message indicating the server is ready on port 3000, then open your browser and go to:

**http://localhost:3000**

You should see the Reactive Resume homepage. Click **Sign Up** to create your account.

> **Tip:** Test emails (for account verification) are captured by Mailpit. Open [http://localhost:8025](http://localhost:8025) to see them.

### Stopping and restarting

**To stop the application:** press `Ctrl + C` in the Command Prompt where `pnpm dev` is running.

**To stop the background services:**

```
docker compose -f compose.dev.yml down
```

**To restart everything later:**

1. Open Docker Desktop (wait for the green icon)
2. Open Command Prompt
3. Navigate to the project folder: `cd %USERPROFILE%\Documents\Customreactiveresume`
4. Start services: `docker compose -f compose.dev.yml up -d`
5. Start the app: `pnpm dev`
6. Open http://localhost:3000

### Troubleshooting

| Problem | Solution |
|---------|----------|
| `docker` command not found | Make sure Docker Desktop is running. Restart Command Prompt. |
| `pnpm` command not found | Run `corepack enable` again. Restart Command Prompt. |
| `node` command not found | Reinstall Node.js from [nodejs.org](https://nodejs.org/). Restart Command Prompt. |
| Port already in use | Another program is using that port. Stop it, or change the port in `.env`. |
| Docker services won't start | Check Docker Desktop is running (green icon). Try `docker compose -f compose.dev.yml down` then `up -d` again. |
| `pnpm dev` shows errors | Make sure Step 7, 8, and 9 completed without errors. Try `pnpm install` again. |
| Can't access localhost:3000 | Wait for the dev server to fully start. Check the terminal for error messages. |

---

## Installation on macOS / Linux

<details>
<summary>Click to expand</summary>

### Prerequisites

- **Node.js** 24+ — [nodejs.org](https://nodejs.org/)
- **pnpm** — `corepack enable && corepack prepare pnpm@latest --activate`
- **Docker** & Docker Compose — [docs.docker.com/get-docker](https://docs.docker.com/get-docker/)
- **Git** — [git-scm.com](https://git-scm.com/)

### Quick start

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
docker compose -f compose.dev.yml up -d
pnpm install
pnpm db:push
pnpm dev
```

Open http://localhost:3000.

</details>

---

## AI Integration (optional)

Reactive Resume can use AI to parse PDF/Word resumes into structured data. Two options:

### Option A — Groq (cloud, free tier)

1. Create an account at [console.groq.com](https://console.groq.com)
2. Go to **API Keys** > **Create API Key** > copy it
3. In the app: **Dashboard > Settings > AI**
4. Provider: **Groq**, Model: `llama-3.3-70b-versatile`, paste your API key
5. Click **Test Connection**, then enable AI features

Recommended models: `llama-3.3-70b-versatile` (best quality), `llama-3.1-8b-instant` (faster).

> Your API key stays in your browser. It is never sent to Reactive Resume servers.

### Option B — Ollama (local, fully private)

1. Download Ollama from [ollama.ai/download](https://ollama.ai/download) and install it
2. Open Command Prompt and run:
   ```
   ollama pull llama3.2
   ```
3. In the app: **Dashboard > Settings > AI**
4. Provider: **Ollama (Local)**, Model: `llama3.2`
5. Click **Test Connection**, then enable AI features

Models: `llama3.2:1b` (~2 GB RAM), `llama3.2` (~4 GB), `llama3.1` (~8 GB, best quality).

---

## Development Commands

```bash
pnpm dev              # Start dev server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Lint with Biome
pnpm typecheck        # TypeScript type checking
pnpm db:push          # Push schema changes
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
pnpm lingui:extract   # Extract i18n strings
```

## Self-Hosting with Docker

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
# Edit .env with production values (real AUTH_SECRET, proper URLs)
docker compose up -d
```

Access at http://localhost:3000.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

[MIT](./LICENSE)
