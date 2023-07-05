import { Injectable } from '@angular/core';
import { globalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Itype } from '../interfaces/Itype.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  getAll(): Observable<Itype[]> {
    return this._http
      .get<Itype[]>(`${this.URL_API}types`)
      .pipe(map((p: any) => p.data.types));
  }
}
