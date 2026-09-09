# Sufi Tarot — LUNA Redo Prompt Pack

Production brief for LUNA (max effort). Scope is the 17 definite visual-redo candidates identified in `SUFI_TAROT_IMAGE_QA.md`. This file is a prompt and QA specification only; it does not replace the canonical 0–77 manifest.

## Non-negotiable creative direction

The deck should feel contemplative, natural, metaphysical, and philosophical. Let meaning emerge from posture, weather, light, water, thresholds, craft, distance, and consequence. The suit is a quiet material language, not a pile of counted props. Do not illustrate the number by arranging seven/eight/nine/ten identical objects. A single meaningful object, a human action, a landscape process, or a shadow/reflection may carry the suit.

Sufi/Islamic character should come from ethical inwardness, hospitality, restraint, remembrance, balance, humble craft, and historically coherent Muslim-region architecture and clothing—not from sacred-person imagery, fantasy mysticism, or decorative pseudo-Arabic. No prophet, saint, dervish cliché, shrine ritual, scripture, Qur'anic text, or invented writing.

## Shared production prompt

Prepend this master prompt to every card prompt below:

> **Use case:** historical-scene / contemplative card illustration. **Asset type:** one finished vertical tarot-card artwork, portrait 9:16, artwork only. Painterly cinematic realism fused with the tactile surface of a hand-painted illuminated manuscript; historically coherent Muslim-region material culture; dignified unidentified ordinary people only; modest believable garments; anatomically natural faces and hands; one dominant focal subject and one clear symbolic action; quiet negative space; weathered stone, carved cedar, aged brass, silver, marble, water, woven textiles, handmade paper; controlled natural light; deep indigo and midnight-blue shadows, ivory, muted teal, terracotta, moonlit silver, restrained brushed gold; subtle purely geometric and botanical ornament; restrained arched framing and a consistent deck border; leave a clean empty lower title cartouche with no text. The image must communicate through atmosphere and metaphor, not arithmetic.

## Shared negative prompt

Append this to every generation:

> No literal pip layout; no row, fan, grid, wall display, or circle of repeated suit objects; no exact counted collection of cups, coins, papers, lamps, blades, baskets, or other suit props; no number written or implied by repeated inventory; no lettering, readable text, Arabic script, calligraphy, pseudo-calligraphy, pseudo-glyphs, fake writing, logos, watermark, UI, border text, or title; no sacred person, saint, prophet, shrine ritual, halo, occult sign, fantasy glow, or religious monument; no European costume, colonial staging, caricature, duplicated faces, extra fingers, deformed hands, weapon spectacle, blood, corpse, gore, or melodrama; no clutter; no photorealistic modern objects; no cropped lower title area.

## Card-level execution rules

- Generate each card as a new artwork; do not edit or overwrite the source.
- Keep the same portrait ratio, border language, lower blank cartouche, muted palette, and controlled natural light across the set.
- For people, use one readable face at most unless the brief explicitly calls for a small communal background; keep hands separated and anatomically simple.
- Suit cues may be one pen/folio, one water vessel, one sheathed blade/scabbard, one seed/token, or a material process. They must never become a counted display.
- Do not add titles in the image. Add English/Arabic titles later in layout.
- A card passes only if its first read is the inner event (insight, burden, mercy, discernment, etc.), not “there are N objects.”

## Candidate index and generation disposition

