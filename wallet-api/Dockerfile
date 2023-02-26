FROM node:18-alpine

WORKDIR /contracts

COPY contracts .

RUN npm install && npx hardhat compile

WORKDIR /app

COPY wallet-api .

RUN cp /contracts/artifacts/contracts/OrangeVerifiedCredential.sol/OrangeVerifiedCredential.json src/assets/

RUN npm install

CMD npm run start
