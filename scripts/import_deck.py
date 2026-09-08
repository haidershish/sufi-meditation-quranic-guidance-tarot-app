"""
import_deck.py — build the app-safe, validated deck bundle.

Reproduces build_guidebook_revised.py's structured output (never parses DOCX
at runtime), maps the 78 numbered card images to manifest cards, copies the
selected art into assets/cards/, and emits src/content/deck-bundle.json with
provenance + checksums.

Artwork resolution rules (user-directed):
  1. named files (Card_/card_/CORE_/CARD_ NN) resolve to a card by semantic
     suit+rank+court name (handles 0-based, 1-based, and legacy swords/page).
  2. "Final Phase Miscelaneous" bare-numbered PNGs (70..78) map 1-based:
     number N -> manifest index N-1.
  3. Conflicts: prefer the highest _vN; tie-break on the clean official
     "Islamic_Contemplative_Deck_Cards_*" batch, then non-legacy naming.
  4. Any card still without art -> artwork.status "missing" (placeholder back).
"""
import json, re, os, sys, hashlib, shutil
from pathlib import Path

from PIL import Image

SOURCE_DIR = Path(r"C:\Users\User\Documents\Islamic_Contemplative_Deck")
MANIFEST = SOURCE_DIR / "islamic_contemplative_deck_manifest.json"
GUIDEBOOK = SOURCE_DIR / "Culturally_Inspired_Contemplative_Tarot_Guidebook_78_Cards.docx"
QA_REPORT = SOURCE_DIR / "Culturally_Inspired_Contemplative_Tarot_Guidebook_QA_Report.md"
IMGDIR = Path(r"C:\AI\Sufi Tarot")
REPO = Path(r"C:\Users\User\Documents\ChatGPT\Tarot")
ASSETS = REPO / "assets" / "cards"
CONTENT = REPO / "src" / "content"

EXCLUDE_DIRS = {"1_Archive_Zip Files", "Final Phase Miscelaneous"}

sys.path.insert(0, str(SOURCE_DIR))
import build_guidebook_revised as B  # noqa: E402
from docx import Document  # noqa: E402


def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def optimize(src: Path, dst: Path, max_w: int = 800, max_h: int = 1400, quality: int = 85) -> None:
    """Downscale + re-encode card art to a deployable JPEG."""
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(max_w / w, max_h / h, 1.0)
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=quality, optimize=True)


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def version_of(name: str) -> int:
    m = re.search(r"_v(\d+)(?:\D|$)", name.lower())
    return int(m.group(1)) if m else 0


# ---- resolve semantic card names to manifest index ----
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
cards = manifest["cards"]
assert len(cards) == 78, f"expected 78 cards, got {len(cards)}"

title_to_idx = {norm(c["title"]): i for i, c in enumerate(cards)}
LEGACY = [("swords", "mizan"), ("page", "seeker"), ("knight", "scholar"),
          ("queen", "guardian"), ("king", "sage")]


def resolve_name(name: str):
    n = norm(name)
    n = re.sub(r"_?v\d+$", "", n)
    n = re.sub(r"_?v\d+", "", n)
    cands = [n]
    m = re.match(r"^(qalam|noor|mizan|ard)[_]?(seeker|scholar|guardian|sage)$", n)
    if m:
        cands.append(m.group(2) + "of" + m.group(1))
    n2 = n
    for old, new in LEGACY:
        n2 = n2.replace(old, new)
    cands.append(n2)
    for c in cands:
        if c in title_to_idx:
            return title_to_idx[c], (c != n)  # (index, is_legacy_or_reversed)
    return None, None


# ---- collect artwork candidates ----
# candidates[idx] = list of dicts {version, official, path}
candidates = {}
pat = re.compile(r"^(?:card|core)_?(\d{1,3})[_\s]+(.+?)\.(png|jpg|jpeg|webp)$", re.I)

for root, dirs, fs in os.walk(IMGDIR):
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
    for f in fs:
        if not f.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            continue
        p = Path(root) / f
        m = pat.match(f)
        if m:
            idx, legacy = resolve_name(m.group(2))
            if idx is not None:
                official = root.startswith(str(IMGDIR / "Islamic_Contemplative_Deck_Cards"))
                candidates.setdefault(idx, []).append({
                    "version": version_of(f), "official": official,
                    "legacy": legacy, "path": p,
                })

# Final Phase Miscelaneous: bare numbers map 1-based (N -> idx N-1)
fp = IMGDIR / "Final Phase Miscelaneous"
if fp.exists():
    for f in fp.iterdir():
        m = re.match(r"^(\d{1,3})\.(png|jpg|jpeg|webp)$", f.name, re.I)
        if m:
            idx = int(m.group(1)) - 1
            if 0 <= idx < 78:
                candidates.setdefault(idx, []).append({
                    "version": 0, "official": False, "legacy": False, "path": f,
                })


