# Mise en cache Création / Connexion utilisateur

__Objectif :__ Développer un système de pour créer des comptes utilisateurs, stocker les
sessions utilisateurs avec le hachage sur Redis.

Membre du projet:
- [Antoine](https://github.com/AntoineRai)
- [Alexis](https://github.com/NeriGH)
- [Quentin](https://github.com/The-Law59)

## Installer le projet

Sur une machine Debian, déployer votre serveur `Redis` en utilisant la commande `sudo service redis-server start`.
Pour utiliser le CLI de Redis, vous pouvez faire `redis-cli`.

Ensuite pour installer les différentes dépendances, utilisez `npm install`.

## Démarrer la connexion entre le serveur Redis et le JS

Pour démarrer la connexion de votre serveur Redis et de votre script JS, utilisez `node .\server.js`