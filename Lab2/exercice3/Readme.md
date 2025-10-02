
## 1. Créer un package local

1. Placez-vous dans le dossier de votre package (ex: `package-test-project`).
2. Initialisez le package si besoin:
   ```bash
   npm init -y
   ```
3. Ajoutez votre code (ex: exportez une fonction dans `index.js`).

---

## 2. Lier le package localement

Dans le dossier du package:
```bash
npm link
```
Cela crée un lien global vers ce package.

---

## 3. Utiliser le package dans un autre projet

Dans le dossier de votre projet (ex: `lab2`):
```bash
npm link package-test-project
```
Votre projet utilise maintenant le package local en mode développement.

---

## 4. Unlink (désactiver le lien)

Pour revenir à la version npm ou supprimer le lien:
```bash
npm unlink package-test-project
```

---

## 5. Lancer le projet

Dans le dossier du projet:
- Pour exécuter le fichier principal:
  ```bash
  node index.js
  
  # Ou
  
  npm run dev # si vous avez defini des scripts dans package.json
  ```
---

## 6. Packager sans publier (npm pack)

Dans `package-test-project` :
```bash
npm pack
```
Produit: `package-test-project-1.0.0.tgz`.

Installer dans `exercice3` :
```bash
cd exercice3
npm install ../package-test-project/package-test-project-1.0.0.tgz
```

OU installation directe du dossier (copie physique) :
```bash
npm install ../package-test-project
```

OU via dépendance file: dans `exercice3/package.json` :
```json
"dependencies": {
  "package-test-project": "file:../package-test-project"
}
```
Puis :
```bash
npm install
```

## 9. Mettre à jour le package

Dans `package-test-project` :
```bash
# Modify code
npm version patch
npm pack
```

Réinstaller dans `exercice3` :
```bash
npm install ../package-test-project
```

Si usage "file:../package-test-project" et cache persistant :
```bash
rm -rf node_modules/package-test-project
npm install
```