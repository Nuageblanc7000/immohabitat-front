import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { globalService } from './global.service';
import { IgeoStreet } from '../interfaces/Igeo.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  geoStreet(street: IgeoStreet) {
    return this._http.post(`${this.URL_API}geo/street`, street);
  }
}
