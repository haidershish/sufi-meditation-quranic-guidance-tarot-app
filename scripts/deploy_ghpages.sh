#!/usr/bin/env bash
# Build + deploy the static web app to GitHub Pages (gh-pages branch).
# Run from the repo root. Requires git access to the GitHub repo.
set -euo pipefail

BASE="/sufi-meditation-quranic-guidance-tarot-app"
REPO="https://github.com/haidershish/sufi-meditation-quranic-guidance-tarot-app.git"

echo "== 1/4 export =="
 npx expo export --platform web

echo "== 2/4 prefix and verify Expo base path =="
python scripts/postprocess.py
grep -q "$BASE/_expo/" dist/index.html

echo "== 3/4 .nojekyll (Jekyll ignores _-prefixed dirs) =="
touch dist/.nojekyll
# GitHub Pages serves 404.html for client-side/dynamic routes while preserving
# the requested URL. The Expo Router bundle then resolves that retained path.
cp dist/index.html dist/404.html

echo "== 4/4 push dist/ to gh-pages =="
TMP=$(mktemp -d)
cp -r dist/. "$TMP/"
cd "$TMP"
git init -q
git add -A
git commit -q -m "deploy static site"
git branch -M gh-pages
git remote add origin "$REPO"
git push -f -u origin gh-pages
cd - >/dev/null
echo "Deployed. Live at: https://kurobunty.github.io$BASE/"
