FROM node:10
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ./src .

EXPOSE 3333

CMD [ "node", "server.js" ]
