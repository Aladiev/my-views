FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/app/package.json ./packages/app/package.json
COPY packages/app/tsconfig.json ./packages/app/tsconfig.json

RUN yarn

COPY packages/app/src ./packages/app/src

RUN yarn build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/packages/app/package.json .
COPY --from=builder /app/yarn.lock .

RUN yarn install --production=true

COPY --from=builder /app/packages/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]