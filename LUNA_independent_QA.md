# LUNA independent Sufi Tarot image QA

Reviewed 8 September 2026. This is an independent pass over the 91 byte-unique images in `qa_contact_sheets/inventory.tsv` (98 files total), using the six contact sheets, targeted full-resolution inspections, the 0–77 deck manifest, `src/content/deck-bundle.json`, `scripts/import_deck.py`, and the visual-prompt manuscript. No source images were changed.

## Bottom line

- The deck has one hard canonical artwork gap: **manifest index 68 / ARD_05 / Five of Ard**. It is currently `missing` in `src/content/deck-bundle.json`.
- **70.png is not a missing card**: the importer intentionally maps bare `70.png` to index 69 / ARD_06 / Six of Ard because bare numbers are 1-based.
- `78.jpeg` is likewise not an extra under the current importer: it maps to index 77 / ARD_SAGE. It is, however, a poor semantic assignment for Sage of Ard (empty pavilion, no sage or institution) and has an outlier border/aspect ratio.
- I would block shipping **16 canonical visual assignments plus the missing ARD_05**. I would review another 15 canonical/orphan alternatives if the goal is a uniformly subtle, metaphysical deck.
- The prior QA was directionally right about counted suit objects, but it undercalled **U012, U025, U029, U030, U072, and U085**, and it did not call out the clear **Four of Noor count mismatch in U067**. It also treated several orphan alternatives as if they were canonical.

## Tier A — block shipping / redo or replace

These are the smallest high-confidence set. They fail by literal arithmetic, wrong card identity, severe prompt violation, or a combination.

| UID | Current/canonical identity | Finding | Action |
|---|---|---|---|
| — | **ARD_05, index 68, Five of Ard** | No canonical source is mapped. U033 is a plausible orphan candidate, but it is not linked to the manifest and contains a pentagram-like stained-glass motif. | Supply a verified replacement; U033 may be cleaned, reframed, and explicitly assigned only after review. |
| U012 | QALAM_07, Seven of Qalam | Seven pens are lined up as the card's main visual; the figure's face is veiled despite the prompt requiring a readable face. This is exactly the arithmetic failure the project is trying to avoid. | Redo. |
| U013 | QALAM_08, Eight of Qalam | Eight flying sheets dominate; each carries diagram/pseudo-writing marks, also violating the no-writing/no-glyph requirement. | Redo. |
| U016 | QALAM_10, Ten of Qalam | A huge, mechanically countable stack of rolls is the image. The porter is mostly turned away, so burden is literal rather than psychologically or philosophically developed. | Redo. |
| U025 | ARD_09, Nine of Ard | A portrait surrounded by many large coin discs embedded in a tree. The discs carry five-point/pentagram-like marks, contrary to the deck's negative prompt; abundance is reduced to repeated tokens. | Redo. |
| U029 | ARD_GUARDIAN, Guardian of Ard | A seated man clutches a giant coin, with coins beneath both feet and another above him. It reads as possession/coin worship, not protection of shared resources or reliable labor. | Redo or reassign only after a manifest decision. |
| U030 | ARD_SAGE, Sage of Ard | Empty garden pavilion with no elder, builder, patronage, or institution. The 1536x2752 red-framed image is also a major style/aspect outlier. | Redo or reassign; do not use as Sage of Ard. |
| U034 | Orphan alternative, coin artisan | Eight oversized pentagram-like coins mounted on a wall; pure counted display and occult-looking symbol contamination. | Quarantine; do not promote. |
| U035 | Orphan alternative, coin/vine scene | Seven oversized pentagram-like coins placed on a vine; exact-count composition with no independent metaphor. | Quarantine; do not promote. |
| U058 | NOOR_10, Ten of Noor | Ten vessels form a literal row around a table. Several human faces are visibly blank/smeared, a separate technical failure at usable card size. | Redo. |
| U067 | NOOR_04, Four of Noor | At least **five** clear cups are visible on the ledge although the file is the Four of Noor assignment. It is also a literal row of cups. | Replace; this is both identity/count and artistic failure. |
| U072 | MIZAN_ACE, Ace of Mizan | A single exposed sword is the focal symbol. The approved prompt explicitly requires a fully sheathed blade and rejects violence/exposed steel. | Redo. |
| U074 | MIZAN_03, Three of Mizan | Three mirrors plus three exposed blades make a diagram of the number. The blade count and exposure overwhelm the painful-truth idea. | Redo. |
| U075 | MIZAN_04, Four of Mizan | Four sheathed blades are staged symmetrically as an inventory around a lamp. This is the literal Four-of-Swords problem in its clearest form. | Redo. |
| U076 | MIZAN_05, Five of Mizan | A field of isolated swords is the whole composition; the count is unstable on inspection, which is itself a production-quality problem. | Redo. |
| U084 | ARD_04, Four of Ard | Four tokens on a chest read as a static inventory. There is no human, natural process, or contemplative tension strong enough to carry the card. | Redo. |
| U087 | MIZAN_07, legacy “Seven of Swords” | A figure carries a visible bundle while two more swords are planted at the side. It is a conventional theft/count tableau rather than strategic discernment. | Redo if this legacy alternative is ever promoted; otherwise quarantine. |
| U088 | MIZAN_08, legacy “Eight of Swords” | Blindfold, tied hands, and eight surrounding swords are a stock literal illustration. It directly violates the Mizan prompt's no-blindfold/no-ropes instruction. | Redo. |
| U089 | MIZAN_09, legacy “Nine of Swords” | Distressed figure plus nine wall-mounted swords is an unambiguous counted stock scene; the swords, not thought or conscience, carry the card. | Redo. |
| U090 | MIZAN_10, legacy “Ten of Swords” | Prone body and a row of swords produce blunt death imagery and literal arithmetic. The prompt explicitly rejects corpse/execution imagery. | Redo. |