| UID | Source file | Intended identity | Mapping confidence | Generation disposition |
|---|---|---|---|---|
| U013 | `Cards_25_31/card_30_eight_of_qalam.png` | Eight of Qalam | High semantic; numeric offset is known | Generate |
| U014 | `Cards_25_31/card_31_nine_of_qalam.png` | Nine of Qalam | High semantic; duplicate `CARD_31_Nine...` exists | Generate |
| U016 | `Cards_31_37/CARD_32_Ten_of_Qalam_v1.png` | Ten of Qalam | High semantic | Generate |
| U034 | `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_34_07 PM (5).png` | Unresolved Ard candidate; likely Eight of Ard, but unconfirmed | Low | **Hold; do not generate** |
| U035 | `Final Phase Miscelaneous/kk.png` | Unresolved Ard candidate; likely Seven of Ard, but unconfirmed | Low | **Hold; do not generate** |
| U057 | `Islamic_Contemplative_Deck_Cards_43_49/Card_44_Nine_of_Noor.png` | Nine of Noor | High semantic | Generate |
| U058 | `Islamic_Contemplative_Deck_Cards_43_49/Card_45_Ten_of_Noor.png` | Ten of Noor | High semantic | Generate |
| U067 | `tarot_cards_37_43/card_40_four_of_noor.png` | Four of Noor | High semantic | Generate |
| U069 | `tarot_cards_37_43/card_42_six_of_noor.png` | Six of Noor | High semantic | Generate |
| U074 | `tarot_cards_49_to_55 (1)/card_52_three_of_mizan.png` | Three of Mizan | High semantic; card-number manifest still needed | Generate |
| U075 | `tarot_cards_49_to_55 (1)/card_53_four_of_mizan.png` | Four of Mizan | High semantic; card-number manifest still needed | Generate |
| U076 | `tarot_cards_49_to_55 (1)/card_54_five_of_mizan.png` | Five of Mizan | High semantic; card-number manifest still needed | Generate |
| U084 | `tarot_cards_61_67/card_67_four_of_ard.png` | Four of Ard | High semantic; card-number manifest still needed | Generate |
| U087 | `Tarrot Cards 55-61/card_57_seven_of_swords.png` | Probably Seven of Mizan; source calls suit “swords” | Low until manifest | **Hold; do not generate** |
| U088 | `Tarrot Cards 55-61/card_58_eight_of_swords.png` | Probably Eight of Mizan; source calls suit “swords” | Low until manifest | **Hold; do not generate** |
| U089 | `Tarrot Cards 55-61/card_59_nine_of_swords.png` | Probably Nine of Mizan; source calls suit “swords” | Low until manifest | **Hold; do not generate** |
| U090 | `Tarrot Cards 55-61/card_60_ten_of_swords.png` | Probably Ten of Mizan; source calls suit “swords” | Low until manifest | **Hold; do not generate** |

The 11 high-confidence entries below are ready for image generation. The six held entries still receive briefs so that no creative work is lost, but they must not be rendered until the 0–77 manifest resolves their identity.

---

## U013 — Eight of Qalam

**Source:** `Cards_25_31/card_30_eight_of_qalam.png`  
**Theme:** swift insight, message in motion, momentum without chaos.  
**Why redo:** eight papers flying through the frame makes the numeral the subject.  
**Identity note:** semantic identity is clear; filename numbering is offset in the mixed source folders.

**Redesign brief:** Make one insight feel like a current of air rather than a flock of pages. Use a single unmarked folio caught in a rising desert wind between two Seljuk arches; its underside briefly catches a clean, non-written geometric watermark. A grounded reed pen and closed ink bottle sit in deep foreground as an anchor, while the folio travels toward a small band of dawn. The metaphysical idea is that disciplined knowledge becomes movement only after release.

**Prompt payload:**

> A single completely blank handmade folio rises on a clean desert updraft between two restrained Seljuk stone arches at dawn. The folio is the only airborne paper, turning once in the wind; its surface shows only a faint pressed geometric watermark, never writing. In the lower foreground a single hand-cut reed pen and a closed plain ink bottle rest on a weathered stone ledge, small and grounded. A clear path of wind and pale gold light leads from the pen toward an open horizon, with one distant bird-like shadow avoided; the scene feels like one disciplined insight released into motion. Keep the arches, paper, pen, and horizon legible but sparse, with a calm Sufi-inflected sense of breath and transmission.

**Card-specific negatives:** multiple papers, paper storm, paper birds, pages in a row, flying letters, written marks, ink constellation, chaotic debris, literal number eight, magical trail.

## U014 — Nine of Qalam

**Source:** `Cards_25_31/card_31_nine_of_qalam.png`  
**Theme:** persistence, careful preparation, intellectual resilience.  
**Why redo:** repeated lamps and implements overwhelm the inner act.  
**Identity note:** semantic identity is clear; `Cards_31_37/CARD_31_Nine_of_Qalam_v2.png` is a separate alternative and is not this source UID.

