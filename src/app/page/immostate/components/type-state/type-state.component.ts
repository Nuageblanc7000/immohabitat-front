import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IStateStep } from 'src/app/interfaces/IstateStep.interface';
import { Itype } from 'src/app/interfaces/Itype.interface';

import { GeoService } from 'src/app/services/geo.service';
import { StepService } from 'src/app/services/step.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type-state',
  templateUrl: './type-state.component.html',
  styleUrls: ['./type-state.component.scss'],
})
export class TypeStateComponent implements OnInit {
  types$: Observable<Itype[]> = this._typeService.getAll();

  selected: string = '';
  step!: FormGroup;
  city: string = '';
  code: string = '';
  maxDate: Date = new Date();
  private stepstate: IStateStep = this._stepService.stateStep.getValue();
  isSell: boolean = this.stepstate?.isSell;
  isRent: boolean = this.stepstate?.isRent;
  date: Date | undefined = this.stepstate?.yearBuilt;
  constructor(
    private _fb: FormBuilder,
    private _geoService: GeoService,
    private _typeService: TypeService,
    private _stepService: StepService
  ) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      type: [this.stepstate?.type],
      isSell: [this.stepstate?.isSell],
      isRent: [this.stepstate?.isRent],
      title: [this.stepstate?.title],
      description: [this.stepstate?.description],
      price: [this.stepstate?.price],
      yearBuilt: [this.stepstate?.yearBuilt],
    });
  }

  onClickSell() {
    this.isSell = true;
    this.isRent = false;
    this.step?.get('isRent')?.setValue(false);
    this.step?.get('isSell')?.setValue(this.isSell);
  }

  onClickRent() {
    this.isSell = false;
    this.isRent = true;
    this.step?.get('isSell')?.setValue(false);
    this.step?.get('isRent')?.setValue(this.isRent);
  }

  stepSubmit() {
    if (this.step.valid) {
      this.step?.get('price')?.setValue(+this.step?.get('price')?.value);
      this._stepService.stateStep.next({
        ...this.stepstate,
        ...this.step.value,
      });

      console.log(this._stepService.stateStep.getValue());
      this._stepService.stepTwo(this.step.value).subscribe({
        next: (v) => console.log(v),
      });
    }
  }
}
