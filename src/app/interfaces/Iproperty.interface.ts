import { Icity } from './ICity.interface';

export interface Iproperty {
  id: number;
  title: string;
  description: string;
  slug: string;
  price: number;
  yearBuilt: Date;
  room: number;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  livingRoom: boolean;
  diningRoom: boolean;
  kitchenType: string;
  garden: boolean;
  pool: boolean;
  terrace: boolean;
  balcony: boolean;
  garage: boolean;
  parking: boolean;
  courtyard: boolean;
  commonOutdoorSpaces: boolean;
  location: location;
  images: images[];
  type: type;
}

interface location {
  id: number;
  street: string;
  city: Icity;
}
interface images {
  id: number;
  path: string;
  tempo: boolean;
}

interface type {
  id: number;
  title: string;
  description: string;
}
