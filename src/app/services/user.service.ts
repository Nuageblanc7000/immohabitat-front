import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalService } from './global.service';
import { IUser } from '../interfaces/IUser.interface';
import { IUpdateProfil } from '../interfaces/updateProfil.interface';
import { IupdateEmail } from '../interfaces/IupdateEmail';
import { IupdatePassword } from '../interfaces/IupdatePassword.interface';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  updateProfil(updateProfil: IUpdateProfil) {
    return this._http.patch(`${this.URL_API}users`, updateProfil, {
      withCredentials: true,
    });
  }

  updateEmail(updateEmail: IupdateEmail) {
    return this._http.patch(`${this.URL_API}users/email-modify`, updateEmail, {
      withCredentials: true,
    });
  }
  updatePassword(updatePassword: IupdatePassword) {
    console.log(updatePassword);

    return this._http.patch(
      `${this.URL_API}users/password-modify`,
      updatePassword,
      {
        withCredentials: true,
      }
    );
  }
}
