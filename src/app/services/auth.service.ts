import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  filter,
  first,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ICredential } from '../interfaces/ICredential.interface';
import { globalService } from './global.service';
import { IUser } from '../interfaces/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }
  public isAuth$: ReplaySubject<boolean> = new ReplaySubject(1);
  public openSignin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public user$: Observable<IUser | null> = this.userSubject.asObservable();

  fetchCurrentUser(): Observable<IUser | null> {
    return this._http.get<IUser>(`${this.URL_API}auth/currentuser`, {
      withCredentials: true,
    });
  }

  signin(credential: ICredential) {
    return this._http
      .post(
        `${this.URL_API}auth/signin`,
        { ...credential },
        { withCredentials: true }
      )
      .pipe(
        tap((data: any) => {
          if (data) {
            console.log(data, 'data');
            this.isAuth$.next(true);
            this.openSignin$.next(false);
          }
        })
      );
  }
  signup() {}

  openPopConnection() {
    const isUser = this.isAuth$.pipe(
      first((c) => c !== null),
      switchMap((x) => this.openSignin$.pipe(tap((r) => (r = true))))
    );
  }

  logout() {
    return this._http
      .get(`${this.URL_API}auth/logout`, {
        withCredentials: true,
      })
      .pipe(
        tap((x) => {
          this.userSubject.next(null);
          this.isAuth$.next(false);
        })
      );
  }
}
