import { Icity } from './ICity.interface';

export interface IStateStep {
  id: number;
  title: string;
  description: string;
  slug: string;
  price: number;
  isSell: boolean;
  isRent: boolean;
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
  insideSurface: number;
  outsideSurface: number;
  commonOutdoorSpaces: boolean;
  location: location;
  images: File[];
  type: type;
}
export interface Iimages {
  file: File;
}
interface location {
  id: number;
  street: string;
  ndoor: string;
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
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
