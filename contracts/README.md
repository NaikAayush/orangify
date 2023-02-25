# Orange Verified Credentials Contracts

## Development

```
npx hardhat compile
```

Run node in a different terminal:
```
npx hardhat node
```

Deploy contract. Note the address.
```
npx hardhat run scripts/deploy.ts --network localhost
```

Run console. Experiment. Copy code inside `main` of `script/setup.ts` to add data (replace the correct contract address there).
```
npx hardhat console --network localhost
```
