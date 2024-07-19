FROM node:14

#Create app directory
WORKDIR /app

COPY package*.json ./

#install dependences

RUN npm install

#Bundle app source

COPY . .

EXPOSE 3002

CMD [ "npm","start" ]