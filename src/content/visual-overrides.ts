import type { CardGuide } from "@/domain/types";

type VisualGuideOverride = Pick<CardGuide, "descriptionOfImage" | "invitation" | "visualMeditation">;

// These cards already use the second-pass artwork in assets/cards. Keep their
// guidebook language aligned with what is actually visible instead of the old
// count-the-suit-object prompts.
export const VISUAL_GUIDE_OVERRIDES: Record<string, VisualGuideOverride> = {
  QALAM_04: {
    descriptionOfImage: "The image shows an anonymous adult seated quietly on a woven rug inside a stone library doorway, an open book resting nearby, a rain-washed terrace and distant city beyond the arch. The composition holds the figure between the shelter of study and the open world; no readable text appears.",
    invitation: "A pause can be a form of study rather than an escape. Let the seated figure and the open doorway help you distinguish restored attention from avoidance, then choose the smallest return to what matters.",
    visualMeditation: "Move your attention between the seated figure and the open doorway. Notice how the wet floor carries the outside light into the room. What relationship between rest and return needs your attention?",
  },
  QALAM_05: {
    descriptionOfImage: "The image shows two adult scholars in a sunlit courtyard, one speaking with an open hand while the other listens with a hand at his chin across a blank sheet on a carved table. A narrow water channel and tiled garden continue behind them; no readable text appears.",
    invitation: "Disciplined disagreement can keep thought alive. Name the point of friction without turning the other person into an obstacle, and let listening change the shape of the question before you defend an answer.",
    visualMeditation: "Move your attention between the speaking hand and the listening face. Follow the water channel between them. What would it mean to let disagreement clarify rather than harden your position?",
  },
  QALAM_06: {
    descriptionOfImage: "The image shows an older scholar offering a blank bound manuscript to a younger adult kneeling beside a sunlit stream. Their hands meet around the book while trees, water, and a distant city open behind them; no readable text appears.",
    invitation: "Knowledge becomes living when it is received, tested, and carried onward. Notice what you have inherited, what needs repair, and what you can pass forward without pretending it is finished.",
    visualMeditation: "Move your attention between the older hands, the younger hands, and the stream beyond them. Where do care and responsibility change hands in your own life?",
  },
  QALAM_07: {
    descriptionOfImage: "The image shows an adult archivist standing at the threshold of a warmly lit library while wind and rain move through a dark mountain pass behind him. He holds one closed book against his chest; the doorway, roots, and rushing water create a protected boundary. No readable text appears.",
    invitation: "Resolve is not the same as rigidity. Ask what deserves protection, what can remain open to revision, and which boundary lets learning survive the weather around it.",
    visualMeditation: "Move your attention between the lit library and the storm beyond the threshold. Notice the book held against the body and the water descending the steps. What are you protecting, and what are you still willing to learn?",
  },
  NOOR_05: {
    descriptionOfImage: "The image shows an adult woman crouched beside a clear courtyard stream, lowering one small cup into the water as ripples widen across a reflecting pool. Fig branches, a sunlit doorway, and worn stone hold grief and renewal in the same frame; no readable text appears.",
    invitation: "Grief is not an empty cup that must be filled quickly. Let loss be named while you notice the small act of gathering what remains, without forcing hope to arrive before it is ready.",
    visualMeditation: "Move your attention between the cup in her hand and the widening ripples. Follow the stream toward the open doorway. What remains available to receive, release, or return?",
  },
  NOOR_07: {
    descriptionOfImage: "The image shows an adult woman in a dark garden holding a lantern beside a moonlit pool. Her reflection opens below her while a path disappears beneath trees and flowers; the water offers a second, uncertain view of the scene. No readable text appears.",
    invitation: "Desire can make the surface of the water look like a promise. Stay long enough to notice which image is a real path, which is a projection, and what evidence would help you choose with care.",
    visualMeditation: "Move your attention between the lantern, the woman’s reflection, and the path under the moon. Which image invites you, and which one asks to be questioned?",
  },
  NOOR_08: {
    descriptionOfImage: "The image shows an adult traveler walking away from a dark stagnant pool and a fallen cup toward a bright river running through a mountain valley. A worn path, a ruined wall, and the rising sun give the departure direction without making it triumphant. No readable text appears.",
    invitation: "Leaving emotional stagnation is not the same as abandoning feeling. Choose a deeper source of honesty, then give the departure a concrete route, boundary, and next step.",
    visualMeditation: "Move your attention between the dark pool behind the traveler and the bright river ahead. Notice the abandoned cup and the direction of the feet. What are you leaving, and what are you moving toward?",
  },
  MIZAN_02: {
    descriptionOfImage: "The image shows an adult traveler standing with a staff in a fast-moving river at dawn, a small bundle resting on the bank and several channels of water opening toward a misty valley. The figure pauses while the current continues around him; no readable text appears.",
    invitation: "A careful decision may require stillness inside movement. Let the current show you what is already changing, then distinguish the choice you can make from the conditions you must meet honestly.",
    visualMeditation: "Move your attention between the traveler’s planted staff and the river moving around it. Notice the bundle on the bank and the open valley beyond. What can pause, and what cannot?",
  },
  MIZAN_03: {
    descriptionOfImage: "The image shows an adult woman tying a living branch to an older olive tree with a pale strip of cloth. Wet soil, a low stone wall, and a brightening sky surround the careful repair; no weapon or readable text appears.",
    invitation: "Truth can be painful because it asks for a changed relationship, not only a changed opinion. Look for the place where honest recognition becomes a small act of repair.",
    visualMeditation: "Move your attention between the woman’s hands, the tied branch, and the rooted trunk. What truth is being held gently enough to grow?",
  },
  MIZAN_04: {
    descriptionOfImage: "The image shows an adult man seated beneath an old tree with both feet resting in a clear stream. His staff and sandals lie nearby while birds cross the evening sky and cultivated hills continue beyond him; no readable text appears.",
    invitation: "Rest can suspend conflict without denying it. Let the body recover before asking it to decide, and notice whether the pause returns you to responsibility with more clarity.",
    visualMeditation: "Move your attention between the bare feet in the stream and the staff set aside on the bank. What becomes possible when effort is temporarily put down?",
  },
  MIZAN_05: {
    descriptionOfImage: "The image shows two adult workers repairing a breached irrigation channel at dusk. One steadies a wooden gate while the other places a large stone into the rushing water; their bodies face different directions but the channel joins their work. No readable text appears.",
    invitation: "Conflict becomes costly when winning matters more than restoring what people depend on. Ask which part of the shared ground needs repair before pride claims the whole field.",
    visualMeditation: "Move your attention between the two workers and the water passing through the gap between them. What is being protected, and what does each person have to release to repair it?",
  },
  MIZAN_06: {
    descriptionOfImage: "The image shows two adults repairing a rough wooden footbridge over a bright river, tying rope around the rails while the current passes beneath them. One person works from each side, connected by a shared structure; no readable text appears.",
    invitation: "A transition toward fairness is built through practical cooperation. Find the small repair that lets people cross safely, and let progress be measured by access rather than appearance.",
    visualMeditation: "Move your attention between the two pairs of hands and the water beneath the bridge. What shared crossing is asking for patience, strength, or a clearer agreement?",
  },
  MIZAN_07: {
    descriptionOfImage: "The image shows an adult traveler kneeling at the edge of a highland valley, studying a blank map while a heron stands beside a branching stream. A small inspection dagger rests on the ground, secondary to the visible paths, tracks, and uncertain horizon. No readable text appears.",
    invitation: "Caution is not concealment; it is the discipline of seeing consequences before acting. Read the landscape, inspect the evidence, and keep your next move proportionate to what you actually know.",
    visualMeditation: "Move your attention between the map, the branching stream, and the heron waiting at the water’s edge. What information are you tempted to skip because you want to move?",
  },
  MIZAN_08: {
    descriptionOfImage: "The image shows an adult woman seated inside a dense wall of leaves, one hand pulling a branch aside to reveal a sunlit path through the garden. A walking staff and bundle rest beside her; the opening is made by attention rather than force. No readable text appears.",
    invitation: "Restriction can feel total while still containing an opening. Look for the pattern that keeps you in place, then test one gentle action that creates room without pretending the boundary is gone.",
    visualMeditation: "Move your attention between the woman’s hand and the bright path beyond the leaves. What changes when the opening is noticed, and what still needs to be crossed?",
  },
  MIZAN_09: {
    descriptionOfImage: "The image shows an adult woman sitting beneath a large tree at dusk with a lantern resting against her knees. A quiet path descends toward a distant valley while her breath catches in the cool air; the scene holds anxiety beside a possible route forward. No readable text appears.",
    invitation: "Anxious thought can turn every shadow into a verdict. Stay close to the actual evidence, name the conscience beneath the fear, and let one illuminated next step be enough for now.",
    visualMeditation: "Move your attention between the lantern’s small circle of light and the path disappearing into the valley. What is clear enough to do before the whole future becomes clear?",
  },
  MIZAN_10: {
    descriptionOfImage: "The image shows an adult traveler setting down a heavy pack beside a mountain stream at sunrise. A bright valley and a winding river open ahead while the narrow trail behind remains in shadow; the burden is present but no violence is shown. No readable text appears.",
    invitation: "Release after hardship is not erasure; it is the permission to stop carrying what has finished its work. Name what can be put down, and keep only what helps you enter the next landscape.",
    visualMeditation: "Move your attention between the pack on the ground and the river opening through the valley. What weight has become part of your identity, and what would you see without it?",
  },
  ARD_05: {
    descriptionOfImage: "The image shows an adult traveler standing in rain beneath a patched cloak outside a warmly lit bread house. Wet stone, a small growing plant, and the bright doorway create a boundary between hardship and shared provision; no readable text appears.",
    invitation: "Scarcity can narrow the field of attention until dignity disappears from view. Notice the door, the shelter, and the possibility of fair access without turning hardship into a spectacle.",
    visualMeditation: "Move your attention between the rain-darkened figure and the warm doorway. What kind of boundary would protect dignity while allowing care to reach the person who needs it?",
  },
  ARD_07: {
    descriptionOfImage: "The image shows an adult orchard keeper kneeling beside a date palm, one hand holding a ripening cluster while the other opens a small irrigation gate. Terraced stone walls, water, and a mountain oasis extend behind him; no readable text appears.",
    invitation: "Cultivation is patient because it works with seasons rather than demanding instant proof. Attend to the living thing, the water that sustains it, and the repair that makes tomorrow possible.",
    visualMeditation: "Move your attention between the ripening dates and the opened water gate. Where do patience and practical effort meet in what you are trying to grow?",
  },
  ARD_08: {
    descriptionOfImage: "The image shows an adult artisan pressing a blue geometric tile into the wall of a public building while other workers continue construction behind him. Wet mortar, hand tools, and the unfinished arch keep the focus on practiced work rather than displayed objects; no readable text appears.",
    invitation: "Mastery is the accumulation of attentive repetitions that become useful to others. Choose one craft, task, or responsibility and give it the patient precision the tile receives.",
    visualMeditation: "Move your attention between the artisan’s hands and the larger wall receiving the tile. What small act of care becomes part of a structure that will outlast you?",
  },
  ARD_09: {
    descriptionOfImage: "The image shows an adult orchard keeper tying a loosened trellis beside a mature pomegranate tree. Irrigation water runs through a repaired stone channel, baskets and healthy growth sit nearby, and late sun settles over the terraces; no readable text appears.",
    invitation: "Sufficiency is not a trophy or a counted display. It is the quiet health produced by time, water, attention, and the willingness to keep caring for what has ripened.",
    visualMeditation: "Move your attention between the keeper’s hands, the repaired trellis, and the water channel. What has grown because someone stayed close enough to maintain it?",
  },
  ARD_10: {
    descriptionOfImage: "The image shows an older woman teaching a younger adult woman to graft a living sapling in a terraced garden. A shared water channel, nearby workers, mature trees, and a village beyond make prosperity feel transmitted through care and skill; no readable text appears.",
    invitation: "Shared prosperity becomes durable when it is taught, tended, and made available beyond one person. Notice what you can pass on as a practice rather than a possession.",
    visualMeditation: "Move your attention between the two sets of hands around the sapling and the water flowing beside them. What knowledge, care, or access is being carried into the next generation?",
  },
  ARD_GUARDIAN: {
    descriptionOfImage: "The image shows an adult terrace worker kneeling at a stone sluice, clearing debris so a shared water channel can flow toward cultivated fields. A neighbor waits with a vessel in the background while the worker’s hands, fitted stones, and moving water form the ethical center; no readable text appears.",
    invitation: "Protection is often quiet, physical, and shared. Guard the boundary that keeps a common resource usable, and let reliable labor—not status—show what guardianship means.",
    visualMeditation: "Move your attention between the worker’s hands, the fitted stone, and the water continuing toward the fields. What resource or boundary depends on your steady care?",
  },
};
