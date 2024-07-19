# Utiliser une image de Node.js comme image de base
FROM node:14

# Créer et définir le répertoire de travail
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Copier les fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
