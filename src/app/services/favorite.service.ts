import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalService } from './global.service';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class favoriteService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  isFavorite: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  favoriteToggle(propertyId: number) {
    return this._http.patch(
      `${this.URL_API}favorites`,
      {
        propertyId: propertyId,
      },
      { withCredentials: true }
    );
  }
  userFavoriteList() {
    return this._http
      .get(`${this.URL_API}favorites`, {
        withCredentials: true,
      })
      .pipe(
        map((p: any) => {
          console.log(...p.data.favorites, 'p');
          return [...p.data.favorites];
        })
      );
  }
}
