import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproperty } from '../interfaces/Iproperty.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private readonly _Http: HttpClient) {}

  getAll(): Observable<Iproperty[]> {
    return this._Http.get<Iproperty[]>('http://localhost:3000/api/properties');
  }
  getById() {}

  getAllCitiesByProperties() {}
  getAllNewProperties() {}

  //after
  update() {}
  create() {}
  softDelete() {}
}
