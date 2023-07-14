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
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService extends globalService {
  constructor(private _http: HttpClient) {
    super();
  }

  stateStep: BehaviorSubject<any> = new BehaviorSubject({});

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
  stepFive(step5Dto: IstepFive): Observable<any> {
    const formData = new FormData();
    for (let index = 0; index < step5Dto.images.length; index++) {
      formData.append('images', step5Dto.images[index]);
    }

    return this._http.post<any>(`${this.URL_API}properties/step5`, formData, {
      withCredentials: true,
    });
  }
}
