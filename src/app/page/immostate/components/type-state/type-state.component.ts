import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Itype } from 'src/app/interfaces/Itype.interface';

import { GeoService } from 'src/app/services/geo.service';
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
  constructor(
    private _fb: FormBuilder,
    private _geoService: GeoService,
    private _typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      type: [''],
      selection: [''],
      title: [''],
      description: [''],
      price: [+''],
    });
  }
  onAutocompleteClick() {
    if (this.step) {
      this.step.get('street')?.value;
      const selectedValue = this.step.get('street')?.value;
      const splitData = selectedValue.split(',');
      this.selected = splitData[0]?.trim();

      this.code = splitData[1]?.trim();
    }
  }

  onClickSell() {
    this.isSell = true;
    this.isRent = false;
    this.step?.get('selection')?.setValue('sell');
  }

  onClickRent() {
    this.isSell = false;
    this.isRent = true;
    this.step?.get('selection')?.setValue('rent');
  }

  stepSubmit() {
    console.log(this.step.value);
  }
}
