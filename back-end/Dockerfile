FROM node:16
WORKDIR /BestFlow/back-end
ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]