# Stage 1

FROM node:10-alpine as build-step

RUN mkdir -p /app/OSDAngular

WORKDIR /app/OSDAngular

COPY package.json /app/OSDAngular

RUN npm install

COPY . /app/OSDAngular

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/OSDAngular /usr/share/nginx/html