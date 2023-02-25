export interface CertificateBase {
  certificateId: string;
  issuer: string;
  issuedOn: string;
  signedDate: string;
  validFrom: string;
  validUntil: string;
}

export type Certificate = SkillCertificate | WorkCertificate;

export interface SkillCertificate extends CertificateBase, Subject {
  type: 'Skill';
  skills: string[];
}

export interface WorkCertificate extends CertificateBase, Subject {
  type: 'Work';
  workExp: ProofOfWorkExperience;
}

export interface Subject {
  name: string;
  mobile: string;
  email: string;
}

type Organisation = string;
type Address = string;

export interface ProofOfWorkExperience {
  issuer: Organisation;
  // legalName: string;
  address: Address;
  issuedOn: string;
  // credentialSubject: Subject[];
  // lastJobTitle?: string;
  // worksFor: Organisation;
  worksAs: OccupationalRole;
  workLocation: WorkLocation;
  proof?: any;
}

export interface PrivateProofOfWorkExperience {
  issuer: Organisation;
  issuedOn: string;
  isPartOf?: string;
  roleCompensation: RoleCompensation;
  rolePerformance: RolePerformance;
  rating: string;
  proof?: any;
}

export interface OccupationalRole {
  roleType: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  occupationalIndustry: string;
  occupationalCategory: string;
}

export interface WorkLocation {
  address: Address;
  geo: any;
}

export type NumericRange = string;

export interface RoleCompensation {
  monthlySalaryRange: NumericRange;
  salaryCurrency: string;
}

export interface RolePerformance {
  ratingCount: number;
  ratingValue: any;
  bestPossibleRating: any;
  worstPossibleRating: any;
  author: any;
}
