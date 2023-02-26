export interface CertificateType {
  id: string;
  name: string;
  createdAt: string;
  deleted: boolean;
  owner: string;
  metadata: {
    iconUrl: string;
  };
}

export interface Type {
  id: string;
  name: string;
  createdAt: string;
  deleted: boolean;
  owner: string;
}

export interface WorksAs {
  roleType: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  occupationalIndustry: string;
  occupationalCategory: string;
}

export interface WorkLocation {
  address: string;
  geo?: any;
}

export interface WorkExp {
  issuer: string;
  address: string;
  issuedOn: string;
  worksAs: WorksAs;
  workLocation: WorkLocation;
}

export interface Data {
  type: string;
  certificateId: string;
  issuer: string;
  issuedOn: string;
  signedDate: string;
  validFrom: string;
  validUntil: string;
  name: string;
  mobile: string;
  email: string;
  skills: string[];
  workExp: WorkExp;
}

export interface MyCertificate {
  id: string;
  type_: Type;
  issuedTo: string;
  data: Data;
  createdAt: string;
  validity: string;
  verified: boolean;
  revoked: boolean;
}
