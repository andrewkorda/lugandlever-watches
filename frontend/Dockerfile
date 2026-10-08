# syntax=docker/dockerfile:1.4
# --- Stage 1: Build Bundle ---
    FROM node:22-alpine AS build
    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # --- Stage 2: Web Server ---
    FROM nginxinc/nginx-unprivileged:alpine-slim AS runner
    
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 8080
    CMD ["nginx", "-g", "daemon off;"]