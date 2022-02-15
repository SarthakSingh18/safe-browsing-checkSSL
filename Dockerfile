FROM node:12.18.0 as base
WORKDIR /usr/nodejs/
COPY ./ /usr/nodejs/
RUN npm ci

FROM node:12.18.0
WORKDIR /usr/nodejs/
COPY --from=base /usr/nodejs/ /usr/nodejs/
CMD ["node", "server.js"]