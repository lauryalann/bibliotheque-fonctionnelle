FROM node:14

#Create app directory
WORKDIR /app

COPY package*.json ./

#install dependences

RUN npm install

#Bundle app source

COPY . .

# Copier les fichiers nécessaires de memberservice dans le conteneur
# Assurez-vous que memberservice est accessible depuis le contexte de construction de livreservice
# COPY ../commun /app/util

EXPOSE 3001

CMD [ "node","livre_app.js" ]