def pick(cands):
    # highest version, then official batch, then non-legacy
    return max(cands, key=lambda c: (c["version"], c["official"], not c["legacy"]))


# ---- derive guidebook content ----
def front_matter() -> dict:
    doc = Document()
    B.add_front_matter(doc)
    paras = [p.text for p in doc.paragraphs if p.text.strip()]
    # paras[0]=title, paras[1]=subtitle, then heading/body pairs, last=closing
    title, subtitle = paras[0], paras[1]
    rest = paras[2:]
    sections, closing = [], None
    i = 0
    while i < len(rest):
        t = rest[i]
        if t in ("Use as a reflective prompt; keep decisions grounded in evidence, consent, and appropriate support."):
            closing = t
            i += 1
            continue
        # heading followed by body
        body = rest[i + 1] if i + 1 < len(rest) else ""
        if body and body not in ("Use as a reflective prompt; keep decisions grounded in evidence, consent, and appropriate support."):
            sections.append({"title": t, "body": body})
            i += 2
        else:
            i += 1
    return {
        "title": title, "subtitle": subtitle,
        "sections": sections, "closingNote": closing,
        "footer": B.FOOTER_TEXT,
    }


def build_card(i, c):
    is_core = c["arcana"] == "Core Arcana"
    copy = B.core_copy(c) if is_core else B.minor_copy(c)
    guide = {
        "theme": B.clean_theme(c["theme"]),
        "invitation": copy["The invitation"],
        "outOfBalance": copy["When out of balance"],
        "contemplate": copy["Contemplate"],
        "practice": copy["Practice"],
        "intention": copy["Intention"],
        "visualMeditation": B.visual_meditation(c),
    }
    cands = candidates.get(i, [])
    art = {"status": "missing", "assetKey": None, "sourceChecksum": None}
    if cands:
        src = pick(cands)["path"]
        key = f"{c['card_id']}.jpg"
        art = {
            "status": "approved",
            "assetKey": key,
            "sourceChecksum": sha256_file(src),
            "sourceRel": str(src.relative_to(IMGDIR)) if str(src).startswith(str(IMGDIR)) else str(src),
        }
    return {
        "id": c["card_id"], "index": i,
        "arcana": c["arcana"],
        "suit": c["suit"] or None,
        "rank": c["rank"],
        "title": c["title"],
        "transliteration": c["transliteration"],
        "guide": guide,
        "artwork": art,
    }


built = [build_card(i, c) for i, c in enumerate(cards)]

# ---- optimize + copy selected images into assets/cards/ ----
ASSETS.mkdir(parents=True, exist_ok=True)
for b in built:
    if b["artwork"]["status"] == "approved":
        src = IMGDIR / b["artwork"]["sourceRel"]
        optimize(src, ASSETS / b["artwork"]["assetKey"])

approved = sum(1 for b in built if b["artwork"]["status"] == "approved")
missing = [b["id"] for b in built if b["artwork"]["status"] == "missing"]

# ---- emit bundle ----
artwork_map = {b["id"]: b["artwork"]["sourceChecksum"] or "" for b in built}
artwork_map_str = json.dumps(artwork_map, sort_keys=True)
bundle = {
    "deckVersion": "1.0.0",
    "generatedAt": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
    "provenance": {
        "manifestChecksum": sha256_file(MANIFEST),
        "guidebookChecksum": sha256_file(GUIDEBOOK),
        "qaReportChecksum": sha256_file(QA_REPORT),
        "artworkMapChecksum": hashlib.sha256(artwork_map_str.encode()).hexdigest(),
        "sourceManifest": str(MANIFEST),
        "sourceGuidebookDocx": str(GUIDEBOOK),
        "sourceQaReport": str(QA_REPORT),
        "builderScript": "build_guidebook_revised.py",
    },
    "frontMatter": front_matter(),
    "cards": built,
}

CONTENT.mkdir(parents=True, exist_ok=True)
out = CONTENT / "deck-bundle.json"
out.write_text(json.dumps(bundle, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"cards: {len(built)}  approved art: {approved}  missing: {len(missing)}")
if missing:
    print("missing card ids:", missing)
print(f"front matter sections: {[s['title'] for s in bundle['frontMatter']['sections']]}")
print(f"bundle -> {out}")
print(f"assets -> {ASSETS} ({len(list(ASSETS.glob('*'))) if ASSETS.exists() else 0} files)")
