# develop stage
FROM node:lts-alpine AS develop-stage
WORKDIR /app
COPY . /app
RUN yarn

# build stage
FROM develop-stage AS build-stage 
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]