import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-adress-state',
  templateUrl: './adress-state.component.html',
  styleUrls: ['./adress-state.component.scss'],
})
export class AdressStateComponent {
  filteredStreet: any[] = [];
  selected: string = '';
  step!: FormGroup;
  city: string = '';
  code: string = '';
  constructor(private _fb: FormBuilder, private _geoService: GeoService) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      street: [''],
    });

    this.step
      .get('street')
      ?.valueChanges.pipe(
        switchMap((p: string) => {
          return this._geoService.geoStreet({ street: p }).pipe(
            tap((val: any) => {
              console.log(val.data);
              if (
                Array.isArray(val.data.address) &&
                val.data.address.length > 0
              ) {
                this.filteredStreet = val.data.address.road;
              }
            })
          );
        })
      )
      .subscribe();
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

  stepSubmit() {}
}
