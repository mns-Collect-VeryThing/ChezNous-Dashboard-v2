# Étape 1: Utiliser une image de base Node.js pour construire l'application React
FROM node:18

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer un serveur HTTP simple pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port sur lequel l'application sera servie
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["serve", "-s", "build", "-l", "3001"]
