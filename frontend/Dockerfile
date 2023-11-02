FROM node:18-alpine

WORKDIR /app

COPY ./app /app

RUN npm install && npm install @esbuild/linux-x64

EXPOSE 5173
