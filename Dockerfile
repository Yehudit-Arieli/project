FROM node:20-alpine

RUN apk add --no-cache ca-certificates openssl

WORKDIR /app

COPY package*.json ./

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate dev --name init && node main.js"]