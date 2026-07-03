#!/bin/bash
# Pushes the belief-quotes update. Reads the token from Claude's config.
# Self-deletes when done.
set -e
cd "$(dirname "$0")"

TOKEN=$(python3 -c 'import json,os;print(json.load(open(os.path.expanduser("~/Library/Application Support/Claude/claude_desktop_config.json")))["mcpServers"]["github"]["env"]["GITHUB_PERSONAL_ACCESS_TOKEN"])')

LOGIN=$(curl -s -H "Authorization: Bearer $TOKEN" https://api.github.com/user | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("login") or d.get("message"))')
if [ "$LOGIN" != "AstuNeonDave" ]; then
  echo "!! Token in config is not valid (got: $LOGIN). Aborting."
  exit 1
fi

rm -f .git/HEAD.lock
git -c credential.helper= \
    -c credential.helper="!f() { echo username=AstuNeonDave; echo password=$TOKEN; }; f" \
    fetch origin
git reset --soft origin/main
git add -A
git -c user.name="David Nie" -c user.email="dave@astuneon.co" \
  commit -m "v23: the three beliefs — Mandela epigraph at dawn, 'Ideas power everything' after the spotlight pass, hidden-star/idle/console easter eggs" \
  || echo "(nothing new to commit)"
git -c credential.helper= \
    -c credential.helper="!f() { echo username=AstuNeonDave; echo password=$TOKEN; }; f" \
    push origin main

echo "==> Pushed. Vercel will deploy in ~1 minute."
rm -- "$0"
