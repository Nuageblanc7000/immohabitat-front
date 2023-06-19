import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalService } from './global.service';

@Injectable()
export class favoriteService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  isFavorite: boolean = false;

  favoriteToggle(propertyId: number) {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTY4NzE5MDIxNCwiZXhwIjoxNjg3MTk3NDE0fQ.osy1z_Z_Vr31dfX-Xdulkcbasyy4WJ_iTjiMWEe_PvU',
    });
    return this._http.patch(
      `${this.URL_API}favorites`,
      {
        propertyId: propertyId,
      },
      { headers }
    );
  }
  userFavoriteList() {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTY4NzE5MDIxNCwiZXhwIjoxNjg3MTk3NDE0fQ.osy1z_Z_Vr31dfX-Xdulkcbasyy4WJ_iTjiMWEe_PvU',
    });
    return this._http.get(`${this.URL_API}favorites`, { headers });
  }
}
