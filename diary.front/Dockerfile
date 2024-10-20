FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:latest

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

WORKDIR /app

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]