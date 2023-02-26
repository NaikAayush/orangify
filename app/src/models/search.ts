export interface Context {
  domain: string;
  version: string;
  action: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface Location {
  country: Country;
}

export interface Context2 {
  domain: string;
  location: Location;
  action: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: Date;
  ttl: string;
}

export interface Descriptor {
  name: string;
}

export interface Descriptor2 {
  name: string;
}

export interface City {
  name: string;
}

export interface State {
  name: string;
}

export interface Country2 {
  name: string;
}

export interface Location2 {
  id: string;
  city: City;
  state: State;
  country: Country2;
}

export interface Descriptor3 {
  name: string;
  long_desc: string;
}

export interface Item {
  id: string;
  descriptor: Descriptor3;
  location_ids: string[];
}

export interface Provider {
  id: string;
  descriptor: Descriptor2;
  locations: Location2[];
  items: Item[];
}

export interface Catalog {
  descriptor: Descriptor;
  payments: any[];
  providers: Provider[];
}

export interface Message {
  catalog: Catalog;
}

export interface Response {
  context: Context2;
  message: Message;
}

export interface SearchInterface {
  context: Context;
  responses: Response[];
}
