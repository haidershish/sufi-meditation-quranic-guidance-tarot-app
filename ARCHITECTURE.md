# Contemplative Deck App — Architecture

> Historical Tarot architecture retained for provenance. The current product is
> **Sufi Meditation, Quranic Guidance, & Tarot**; its three-track delivery
> boundary and Quranic safeguards are defined in
> [`docs/combined-app-plan.md`](docs/combined-app-plan.md), which takes precedence.

Status: Proposed for approval  
Targets: Android and modern web browsers  
Source content: `C:\Users\User\Documents\Islamic_Contemplative_Deck`

Canonical editorial source: `Culturally_Inspired_Contemplative_Tarot_Guidebook_78_Cards.docx`

## 1. Product boundary

This product is a private-first reflection and journaling app built around the 78-card Islamic-inspired contemplative deck. It is not a religious authority, a fortune-telling system, or a source of claims about the unseen.

The first release should let a person:

1. choose a one-card or three-card contemplative spread;
2. draw cards deliberately or at random;
3. reveal each card and read its invitation, out-of-balance reflection, contemplation question, practice, and intention;
4. write a private journal response;
5. revisit past sessions and browse the complete deck; and
6. use the core experience without an account or network connection.

Out of scope for the first release: predictive readings, reversed-card fortune meanings, public/community readings, payments, messaging, AI interpretation, and religious rulings.

## 2. Architecture decision

Use **Expo + React Native + TypeScript**, with **Expo Router** for both Android and web.

Why this stack:

- one shared application, navigation model, design system, and domain layer;
- native Android packaging through Expo Application Services (EAS);
- responsive browser output from the same routes;
- strong support for touch gestures, animation, haptics, accessibility, and offline assets;
- platform-specific implementations can be introduced behind small interfaces when native and web behavior genuinely differ.

This replaces the interrupted web-only Sites scaffold currently present as uncommitted files. No scaffold code should be committed before the repository is reinitialized for Expo.

## 3. System shape

```text
Deck source package
  revised guidebook + manifest JSON + QA report + approved PNG artwork
                         |
                         v
             validated content import
                         |
                         v
        versioned, read-only deck bundle
                         |
            +------------+------------+
            |                         |
            v                         v
    shared domain services      shared UI/routes
    draw/session/journal        Android + Web
            |                         |
            +------------+------------+
                         |
                         v
              local storage adapter
             SQLite native / IndexedDB web
                         |
                         v
          optional sync API in a later release
```

The deck bundle is immutable application content. Sessions, favorites, preferences, and journal entries are mutable user data. They must never be mixed in the same store or migration lifecycle.

## 4. Repository layout

```text
/
  app/                         Expo Router routes
    _layout.tsx
    index.tsx                  Home and quick draw
    draw/
      index.tsx                Spread selection and intention
      session.tsx              Shuffle, reveal, reflect
    library/
      index.tsx                Search and filter all cards
      [cardId].tsx             Card detail
    journal/
      index.tsx                Session history
      [sessionId].tsx          Saved reading and entry
    settings.tsx
  src/
    components/                Reusable product UI
    features/                  Draw, library, journal, onboarding
    domain/                    Pure card, spread, session rules
    content/                   Generated deck bundle and schema
    storage/                   Storage interfaces and adapters
    design/                    Tokens, type, spacing, motion
    platform/                  Haptics, sharing, safe-area helpers
  assets/
    cards/                     Approved optimized card art
    fonts/
  scripts/
    import-deck.ts             Source-to-app content normalization
    validate-deck.ts           IDs, count, fields, assets, duplicates
  tests/
    domain/
    content/
    e2e/
  docs/
    decisions/                 Architecture Decision Records
  app.config.ts
  eas.json
  package.json
```

Feature modules may import `domain`, `storage`, `content`, `design`, and `platform`. Domain code must not import screens, Expo APIs, or storage implementations.

## 5. Application layers

### Presentation

Expo Router screens and feature components. The visual system should take its cues from the deck: deep indigo, muted teal, terracotta, ivory, silver, and restrained gold. Card artwork remains the focal point; ornament is quiet and geometric. The layouts are responsive rather than merely stretched between phone and desktop.

### Domain

Pure TypeScript types and functions for:

- seeded, non-repeating draws;
- spread definitions and card positions;
- session lifecycle (`draft -> revealed -> reflected -> saved`);
- journaling rules and validation; and
- content-version compatibility.

Random draws use the platform cryptographic random source. A session stores the selected card IDs and order immediately so navigation or restart cannot silently change a reading.

### Content

A build-time import converts the existing deck package into a checked, app-safe JSON bundle. Runtime code never parses DOCX files or reads the external source directory.

The source files have distinct, explicit responsibilities:

