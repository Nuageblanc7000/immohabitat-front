import { Ilocation } from './Ilocation.interface';

export interface IstepOne {
  // type: TypeInPropertyDto;
  title: string;
  description: string;
  price: number;
  isSell: boolean;
  isRent: boolean;
  yearBuilt?: Date;
}

export interface IstepTwo {
  location: Ilocation;
}

export interface IstepTwo {
  location: Ilocation;
}
export interface IstepThree {
  room: number;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  livingRoom?: boolean;
  diningRoom?: boolean;
  balcony?: boolean;
  kitchenType: string;
  insideSurface?: number;
}

export interface IstepFour {
  garden?: boolean;
  pool?: boolean;
  terrace?: boolean;
  garage?: boolean;
  parking?: boolean;
  courtyard?: boolean;
  commonOutdoorSpaces?: boolean;
  exteriorSurface?: number;
}

export interface IstepFive {
  location: Ilocation;
}
