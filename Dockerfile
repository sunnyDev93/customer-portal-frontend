FROM node:22.5.0-alpine

WORKDIR /customer-portal-frontend/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src .

CMD ["npm", "start"]