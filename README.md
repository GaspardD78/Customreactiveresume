<div align="center">
  <a href="https://rxresu.me">
    <img src="public/opengraph/banner.jpg" alt="Reactive Resume" />
  </a>

  <h1>Reactive Resume</h1>

  <p>Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.</p>

  <p>
    <a href="https://rxresu.me"><strong>Get Started</strong></a>
    ·
    <a href="https://docs.rxresu.me"><strong>Learn More</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/github/package-json/v/amruthpillai/reactive-resume?style=flat-square" alt="Reactive Resume version">
    <img src="https://img.shields.io/github/stars/amruthpillai/Reactive-Resume?style=flat-square" alt="GitHub Stars">
    <img src="https://img.shields.io/github/license/amruthpillai/Reactive-Resume?style=flat-square" alt="License" />
    <img src="https://img.shields.io/docker/pulls/amruthpillai/reactive-resume?style=flat-square" alt="Docker Pulls" />
    <a href="https://discord.gg/EE8yFqW4"><img src="https://img.shields.io/discord/1173518977851473940?style=flat-square&label=discord" alt="Discord" /></a>
    <a href="https://crowdin.com/project/reactive-resume"><img src="https://badges.crowdin.net/reactive-resume/localized.svg?style=flat-square" alt="Crowdin" /></a>
    <a href="https://github.com/sponsors/AmruthPillai"><img src="https://img.shields.io/github/sponsors/AmruthPillai?style=flat-square&label=sponsors" alt="Sponsors" /></a>
    <a href="https://opencollective.com/reactive-resume"><img src="https://img.shields.io/opencollective/backers/reactive-resume?style=flat-square&label=donations" alt="Donations" /></a>
  </p>
</div>

---

Reactive Resume makes building resumes straightforward. Pick a template, fill in your details, and export to PDF—no account required for basic use. For those who want more control, the entire application can be self-hosted on your own infrastructure.

Built with privacy as a core principle, Reactive Resume gives you complete ownership of your data. The codebase is fully open-source under the MIT license, with no tracking, no ads, and no hidden costs.

## Features

**Resume Building**

- Real-time preview as you type
- Multiple export formats (PDF, JSON)
- Drag-and-drop section ordering
- Custom sections for any content type
- Rich text editor with formatting support

**Templates**

- Professionally designed templates
- A4 and Letter size support
- Customizable colors, fonts, and spacing
- Custom CSS for advanced styling

**Privacy & Control**

- Self-host on your own infrastructure
- No tracking or analytics by default
- Full data export at any time
- Delete your data permanently with one click

**Extras**

- AI integration (Groq, Ollama/Llama 3.2, OpenAI, Google Gemini, Anthropic Claude)
- Multi-language support
- Share resumes via unique links
- Import from JSON Resume format
- Dark mode support
- Passkey and two-factor authentication

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

## Installation - Step by Step

### Prerequisites