## Tier B — high review / redo for a uniformly subtle deck

| UID | Identity/role | Finding |
|---|---|---|
| U014 | Orphan QALAM_09 alternative | Nine lamps are conspicuous, but the bookbinder's action gives it more meaning than a pure pip card. The canonical bundle uses U015, not U014. Do not regenerate before comparing both. |
| U015 | Canonical QALAM_09 | Still count-heavy (many lamps), but the working scholar and ordered workshop make the persistence theme legible. Acceptable provisionally. |
| U022 | Canonical ARD_06, Six of Ard | Strong generosity scene, but it uses a scale and coin exchange rather than the approved bread/basket distribution and has no shared frame. Keep only if the visual language is allowed to vary. |
| U023 | Canonical ARD_07, Seven of Ard | The date clusters are countable, but the worker, irrigation gate, and living oasis provide a real process. Medium risk, not an urgent redo. |
| U026 | Canonical ARD_10, Ten of Ard | Community and market communicate legacy, but the central markers and many small figures make it busy and somewhat diagrammatic. |
| U031 | Orphan Ard alternative | Distribution scene is thematically useful but crowded; baskets and produce become a literal resource display. |
| U032 | Orphan Ard alternative | Nine pomegranates are laid out plainly on a wall. The orchard setting rescues it somewhat; do not use as the canonical Nine of Ard while U025 remains unresolved. |
| U033 | Best orphan candidate for ARD_05 | Two people walking through winter hardship convey Five of Ard much better than a counted-object scene. It needs a deliberate identity assignment, a consistent card frame, and removal/replacement of the pentagram-like window motifs. |
| U056 | Orphan/alternative Eight of Noor | Journey and moonlit water help, but repeated vessels remain visibly staged. |
| U057 | Canonical NOOR_09, Nine of Noor | Nine cups are arranged along a long wall and dominate the lower half. Garden, pomegranate tree, and resting figure provide some contemplative depth. |
| U068 | Canonical NOOR_05, Five of Noor | Spilled cups are conventional, but grief and the living reflection are readable. Keep provisionally. |
| U069 | Canonical NOOR_06, Six of Noor | Six bowls form a clear inventory around the well. Memory/tenderness is present but secondary to counting. |
| U077 | Canonical MIZAN_06, Six of Mizan | Boat passage is good, but six repeated lanterns/arches make the number conspicuous. Acceptable only if the suit is allowed some literal scaffolding. |
| U085 | Orphan legacy “Five of Swords” | Five exposed/handled swords and a conflict/travel tableau. Better narrative than U076, but still not suitable for the contemplative Mizan system without redesign. |
| U086 | Orphan legacy “Six of Swords” | Family crossing and water create a strong journey, but six swords are explicitly lined in the boat. Keep only as a reference, not a canonical replacement without reframing. |