**Redesign brief:** Replace the inventory of lamps with one sustained act of binding and one patient human pause. A mature Persian bookbinder works at a night desk, one blank leather folio open, one thread passing through the spine, and storm light outside. The feeling is endurance that does not need spectacle.

**Prompt payload:**

> In a historically coherent Shiraz bookbinding workshop at blue hour, an unidentified mature Persian bookbinder sits in calm three-quarter profile at a carved cedar desk. One hand guides plain linen thread through the spine of a single closed-and-partly-bound blank leather folio; the other steadies the cover with simple separated fingers. A single low brass lamp illuminates the work while rain-dark shutters and a narrow cool window reflection create a long quiet rhythm in the room. Shelves recede into indigo shadow with no visible inventory display. The dominant meaning is persistence through small repeated care, not labor spectacle; expression attentive, tired, and dignified.

**Card-specific negatives:** repeated lamps, rows of implements, many books, readable pages, monk imagery, spectacles as stereotype, pseudo-writing, visible number nine, cluttered desk, extra hands.

## U016 — Ten of Qalam

**Source:** `Cards_31_37/CARD_32_Ten_of_Qalam_v1.png`  
**Theme:** overextension, responsibility, simplifying the load.  
**Why redo:** the person literally carries a counted stack of ten scrolls.  
**Identity note:** semantic identity is clear.

**Redesign brief:** Show the turning point where burden becomes discernment. One archive porter has arrived at a repository threshold and deliberately lowers one heavy cloth-wrapped bundle onto a bench; an open doorway, released cord, and unburdened path do the philosophical work. Keep the bundle visually substantial but uncountable.

**Prompt payload:**

> An unidentified adult Ottoman archive porter pauses in a worn stone corridor before a warmly lit repository doorway. In a medium side view, the porter has just lowered one heavy cloth-wrapped bundle of blank archival rolls onto a plain cedar bench; a loosened cord and one empty hand show the choice to simplify. The face is natural and readable, posture shows manageable strain turning into relief, and the open doorway reveals only shelves in shadow and a small patch of morning sky. A single reed pen lies on the bench as a quiet reminder of purpose. The image should feel like responsible release, not humiliation or inventory.

**Card-specific negatives:** stack of individually visible scrolls, countable rolls, ten repeated cylinders, bondage, collapse, injury, heroic labor pose, readable labels, pseudo-script, crowded archive.

---

## U057 — Nine of Noor

**Source:** `Islamic_Contemplative_Deck_Cards_43_49/Card_44_Nine_of_Noor.png`  
**Theme:** contentment, gratitude, inner fullness.  
**Why redo:** nine cups displayed in a line read as a conventional pip card.  
**Identity note:** semantic identity is clear.

**Redesign brief:** Let fullness be environmental and inward. An adult rests beneath a pomegranate tree beside a spring-fed pool; one simple vessel is filled, but the main symbol is reflected sky, fruit, shade, and unhurried posture. No banquet or luxury display.

**Prompt payload:**

> A quiet Persian garden courtyard after late-golden rain: an unidentified adult in a plain saffron-brown robe rests beneath a mature pomegranate tree beside a spring-fed reflecting pool, shown from behind in a natural seated three-quarter posture. One small hammered-silver vessel sits near the water's edge, filled but secondary. The pool reflects the same warm sky and branches, while a repaired channel carries a thin continuous stream toward the garden. The atmosphere is gratitude as sufficiency—fullness felt in water, shade, and breath—not abundance on display. Use restrained turquoise geometry on the wall with no writing-like marks and ample calm negative space.

**Card-specific negatives:** nine cups, cup row, banquet, luxury, treasure display, smiling feast, repeated vessels, literal number nine, readable tilework, supernatural water.

## U058 — Ten of Noor

**Source:** `Islamic_Contemplative_Deck_Cards_43_49/Card_45_Ten_of_Noor.png`  
**Theme:** shared mercy, family, communal joy.  
**Why redo:** banquet plus many cups turns communal feeling into a literal count.  
**Identity note:** semantic identity is clear.

