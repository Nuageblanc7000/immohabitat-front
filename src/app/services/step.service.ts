import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalService } from './global.service';
import {
  IstepFive,
  IstepFour,
  IstepOne,
  IstepThree,
  IstepTwo,
} from '../interfaces/IStep.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  stepOne(stepOne: IstepOne): Observable<any> {
    return this._http.post(`${this.URL_API}properties/step1`, stepOne, {
      withCredentials: true,
    });
  }
  stepTwo(stepTwo: IstepTwo) {
    return this._http.post(`${this.URL_API}properties/step2`, stepTwo, {
      withCredentials: true,
    });
  }
  stepThree(stepThree: IstepThree) {
    return this._http.post(`${this.URL_API}properties/step3`, stepThree, {
      withCredentials: true,
    });
  }
  stepFour(stepFour: IstepFour) {
    return this._http.post(`${this.URL_API}properties/step4`, stepFour, {
      withCredentials: true,
    });
  }
  stepFive(stepFive: IstepFive) {
    return this._http.post(`${this.URL_API}properties/step5`, stepFive, {
      withCredentials: true,
    });
  }
}
