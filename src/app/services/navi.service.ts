import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalService } from './global.service';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NaviService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  isOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
