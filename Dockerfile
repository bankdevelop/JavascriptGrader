FROM node:alpine3.10 AS build
COPY package.json .
RUN npm install

FROM node:alpine3.10
COPY --from=build /node_modules ./node_modules/
COPY . .
EXPOSE 3000
CMD ["node", "server"]