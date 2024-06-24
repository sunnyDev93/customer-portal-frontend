FROM node:14.15.4-alpine

WORKDIR /app

COPY ./app/package*.json .

RUN npm install

COPY ./app .

CMD ["npm", "start"]
