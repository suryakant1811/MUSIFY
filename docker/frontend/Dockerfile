# ===================== builder stage ================================
FROM node:20-alpine AS builder

WORKDIR /app

# created variable to store the value 
ARG VITE_MODE=prod
ARG VITE_API_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_CLERK_SECRET_KEY
# accept the value from cli left side are env filed neede right side is variable decletreed
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MODE=$VITE_MODE
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_SECRET_KEY=$VITE_CLERK_SECRET_KEY

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