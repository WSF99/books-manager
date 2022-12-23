FROM node:16-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 7000

RUN yarn prisma generate

CMD ["yarn", "run", "dev"]
