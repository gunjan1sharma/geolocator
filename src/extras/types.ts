export interface PickerCardProps {
  heading: string;
  description: string;
  openClick: (picker: string) => void;
  knowClick: () => void;
  borderColor: string;
}

export interface SingleColorProps {
  color: string;
  colorValue: any;
  id: string;
  deleteColor: (id: string) => void;
}

export interface SimpleIntroProps {
  tag?: string;
  heading: string;
  subtitle: string;
  btntext: string;
}

export interface Root {
  domain: string;
  domain_id: string;
  status: string;
  create_date: string;
  update_date: string;
  expire_date: string;
  domain_age: number;
  whois_server: string;
  registrar: Registrar;
  registrant: Registrant;
  admin: Admin;
  tech: Tech;
  billing: Billing;
  nameservers: string[];
}

export interface Registrar {
  iana_id: string;
  name: string;
  url: string;
}

export interface Registrant {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}

export interface Admin {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}

export interface Tech {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}

export interface Billing {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}
