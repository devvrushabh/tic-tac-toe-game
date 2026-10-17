# 🎮 Classic Tic-Tac-Toe Web Game

A complete, responsive, tabletop-inspired Tic-Tac-Toe web application inspired by [Gametable.org](https://gametable.org/games/tic-tac-toe/). Built with **React 19**, **TypeScript**, **Vite**, and **Vanilla CSS**.

![CI - Build & Test](https://github.com/devvrushabh/tic-tac-toe-game/actions/workflows/ci.yml/badge.svg)
![Deploy to Netlify](https://github.com/devvrushabh/tic-tac-toe-game/actions/workflows/deploy-netlify.yml/badge.svg)

---

## 🌟 Highlights & Features

- **Classic Tabletop Aesthetics**: Warm wooden stage frame, perfectly square 3×3 playing board, crisp grid lines, and classic board game typography.
- **Iconic Symbols & Animations**:
  - **Player X**: Vibrant Coral Red (`#F83157`) with spring pop-in animation.
  - **Player O**: Radiant Sky Blue (`#3BA8D7`) with smooth stroke drawing animation.
  - **Ties / Scratch**: Warm Golden Yellow (`#FAC72E`).
  - **Ghost Mark Preview**: Hovering over open cells displays a subtle ghost mark of the active turn.
  - **Animated Winning Strike**: An animated SVG strike-through line connects the three winning cells.
- **4 Distinct AI Difficulties**:
  - **Easy**: Makes mostly random legal moves.
  - **Medium**: Seizes immediate winning moves and blocks opponent threats.
  - **Hard**: Strong positional play (center, corners, forks) with a 10% human-like mistake rate.
  - **Expert (Minimax Algorithm)**: Mathematically optimal play with depth-discounting. **Guaranteed never to lose against optimal play.**
- **2-Player Local Pass & Play**: Play against friends on the same device with alternating turn tracking.
- **Alternating Starting Player**: Following Gametable rules, starting turns automatically alternate each round (X starts Game 1, O/AI starts Game 2, etc.) for balanced long-term play.
- **Synthesized Web Audio API**: Zero external audio downloads. Snappy wood placement clicks, resonant bell chimes, fanfare chords, and UI toggle effects synthesized directly in the browser.
- **Persistent Scoreboard**: Scores for Player 1, Player 2 / AI, and Ties are stored independently in `localStorage` per difficulty/mode. Includes a confirmation modal for safe score resets.
- **Accessibility & Responsive**: Full keyboard navigation (`Tab`, `Enter`, `Space`), ARIA live region announcements, and fluid scaling from mobile phones to 4K displays.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS with curated HSL/Hex tokens and CSS variables
- **Audio**: HTML5 Web Audio API
- **Testing**: Automated Node.js test suite for win conditions & Minimax verification
- **Deployment**: Netlify
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/devvrushabh/tic-tac-toe-game.git

# Navigate into the project directory
cd tic-tac-toe-game

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Automated Tests
```bash
npm test
```
Runs the test suite verifying all 8 winning combinations, tie detection, Medium AI blocking, and 100-game Minimax unbeatable validation.

### Production Build & Linting
```bash
npm run lint    # Run code linter
npm run build   # Compile TypeScript & bundle production assets into dist/
```

---

## 🌐 Netlify Deployment & CI/CD

### Automatic Continuous Deployment (Recommended)
This repository includes a [`netlify.toml`](./netlify.toml) configured for zero-configuration Netlify deployment:

1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize access to `devvrushabh/tic-tac-toe-game`.
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.
6. Every `git push` to `main` will automatically trigger a build and publish to your Netlify URL!

### GitHub Actions Deployment Workflow
Alternatively, you can deploy directly via GitHub Actions using the included [`.github/workflows/deploy-netlify.yml`](./.github/workflows/deploy-netlify.yml):
1. In your GitHub repository settings, go to **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `NETLIFY_AUTH_TOKEN`: Your personal access token from Netlify (User Settings > Applications > New access token).
   - `NETLIFY_SITE_ID`: The API ID of your Netlify site (Site configuration > General > Site details > API ID).
3. Any push to `main` will test, build, and deploy the production bundle to Netlify automatically.

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Lint, test, and build CI workflow
│       └── deploy-netlify.yml     # Continuous deployment to Netlify
├── public/
│   └── favicon.svg                # Custom SVG mark favicon
├── src/
│   ├── components/
│   │   ├── Footer.tsx             # Page footer with decorative curved arc
│   │   ├── GameBoard.tsx          # 3x3 grid & animated SVG winning strike line
│   │   ├── GameCell.tsx           # Cell with pop animations & ghost hover preview
│   │   ├── GameControls.tsx       # Mode switcher & 4 AI difficulty selectors
│   │   ├── GameOverModal.tsx      # Win/Draw banner with Play Again button
│   │   ├── Header.tsx             # Header with menu drawer, restart, reset & sound
│   │   ├── InfoSection.tsx        # How to Play, Features, Rules, & History
│   │   ├── NavigationDrawer.tsx   # Slide-out navigation menu
│   │   ├── ResetModal.tsx         # Score reset confirmation dialog
│   │   ├── Scoreboard.tsx         # Score cards with active turn pills
│   │   └── TurnIndicator.tsx      # Status bar with pulsing thinking animation
│   ├── hooks/
│   │   └── useLocalStorage.ts     # Generic localStorage persistence hook
│   ├── services/
│   │   ├── ai.ts                  # Easy, Medium, Hard, and Expert Minimax AI
│   │   ├── gameLogic.ts           # Win detection & move validation logic
│   │   └── sound.ts               # Web Audio API sound synthesizer
│   ├── tests/
│   │   └── game.test.cjs          # Automated test suite
│   ├── App.css                    # GameTable tabletop styling & animations
│   ├── App.tsx                    # Main game controller
│   ├── index.css                  # Base design tokens & CSS reset
│   ├── main.tsx                   # React root entrypoint
│   └── types.ts                   # TypeScript definitions
├── index.html                     # HTML root with SEO tags & Google Fonts
├── netlify.toml                   # Netlify build & redirect configuration
└── package.json                   # Scripts and project dependencies
```

---

## 📄 License
MIT © Classic Board Game Studio
