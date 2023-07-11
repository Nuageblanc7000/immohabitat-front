import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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
  isSell: boolean = false;
  isRent: boolean = false;
  date: Date | undefined;
  maxDate: Date = new Date();
  constructor(
    private _fb: FormBuilder,
    private _geoService: GeoService,
    private _typeService: TypeService,
    private _stepService: StepService
  ) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      type: [''],
      isSell: [this.isSell],
      isRent: [this.isRent],
      title: [''],
      description: [''],
      price: [''],
      yearBuilt: [null],
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
      console.log(this.step.value);
      this._stepService.stepTwo(this.step.value).subscribe({
        next: (v) => console.log(v),
      });
    }
  }
}