**Redesign brief:** Focus on one act of sharing inside a modest Lahore courtyard. A neighbor pours water from one ewer into another person's bowl while the rest of the small community is softly present in background gestures. Hospitality is shown as circulation, not a feast tableau.

**Prompt payload:**

> In a flowering Lahore courtyard at evening, a small multigenerational neighborhood gathers naturally around a low communal table. The dominant action is one unidentified adult gently pouring clear water from a single plain brass ewer into a bowl held by another adult; their hands are anatomically clear and separate. Bread, dates, and a folded cloth appear in modest amounts, while background neighbors are mostly side- or back-facing silhouettes in coherent South Asian garments. Warm lamps mix with indigo dusk, water catches the last sky, and the mood is shared mercy and ordinary belonging rather than a banquet. Keep faces distinct only on the two nearest adults, with an open arch and pomegranate foliage framing the scene.

**Card-specific negatives:** ten vessels, rows of cups, lavish banquet, royal feast, wedding, sacred gathering, duplicated faces, crowd clutter, staged toast, readable text.

## U067 — Four of Noor

**Source:** `tarot_cards_37_43/card_40_four_of_noor.png`  
**Theme:** withdrawal, emotional pause, overlooked grace.  
**Why redo:** four glasses are staged as a diagram.  
**Identity note:** semantic identity is clear.

**Redesign brief:** Make the pause humanly legible without turning it into a counted scene. Use an empty Persian pavilion, one untouched cup in shadow, a person absent but suggested by a folded shawl, and a visible garden reflection that the viewer nearly misses.

**Prompt payload:**

> An empty Persian garden pavilion in soft blue afternoon light, viewed through one restrained horseshoe arch. On a shaded marble ledge sits one untouched clear-glass cup beside a folded indigo shawl; below, a narrow reflecting channel carries a drifting leaf and reveals the reflected shape of a flowering garden just beyond the direct view. The open doorway is luminous but unentered. No person is present; the emotional pause is carried by still water, the unclaimed cup, and a small overlooked patch of sun. Use a quiet, balanced vertical composition with deep teal shadow and one warm natural reflection.

**Card-specific negatives:** four cups, cup line, cup grid, rows of glasses, seated melancholy figure, banquet, literal number four, extra reflections, text, calligraphy.

## U069 — Six of Noor

**Source:** `tarot_cards_37_43/card_42_six_of_noor.png`  
**Theme:** memory, tenderness, generous remembrance.  
**Why redo:** six bowls form a conspicuous counted circle.  
**Identity note:** semantic identity is clear.

**Redesign brief:** Express memory through one careful gesture. An adult folds a beloved indigo shawl beside an Omani well; a single bowl receives palm reflections, and the living water channel continues beyond frame. Do not imply harm to a child or make a memorial shrine.

**Prompt payload:**

> In an Omani date-palm courtyard at early morning, an unidentified adult sits beside an old stone well and carefully folds one indigo woven shawl on a clean bench. A single shallow ceramic bowl rests near the well, holding a natural reflection of palm fronds and pale sky; a narrow irrigation channel carries the reflected light onward. The person's face is shown in calm three-quarter profile, with modest historically coherent clothing and simple separated hands. The scene suggests generous remembrance through care for an ordinary object and continuing water, never grief spectacle or a memorial shrine. Warm sun touches clay, rope, and repaired stone.

**Card-specific negatives:** six bowls, circular bowl arrangement, ghost, child harm, shrine, memorial inscription, repeated reflections, sentimental melodrama, text, pseudo-script.

---

## U074 — Three of Mizan

**Source:** `tarot_cards_49_to_55 (1)/card_52_three_of_mizan.png`  
**Theme:** painful truth, honest recognition.  
**Why redo:** three repeated blade-like mirrors state the numeral but not the insight.  
**Identity note:** semantic identity is high; final numeric placement still belongs to the canonical manifest.

**Redesign brief:** One mirror, one fracture, one honest opening. A rain-dark Mamluk chamber contains a single polished metal mirror with one clean fracture line; its reflection reveals an open doorway and a displaced cushion. A sheathed utility blade may sit out of focus as a material cue, never as a set.

