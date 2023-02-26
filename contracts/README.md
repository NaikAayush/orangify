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

Set up basic certificate type and example cert.
```
npx hardhat run scripts/setup.ts --network localhost
```

Run console. Experiment.
```
npx hardhat console --network localhost
```
