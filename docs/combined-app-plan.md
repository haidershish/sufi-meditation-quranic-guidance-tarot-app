# Combined app delivery plan

## One shared product

The repository contains exactly three primary tracks:

1. **Meditation** — a local catalog of every Khushaamdeed recording longer than 150 seconds. The manifest preserves source filename, duration, and candid status (`final`, `candidate`, `raw`, or `draft`).
2. **Tarot** — the existing 78-card reflection and private journal feature.
3. **Quranic Guidance** — a five-ayat window from one surah, selected only from a verified, source-attributed, structured Arabic and English bundle.

## Non-negotiable Quranic safeguards

- Never generate, paraphrase, or alter Quranic text with AI.
- Select exactly five verified, consecutive ayat without crossing a surah boundary.
- Display each ayah reference, Arabic, translation, and source attribution.
- Do not use this feature for prediction, a fatwa, or a claim about the unseen.
- Keep the source PDF as visual provenance; do not treat its OCR as canonical data.
- Require qualified Sufi Islamic scholar review of public-facing guidance copy before release.

## Delivery order

1. Validate all content manifests and domain algorithms locally.
2. Export static web assets, check GitHub Pages subpath routing, commit, push, and verify the live site.
3. Configure EAS profiles and test an Android internal build.
4. Test the same codebase on iOS through a development/preview build, then TestFlight when Apple signing is available.

## Deliberate MVP limits

- Meditation playback is foreground-only. Add background and lock-screen playback only after device testing.
- User accounts, cloud sync, analytics, and generated interpretations are out of scope.
- Quranic reflections remain ephemeral. Add private saved reflections only through a separate cross-platform storage record.
