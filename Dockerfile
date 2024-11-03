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
