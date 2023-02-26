import { ethers } from "ethers";
import OrangeVerifiedCredential from "../assets/OrangeVerifiedCredential.json";

export class CertificateMetaType {
  public id!: bigint;
  public name!: string;
  public metadata!: any;
  public createdAt!: bigint;
  public deleted!: boolean;
  public owner!: string;

  public static fromResp(cert: any): CertificateMetaType {
    return new CertificateMetaType({
      id: cert.id,
      name: cert.name,
      metadata: JSON.parse(cert.metadata),
      createdAt: cert.createdAt,
      deleted: cert.deleted,
      owner: cert.owner,
    });
  }

  public constructor(init?: Partial<CertificateMetaType>) {
    Object.assign(this, init);
  }
}

export class CertificateMeta {
  public id!: bigint;
  public type_!: CertificateMetaType;
  public issuedTo!: string;
  public data!: any;
  public createdAt!: bigint;
  // 0 means no expiry.
  public validity!: bigint;
  public verified!: boolean;
  public revoked!: boolean;

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
}

export class Eth {
  provider!: ethers.providers.Web3Provider;
  signer!: ethers.providers.JsonRpcSigner;
  initer!: Promise<void>;
  public contract!: ethers.Contract;

  constructor() {
    if (typeof window !== "undefined") {
      if ((window as any).ethereum) {
        this.provider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
          "any"
        );
        this.initer = this.init();
      } else {
        const msg =
          "This page requires metamask or any other crypto wallet to work.";
        alert(msg);
        console.error(msg);
        throw msg;
      }
    }
  }

  async init() {
    // Prompt user for account connections
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
    console.log("Account:", await this.signer.getAddress());

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw "CONTRACT_ADDRESS was not defined";
    }

    this.contract = new ethers.Contract(
      contractAddress,
      OrangeVerifiedCredential.abi,
      this.signer
    );
  }

  async ensureInit() {
    await this.initer;
  }

  async getAllCertificateTypes(): Promise<CertificateMetaType[]> {
    await this.ensureInit();
    let types = await this.contract.getMyCertificateTypes();
    types = types.map((c: any) => CertificateMetaType.fromResp(c));
    return types;
  }

  async getAllCertificateOfType(typeId: number): Promise<CertificateMeta[]> {
    await this.ensureInit();
    let certs = await this.contract.getAllCertificatesOfType(typeId);
    certs = certs.map((c: any) => CertificateMeta.fromResp(c));
    return certs;
  }

  async verifyCertificate(certId: number): Promise<void> {
    await this.ensureInit();
    const res = await this.contract.verifyCertificate(certId);
    const waited = await res.wait();
    console.log(waited);
  }

  async newCertificateType(name: string, iconUrl: string): Promise<void> {
    await this.ensureInit();
    const res = await this.contract.addCertificateType(
      name,
      JSON.stringify({ iconUrl })
    );
    const waited = await res.wait();
    console.log(waited);
  }
}