## Full 91-image audit

`PASS` means the image can remain provisionally. `MED` means it is usable but not fully aligned with the subtle visual brief. `HIGH` and `CRIT` refer to the tiers above. `ORPHAN` means it is a real image in the source tree but not selected by the canonical importer.

### U001–U021

| UID | Verdict | Short note |
|---|---|---|
| U001 | PASS | Transformation through traveler/tree/landscape; no arithmetic. |
| U002 | PASS | Two streams and basin form a coherent moderation metaphor. |
| U003 | PASS | Cords, mirrors, and release gesture carry entanglement. |
| U004 | PASS | Tower/lightning and safe path communicate awakening. |
| U005 | PASS | Well, star, reflection, and gesture are contemplative. |
| U006 | PASS | Moonlit path and silence carry mystery. |
| U007 | PASS | Gateway/light and natural architecture are strong. |
| U008 | PASS | Three craftspeople show collaboration, not mere counting. |
| U009 | MED | Four pens are countable, but the seated writer/rest motif is legible. |
| U010 | PASS | Shared drafting work gives the five motif context. |
| U011 | MED | Six cases/pack animal are visible, though travel and knowledge carry the scene. |
| U012 | HIGH | Seven-pen lineup plus veiled face. |
| U013 | CRIT | Eight papers, pseudo-diagrams, arithmetic composition. |
| U014 | MED/ORPHAN | Nine lamps are literal; not canonical because U015 wins. |
| U015 | MED | Canonical nine-lamp alternative; acceptable provisionally. |
| U016 | HIGH | Ten-roll burden is mechanically literal and face is hidden. |
| U017 | PASS | Apprentice, threshold, and lamp create a receptive image. |
| U018 | PASS | Astrolabe and folio communicate method without pips. |
| U019 | PASS | Protected library passage is a good guardian metaphor. |
| U020 | PASS | Compass and civic courtyard convey applied wisdom. |
| U021 | PASS | Chalice, water, and light are a strong Noor ace. |

### U022–U035

| UID | Verdict | Short note |
|---|---|---|
| U022 | MED | Canonical Six of Ard; generosity reads, but scale/coin exchange and raw frame vary from deck. |
| U023 | MED | Canonical Seven of Ard; living orchard rescues explicit date count. |
| U024 | PASS | Potter/tile process is more meaningful than tile count. |
| U025 | CRIT | Canonical Nine of Ard; coin tree, pentagram-like discs, repeated-token abundance. |
| U026 | MED | Canonical Ten of Ard; community is good but composition is busy/marker-heavy. |
| U027 | PASS | Seeker of Ard; focused potter and bowl. |
| U028 | PASS | Scholar of Ard; irrigation model, orchard, and practical method. |
| U029 | CRIT | Canonical Guardian of Ard is semantically wrong and coin-fixated. |
| U030 | CRIT | Canonical Sage of Ard is an empty pavilion and style outlier. |
| U031 | MED/ORPHAN | Alternative distribution scene; crowded literal baskets. |
| U032 | MED/ORPHAN | Alternative nine-pomegranate layout; too explicit if promoted. |
| U033 | HIGH/ORPHAN | Best visual candidate for missing Five of Ard, but requires mapping, framing, and symbol cleanup. |
| U034 | CRIT/ORPHAN | Eight coin wall with pentagram-like marks. |
| U035 | CRIT/ORPHAN | Seven coin vine with pentagram-like marks. |

### U036–U051

