# Lab4 - Articles API

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

## Authentification
Toutes les routes derrière le middleware `authGuard` exigent l'en-tête:  
Authorization: user

## Structure rapide
`Lab4/app.ts` configuration Express  
`Lab4/models/articleModel.ts` stockage en mémoire  
`Lab4/routes/api/articles.js` routes REST  
`Lab4/postman_collection.json` tests Postman  
`Lab4/http-client.env.json` environnements pour fichier HTTP

## Endpoints principaux
GET /api/articles  
GET /api/articles/:id  
POST /api/articles  
PUT /api/articles/:id (update partiel accepté)  
DELETE /api/articles/:id

## Tests via Postman
1. Importer `Lab4/postman_collection.json`
2. Vérifier variable `base` (http://localhost:3000)
3. Lancer les requêtes 1 → 11 (enchaînement prévu)
4. La variable `firstId` est capturée automatiquement après la création