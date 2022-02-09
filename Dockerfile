FROM node:12.18.0

WORKDIR /usr/nodejs/

COPY ./ /usr/nodejs/

EXPOSE 5000

RUN npm ci

CMD ["node", "server.js"]