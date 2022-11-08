FROM node:16
WORKDIR /BestFlow/back-end
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]