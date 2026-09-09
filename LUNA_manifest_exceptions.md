# LUNA canonical Sufi Tarot manifest exceptions

Reviewed 8 September 2026. This document accompanies [LUNA_canonical_manifest.csv](C:/Users/User/Documents/ChatGPT/Tarot/LUNA_canonical_manifest.csv).

## Result

- The CSV contains exactly 78 canonical rows, deck indices **0–77**, with the existing app deck order preserved: Core Arcana 0–21, Qalam 22–35, Noor 36–49, Mizan 50–63, and Ard 64–77.
- The structural baseline is the current app assignment in [src/content/deck-bundle.json](C:/Users/User/Documents/ChatGPT/Tarot/src/content/deck-bundle.json). That file supplies the current `sourceRel` mapping for 77 slots and explicitly marks `ARD_05` as missing.
- The source inventory contains 98 files, 91 visually unique images, and 7 byte-identical duplicate copies. The complete evidence table is [qa_contact_sheets/inventory.tsv](C:/Users/User/Documents/ChatGPT/Tarot/qa_contact_sheets/inventory.tsv).
- Slot **68 / ARD_05 / Five of Ard** remains **missing/unresolved** in the CSV. U033 is listed in `alternate_uids` as a **low-confidence candidate**, not as approved artwork. If U033 is rejected, the slot should be regenerated.
- Slot **77 / ARD_SAGE / Sage of Ard** currently points to U030 (`78.jpeg`) only because that is the app bundle's source. The filename is outside the 0–77 scheme, so the mapping is provisional and must be confirmed before release.
- No source file was renamed, moved, deleted, or regenerated.

## Evidence precedence

The mapping uses this order of evidence:

1. Current deck-bundle `index`, `id`, and `artwork.sourceRel` assignment.
2. Explicit suit/rank/title in the source filename.
3. Semantic match between the visible scene and the card prompt/theme in [all_78_culturally_grounded_visual_prompts.txt](C:/Users/User/Documents/ChatGPT/Tarot/all_78_culturally_grounded_visual_prompts.txt).
4. Folder sequence and numeric filenames, used only when the first three do not identify the slot.

`source_filename_number` is deliberately separate from `canonical_index`. Several batches are numbered one higher than the canonical deck index, and one final source is numbered 78.

## Numbering and naming repairs

### Qalam

- Canonical Qalam is 22–35.
- `Card_22`–`Card_25` in `Islamic_Contemplative_Deck_Cards_19_25` map directly to Ace through Four.
- `Cards_25_31/card_25_three_of_qalam.png` through `card_31_nine_of_qalam.png` are one higher than the canonical identity. They are treated as semantic alternatives or, for Five through Eight, the selected source after the offset is corrected.
- U063 (`card_28_six_of_qalam_v2.png`) is selected over U011's v1 image. U015 (`CARD_31_Nine_of_Qalam_v2.png`) is selected over U014's alternative.
- U008–U014 include byte-identical duplicate copies in the `tarot_cards_25_31_complete` folder; the duplicate paths are retained in the CSV when the UID is selected.

### Noor

- Canonical Noor is 36–49.
- The `tarot_cards_37_43` batch is one higher than the canonical identity for Ace through Seven. Thus filename 37 is Ace of Noor at index 36, filename 43 is Seven of Noor at index 42.
- The later `Islamic_Contemplative_Deck_Cards_43_49` batch is correctly named for Eight through Sage. Filename 43 therefore legitimately occurs for both Seven and Eight; the semantic title resolves the conflict.
- U021 is retained as the current Ace of Noor; U064 is recorded as an alternate. U062 is retained as the current Sage of Noor; U071 is recorded as an alternate.

### Mizan / “swords” overlap

- Canonical Mizan is 50–63.
- U072–U077 provide explicitly named Mizan Ace through Six at indices 50–55.
- `Tarrot Cards 55-61` changes the suit label to **swords** and starts at filename 55. The current deck bundle maps its filename 57–61 images to Mizan 7–10 and Seeker at indices 56–60 because those are the only sequential candidates for the missing canonical identities.
- U085 (`five_of_swords`) and U086 (`six_of_swords`) remain noncanonical alternatives to Mizan 5 and 6; the explicitly named Mizan sources win those slots.
- This is a semantic compatibility mapping, not a naming correction. The Mizan 7–10 and Seeker images should be regenerated from the Mizan prompts before release.

### Ard and the final-phase folder

- Canonical Ard is 64–77.
- U081–U084 are explicitly named Ace through Four and map directly to indices 64–67.
- `Final Phase Miscelaneous/70.png` through `78.jpeg` are unnamed numeric sources mapped by the existing bundle and visible semantics to indices 69–77. There is no approved source named 68.
- U033 is the best visible candidate for Five of Ard because it depicts hardship and dignity, but it has no title/number evidence. It is intentionally marked unresolved.
- U031, U032, U034, and U035 are unnamed alternatives for Six, Nine, Eight, and Seven of Ard respectively. U034 and U035 are the clearest literal-counting failures and are not selected.
- U030 is the current Sage-of-Ard source but is named 78 and uses a different, simpler garden/pavilion treatment. Confirm or replace it before finalizing the 0–77 asset set.

## Redo now: 17 QA-flagged images

The flags below preserve the full image QA result in [SUFI_TAROT_IMAGE_QA.md](C:/Users/User/Documents/ChatGPT/Tarot/SUFI_TAROT_IMAGE_QA.md). Three are noncanonical alternatives, but they remain listed so they are not accidentally mistaken for approved candidates.

