# Sufi Meditation, Quranic Guidance, & Tarot

A private-first contemplative app with three equal paths: guided **Meditation**,
reflective **Tarot**, and respectful **Quranic Guidance**. One Expo + TypeScript
codebase targets the web, Android, and iOS.

## Paths

- **Meditation** — all Khushaamdeed audio recordings longer than 2.5 minutes, with
  their final, candidate, raw, or draft status shown honestly.
- **Tarot** — a 78-card contemplative deck for reflection and private journaling.
- **Quranic Guidance** — a randomly selected, verified window of five consecutive
  ayat from one surah, presented for reflection rather than prediction.

Quranic Guidance does not replace salah al-istikhara, qualified scholarship,
consultation, evidence, professional care, or personal responsibility. It does not
claim knowledge of the unseen. Product wording requires qualified Sufi Islamic
scholar review before public release.

## Run and deploy

```bash
npm ci
npm run web
npm test
npm run build:web
bash scripts/deploy_ghpages.sh
```

GitHub Pages: https://haidershish.github.io/sufi-meditation-quranic-guidance-tarot-app/

## Cross-platform shape

Shared Expo Router screens, domain rules, content bundles, and Sufi design tokens
are the default. Only storage and haptics are platform-specific. This keeps the web
build, Android package, and eventual iOS package on one codebase. See
[`docs/combined-app-plan.md`](docs/combined-app-plan.md) for delivery boundaries.
