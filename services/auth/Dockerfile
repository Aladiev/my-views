FROM node:18-alpine
WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn

EXPOSE 3000

COPY src ./src

ENTRYPOINT yarn start:dev