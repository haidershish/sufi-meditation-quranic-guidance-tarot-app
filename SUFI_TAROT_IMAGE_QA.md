# Sufi Tarot image QA

Reviewed 8 September 2026. Scope: 98 image files under `C:\Users\User\Desktop\AI 2\Sufi Tarot`; 91 are visually unique after removing 7 byte-identical duplicates.

## Verdict

- **Redo now:** 17 images whose composition is substantially just a counted set of suit objects.
- **Borderline:** 8 images that use literal counting but still contain a defensible human, natural, or contemplative idea.
- **Missing artwork:** none proven.
- **Missing identity/mapping:** cards **68 and 69** have no correctly numbered files. They are probably the unnamed poverty and generosity scenes in `Final Phase Miscelaneous`, but this needs confirmation.
- **Structural problem:** filenames are not a dependable deck order. There are overlaps, semantic/numbering offsets, an extra `78`, and unidentified alternatives. Create one 0–77 manifest before regenerating anything.

## Redo now

These are the clearest failures against the requested metaphysical, natural, philosophical, contemplative direction.

| ID | File/card | Why redo |
|---|---|---|
| U013 | `Cards_25_31/card_30_eight_of_qalam.png` | Eight papers fly through the scene; number-counting is the main idea. |
| U014 | `Cards_25_31/card_31_nine_of_qalam.png` | Repetition of lamps/implements dominates; weak inner meaning. |
| U016 | `Cards_31_37/CARD_32_Ten_of_Qalam_v1.png` | A person literally carries a stack of ten scrolls; burden is present but mechanically rendered. |
| U034 | `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_34_07 PM (5).png` | Eight identical coins arranged on a wall: pure prompt arithmetic. |
| U035 | `Final Phase Miscelaneous/kk.png` | Seven coins placed around a worker: the exact “seven objects” failure. |
| U057 | `Islamic_Contemplative_Deck_Cards_43_49/Card_44_Nine_of_Noor.png` | Nine cups displayed in a row; decorative counting overwhelms contemplation. |
| U058 | `Islamic_Contemplative_Deck_Cards_43_49/Card_45_Ten_of_Noor.png` | Banquet-plus-many-cups reads as a conventional literal pip scene. |
| U067 | `tarot_cards_37_43/card_40_four_of_noor.png` | Four glasses are staged prominently; too diagrammatic. |
| U069 | `tarot_cards_37_43/card_42_six_of_noor.png` | Six basins are the composition; little symbolic transformation. |
| U074 | `tarot_cards_49_to_55 (1)/card_52_three_of_mizan.png` | Three blade-like mirrors repeat the numeral without a clear philosophical event. |
| U075 | `tarot_cards_49_to_55 (1)/card_53_four_of_mizan.png` | Four swords/blades around a lamp: exactly the literal Four-of-Swords problem. |
| U076 | `tarot_cards_49_to_55 (1)/card_54_five_of_mizan.png` | Five swords scattered on paving; emotionally empty counting. |
| U084 | `tarot_cards_61_67/card_67_four_of_ard.png` | Four coins displayed on a chest; static inventory rather than metaphor. |
| U087 | `Tarrot Cards 55-61/card_57_seven_of_swords.png` | A figure simply carries a counted bundle of swords. |
| U088 | `Tarrot Cards 55-61/card_58_eight_of_swords.png` | Blindfold plus eight surrounding swords is conventional and highly literal. |
| U089 | `Tarrot Cards 55-61/card_59_nine_of_swords.png` | Nine swords mounted above a distressed figure; counted props dominate. |
| U090 | `Tarrot Cards 55-61/card_60_ten_of_swords.png` | Prone body plus a row of swords is blunt, familiar, and insufficiently contemplative. |

## Borderline — redo only if aiming for a uniformly subtle deck

| ID | File/card | Assessment |
|---|---|---|
| U012 | `Cards_25_31/card_29_seven_of_qalam.png` | Seven upright objects are conspicuous, but the guarded threshold gives it some symbolic depth. |
| U025 | `Final Phase Miscelaneous/73.png` | Coin-bearing tree and sovereign figure are literal, though the living tree improves the metaphor. |
| U029 | `Final Phase Miscelaneous/77.png` | Large paired discs are too explicit, but the inward seated figure is contemplative. |
| U032 | `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_33_50 PM (4).png` | Nine pomegranates are plainly counted; the orchard setting partly rescues it. |
| U068 | `tarot_cards_37_43/card_41_five_of_noor.png` | Spilled cups are conventional, but grief/reflection is legible and atmospheric. |
| U073 | `tarot_cards_49_to_55 (1)/card_51_two_of_mizan.png` | Two curtains/shadows are literal symmetry, but restraint and emptiness work well. |
| U077 | `tarot_cards_49_to_55 (1)/card_55_six_of_mizan.png` | Six repeated lights/arches are countable, yet the lone boat and passage add metaphysical resonance. |
| U086 | `Tarrot Cards 55-61/card_56_six_of_swords.png` | Strong human passage motif, but the six swords remain overtly staged in the boat. |

## Missing / numbering audit

Assuming a conventional 78-card deck numbered 0–77:

- Major sequence 0–21 is represented.
- Qalam, Noor, and Mizan meanings appear represented, but several filenames are offset by one or overlap other batches.
- Ard is explicitly named only through `card_67_four_of_ard.png`.
- No files are correctly named **68** or **69**. The most plausible matches are:
  - **68 / Five of Ard:** U033, `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_34_05 PM (2).png` — two impoverished travellers in winter.
  - **69 / Six of Ard:** U022, `Final Phase Miscelaneous/70.png` — a prosperous woman giving to two people.
- `Final Phase Miscelaneous/78.jpeg` is outside a 0–77 scheme and is probably misnumbered or an unused alternative.
- `Tarrot Cards 55-61` overlaps numbered Mizan files and changes the suit label to “swords.” Those files should not be treated as canonical until the manifest decides which naming system wins.

## Strong images to use as the quality bar

U001 Transformation, U003 Entanglement, U005 Guidance, U006 Mystery, U038 Hidden Gate, U042 Covenant, U045 Retreat, U046 Wheel of Decree, U048 Surrender, U059 Seeker of Noor, U060 Scholar of Noor, U064 Ace of Noor, U070 Seven of Noor, U081 Ace of Ard, and U083 Three of Ard. These communicate through atmosphere, natural process, human posture, thresholds, light, water, time, or journey—not arithmetic.

## Minimal next action

Do **not** regenerate all 25 flagged images immediately. First approve a canonical 0–77 card-name manifest and match every existing image to it. Then regenerate the 17 “redo now” cards; use the strong-image list above as visual references and prohibit explicit counted arrangements of suit objects.

## Review artifacts

- [Unique-image inventory](qa_contact_sheets/inventory.tsv)
- [Contact sheet 1](qa_contact_sheets/contact_01.jpg)
- [Contact sheet 2](qa_contact_sheets/contact_02.jpg)
- [Contact sheet 3](qa_contact_sheets/contact_03.jpg)
- [Contact sheet 4](qa_contact_sheets/contact_04.jpg)
- [Contact sheet 5](qa_contact_sheets/contact_05.jpg)
- [Contact sheet 6](qa_contact_sheets/contact_06.jpg)
