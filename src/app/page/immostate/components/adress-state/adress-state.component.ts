import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounce, filter, switchMap, tap, timer } from 'rxjs';
import { Icity } from 'src/app/interfaces/ICity.interface';
import { CityService } from 'src/app/services/city.service';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-adress-state',
  templateUrl: './adress-state.component.html',
  styleUrls: ['./adress-state.component.scss'],
})
export class AdressStateComponent {
  filteredStreet: any[] = [];
  filteredCities: any[] = [];
  selected: string = '';
  step!: FormGroup;
  code: string = '';
  constructor(
    private _fb: FormBuilder,
    private _geoService: GeoService,
    private _cityService: CityService
  ) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      street: [''],
      city: this._fb.group({
        localite: [''],
        code: [''],
      }),
      ndoor: [''],
    });

    //   this.step
    //     .get('street')
    //     ?.valueChanges.pipe(
    //       switchMap((p: string) => {
    //         return this._geoService.geoStreet({ street: p }).pipe(
    //           tap((val: any) => {
    //             console.log(val.data);
    //             if (
    //               Array.isArray(val.data.address) &&
    //               val.data.address.length > 0
    //             ) {
    //               this.filteredStreet = val.data.address.road;
    //             }
    //           })
    //         );
    //       })
    //     )
    //     .subscribe();
    // }
    // onAutocompleteClick() {
    //   if (this.step) {
    //     this.step.get('street')?.value;
    //     const selectedValue = this.step.get('street')?.value;
    //     const splitData = selectedValue.split(',');
    //     this.selected = splitData[0]?.trim();

    //     this.code = splitData[1]?.trim();
    //   }
    this.step
      .get('city.localite')
      ?.valueChanges.pipe(
        debounce((_) => timer(500)),
        filter((v) => !!v),
        switchMap((v) => this._cityService.getAllCities(v))
      )
      .subscribe({
        next: (data: any) => {
          const value = this.step.get('city.localite')?.value;
          const selectedCity = data.data.cities.map((p: any) => {
            if (p.localite === value)
              this.step.get('city.code')?.setValue(p.code);
          });

          // this.step.get('city.code')?.setValue();
          this.filteredCities = data.data.cities.map((p: Icity) => p.localite);
        },
      });
  }

  stepSubmit() {
    console.log(this.step.value);
  }
}
