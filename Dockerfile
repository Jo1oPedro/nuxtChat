ARG NODE_VERSION=21.7.3

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /app

FROM base as build

COPY --link ./app/package.json ./app/package-lock.json ./

RUN npm install --production=false

COPY --link ./app .

RUN npm run build

FROM base

ENV PORT=$PORT

#EXPOSE $PORT

COPY --from=build /app /app

RUN npm prune
CMD [ "npm", "run", "dev" ]