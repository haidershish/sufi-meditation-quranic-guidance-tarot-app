# Mizan 2–10 regeneration QA

Generated with the built-in GPT image-generation tool after the prompt rewrite in [MIZAN_REDO_PROMPTS.md](MIZAN_REDO_PROMPTS.md). Originals and the ordered deck were not overwritten. The nine new files are isolated in this folder for parent-agent selection and later manifest integration.

## Visual QA verdict

All nine images pass the requested semantic gate:

- first read is a human or natural contemplative event, not a counted suit display;
- architecture is absent, incidental, or subordinate rather than the subject;
- no literal pip layout or repeated numbered props;
- portrait 1024×1536 output with a blank lower cartouche and no intended title text;
- no visible blood, corpse, combat spectacle, sacred-person imagery, or occult symbolism;
- the Mizan meaning is carried by posture, water, weather, repair, distance, or consequence.

| Card | Guidebook core | Why the new image passes | Source / retained original | New output | SHA-256 |
|---|---|---|---|---|---|
| MIZAN_02 | decision; tension held in balance; careful pause | One traveler pauses at converging river currents; the choice is carried by posture and water, with no paired suit objects. | `All Images in Order/51_MIZAN_02_Two_of_Mizan.png`; primary U073 `tarot_cards_49_to_55 (1)/card_51_two_of_mizan.png` | `MIZAN_02_Two_of_Mizan_v2.png` | `2D6D386E926DF2F7B49721F89305E4C64F82D1B1ED4515D4682664A726324DC8` |
| MIZAN_03 | painful truth; honest recognition | One adult supports a storm-split olive branch; the physical break and repair make recognition concrete without a literal blade/mirror count. | `All Images in Order/52_MIZAN_03_Three_of_Mizan.png`; primary U074 `tarot_cards_49_to_55 (1)/card_52_three_of_mizan.png` | `MIZAN_03_Three_of_Mizan_v2.png` | `C42BEB46EB7961CC37CE5514268610E8D8F9D4EFD40EEE6A45C5413E904BC72C` |
| MIZAN_04 | rest; recovery; suspension of conflict | One traveler rests beside moving water with a lowered staff and clean bandage; recovery is shown through released posture and natural quiet. | `All Images in Order/53_MIZAN_04_Four_of_Mizan.png`; primary U075 `tarot_cards_49_to_55 (1)/card_53_four_of_mizan.png` | `MIZAN_04_Four_of_Mizan_v2.png` | `484F7883B15E45BB9B7B5790A9997BB6887799CFE4567B0E0AFF749BB3C219B3` |
| MIZAN_05 | conflict; pride; cost of winning | Two people reset a diverted irrigation channel after an argument; muddy overflow and surviving green growth show consequence and possible repair. | `All Images in Order/54_MIZAN_05_Five_of_Mizan.png`; primary U076 `tarot_cards_49_to_55 (1)/card_54_five_of_mizan.png` | `MIZAN_05_Five_of_Mizan_v2.png` | `F40178473835A780819A8D5454C925B5281622B2657522F05C617E6DD54C3A42` |
| MIZAN_06 | transition; moving toward fairness and peace | Two ordinary people repair a small living-wood footbridge together; cooperation and shared passage replace the former monumental bridge image. | `All Images in Order/55_MIZAN_06_Six_of_Mizan.png`; primary U077 `tarot_cards_49_to_55 (1)/card_55_six_of_mizan.png` | `MIZAN_06_Six_of_Mizan_v2.png` | `2545A5A6982535EAE722F3A84F860FECF5C660836B69F8E93163724BAE3D778B` |
| MIZAN_07 | strategy; caution; uncertain consequences | A traveler studies changed tracks and a blank map while a heron observes; uncertainty is held through evidence and restraint, not envelopes or blades. | `All Images in Order/56_MIZAN_07_Seven_of_Mizan.png`; primary U087 `Tarrot Cards 55-61/card_57_seven_of_swords.png` | `MIZAN_07_Seven_of_Mizan_v2.png` | `8934D659BE9115E37F79C64AA4E05D7A4B33662ECCFE48D69920C5309AE76778` |
| MIZAN_08 | restriction; mental imprisonment; finding the opening | One person parts living vines to reveal a sunlit path; the opening is perceptual and natural, with no bars, ropes, or captive spectacle. | `All Images in Order/57_MIZAN_08_Eight_of_Mizan.png`; primary U088 `Tarrot Cards 55-61/card_58_eight_of_swords.png` | `MIZAN_08_Eight_of_Mizan_v2.png` | `8185061B06EA69B7FBBCA2E083FA7C91A82BFC5F83D5EA9F18527AA8C27DF6BF` |
| MIZAN_09 | anxiety; conscience; difficult thought | One awake adult sits beneath a cypress with a single lantern, ordinary shadows, and a dawn opening; the inner difficulty is quiet and non-melodramatic. | `All Images in Order/58_MIZAN_09_Nine_of_Mizan.png`; primary U089 `Tarrot Cards 55-61/card_59_nine_of_swords.png` | `MIZAN_09_Nine_of_Mizan_v2.png` | `05C507E6A332CBD839CE4C090413071419CE1E90CB86C3A14563092967F0CF7E` |
| MIZAN_10 | ending of a trial; release after hardship | One traveler sets down a heavy pack at the edge of a wet mountain path and faces a living valley; release is bodily and ecological, not a line of swords or an architectural gate. | `All Images in Order/59_MIZAN_10_Ten_of_Mizan.png`; primary U090 `Tarrot Cards 55-61/card_60_ten_of_swords.png` | `MIZAN_10_Ten_of_Mizan_v2.png` | `1D294D1E996B72D4B87B12ED5F4806221C6E3EE5650ED9F4D9D01B5BE19019A8` |

## Technical checks

Every new output is PNG, 1024×1536 (1.5:1 portrait), and was opened for visual inspection after copying into this folder. The hash table above was computed after the final copy. The shared prompt explicitly required no readable text; the lower cartouches remain blank for later layout.

## Disposition

`PASS — candidate for parent-agent review.` These are candidates only; do not replace the 0–77 ordered deck until the parent agent's final cross-suit QA and manifest update.