| Source | Role in the app |
| --- | --- |
| `Culturally_Inspired_Contemplative_Tarot_Guidebook_78_Cards.docx` | Canonical, reader-facing editorial content: front matter, usage guidance, boundaries, language/cultural-care notes, and the complete interpretation for every card. |
| `build_guidebook_revised.py` | Structured derivation source for the guidebook prose. The importer should consume or reproduce its structured outputs rather than scrape page layout from DOCX when possible. |
| `Culturally_Inspired_Contemplative_Tarot_Guidebook_QA_Report.md` | Publication gate and review metadata. Its flagged titles/subtitles must remain visibly unresolved in editorial tooling and must block a public release until disposition is recorded. |
| `islamic_contemplative_deck_manifest.json` | Stable card identity, ordering, suit/rank taxonomy, titles, transliterations, themes, visual prompts, and generation metadata. It is not the canonical source for public positioning or interpretation copy. |
| `pilot_outputs/*.png` | Candidate artwork. An image becomes app-visible final art only after explicit approval and asset optimization. |

The app must preserve and present the guidebook's introductory material. “About this deck,” “How to use the cards,” “Boundaries,” “Language and titles,” and “A note on care” become an in-app **About & Guide** section. The shorter contextual boundary remains available from each reading without replacing the full guidebook text.

Every runtime card record includes the guidebook's seven reader-facing sections:

```ts
type CardGuide = {
  theme: string;
  invitation: string;
  outOfBalance: string;
  contemplate: string;
  practice: string;
  intention: string;
  visualMeditation: string;
};

type DeckCard = {
  id: string;
  arcana: string;
  suit?: string;
  rank: string;
  title: string;
  transliteration: string;
  guide: CardGuide;
  artwork: {
    status: "approved" | "placeholder" | "missing";
    assetKey?: string;
    sourceChecksum?: string;
  };
  editorialReview: {
    status: "approved" | "flagged" | "blocked";
    notes?: string[];
  };
};
```

The importer must:

- require exactly 78 unique card IDs;
- normalize arcana, suit, rank, title, transliteration, and all seven guidebook sections;
- preserve the source card ID as the permanent key;
- attach an explicit artwork status (`approved`, `placeholder`, or `missing`);
- attach QA flags and prevent unresolved high-priority language/cultural issues from silently disappearing;
- reject missing required copy, duplicate IDs, unsafe paths, or malformed dimensions; and
- emit a `deckVersion` plus separate checksums for the manifest, guidebook content, QA report, and artwork map.

The generated bundle should contain provenance so a release can state exactly which guidebook and QA revision it includes. Tests compare the normalized content against all 78 guidebook entries and require exactly one each of `theme`, `invitation`, `outOfBalance`, `contemplate`, `practice`, `intention`, and `visualMeditation` per card.

Only the six current pilot images are approved artwork. The remaining cards should use an intentional branded card-back/placeholder until their art passes QA; draft generated images must not be presented as final.

### Persistence

Define one `JournalRepository` interface and two adapters:

- Android: `expo-sqlite`;
- Web: IndexedDB through a small adapter.

Persist only user-created state. Store preferences separately from journal records. Journal text is private by default, is not used for analytics, and is never uploaded in the first release.

Core records:

```ts
type ReadingSession = {
  id: string;
  createdAt: string;
  completedAt?: string;
  spreadId: "single" | "three-card";
  intention?: string;
  deckVersion: string;
  cards: Array<{ cardId: string; position: string; order: number }>;
  journalText?: string;
};

type UserPreferences = {
  reduceMotion: boolean;
  haptics: boolean;
  textScale: "default" | "large";
  theme: "system" | "light" | "dark";
};
```

No account system or backend is required for the MVP. A later sync service can implement the same repository contract with encrypted transport and explicit opt-in.

## 6. Main flows

### Draw

Home -> choose spread -> optionally set an intention -> shuffle -> reveal -> read and reflect -> journal -> save.

The one-card flow should be possible from the first viewport with one primary action. Three-card positions should use neutral reflection language such as `What is present`, `What needs attention`, and `What may support the next step`.

### Library

Browse all 78 cards, filter by Core Arcana or suit, search English title/transliteration/theme, and open a shareable card-detail route on the web. The app should clearly distinguish approved art from placeholders.

Each card detail renders the complete guidebook entry, including its visual meditation. The library also links to the guidebook front matter and cultural/editorial status where relevant.

### Journal

Show saved sessions newest-first. A user can reopen, edit their own note, or delete a session with confirmation. Export can be added after the MVP storage model is stable.

## 7. Cross-platform rules

