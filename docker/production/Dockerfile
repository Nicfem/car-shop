FROM node:20-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npx prisma db seed && npm run build && npm run start"]