| UID | Canonical association | Source | Reason/action |
|---|---|---|---|
| U013 | 29 / Eight of Qalam | `Cards_25_31/card_30_eight_of_qalam.png` | Eight papers dominate; regenerate. |
| U014 | alternate to 30 / Nine of Qalam | `Cards_25_31/card_31_nine_of_qalam.png` | Counted implements dominate; do not use as canonical; regenerate if retained. |
| U016 | 31 / Ten of Qalam | `Cards_31_37/CARD_32_Ten_of_Qalam_v1.png` | Literal stack of ten scrolls; regenerate. |
| U034 | alternate to 71 / Eight of Ard | `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_34_07 PM (5).png` | Eight identical coins; regenerate. |
| U035 | alternate to 70 / Seven of Ard | `Final Phase Miscelaneous/kk.png` | Seven coins are the whole idea; regenerate. |
| U057 | 44 / Nine of Noor | `Islamic_Contemplative_Deck_Cards_43_49/Card_44_Nine_of_Noor.png` | Nine cups in a row; regenerate. |
| U058 | 45 / Ten of Noor | `Islamic_Contemplative_Deck_Cards_43_49/Card_45_Ten_of_Noor.png` | Banquet and many cups are a literal pip scene; regenerate. |
| U067 | 39 / Four of Noor | `tarot_cards_37_43/card_40_four_of_noor.png` | Four glasses staged prominently; regenerate. |
| U069 | 41 / Six of Noor | `tarot_cards_37_43/card_42_six_of_noor.png` | Six basins are the composition; regenerate. |
| U074 | 52 / Three of Mizan | `tarot_cards_49_to_55 (1)/card_52_three_of_mizan.png` | Three repeated blade-like mirrors; regenerate. |
| U075 | 53 / Four of Mizan | `tarot_cards_49_to_55 (1)/card_53_four_of_mizan.png` | Four blades around a lamp; regenerate. |
| U076 | 54 / Five of Mizan | `tarot_cards_49_to_55 (1)/card_54_five_of_mizan.png` | Five swords scattered on paving; regenerate. |
| U084 | 67 / Four of Ard | `tarot_cards_61_67/card_67_four_of_ard.png` | Four coins on a chest are static inventory; regenerate. |
| U087 | 56 / Seven of Mizan | `Tarrot Cards 55-61/card_57_seven_of_swords.png` | Counted bundle of swords; regenerate from Mizan 7 prompt. |
| U088 | 57 / Eight of Mizan | `Tarrot Cards 55-61/card_58_eight_of_swords.png` | Blindfold and eight swords are conventional/literal; regenerate. |
| U089 | 58 / Nine of Mizan | `Tarrot Cards 55-61/card_59_nine_of_swords.png` | Nine mounted swords dominate; regenerate. |
| U090 | 59 / Ten of Mizan | `Tarrot Cards 55-61/card_60_ten_of_swords.png` | Row of swords and prone body are blunt; regenerate. |

## Borderline: 8 images

These are not mandatory first-pass regenerations if a small amount of literal counting is acceptable.

| UID | Canonical association | Source | Assessment |
|---|---|---|---|
| U012 | 28 / Seven of Qalam | `Cards_25_31/card_29_seven_of_qalam.png` | Seven objects are conspicuous, but the guarded threshold gives symbolic depth. |
| U025 | 72 / Nine of Ard | `Final Phase Miscelaneous/73.png` | Coin-bearing tree and sovereign figure are literal, though the living tree helps. |
| U029 | 76 / Guardian of Ard | `Final Phase Miscelaneous/77.png` | Large token and seated figure are less aligned to the builder/stewardship prompt. |
| U032 | alternate to 72 / Nine of Ard | `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_33_50 PM (4).png` | Nine pomegranates are plainly counted; orchard context partly rescues it. |
| U068 | 40 / Five of Noor | `tarot_cards_37_43/card_41_five_of_noor.png` | Spilled cups are conventional, but grief and reflection are legible. |
| U073 | 51 / Two of Mizan | `tarot_cards_49_to_55 (1)/card_51_two_of_mizan.png` | Two curtains/shadows are literal symmetry, but restraint works. |
| U077 | 55 / Six of Mizan | `tarot_cards_49_to_55 (1)/card_55_six_of_mizan.png` | Six arches/lights are countable, but the boat and passage add resonance. |
| U086 | alternate to 55 / Six of Mizan | `Tarrot Cards 55-61/card_56_six_of_swords.png` | Strong passage motif, but six swords are overtly staged. |

## Unused alternatives and duplicate identities

- **U049** is an alternate `Card_19_The_Radiance`; U007 remains canonical because it is the current deck-bundle source.
- **U008/U009** are one-number-high alternatives for Qalam Three/Four.
- **U011** is the v1 Six of Qalam; U063 v2 is selected.
- **U014** is the counted Nine of Qalam alternative; U015 v2 is selected.
- **U064** is an alternate Ace of Noor; U021 remains the current source.
- **U071** is an alternate Sage of Noor; U062 remains the current source.
- **U085/U086** are Five/Six of Swords alternatives; they are not canonical Mizan sources.
- **U031/U032/U034/U035** are unnamed final-phase alternatives for Ard; only U031 and U032 are semantically plausible backups, while U034/U035 should be regenerated.

## Recommended next action

1. Approve the 0–77 identity order in the CSV.
2. Decide whether U033 is acceptable for `ARD_05`; otherwise leave index 68 explicitly missing and regenerate it.
3. Regenerate the 17 redo-now images, with special attention to Mizan 7–10 and Seeker, whose current files use the wrong “swords” naming and conventional pip imagery.
4. Confirm or replace U030 at index 77 because its source filename is 78.
5. Re-run a visual QA pass against the same contemplative criteria before updating application artwork.