**Prompt payload:**

> A quiet Mamluk domestic chamber during rain contains one tall polished metal mirror leaning against a plaster wall. One clean natural fracture crosses the mirror and catches a narrow ray of white daylight; the reflection does not show a face, only an open doorway and a displaced floor cushion beyond it. On the floor, partly out of focus, rests one fully sheathed utility blade on undyed cloth, clearly safe and secondary. Rain beads on a dark shutter, and the room's honest emptiness carries the meaning of recognition after pain. Keep the fracture physical and restrained, never supernatural.

**Card-specific negatives:** triptych, three mirrors, multiple blades, reflected face, blood, heart symbol, shattered glass explosion, magical crack, readable engraving, calligraphy.

## U075 — Four of Mizan

**Source:** `tarot_cards_49_to_55 (1)/card_53_four_of_mizan.png`  
**Theme:** rest, recovery, suspension of conflict.  
**Why redo:** four swords around a lamp are the exact literal-pip failure.  
**Identity note:** semantic identity is high; final numeric placement still belongs to the canonical manifest.

**Redesign brief:** Remove the perimeter of weapons. Show an empty Seljuk alcove after conflict: one fully sheathed blade rests horizontally on a bench, an extinguished lamp has cooled, folded wool bedding awaits, and dawn makes a protected open center. The card is about peace after setting conflict down.

**Prompt payload:**

> A quiet Seljuk stone alcove at blue dawn contains a simple bench with one fully sheathed Damascus-steel blade laid horizontally and safely, handle turned away from the viewer. Beside it, one extinguished brass lamp has left a faint natural trace of smoke, while folded undyed wool bedding rests ready for recovery. A high arch admits cool light into an open empty center; beyond the alcove, a small patch of sky begins to warm. The blade is not threatening and no person is present. The emotional event is the suspension of conflict and the permission to rest.

**Card-specific negatives:** four swords, sword square, weapon perimeter, exposed edge, blood, battlefield, tomb, guard stance, heraldry, magical light, engraving, text.

## U076 — Five of Mizan

**Source:** `tarot_cards_49_to_55 (1)/card_54_five_of_mizan.png`  
**Theme:** conflict, pride, the cost of winning.  
**Why redo:** five blades scattered across paving are empty counting.  
**Identity note:** semantic identity is high; final numeric placement still belongs to the canonical manifest.

**Redesign brief:** Let the aftermath be social and weathered, not martial. A storm-washed Maghrebi courtyard has one abandoned scabbard at a low wall, a blank indigo cloth caught on a gate, and one upright chair separated from an overturned chair. Rainwater carries dust toward a drain, with an open gate suggesting humility after hollow victory.

**Prompt payload:**

> After a storm in a deserted Maghrebi civic courtyard, one intact sheathed scabbard lies beside a low wall, partly covered by a completely blank indigo cloth caught on a wooden gate. One plain chair remains upright while another rests overturned at a distance; rainwater carries loosened dust toward a central drain. The open gate reveals a muted green horizon, while charcoal stone, wet terracotta, and worn bronze hold the frame. No person is shown; the scene reads as the quiet cost of pride after a hollow win, not a battlefield.

**Card-specific negatives:** five swords, scattered blades, exposed steel, battle debris, bodies, blood, trophies, flags, victory pose, literal number five, text.

## U084 — Four of Ard

**Source:** `tarot_cards_61_67/card_67_four_of_ard.png`  
**Theme:** security, holding too tightly, fear of loss.  
**Why redo:** four coins on a chest are static inventory.  
**Identity note:** semantic identity is high; final numeric placement still belongs to the canonical manifest.

**Redesign brief:** Turn possession into a single ethical hesitation. In a Persianate storeroom, one cedar chest is bound too tightly; an adult keeper loosens one cord while an open window reveals a living produce market. One plain bronze token may be present but must remain secondary and uncounted.

**Prompt payload:**

