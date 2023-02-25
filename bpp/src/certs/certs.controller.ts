import { Controller, Get, Query } from '@nestjs/common';
import { ContractService } from 'src/contract/contract.service';
import { convertBigintToString } from 'src/json-serializable.middleware';
import { Certificate } from './schemas';

class CertificateMetaType {
  public id: bigint;
  public name: string;
  public createdAt: bigint;
  public deleted: boolean;
  public owner: string;

  public static fromResp(cert: any): CertificateMetaType {
    return new CertificateMetaType({
      id: cert.id,
      name: cert.name,
      createdAt: cert.createdAt,
      deleted: cert.deleted,
      owner: cert.owner,
    });
  }

  public constructor(init?: Partial<CertificateMetaType>) {
    Object.assign(this, init);
  }

  public toJSON() {
    return convertBigintToString(this);
  }
}

class CertificateMeta {
  public id: bigint;
  public type_: CertificateMetaType;
  public issuedTo: string;
  public data: Certificate;
  public createdAt: bigint;
  // 0 means no expiry.
  public validity: bigint;
  public verified: boolean;
  public revoked: boolean;

  public static fromResp(cert: any): CertificateMeta {
    return new CertificateMeta({
      id: cert.id,
      type_: CertificateMetaType.fromResp(cert.type_),
      issuedTo: cert.issuedTo,
      data: JSON.parse(cert.data),
      createdAt: cert.createdAt,
      validity: cert.validity,
      verified: cert.verified,
      revoked: cert.revoked,
    });
  }

  public constructor(init?: Partial<CertificateMeta>) {
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
  async get(@Query('id') id: number): Promise<CertificateMeta> {
    let cert = await this.contract.contract.getCertificate(id);
    cert = CertificateMeta.fromResp(cert);
    return cert;
  }

  @Get('issuedTo')
  async getAllCertsIssuedTo(
    @Query('issuedTo') issuedTo: number,
  ): Promise<CertificateMeta[]> {
    let certs = await this.contract.contract.getCertificatesByOwner(issuedTo);
    certs = certs.map((c: any) => CertificateMeta.fromResp(c));
    return certs;
  }

  @Get('types')
  async allTypes(): Promise<CertificateMetaType[]> {
    let types = await this.contract.contract.getAllCertificateTypes();
    types = types.map((c: any) => CertificateMetaType.fromResp(c));
    return types;
  }
}
