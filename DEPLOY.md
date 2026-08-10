# Live schalten

## Weg 1 — Skript

```bash
bash deploy.sh
```

Git fragt nach Zugangsdaten:
- **Benutzername:** `manuelbrandner85`
- **Passwort:** ein Personal Access Token, **nicht** das Kontopasswort

Token erzeugen unter <https://github.com/settings/personal-access-tokens/new>:
- Repository access → *Only select repositories* → `Vecom`
- Repository permissions → **Contents: Read and write**, **Pages: Read and write**
- Expiration: 7 Tage — danach widerrufen

## Weg 2 — von Hand

```bash
git init -b main
git add -A
git commit -m "VECOM Onlineshop"
git remote add origin https://github.com/manuelbrandner85/Vecom.git
git push --force origin main
```

## Einmalig auf GitHub

**Settings → Pages → Build and deployment → Source: „GitHub Actions"**

Der Workflow `.github/workflows/pages.yml` läuft dann bei jedem Push auf `main`.
Nach zwei bis drei Minuten: <https://manuelbrandner85.github.io/Vecom/>

`--force` ist nötig, weil im Repository bereits eine `README.md` mit eigener
Historie liegt.

## Diese Fassung ist eine Vorschau

Alle 44 Seiten stehen auf `noindex,nofollow`, `robots.txt` sperrt Suchmaschinen aus.
Impressum, AGB und Widerruf enthalten Platzhalter, Preise und Erzeuger sind erfunden,
die Fotos sind KI-erzeugt. Für den Livegang auf der eigenen Domain in
`quelle/` bzw. im Bauskript `BASE` umstellen und ohne `VECOM_VORSCHAU=1` bauen.
