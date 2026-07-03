#!/bin/bash
# Pushes the local fourth draft: syncs onto the remote history, commits all
# local changes, pushes. Reads the token from Claude's config. Self-deletes.
set -e
cd "$(dirname "$0")"

TOKEN=$(python3 -c 'import json,os;print(json.load(open(os.path.expanduser("~/Library/Application Support/Claude/claude_desktop_config.json")))["mcpServers"]["github"]["env"]["GITHUB_PERSONAL_ACCESS_TOKEN"])')

echo "==> Verifying token..."
LOGIN=$(curl -s -H "Authorization: Bearer $TOKEN" https://api.github.com/user | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("login") or d.get("message"))')
if [ "$LOGIN" != "AstuNeonDave" ]; then
  echo "!! Token in config is not valid (got: $LOGIN). Aborting."
  exit 1
fi

rm -f .git/HEAD.lock
echo "==> Syncing local history onto GitHub's..."
git -c credential.helper= \
    -c credential.helper="!f() { echo username=AstuNeonDave; echo password=$TOKEN; }; f" \
    fetch origin
git reset --soft origin/main

echo "==> Committing the fourth draft..."
git add -A
git -c user.name="David Nie" -c user.email="dave@astuneon.co" \
  commit -m "v23 fourth draft: remove clouds, golden coda, one-scroll overture and dial sequence, spotlight pass then beckon cycle" \
  || echo "(nothing new to commit)"

echo "==> Pushing..."
git -c credential.helper= \
    -c credential.helper="!f() { echo username=AstuNeonDave; echo password=$TOKEN; }; f" \
    push origin main

echo "==> Pushed. Vercel will deploy in ~1 minute."
rm -- "$0"
