# Sufi Contemplative Tarot

A private-first reflection and journaling app built around the 78-card
**Culturally Inspired Contemplative Tarot** deck. One shared Expo codebase
targets **Android** and the **modern web**.

> For contemplation, not prediction, religious guidance, or claims about the unseen.

## What it does

- **Draw** — a one-card or three-card contemplative spread, deliberately or at random.
- **Read** — every card carries its theme, invitation, out-of-balance reflection,
  contemplation question, practice, intention, and visual meditation.
- **Journal** — write a private reflection that stays on your device.
- **Library** — browse, search, and filter all 78 cards.
- **About & Guide** — the deck's front matter, boundaries, and language/care notes.

No account, no network, no backend. Everything works offline; journal text is never
uploaded, analyzed, or used for analytics.

## Stack

- [Expo](https://expo.dev) + React Native + TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routes, shared Android/web)
- `expo-sqlite` (native) / IndexedDB (web) for on-device storage
- `expo-image` + `expo-haptics`

## Getting started

```bash
npm install
npm run web        # start the web dev server
npm run android    # start on an Android device/emulator
```

Build the static web bundle:

```bash
npm run build:web  # outputs to dist/
```

## Deploying to GitHub Pages

The app is hosted at `https://kurobunty.github.io/sufi-contemplative-tarot-app/`.
To redeploy after changes:

```bash
bash scripts/deploy_ghpages.sh
```

This exports the static build with `EXPO_BASE_URL=/sufi-contemplative-tarot-app`,
prefixes root-absolute asset URLs for the subpath, adds `.nojekyll`, and pushes
`dist/` to the `gh-pages` branch.

## Content pipeline

The app never parses the source DOCX at runtime. A build-time import normalizes the
deck into a validated, versioned JSON bundle:

```bash
npm run import:deck
```

This runs three scripts in order:

1. `scripts/import_deck.py` — reproduces `build_guidebook_revised.py`'s structured
   output, maps the 78 numbered card images to manifest cards, optimizes the art, and
   emits `src/content/deck-bundle.json` (with provenance checksums).
2. `scripts/gen_art.py` — generates the static `require()` map (`src/content/art.ts`).
3. `scripts/validate_deck.py` — asserts 78 unique cards, all seven reader sections per
   card, front-matter completeness, valid artwork status, and stable source checksums.

Source content lives in `C:\Users\User\Documents\Islamic_Contemplative_Deck`;
card art lives in `C:\AI\Sufi Tarot`. Only the 77 approved images are committed
(one card, `ARD_05`, currently renders as a designed placeholder).

## Repository layout

```text
app/ (expo-router: routes)     src/domain/       pure rules (draw, session, spreads)
src/app/                       routes            src/content/      deck bundle + loader + art map
src/components/                UI                src/storage/      sqlite (native) / indexeddb (web)
src/design/                    palette           src/platform/     random, haptics
scripts/                       content import    docs/decisions/   ADRs
```

## Privacy & cultural safeguards

- All journal content remains on-device; no trackers, ads, or analytics.
- The deck's boundary, language/title review status, and care notes are preserved in
  the in-app **About & Guide** section and remain visible before each reading.
- Transliteration and culturally sensitive copy are marked for fluent-speaker and
  culturally informed review before public release; the QA report's high-priority
  flags are part of the deck provenance.
