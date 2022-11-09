FROM node:16
WORKDIR /usr/BestFlow/back-end
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "index.js" ]