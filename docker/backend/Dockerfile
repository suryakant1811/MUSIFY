# ==========================  BUILDER STAGE  =====================================

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json   /app/

RUN npm install

COPY . .

# ==========================  Production STAGE  =====================================

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder  /app/package.*  /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/App.js /app/App.js

EXPOSE 7000

ENTRYPOINT [ "node" ]
CMD [ "App.js" ]