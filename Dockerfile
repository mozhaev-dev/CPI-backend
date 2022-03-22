FROM node:17-alpine3.14 as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

EXPOSE 7001

RUN npm run build

CMD ["npm", "run", "start:dev"]

FROM node:17-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 7001

RUN npm run build

CMD ["npm", "run", "start:prod"]