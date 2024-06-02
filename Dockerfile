FROM node:lts-alpine3.20

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "dev" ]