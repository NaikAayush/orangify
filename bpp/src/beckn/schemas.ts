/**
 * @description Describes a beckn message context
 */
export interface Context {
  domain: string;
  country: Country['code'];
  city: City['code'];
  /**
   * @description Defines the Beckn API call. Any actions other than the enumerated actions are not supported by Beckn Protocol
   * @enum {string}
   */
  action:
    | 'search'
    | 'select'
    | 'init'
    | 'confirm'
    | 'update'
    | 'status'
    | 'track'
    | 'cancel'
    | 'rating'
    | 'support'
    | 'on_search'
    | 'on_select'
    | 'on_init'
    | 'on_confirm'
    | 'on_update'
    | 'on_status'
    | 'on_track'
    | 'on_cancel'
    | 'on_rating'
    | 'on_support';
  /** @description Version of Beckn core API specification being used */
  core_version: string;
  /**
   * Format: uri
   * @description Unique id of the BAP. By default it is the fully qualified domain name of the BAP
   */
  bap_id: string;
  /**
   * Format: uri
   * @description URI of the BAP for accepting callbacks. Must have the same domain name as the bap_id
   */
  bap_uri: string;
  /**
   * Format: uri
   * @description Unique id of the BPP. By default it is the fully qualified domain name of the BPP
   */
  bpp_id?: string;
  /**
   * Format: uri
   * @description URI of the BPP. Must have the same domain name as the bap_id
   */
  bpp_uri?: string;
  /** @description This is a unique value which persists across all API calls from search through confirm */
  transaction_id: string;
  /** @description This is a unique value which persists during a request / callback cycle */
  message_id: string;
  /**
   * Format: date-time
   * @description Time of request generation in RFC3339 format
   */
  timestamp: string;
  /** @description The encryption public key of the sender */
  key?: string;
  /** @description The duration in ISO8601 format after timestamp for which this message holds valid */
  ttl?: string;
}

/**
 * @description Describes a country.
 */
export interface Country {
  /** @description Name of the country */
  name?: string;
  /** @description Country code as per ISO 3166-1 and ISO 3166-2 format */
  code?: string;
}

/**
 * @description Describes a city
 */
export interface City {
  /** @description Name of the city */
  name?: string;
  /** @description City code */
  code?: string;
}

export interface SearchMessage {
  intent: {
    item: {
      descriptor: { name: string };
    };
  };
}

export interface Error {
  /** @enum {string} */
  type:
    | 'CONTEXT-ERROR'
    | 'CORE-ERROR'
    | 'DOMAIN-ERROR'
    | 'POLICY-ERROR'
    | 'JSON-SCHEMA-ERROR';
  /** @description Beckn specific error code. For full list of error codes, refer to docs/protocol-drafts/BECKN-RFC-005-ERROR-CODES-DRAFT-01.md of this repo */
  code: string;
  /** @description Path to json schema generating the error. Used only during json schema validation errors */
  path?: string;
  /** @description Human readable message describing the error */
  message?: string;
}

/** @description Describes a BPP catalog */
export interface Catalog {
  'bpp/descriptor'?: Descriptor;
  'bpp/categories'?: null;
  'bpp/fulfillments'?: null;
  'bpp/payments'?: null;
  'bpp/offers'?: null;
  'bpp/providers'?: Provider[];
  /**
   * Format: date-time
   * @description Time after which catalog has to be refreshed
   */
  exp?: string;
}

/** @description Describes the description of a real-world object. */
export interface Descriptor {
  name?: string;
  code?: string;
  symbol?: string;
  short_desc?: string;
  long_desc?: string;
  images?: null;
  /** Format: uri */
  audio?: string;
  /** Format: uri */
  video?: string;
  /** Format: uri */
  '3d_render'?: string;
}

export interface Provider {
  /** @description Id of the provider */
  id?: string;
  descriptor?: Descriptor;
  /** @description Category Id of the provider */
  category_id?: string;
  rating?: null;
  time?: null;
  categories?: null;
  fulfillments?: null;
  payments?: null;
  locations?: Location[];
  offers?: null;
  items?: Item[];
  /**
   * Format: date-time
   * @description Time after which catalog has to be refreshed
   */
  exp?: string;
  rateable?: null;
  tags?: null;
}

/** @description Describes the location of a runtime object. */
export interface Location {
  id?: string;
  descriptor?: Descriptor;
  gps?: null;
  address?: null;
  station_code?: string;
  city?: City;
  country?: Country;
  circle?: null;
  polygon?: string;
  '3dspace'?: string;
  time?: null;
}

/** @description Describes a city */
export interface City {
  /** @description Name of the city */
  name?: string;
  /** @description City code */
  code?: string;
}

/** @description Describes a country. */
export interface Country {
  /** @description Name of the country */
  name?: string;
  /** @description Country code as per ISO 3166-1 and ISO 3166-2 format */
  code?: string;
}

/**
 * @description Represents an Item
 */
export interface Item {
  /** @description Unique identifier of the job */
  id: string;
  /** @description Descriptor of the job */
  descriptor: {
    /** @description Name of the job */
    name: string;
    /** @description Long description of the job */
    long_desc: string;
  };
  /** @description IDs of the locations where the job is available */
  location_ids: string[];
}
