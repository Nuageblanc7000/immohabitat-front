import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  UrlSerializer,
} from '@angular/router';
import {
  debounce,
  debounceTime,
  filter,
  mergeMap,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { Icity } from 'src/app/interfaces/ICity.interface';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  constructor(
    private _propertyService: PropertyService,
    private _cityService: CityService,
    private _activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router
  ) {}
  properties: Iproperty[] = [];
  citiesSearch: Icity[] = [];
  filteredCities: any[] = [];
  types: any[] = ['Maison', 'Appartement'];
  searchForm!: FormGroup;
  formValues: Record<string, any> = {};
  selected: string = '';
  ngOnInit(): void {
    //permet de récupérer les modif dans l'url
    this._activateRoute.queryParamMap
      .pipe(
        switchMap((v: any) => {
          this.selected = v.params['city'] ? v.params['city'] : '';
          this.formValues = { ...v.params };
          return this._propertyService.getAll({ ...v.params });
        })
      )
      .subscribe({
        next: (data: any) => {
          this.properties = data.data.properties;
        },
      });
    this.searchForm = this._fb.group({
      city: [this.formValues!['city']],
      minPrice: [this.formValues!['minPrice']],
      maxPrice: [this.formValues!['maxPrice']],
      type: [this.formValues!['type']],
    });

    //form search city
    this.searchForm
      .get('city')
      ?.valueChanges.pipe(
        debounce((_) => timer(500)),
        filter((v) => !!v),
        switchMap((v) => this._cityService.getAllCities(v))
      )
      .subscribe({
        next: (data: any) => {
          this.filteredCities = data.data.cities.map((p: Icity) => p.localite);
        },
      });
  }

  onSearchSubmit() {
    const params = this.searchForm.value;
    let paramsValid: Record<string, any> = {};
    for (const key in params) {
      if (params[key]) {
        paramsValid[key] = params[key];
      }
    }
    const t: any = this._activateRoute.snapshot.queryParamMap;
    this._router.navigate([], {
      queryParams: { ...paramsValid },
      replaceUrl: true,
      relativeTo: this._activateRoute,
    });
  }
}