| UID | Verdict | Short note |
|---|---|---|
| U036 | PASS | Seeker and horizon are atmospheric; back view is intentional. |
| U037 | PASS | Instructor at desk with controlled light. |
| U038 | PASS | Hidden gate uses threshold/reflection rather than literal symbols. |
| U039 | PASS | Empty garden/fountain is calm and coherent. |
| U040 | PASS | Prepared civic seat/key conveys stewardship. |
| U041 | PASS | Empty study hall gives teaching a human scale. |
| U042 | PASS | Two paths and shared lamp make covenant relational. |
| U043 | PASS | Traveler/horse and landscape convey discipline. |
| U044 | PASS | Human/horse/basin is a quiet forbearance scene. |
| U045 | PASS | Cave, lamp, water, and horizon are excellent retreat imagery. |
| U046 | PASS | Wheel has a genuine cyclical visual idea. |
| U047 | PASS | Balance has a clear material metaphor, not a pip count. |
| U048 | PASS | Surrender uses vessel, water, and posture. |
| U049 | PASS | Radiant gateway is strong. |
| U050 | PASS | Empty meeting place/horn suggests reckoning without spectacle. |
| U051 | PASS | Portal, garden, and water resolve completion. |

### U052–U071

| UID | Verdict | Short note |
|---|---|---|
| U052 | PASS | Ace of Qalam; single pen and ink ripple. |
| U053 | PASS | Two pens/folios become a dialogue, not an inventory. |
| U054 | PASS | Three craftspeople and distinct actions work well. |
| U055 | MED | Four-tool rest scene is countable but quiet; acceptable. |
| U056 | MED/ORPHAN | Eight-Noor alternative; journey helps, vessels remain explicit. |
| U057 | HIGH | Canonical Nine of Noor; long row of nine cups dominates. |
| U058 | CRIT | Canonical Ten of Noor; vessels plus malformed/blank faces. |
| U059 | PASS | Seeker of Noor; gentle water/bird attention. |
| U060 | PASS | Scholar of Noor; pool, rosewater, and listening posture. |
| U061 | PASS | Guardian of Noor; water carrier moving toward shelter. |
| U062 | PASS | Sage of Noor; public kitchen and cooperative care. |
| U063 | PASS | Canonical Six Qalam v2; caravan has a real knowledge-forward action. |
| U064 | PASS | Alternative/duplicate Ace of Noor; strong waterfall/chalice image. |
| U065 | PASS | Two of Noor; reciprocal water streams and human presence. |
| U066 | PASS | Three of Noor; shared work and hospitality. |
| U067 | CRIT | Canonical Four of Noor; five cups visible and row is literal. |
| U068 | MED | Five of Noor; grief is readable despite conventional cups. |
| U069 | HIGH | Six of Noor; six bowls read as an inventory. |
| U070 | PASS | Seven of Noor; reflections invite discernment. |
| U071 | PASS | Sage of Noor; public mercy reads through the market scene. |

### U072–U091

| UID | Verdict | Short note |
|---|---|---|
| U072 | CRIT | Canonical Ace of Mizan; exposed blade violates the approved concept. |
| U073 | PASS | Two of Mizan; balanced curtains/paths and threshold are restrained. |
| U074 | CRIT | Three mirrors plus three exposed blades. |
| U075 | CRIT | Four displayed blades are the literal count failure. |
| U076 | CRIT | Five-Mizan scene is isolated sword inventory and count is unstable. |
| U077 | MED | Six of Mizan; journey is strong, repeated lanterns are obvious. |
| U078 | PASS | Mizan Scholar; measured civic reading. |
| U079 | PASS | Mizan Guardian; two open gates and calm boundary. |
| U080 | PASS | Mizan Sage; scale and civic table are coherent. |
| U081 | PASS | Ard Ace; seed, token, and soil are excellent. |
| U082 | PASS | Ard Two; balanced baskets imply exchange without clutter. |
| U083 | PASS | Ard Three; collaborative tile work is strong. |
| U084 | CRIT | Ard Four; four tokens on chest are static arithmetic. |
| U085 | HIGH/ORPHAN | Legacy Five of Swords; swords and conflict are too explicit. |
| U086 | MED/ORPHAN | Legacy Six of Swords; journey works but six swords are staged. |
| U087 | HIGH/ORPHAN | Legacy Seven of Swords; theft/count tableau. |
| U088 | CRIT/ORPHAN | Legacy Eight of Swords; blindfold, ties, and eight blades violate prompt. |
| U089 | CRIT/ORPHAN | Legacy Nine of Swords; nine wall swords and distressed figure. |
| U090 | CRIT/ORPHAN | Legacy Ten of Swords; prone body and ten swords, blunt death imagery. |
| U091 | PASS/ORPHAN | Legacy Page of Swords; single sword and young seeker are readable, though it is not the preferred Mizan naming. |

