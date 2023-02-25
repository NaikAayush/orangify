import { Injectable } from '@nestjs/common';
import { ethers, Wallet } from 'ethers';

import OrangeVerifiedCredential from '../assets/OrangeVerifiedCredential.json';

@Injectable()
export class ContractService {
  provider: ethers.providers.JsonRpcProvider;
  public contract: ethers.Contract;
  // wallet: HDNodeWallet;
  wallet: Wallet;

  constructor() {
    this.wallet = new Wallet(process.env.SERVER_PRIVATE_KEY);

    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.ETH_PROVIDER_URI,
    );

    this.wallet = this.wallet.connect(this.provider);

    const contractAddress = process.env.CONTRACT_ADDRESS;

    this.contract = new ethers.Contract(
      contractAddress,
      OrangeVerifiedCredential.abi,
      this.wallet,
    );
  }
}
