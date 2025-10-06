# Lab6 - Articles API

## Installation
```bash
npm install
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

## Structure rapide
`Lab6/app.ts` configuration Express  
`Lab6/models/articleModel.ts` stockage en mémoire  
`Lab6/models/userModel.ts` stockage en mémoire des utilisateurs  
`Lab6/routes/api/articles.js` routes REST articles  
`Lab6/routes/api/users.js` routes REST utilisateurs  
`Lab6/middlewares/authMiddleware.js` vérification JWT  
`Lab6/middlewares/roleMiddleware.js` vérification des rôles  
`Lab6/postman_collection.json` tests Postman  
`Lab6/http-client.env.json` environnements pour fichier HTTP

## Endpoints principaux

### Articles
- `GET /api/articles`  
- `GET /api/articles/:id`  
- `POST /api/articles` (ADMIN uniquement)  
- `PUT /api/articles/:id`  
- `DELETE /api/articles/:id`

### Utilisateurs
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me` (auth requis)
- `GET /api/users/` (ADMIN uniquement)

## Tests via Postman
1. Importer `Lab6/postman_collection.json`
2. Vérifier variable `base` (http://localhost:3000)
3. Lancer les requêtes 1 → 11 (enchaînement prévu)
4. La variable `firstId` est capturée automatiquement après la création