## Numbering and overlap findings

1. The deck is 78 cards at indices **0–77**, with 14 cards each in Qalam, Noor, Mizan, and Ard. The canonical minor-arcana starts are Qalam index 22, Noor 36, Mizan 50, Ard 64.
2. Qalam has overlapping batches: `Cards_25_31`, `tarot_cards_25_31_complete`, `Islamic_Contemplative_Deck_Cards_19_25`, and `Cards_31_37`. The number in a filename is not a reliable index; semantic suit/rank matching wins, then version/official tie-breaks. U008–U014 are therefore mostly alternatives, not additional cards. U014 and U015 are both Nine of Qalam candidates; the current bundle selects U015.
3. Noor has the same offset problem: U021 is the current canonical Ace of Noor, while U064 is an alternative Ace; U056 is Eight of Noor while U070 is Seven of Noor even though both filenames use `43` in different batches.
4. Mizan and “Swords” overlap intentionally through the importer’s legacy replacement `swords -> mizan`. U085 and U086 are orphan alternatives for Mizan 5/6; U087–U091 are currently used for canonical Mizan 7–10/Seeker because no newer semantic files won those slots. Resolve the art identity before regenerating.
5. Bare `70.png`–`78.jpeg` map as **N → index N−1**. Consequently `70.png` is ARD_06/index 69, and `78.jpeg` is ARD_SAGE/index 77. The hard missing slot is `ARD_05/index 68`, not index 69.

## Technical consistency issues

- Most named card images contain a decorative border and blank lower title panel. The raw `Final Phase Miscelaneous` PNGs U022–U029 and timestamp images U031–U035 are full-bleed art without that shared card treatment. The app can display them, but the deck will look assembled from different products unless framing is normalized.
- `78.jpeg` (U030) is 1536x2752, while the normal source set is approximately 1024x1536. Its red/brown frame is visibly unlike the dark indigo/gold and ivory/gold families.
- Several misc coin images (U025, U029, U034, U035) contain repeated five-point/pentagram-like marks even though the prompt explicitly bans pentagrams and occult sigils. This is not merely a style preference.
- U058 has unusable face rendering on several people. U012 hides the focal face. U013 includes writing-like diagrams. U074 and U072 expose blades where the Mizan prompts require sheathed blades. U088 adds blindfold/restraint imagery explicitly prohibited by its prompt; U090 adds a corpse-like prone body explicitly prohibited by its prompt.

## Minimal execution recommendation

1. Freeze a canonical 0–77 manifest and mark `ARD_05` as missing. Keep U033 in a separate “candidate” state rather than silently treating it as card 68.
2. Regenerate only the Tier A canonical images first: U012, U013, U016, U025, U029, U030, U058, U067, U072, U074, U075, U076, U084, U088, U089, and U090; source a new/clean ARD_05. If effort must be cut further, defer U016; keep U069 in Tier B as a consistency pass.
3. Quarantine orphan alternatives U014, U031–U035, and U085–U091 until the manifest is resolved. Do not regenerate an orphan and a canonical duplicate for the same slot.
4. Use the best existing cards as the visual bar: the core arcana, U017–U020, U036–U051, U059–U062, U070–U071, U078–U083, and U091. New prompts should specify one meaningful action or natural process and prohibit any conspicuous row, wall, ring, or cluster whose only job is to equal the rank.

## Review artifacts

- [Existing QA report](SUFI_TAROT_IMAGE_QA.md)
- [Unique-image inventory](qa_contact_sheets/inventory.tsv)
- [Contact sheet 1](qa_contact_sheets/contact_01.jpg) · [2](qa_contact_sheets/contact_02.jpg) · [3](qa_contact_sheets/contact_03.jpg) · [4](qa_contact_sheets/contact_04.jpg) · [5](qa_contact_sheets/contact_05.jpg) · [6](qa_contact_sheets/contact_06.jpg)
- [Current deck bundle](src/content/deck-bundle.json)
- [Importer rules](scripts/import_deck.py)
