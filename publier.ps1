# Met le site en ligne : envoie toutes les modifications sur GitHub.
# Le lien GitHub Pages se met à jour tout seul 1 à 2 minutes après.
# Lancer dans PowerShell depuis ce dossier :  .\publier.ps1  (ou .\publier.ps1 "ce que j'ai changé")
param([string]$message = "Mise à jour du site")
Set-Location $PSScriptRoot
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) { Write-Host "Rien de nouveau à publier."; exit 0 }
git commit -m $message
git push
if ($?) { Write-Host "Publié ! Le site en ligne sera à jour dans 1 à 2 minutes." }
