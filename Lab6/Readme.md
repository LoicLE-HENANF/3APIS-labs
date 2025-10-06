# Lab6 - Articles API

## Installation
```bash
npm install
```

## créer .env, ajouter les variables présentes dans .env.example, et complétez avec vos valeurs
```bash
cp .env.example .env
```

## Démarrage en développement (reload)
```bash
npm run dev
```

API disponible par défaut sur http://localhost:3000

## Build puis exécution (pour un build typescript complet)
```bash
npm run build
npm start
```

## Scripts
```bash
npm run dev   # démarrage avec nodemon et ts-node
npm run build # transpilation vers dist/
npm start     # exécution de dist/bin/www.js
```

## Authentification & Utilisateurs

L'API utilise des tokens JWT pour l'authentification.  
Certaines routes nécessitent un rôle particulier (ex : ADMIN).

### Endpoints utilisateurs

- `POST /api/users/register` : inscription d'un nouvel utilisateur (`username`, `password`)
- `POST /api/users/login` : connexion, retourne un token JWT
- `GET /api/users/me` : infos sur l'utilisateur courant (token requis)
- `GET /api/users/` : liste tous les utilisateurs (ADMIN uniquement)

### Authentification

Pour accéder aux routes protégées, ajoutez l'en-tête :
```
Authorization: Bearer <votre_token_JWT>
```

### Gestion des rôles

- Par défaut, un utilisateur est créé avec le rôle `USER`.
- Seuls les utilisateurs avec le rôle `ADMIN` peuvent :
  - Créer des articles (`POST /api/articles`)
  - Lister tous les utilisateurs (`GET /api/users/`)



Ajout de MongoDB avec Mongoose pour la gestion des articles et des utilisateurs.
Ajout de pagnation + filtres pour la liste des articles.