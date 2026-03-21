# ==========================  BUILDER STAGE  =====================================

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json   /app/

RUN npm install

COPY . .

# ==========================  Production STAGE  =====================================

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 7000

ENTRYPOINT [ "node" ]
CMD [ "App.js" ]