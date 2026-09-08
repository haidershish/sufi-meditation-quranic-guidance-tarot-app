"""postprocess.py — prefix root-absolute asset URLs with the GitHub Pages base path.

Expo's static export inlines EXPO_BASE_URL for the router, but the asset URLs
(/_expo/..., /assets/..., /favicon.ico) remain root-absolute. This rewrites them
so the static bundle works when served from /<repo>/ on GitHub Pages.
"""
import pathlib
import sys

BASE = "/sufi-contemplative-tarot-app"
DIST = pathlib.Path("dist")

REPLACEMENTS = [
    ('"/_expo/', f'"{BASE}/_expo/'),
    ("'/_expo/", f"'{BASE}/_expo/"),
    ('"/assets/', f'"{BASE}/assets/'),
    ("'/assets/", f"'{BASE}/assets/"),
    ('"/favicon.ico', f'"{BASE}/favicon.ico'),
    ("'/favicon.ico", f"'{BASE}/favicon.ico"),
    ('href="/favicon', f'href="{BASE}/favicon'),
    ('src="/favicon', f'src="{BASE}/favicon'),
]

changed = 0
for path in DIST.rglob("*"):
    if not path.is_file():
        continue
    if path.suffix.lower() not in (".html", ".js", ".css", ".json", ".txt", ".xml", ".ico", ".svg", ".png", ".webmanifest"):
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    new = text
    for old, repl in REPLACEMENTS:
        new = new.replace(old, repl)
    if new != text:
        path.write_text(new, encoding="utf-8")
        changed += 1

# safety: report any remaining root-absolute asset refs
import re
leftover = 0
for path in DIST.rglob("*.html"):
    if not path.is_file():
        continue
    t = path.read_text(encoding="utf-8", errors="ignore")
    for m in re.findall(r'(?:src|href)="(/[^"]+)"', t):
        if m.startswith("/") and not m.startswith(BASE):
            print(f"  LEFTOVER {path}: {m}")
            leftover += 1

print(f"rewrote {changed} files; leftover root-absolute asset refs: {leftover}")
sys.exit(1 if leftover else 0)