- Shared route and feature code is the default.
- Platform files (`*.native.ts`, `*.web.ts`) are reserved for storage, sharing, haptics, and other genuine platform differences.
- Android uses native back behavior, safe areas, haptics, and share sheets.
- Web uses responsive multi-column layouts, keyboard focus, browser history, and URL-addressable detail pages.
- Every primary action must work with touch and keyboard.
- Respect reduced motion, dynamic text sizing, contrast, and screen-reader labels.
- Card-reveal motion must not conceal content or block users who disable animation.

## 8. State and dependencies

- Use React component state for transient UI.
- Use a small context/reducer for the active draw session.
- Use repository queries for persisted sessions.
- Avoid a global state library until state actually spans unrelated features.
- Use `zod` at the content-import and persistence boundaries.
- Use React Native Reanimated for card motion and Expo Haptics on Android.
- Do not add a networking/cache library in the offline-only MVP.

## 9. Security, privacy, and cultural safeguards

- All journal content remains on-device in the MVP.
- No advertising SDKs, behavioral analytics, or third-party trackers.
- Crash reporting, if later enabled, must redact journal content and intentions.
- Display the contemplative-use boundary in onboarding, settings, and reading details without interrupting every draw.
- Preserve the source package's prohibition on generated Quranic text, pseudo-Arabic lettering, sacred-person depictions, and doctrinal claims.
- Transliteration and culturally sensitive copy remain marked for fluent-speaker and culturally informed review before publication.
- High-stakes decisions should be accompanied by a brief reminder to use evidence, direct conversation, and appropriate professional advice.

## 10. Testing strategy

- Unit tests: draw uniqueness, seeded repeatability in tests, spread positions, state transitions, migrations.
- Content tests: 78 unique cards, all seven guidebook sections per card, front-matter completeness, QA-flag mapping, valid schema, asset mapping, and stable source checksums.
- Component tests: reveal controls, journaling, empty/error states, accessibility labels.
- End-to-end: one-card draw and save on Android emulator and Chromium; three-card draw; reload/resume; delete session.
- Visual checks: phone, small tablet, and desktop breakpoints; light/dark mode; large text; reduced motion.
- Release gate: production web build, Android internal build, fresh-install smoke test, offline smoke test, and content QA report.

## 11. Delivery and deployment

### Web

Export the Expo web application as static assets and deploy to a CDN-backed host. Configure route fallbacks for Expo Router, immutable caching for versioned card images, and short caching for the application shell.

### Android

Use EAS Build with separate `development`, `preview`, and `production` profiles. Start with an internal APK for testing, then produce an Android App Bundle for Play Store release. Package IDs, signing credentials, and store listing assets are release configuration, not source content.

### Updates

JavaScript and content-only fixes may use EAS Update after the native baseline is installed. Native dependency changes require a new Android build. A new deck bundle must increment `deckVersion`; saved sessions continue resolving cards by stable card ID.

## 12. Git workflow

The repository currently has no commits. Establish it deliberately:

1. remove the interrupted web-only scaffold;
2. create the Expo project in this repository;
3. add `ARCHITECTURE.md` and an initial ADR for the Expo decision;
4. commit the clean baseline;
5. develop in short-lived branches using the `codex/` prefix;
6. merge only after web and Android checks pass.

Recommended initial history:

```text
chore: initialize cross-platform Expo application
docs: define contemplative deck architecture
feat: import and validate deck content
feat: add offline draw and reveal flow
feat: add private journal persistence
feat: add deck library and responsive web layouts
```

Do not commit source-generation caches, unapproved bulk outputs, signing keys, local environment files, build artifacts, or private journal exports. Approved optimized art is committed or moved to managed asset hosting only after the asset strategy is measured against repository size.

## 13. Implementation phases

### Phase 0 — foundation

Approve this architecture, replace the interrupted scaffold with Expo, establish Git history, design tokens, linting, tests, and build profiles.

### Phase 1 — recognizable vertical slice

Import the manifest and complete revised guidebook, expose the About & Guide material, implement one-card draw/reveal/read with all seven card sections, integrate one approved pilot image plus intentional placeholders, and verify on Android and web.

### Phase 2 — complete MVP

Add three-card spreads, journal storage/history, full library/search, remaining approved art, onboarding, accessibility, offline behavior, and deletion flows.

### Phase 3 — release

Complete cultural/language review, privacy copy, device/browser matrix, internal Android distribution, web deployment, and store preparation.

## 14. Decisions requiring approval

The proposed defaults are:

- single Expo codebase rather than a web app wrapped with Capacitor;
- no backend or sign-in for the MVP;
- local-only private journaling;
- one-card and three-card contemplative spreads;
- approved pilot art plus designed placeholders until all 78 images pass QA; and
- static web hosting plus EAS for Android builds.

Once these are accepted, Phase 0 can begin without further architecture choices.
