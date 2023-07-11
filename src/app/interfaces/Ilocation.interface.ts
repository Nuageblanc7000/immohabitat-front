import { Icity } from './ICity.interface';

export interface Ilocation {
  id?: number;
  street: string;
  ndoor: string;
  city: Icity;
}
