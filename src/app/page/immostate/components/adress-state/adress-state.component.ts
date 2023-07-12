import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  Observable,
  Subscription,
  debounce,
  filter,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Icity } from 'src/app/interfaces/ICity.interface';
import { IStateStep } from 'src/app/interfaces/IstateStep.interface';
import { CityService } from 'src/app/services/city.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-adress-state',
  templateUrl: './adress-state.component.html',
  styleUrls: ['./adress-state.component.scss'],
})
export class AdressStateComponent implements OnInit, OnDestroy {
  filteredCities: any[] = [];
  step!: FormGroup;
  selectedCity?: Icity;
  code: string = '';
  private stepstate: IStateStep = this._stepService.stateStep.getValue();
  selected: string = this.stepstate?.location?.city?.localite;
  unsubscribe: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _cityService: CityService,
    private _stepService: StepService
  ) {}

  ngOnInit(): void {
    this.step = this._fb.group({
      street: [this.stepstate?.location?.street],
      ndoor: [this.stepstate?.location?.ndoor],
      city: this._fb.group({
        localite: ['Pokemon'],
        code: [this.stepstate?.location?.city?.code],
      }),
    });
    this.unsubscribe.add(
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
              if (p.localite === value) this.selectedCity = p;
              this.step.get('city.code')?.setValue(p.code);
            });

            // this.step.get('city.code')?.setValue();
            this.filteredCities = data.data.cities.map(
              (p: Icity) => p.localite
            );
          },
        })
    );
  }
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  stepSubmit() {
    if (this.step.valid) {
      this._stepService.stateStep.next({
        ...this.stepstate,
        location: { ...this.step.value, city: this.selectedCity },
      });
      this.unsubscribe.add(
        this._stepService
          .stepOne({
            location: { ...this.step.value, city: this.selectedCity },
          })
          .subscribe({
            next: (p: any) => {
              console.log(p);
            },
          })
      );
    }
  }
}
