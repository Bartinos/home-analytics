FROM node:21.7.1-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate prisma code used by the /services and schema's
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "./src/server.js"]