| Tool | Version | Installation |
|------|---------|-------------|
| **Node.js** | 24+ | [nodejs.org](https://nodejs.org/) |
| **pnpm** | 10.28+ | `corepack enable && corepack prepare pnpm@latest --activate` |
| **Docker** & Docker Compose | Latest | [docs.docker.com](https://docs.docker.com/get-docker/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### Step 1 - Clone the Repository

```bash
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
```

### Step 2 - Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and verify these values (defaults work for local development):

```bash
# Application URL
APP_URL="http://localhost:3000"

# PostgreSQL connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Authentication secret (generate a real one for production)
AUTH_SECRET="change-me-to-a-secure-secret-key-in-production"

# PDF Printer service
PRINTER_ENDPOINT="ws://localhost:4000?token=1234567890"
```

> For production, generate `AUTH_SECRET` with: `openssl rand -hex 32`

### Step 3 - Start Infrastructure Services

```bash
docker compose -f compose.dev.yml up -d
```

This starts the following services:

| Service | Port | Purpose |
|---------|------|---------|
| **PostgreSQL** | 5432 | Database |
| **Browserless** | 4000 | PDF generation (headless Chromium) |
| **SeaweedFS** | 8333 | S3-compatible file storage |
| **Mailpit** | 1025 / 8025 | Email testing (SMTP + web UI) |
| **Adminer** | 8080 | Database management UI |

Verify all services are healthy:

```bash
docker compose -f compose.dev.yml ps
```

### Step 4 - Install Dependencies

```bash
pnpm install
```

### Step 5 - Run Database Migrations

```bash
pnpm db:push
```

### Step 6 - Start the Development Server

```bash
pnpm dev
```

The application is now available at **http://localhost:3000**.

### Step 7 - Create Your Account

1. Open http://localhost:3000
2. Click **Sign Up** to create a local account
3. (Mailpit captures verification emails at http://localhost:8025)

---

## AI Integration - Groq API

[Groq](https://groq.com) provides ultra-fast LLM inference. It's used here to parse PDF/DOCX resumes into structured data.

### Step 1 - Get a Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to **API Keys** in the left sidebar
4. Click **Create API Key** and copy it

### Step 2 - Configure in Reactive Resume

1. In the app, go to **Dashboard > Settings > AI**
2. Select **Groq** as the provider
3. Enter a model name: `llama-3.3-70b-versatile` (recommended) or `llama-3.1-8b-instant` (faster)
4. Paste your Groq API Key
5. Leave Base URL empty (defaults to `https://api.groq.com/openai/v1`)
6. Click **Test Connection** - a green checkmark should appear
7. Toggle **Enable AI Features** to ON

### Step 3 - Use It

1. Go to **Dashboard > Resumes**
2. Click **Import** (or the + button)
3. Select **PDF** or **Microsoft Word** as the type
4. Upload your resume file
5. The AI will parse it and create a structured resume

### Available Groq Models

| Model | Speed | Context | Best For |
|-------|-------|---------|----------|
| `llama-3.3-70b-versatile` | Fast | 128k | Best quality for resume parsing |
| `llama-3.1-8b-instant` | Ultra-fast | 128k | Quick results, lighter resumes |
| `mixtral-8x7b-32768` | Fast | 32k | Good alternative |

> Your API key is stored **locally in your browser** (localStorage). It is never sent to Reactive Resume servers - only directly to Groq's API.

---

## AI Integration - Ollama (Local / Llama 3.2)

[Ollama](https://ollama.ai) lets you run LLMs locally on your machine. No API key needed, fully private.

### Step 1 - Install Ollama

**macOS / Linux:**

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**macOS (Homebrew):**

```bash
brew install ollama
```

**Windows:**

Download the installer from [ollama.ai/download](https://ollama.ai/download).

### Step 2 - Start Ollama & Pull a Model

```bash
# Start the Ollama server (runs on port 11434)
ollama serve

# In a new terminal, pull Llama 3.2
ollama pull llama3.2
```

> Available Llama 3.2 variants: `llama3.2` (3B, default), `llama3.2:1b` (1B, faster), `llama3.1` (8B, more capable)

Verify the model is installed:

```bash
ollama list
```

### Step 3 - Configure in Reactive Resume

1. In the app, go to **Dashboard > Settings > AI**
2. Select **Ollama (Local)** as the provider
3. Enter the model name: `llama3.2`
4. No API key is needed (the field is hidden for Ollama)
5. Leave Base URL empty (defaults to `http://localhost:11434`)
6. Click **Test Connection** - a green checkmark should appear
7. Toggle **Enable AI Features** to ON

### Step 4 - Use It

Same as Groq: **Dashboard > Resumes > Import > PDF or Word** - the file is parsed locally by your Ollama instance.

### Recommended Ollama Models

| Model | RAM Required | Speed | Quality |
|-------|-------------|-------|---------|
| `llama3.2:1b` | ~2 GB | Fastest | Basic parsing |
| `llama3.2` (3B) | ~4 GB | Fast | Good for most resumes |
| `llama3.1` (8B) | ~8 GB | Moderate | Best quality |

### Docker + Ollama

If Reactive Resume runs in Docker and Ollama runs on the host, use this Base URL instead:

```
http://host.docker.internal:11434
```

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | TanStack Start (React 19, Vite) |
| Runtime | Node.js |
| Language | TypeScript |
| Database | PostgreSQL with Drizzle ORM |
| API | ORPC (Type-safe RPC) |
| Auth | Better Auth |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI |
| State Management | Zustand + TanStack Query |
| AI SDK | Vercel AI SDK (ai) |
| AI Providers | Groq, Ollama, OpenAI, Anthropic, Google Gemini, Vercel AI Gateway |

## Development Commands

```bash
pnpm dev              # Start dev server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Lint with Biome
pnpm typecheck        # TypeScript type checking
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes directly
pnpm db:studio        # Open Drizzle Studio
pnpm lingui:extract   # Extract i18n strings
```

## Project Structure

```
src/
  components/         # React components (resume templates, UI)
  routes/             # File-based routing (TanStack Router)
    dashboard/        # User dashboard & settings
      settings/ai.tsx # AI provider configuration page
    builder/          # Resume editor
    auth/             # Authentication pages
  integrations/
    ai/               # AI store & prompts
    orpc/
      router/ai.ts    # AI API endpoints
      services/ai.ts  # AI service (model factory, parsing)
    drizzle/          # Database schema & client
    auth/             # Better Auth config
  schema/             # Zod validation schemas
```

## Self-Hosting with Docker

For production deployments:

```bash
# Clone and configure
git clone https://github.com/GaspardD78/Customreactiveresume.git
cd Customreactiveresume
cp .env.example .env
# Edit .env with production values (real AUTH_SECRET, proper URLs, etc.)

# Start all services
docker compose up -d

# Access at http://localhost:3000
```

The production stack includes PostgreSQL, Browserless (PDF printer), and SeaweedFS (file storage).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](./LICENSE)