> In a dim Persianate storeroom, an unidentified adult keeper pauses beside one closed cedar storage chest wrapped in an unnecessarily tight hemp cord. One anatomically clear hand is loosening the cord while the other rests open at the side; a single unmarked bronze token lies in shadow on the chest but is not the focal subject. Through a small open window, a sunlit produce market and moving leaves reveal the life being kept out. Dust, empty jars, and worn timber make the room believable. The philosophical action is releasing fear's grip, not guarding a hoard.

**Card-specific negatives:** coin display, four tokens, treasure chest, hoard, miser caricature, lock shaped like a face, royal emblem, counting, readable coin, supernatural shine.

---

## Held briefs — do not render until the manifest resolves identity

### U034 — unresolved eight-coin candidate (probably Eight of Ard; hypothesis only)

**Source:** `Final Phase Miscelaneous/ChatGPT Image Sep 2, 2026, 01_34_07 PM (5).png`  
**Observed failure:** eight identical coins mounted on a wall; pure prompt arithmetic.  
**Why held:** the file has no card name or number and appears to compete with other Ard alternatives. The likely semantic reading is Eight of Ard (mastery through work / craft discipline), but that is not confirmed.

**Future redesign brief:** once confirmed as Eight of Ard, show an adult craftsperson completing one difficult material step—e.g., fitting one final geometric tile into a public-workshop wall while the rest of the pattern remains architectural rather than countable. The suit should be clay, stone, soil, or labor, not a coin collection.

**Future prompt payload:**

> An unidentified adult Anatolian craftsperson completes one careful fitting action in a warm communal workshop: a single glazed geometric tile is pressed into a public wall whose broader pattern is botanical and architectural, never a row of countable objects. The person's face is naturally readable in three-quarter view, hands simple and separated, with kiln warmth balanced by cool window light. Clay dust, wood, and water carry the material language of earned mastery. The image should feel like patient repetition becoming skill, with no visible coin, inventory, number, or writing.

**Hold condition:** assign a canonical card ID and confirm whether this is a retained alternative before generation.

### U035 — unresolved seven-coin candidate (probably Seven of Ard; hypothesis only)

**Source:** `Final Phase Miscelaneous/kk.png`  
**Observed failure:** seven coins arranged around a worker; exact counted-object failure.  
**Why held:** the file is unlabeled and competes with the named Ard sequence. The likely semantic reading is Seven of Ard (patience / cultivation / long-term effort), but that is not confirmed.

**Future redesign brief:** once confirmed as Seven of Ard, show an orchard keeper tending one irrigation gate or one date cluster while the landscape demonstrates patient cultivation. The number must disappear into time and process.

**Future prompt payload:**

> An unidentified Omani orchard keeper kneels beside one repaired stone irrigation gate in a terraced oasis at first light. One hand tests the flow of water and the other steadies a single young date cluster; the face is calm and readable in side three-quarter view. Repaired terraces, deep soil, and distant palms show patience accumulated over seasons. Use ivory work clothing with a muted-teal wrap, warm dawn on stone, and no displayed tokens, coin, countable fruit set, writing, or fantasy abundance.

**Hold condition:** assign a canonical card ID and confirm whether this is a retained alternative before generation.

### U087 — probably Seven of Mizan, source-labeled “Seven of Swords”

**Source:** `Tarrot Cards 55-61/card_57_seven_of_swords.png`  
**Observed failure:** figure carries a counted bundle of swords.  
**Why held:** the folder overlaps Mizan numbering and changes the suit label to “swords”; canonical suit and index are unresolved.

**Future redesign brief:** if confirmed as Seven of Mizan (strategy, caution, unseen consequences), show one closed blank envelope left in a lattice shadow beside one sheathed inspection knife, with an open route beyond. Strategy should be an ethical pause, not theft or spy fantasy.

**Future prompt payload:**

> A quiet Ottoman civic office at late afternoon: one closed blank envelope rests half in geometric lattice shadow on a cedar desk beside one fully sheathed inspection knife and an unlit brass lamp. Beyond the desk, an open doorway reveals a public courtyard and a clear route forward. No person is required; if included, show only an unidentified clerk's hand withdrawn from the envelope, never taking it. The scene expresses caution and unseen consequence through withheld information and light, not weapon display.

