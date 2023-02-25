import { Controller, Get, Query } from '@nestjs/common';
import { ContractService } from 'src/contract/contract.service';
import { convertBigintToString } from 'src/json-serializable.middleware';

class CertificateType {
  public id: bigint;
  public name: string;
  public createdAt: bigint;
  public deleted: boolean;
  public owner: string;

  public static fromResp(cert: any): CertificateType {
    return new CertificateType({
      id: cert.id,
      name: cert.name,
      createdAt: cert.createdAt,
      deleted: cert.deleted,
      owner: cert.owner,
    });
  }

  public constructor(init?: Partial<CertificateType>) {
    Object.assign(this, init);
  }
}

class Certificate {
  public id: bigint;
  public type_: CertificateType;
  public issuedTo: string;
  public data: string;
  public createdAt: bigint;
  // 0 means no expiry.
  public validity: bigint;
  public verified: boolean;
  public revoked: boolean;

  public static fromResp(cert: any): Certificate {
    return new Certificate({
      id: cert.id,
      type_: CertificateType.fromResp(cert.type_),
      issuedTo: cert.issuedTo,
      data: cert.data,
      createdAt: cert.createdAt,
      validity: cert.validity,
      verified: cert.verified,
      revoked: cert.revoked,
    });
  }

  public constructor(init?: Partial<Certificate>) {
    Object.assign(this, init);
  }

  public toJSON() {
    return convertBigintToString(this);
  }
}

@Controller('certs')
export class CertsController {
  constructor(private contract: ContractService) {}

  @Get()
  async get(@Query('id') id: number): Promise<Certificate> {
    let cert = await this.contract.contract.getCertificate(id);
    cert = Certificate.fromResp(cert);
    console.log(cert);
    return cert;
  }
}
