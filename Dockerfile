# --- Build ---
FROM node:22-alpine AS build

ARG VITE_API_URL
ARG VITE_API_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Remove any .env files to ensure build args are used
RUN rm -f .env .env.* 2>/dev/null || true

# Debug: show env vars during build (remove after confirming it works)
RUN echo "Building with VITE_API_URL=$VITE_API_URL"

RUN npm run build

# --- Production ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
