#!/usr/bin/env bash
# prebuild-setup.sh
# Stellt sicher, dass node + pnpm im opencode-Worker verfuegbar sind.
# IDEMPOTENT: kann beliebig oft ausgefuehrt werden, ueberspringt bereits-installierte Tools.
#
# Verwendung:
#   ./scripts/prebuild-setup.sh
#
# Nach erfolgreichem Lauf:
#   ./node_modules/.bin/tsc --noEmit    # TypeScript-Check
#   ./node_modules/.bin/next build      # Voller Next.js Build
#
# Quelle: Lektion 36 in tone-voice.md, Commit d7dacf6 (2026-06-26).

set -e

echo "=== KPX Pre-Build Setup (idempotent) ==="
echo ""

# 1. node pruefen
if command -v node >/dev/null 2>&1; then
  NODE_VERSION=$(node --version)
  echo "[OK] node bereits installiert: $NODE_VERSION"
else
  echo "[..] node fehlt — installiere via apt..."
  apt-get install -y nodejs >/dev/null 2>&1
  NODE_VERSION=$(node --version)
  echo "[OK] node installiert: $NODE_VERSION"
fi

# 2. npm pruefen (kommt mit node)
if command -v npm >/dev/null 2>&1; then
  NPM_VERSION=$(npm --version)
  echo "[OK] npm bereits installiert: $NPM_VERSION"
fi

# 3. pnpm via corepack aktivieren
if command -v pnpm >/dev/null 2>&1; then
  PNPM_VERSION=$(pnpm --version)
  echo "[OK] pnpm bereits installiert: $PNPM_VERSION"
else
  echo "[..] pnpm fehlt — aktiviere via corepack..."
  corepack enable pnpm >/dev/null 2>&1
  PNPM_VERSION=$(pnpm --version)
  echo "[OK] pnpm aktiviert: $PNPM_VERSION"
fi

# 4. node_modules pruefen
if [ -d "./node_modules" ] && [ -d "./node_modules/.bin" ]; then
  echo "[OK] node_modules gefunden ($(du -sh node_modules 2>/dev/null | cut -f1))"
else
  echo "[!!] node_modules fehlt — installiere via pnpm install..."
  pnpm install
  echo "[OK] pnpm install abgeschlossen"
fi

# 5. Lokale Build-Tools pruefen
for tool in tsc next; do
  if [ -x "./node_modules/.bin/$tool" ]; then
    echo "[OK] ./node_modules/.bin/$tool verfuegbar"
  else
    echo "[!!] ./node_modules/.bin/$tool fehlt — pnpm install noetig"
  fi
done

echo ""
echo "=== Setup abgeschlossen — bereit fuer lokalen Build ==="
echo "Naechste Schritte:"
echo "  ./node_modules/.bin/tsc --noEmit    # TypeScript-Check"
echo "  ./node_modules/.bin/next build      # Voller Next.js Build"
