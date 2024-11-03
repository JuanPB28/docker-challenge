# 1. For build React app
FROM node:22.11.0-alpine3.20 AS development

# Set working directory
WORKDIR /app

COPY /web/package.json /app/package.json
COPY /web/package-lock.json /app/package-lock.json

RUN npm install

COPY /web/. /app

ENV CI=true
ENV PORT=3000

CMD [ "npm", "run", "dev" ]

# 2. For Nginx setup
FROM nginx:1.26.2-alpine3.20

# Copy config nginx
COPY /.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY /web/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
