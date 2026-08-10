#!/usr/bin/env bash
# VECOM Onlineshop -> GitHub Pages
#
#   bash deploy.sh
#
# Git fragt nach Benutzername und Passwort.
# Benutzername: manuelbrandner85
# Passwort:     ein Personal Access Token (NICHT das GitHub-Kontopasswort)
#
# Token erzeugen: github.com/settings/personal-access-tokens/new
#   Repository access: Only select repositories -> Vecom
#   Permissions -> Repository permissions:
#       Contents: Read and write
#       Pages:    Read and write
#   Expiration: 7 days   (danach widerrufen)

set -e
REPO="https://github.com/manuelbrandner85/Vecom.git"
cd "$(dirname "$0")"

command -v git >/dev/null || { echo "git ist nicht installiert."; exit 1; }

[ -d .git ] || git init -b main
git config user.name  "$(git config user.name  || echo 'VECOM Build')"
git config user.email "$(git config user.email || echo 'shop@vecom.local')"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO"

git add -A
git commit -m "VECOM Onlineshop: Sortiment, Erzeuger, Rezepte, Reise, Kasse" || echo "Nichts Neues zu sichern."

echo
echo "Jetzt wird gepusht. Benutzername: manuelbrandner85 — Passwort: dein Token."
git push --force origin main

cat <<'ENDE'

Gepusht.

Noch ein Schritt von Hand, einmalig:
  github.com/manuelbrandner85/Vecom/settings/pages
  -> Build and deployment -> Source: GitHub Actions

Danach laeuft die Veroeffentlichung automatisch. Fortschritt:
  github.com/manuelbrandner85/Vecom/actions

Nach zwei bis drei Minuten erreichbar unter:
  https://manuelbrandner85.github.io/Vecom/

Token danach widerrufen: github.com/settings/tokens
ENDE
