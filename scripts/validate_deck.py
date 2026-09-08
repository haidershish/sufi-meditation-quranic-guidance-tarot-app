"""validate_deck.py — verify the generated deck bundle is app-safe."""
import json, sys
from pathlib import Path

REPO = Path(r"C:\Users\User\Documents\ChatGPT\Tarot")
BUNDLE = REPO / "src" / "content" / "deck-bundle.json"
ASSETS = REPO / "assets" / "cards"

d = json.loads(BUNDLE.read_text(encoding="utf-8"))
cards = d["cards"]
errors = []

# 1. exactly 78 unique ids
ids = [c["id"] for c in cards]
if len(cards) != 78:
    errors.append(f"expected 78 cards, got {len(cards)}")
if len(set(ids)) != 78:
    errors.append(f"duplicate ids: {[i for i in ids if ids.count(i) > 1]}")

# 2. seven guide sections non-empty per card
REQ = ["theme", "invitation", "outOfBalance", "contemplate", "practice", "intention", "visualMeditation"]
for c in cards:
    for k in REQ:
        v = c["guide"].get(k)
        if not v or not str(v).strip():
            errors.append(f"{c['id']} missing guide.{k}")

# 3. front matter
fm = d.get("frontMatter", {})
if not fm.get("title") or not fm.get("subtitle"):
    errors.append("front matter missing title/subtitle")
if len(fm.get("sections", [])) != 5:
    errors.append(f"expected 5 front matter sections, got {len(fm.get('sections', []))}")

# 4. artwork statuses + asset existence
missing = []
for c in cards:
    a = c["artwork"]
    if a["status"] not in ("approved", "placeholder", "missing"):
        errors.append(f"{c['id']} bad artwork.status {a['status']}")
    if a["status"] == "approved":
        if not a.get("assetKey"):
            errors.append(f"{c['id']} approved but no assetKey")
        elif not (ASSETS / a["assetKey"]).exists():
            errors.append(f"{c['id']} assetKey {a['assetKey']} not on disk")
    if a["status"] == "missing":
        missing.append(c["id"])

# 5. provenance checksums present
p = d.get("provenance", {})
for k in ("manifestChecksum", "guidebookChecksum", "qaReportChecksum", "artworkMapChecksum"):
    if not p.get(k):
        errors.append(f"missing provenance.{k}")

print(f"cards: {len(cards)}  approved: {sum(1 for c in cards if c['artwork']['status']=='approved')}  missing: {len(missing)}")
print(f"deckVersion: {d.get('deckVersion')}  provenance checksums: {len([k for k in p if k.endswith('Checksum')])}")
print(f"front matter: '{fm.get('title')}' / {len(fm.get('sections', []))} sections")
if missing:
    print("missing artwork (placeholder):", missing)
if errors:
    print(f"\n{len(errors)} ERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("\nVALIDATION PASS")
