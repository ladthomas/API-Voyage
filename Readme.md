# 🌍 Travel Packing List API

## 📝 Description
Cette API permet de gérer des **packing lists** pour les voyages. Elle est conçue pour être utilisée avec une application mobile (non incluse). L'API repose sur **Node.js** avec **Express.js** et utilise une base de données locale.

---

## ✨ Fonctionnalités
### 🔐 Authentification
✅ Création de compte (email & mot de passe)  
✅ Connexion (email & mot de passe)  
✅ Visualisation des informations de l'utilisateur connecté  

### ✈️ Gestion des voyages
✅ Création de voyages (destination, date de début, date de fin)  
✅ Consultation des voyages créés  

### 🎒 Gestion des items de voyage
✅ Ajout, modification et suppression des items  
✅ Marquer un item comme "pris"  

---

## ⚙️ Prérequis
🔹 [Node.js](https://nodejs.org/) (version 16+ recommandée)  
🔹 [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
🔹 Base de données locale (MongoDB, MySQL, PostgreSQL ou SQLite)  

---

## 🚀 Installation
1️⃣ Clonez le dépôt :
   ```sh
   git clone https://github.com/votre-repo/travel-packing-list-api.git
   cd travel-packing-list-api
   ```
2️⃣ Installez les dépendances :
   ```sh
   npm install
   ```
3️⃣ Configurez `.env` :
   ```env
   DATABASE_URL=mongodb://localhost:27017/travel_packing_list
   JWT_SECRET=votre_secret_jwt
   ```
4️⃣ Démarrez le serveur :
   ```sh
   npm start
   ```

---

## 🛠️ Technologies utilisées
- 🟢 **Node.js**
- ⚡ **Express.js**
- 🔑 **jsonwebtoken** (authentification JWT)
- ✅ **zod** (validation des entrées)
- 🗄 **Base de données locale** (MongoDB, MySQL, PostgreSQL, SQLite)

---

## 📡 Endpoints API (exemples)
### 🔐 Authentification
🔹 `POST /auth/register` - Création de compte  
🔹 `POST /auth/login` - Connexion  
🔹 `GET /auth/me` - Informations utilisateur  

### ✈️ Voyages
🔹 `GET /trips` - Liste des voyages  
🔹 `POST /trips` - Création d'un voyage  
🔹 `GET /trips/:id` - Détails d'un voyage  

### 🎒 Items de voyage
🔹 `POST /trips/:id/items` - Ajouter un item  
🔹 `PATCH /trips/:id/items/:itemId` - Modifier un item  
🔹 `DELETE /trips/:id/items/:itemId` - Supprimer un item  
🔹 `PATCH /trips/:id/items/:itemId/toggle` - Marquer comme "pris"  

---

## 📄 Spécifications OpenAPI
Les spécifications OpenAPI sont disponibles sur **Stoplight**.

---

## 🌍 Déploiement (Bonus)
Pour mettre en ligne l'API, vous pouvez utiliser :
- 🚀 **Railway.app**
- 🌐 **Render.com**
- ⚡ **Vercel**

---

## 🔗 Liens utiles
🔗 [Packr Travel Packing List](https://packr.app/)  
🔗 [Express.js](https://expressjs.com/)  
🔗 [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
🔗 [zod](https://zod.dev/)  
