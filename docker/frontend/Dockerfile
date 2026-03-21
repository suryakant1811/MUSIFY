# ===================== builder stage ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build 


# ====================== Production stage ==============================

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80   

CMD ["nginx", "-g", "daemon off;"]