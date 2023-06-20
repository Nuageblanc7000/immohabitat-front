import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproperty } from '../interfaces/Iproperty.interface';
import { globalService } from './global.service';
import { Icity } from '../interfaces/ICity.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends globalService {
  constructor(private readonly _Http: HttpClient) {
    super();
  }
  private url_base_property = `${this.URL_API}properties`;

  getAll(queryParam: any = null): Observable<Iproperty[]> {
    console.log(queryParam, '---------->findall');
    const queryParams = new URLSearchParams();

    for (const key in queryParam) {
      if (queryParam[key]) {
        queryParams.append(key, queryParam[key]);
      }
    }

    const queryString = queryParams.toString();

    console.log(queryString);

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
  create() {}
  softDelete() {}
}