**Hold condition:** confirm Mizan suit and canonical 0–77 number.

### U088 — probably Eight of Mizan, source-labeled “Eight of Swords”

**Source:** `Tarrot Cards 55-61/card_58_eight_of_swords.png`  
**Observed failure:** blindfold plus eight surrounding swords is a conventional literal scene.  
**Why held:** same unresolved “swords” versus Mizan mapping.

**Future redesign brief:** if confirmed as Eight of Mizan (restriction, mental imprisonment, finding the opening), show a craft worker caught in a natural lattice shadow with one broad sunlit exit; no ropes, blindfold, or weapon ring.

**Future prompt payload:**

> An unidentified adult Levantine craft worker stands in a courtyard where an intricate geometric lattice casts a boundary of shadow across the floor. The face is intentionally turned away; one foot has already turned toward a wide sunlit opening leading to open air and a flowering path. A single fully sheathed blade rests far in the background as a quiet material cue, not a barrier. Terracotta robe, indigo shoulder wrap, weathered stone, and natural afternoon light carry the idea of finding an opening inside restriction.

**Hold condition:** confirm Mizan suit and canonical 0–77 number.

### U089 — probably Nine of Mizan, source-labeled “Nine of Swords”

**Source:** `Tarrot Cards 55-61/card_59_nine_of_swords.png`  
**Observed failure:** nine mounted swords over a distressed figure.  
**Why held:** same unresolved “swords” versus Mizan mapping.

**Future redesign brief:** if confirmed as Nine of Mizan (anxiety, conscience, difficult thought), show one awake adult beside one low lamp before dawn while sword-like shadows from a window lattice dissolve as the shutter opens; no real weapons in the room.

**Future prompt payload:**

> An unidentified adult from the Bosnian Ottoman tradition sits awake in a modest timber-and-plaster room before dawn, hands resting separately on the knees and face tired but anatomically natural. One low brass lamp burns beside a closed shutter; as the shutter opens slightly, one lattice shadow stretches across the wall and begins to soften into ordinary morning light. The room contains no weapon. The image should feel like conscience moving through anxiety toward clarity, without horror or melodrama.

**Hold condition:** confirm Mizan suit and canonical 0–77 number.

### U090 — probably Ten of Mizan, source-labeled “Ten of Swords”

**Source:** `Tarrot Cards 55-61/card_60_ten_of_swords.png`  
**Observed failure:** prone body with a row of swords; blunt conventional imagery.  
**Why held:** same unresolved “swords” versus Mizan mapping.

**Future redesign brief:** if confirmed as Ten of Mizan (ending of a trial, release after hardship), show rain-cleansed stone, one abandoned scabbard, and an open garden gate into living green. No body, corpse, or execution reference.

**Future prompt payload:**

> Wet stone after rain in a quiet Persian civic courtyard: one intact empty scabbard lies at the edge of the frame while first dawn light reaches an open garden gate and a clean path continues into living green. A small puddle reflects only sky; a torn blank cloth has settled beside the wall. No person is present. The visual event is a concluded trial and release after hardship, expressed through weather, distance, and the return of ordinary life.

**Hold condition:** confirm Mizan suit and canonical 0–77 number.

## LUNA visual QA gate

Before accepting any output, inspect it at card size and ask:

1. Is the first read an inner event rather than a count of suit objects?
2. Is there one dominant focal subject/action and a calm, readable vertical hierarchy?
3. Does the palette, border, title cartouche, light, and material texture sit beside the strong references U001/U003/U005/U006/U038/U042/U045/U046/U048/U059/U060/U064/U070/U081/U083?
4. Are people ordinary and unidentified, with natural face/hand anatomy and culturally coherent clothing?
5. Is all ornament geometric/botanical and unmistakably non-script-like?
6. Is the lower title area clean and empty?
7. If a countable suit object appears, is it one meaningful object rather than a literal set?

Reject and rerun once if the image contains a repeated-object arrangement, legible or pseudo-writing, sacred-person implication, obvious sword violence, banquet excess, a missing lower cartouche, or a composition whose meaning collapses at thumbnail size.

