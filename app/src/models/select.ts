export interface Country {
  name: string;
  code: string;
}

export interface Location {
  country: Country;
}

export interface Context {
  domain: string;
  version: string;
  action: string;
  bap_id: string;
  bap_uri: string;
  location: Location;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: Date;
}

export interface Country2 {
  name: string;
  code: string;
}

export interface Location2 {
  country: Country2;
}

export interface Context2 {
  domain: string;
  location: Location2;
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

export interface Fulfillment {
  id: string;
  type: string;
  tracking: boolean;
}

export interface City {
  name: string;
}

export interface Location3 {
  id: string;
  city: City;
}

export interface Provider {
  descriptor: Descriptor;
  fulfillments: Fulfillment[];
  locations: Location3[];
}

export interface Descriptor2 {
  name: string;
  long_desc: string;
}

export interface Form {
  url: string;
}

export interface Xinput {
  form: Form;
}

export interface Range {
  start: Date;
  end: Date;
}

export interface Time {
  range: Range;
}

export interface Descriptor3 {
  name: string;
  code: string;
}

export interface Descriptor4 {
  name: string;
  code: string;
}

export interface List {
  descriptor: Descriptor4;
  value: string;
}

export interface Tag {
  descriptor: Descriptor3;
  list: List[];
  display: boolean;
}

export interface Item {
  id: string;
  descriptor: Descriptor2;
  category_ids: string[];
  fulfillment_ids: string[];
  location_ids: string[];
  xinput: Xinput;
  time: Time;
  tags: Tag[];
}

export interface Order {
  provider: Provider;
  items: Item[];
  type: string;
}

export interface Message {
  order: Order;
}

export interface Response {
  context: Context2;
  message: Message;
}

export interface SelectInterface {
  context: Context;
  responses: Response[];
}
