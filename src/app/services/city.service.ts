import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICitySearch } from '../interfaces/SearchCity.interface';

@Injectable()
export class CityService {
  constructor(private readonly _Http: HttpClient) {}
  getAllCities(locality: ICitySearch) {
    return this._Http.post('http://localhost:3000/api/cities', {
      locality: locality,
    });
  }
}
