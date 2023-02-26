FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npx hardhat compile

CMD npx hardhat node
