import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproperty } from '../interfaces/Iproperty.interface';
import { globalService } from './global.service';
import { Icity } from '../interfaces/ICity.interface';
import { IStateStep } from '../interfaces/IstateStep.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends globalService {
  constructor(private readonly _Http: HttpClient) {
    super();
  }
  private url_base_property = `${this.URL_API}properties`;

  getAll(queryParam: any = null): Observable<Iproperty[]> {
    const queryParams = new URLSearchParams();

    for (const key in queryParam) {
      if (queryParam[key]) {
        queryParams.append(key, queryParam[key]);
      }
    }

    const queryString = queryParams.toString();

    return this._Http.get<Iproperty[]>(
      `${this.url_base_property}?${queryString}`
    );
  }
  getById(id: string | null) {
    return this._Http.get<Iproperty>(` ${this.url_base_property}/${id}`);
  }

  getAllCitiesByProperties(): Observable<Icity[]> {
    return this._Http.get<Icity[]>(`${this.url_base_property}/cities`);
  }
  getAllNewProperties() {
    return this._Http.get<Iproperty[]>(
      `${this.url_base_property}/newProperties`
    );
  }

  //after
  update() {}
  create(data: IStateStep) {
    const { images, ...rest } = data;
    const jsonData = JSON.stringify(rest);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('dataJson', jsonData);
    return this._Http.post(`${this.URL_API}properties`, formData, {
      withCredentials: true,
    });
  }
  softDelete() {}
}
