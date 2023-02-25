import { Injectable } from '@nestjs/common';
import { ethers, JsonRpcProvider } from 'ethers';

import OrangeVerifiedCredential from '../assets/OrangeVerifiedCredential.json';

@Injectable()
export class ContractService {
  provider: JsonRpcProvider;
  public contract: ethers.Contract;

  constructor() {
    this.provider = new JsonRpcProvider(process.env.ETH_PROVIDER_URI);

    const contractAddress = process.env.CONTRACT_ADDRESS;

    this.contract = new ethers.Contract(
      contractAddress,
      OrangeVerifiedCredential.abi,
      this.provider,
    );
  }
}
