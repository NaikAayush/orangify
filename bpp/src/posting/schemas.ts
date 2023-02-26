export interface QualificationValue {
  kind?: string;
  value: string;
}

export interface Qualification {
  type: string;
  values: QualificationValue[];
}

export interface Address {
  name?: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  postalCode: string;
}

export interface HiringOrganization {
  name: string;
  url?: string;
  about?: string;
  address?: Address;
}

export interface JobLocation {
  name?: string;
  address: Address;
}

export interface Salary {
  currency: string;
  pay: {
    minValue: number;
    maxValue: number;
    unitText: string;
    type: string;
  }[];
}

export interface Identifier {
  name: string;
  value: string;
}

export interface Job {
  id: string;
  title: string;
  datePosted: string;
  validThrough: string;
  description: string;
  hiringOrganization: HiringOrganization;
  jobLocation: JobLocation;
  jobLocationType?: string[];
  employmentType?: string[];
  jobImmediateStart?: boolean;
  qualifications: Qualification[];
  OccupationalExperienceRequirements?: {
    type: string;
    monthsOfExperience?: number;
  }[];
  salary: Salary;
  identifier?: Identifier;
}
