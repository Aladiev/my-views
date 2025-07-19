FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn

COPY src ./src

RUN yarn build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .

RUN yarn install --production=true

COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENTRYPOINT yarn start:prod