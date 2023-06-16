import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, filter, mergeMap, switchMap, timer } from 'rxjs';
import { Icity } from 'src/app/interfaces/ICity.interface';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  cities: Icity[] = [];
  citiesSearch: Icity[] = [];
  filteredCities: any[] = [];
  searchForm!: FormGroup;
  selected: string = '';
  types: any[] = ['Maison', 'Appartement'];
  newProperties: Iproperty[] = [];
  responsiveOptions: any[] = [];
  private timeout: any = undefined;
  constructor(
    private _propertyService: PropertyService,
    private _cityService: CityService,
    private _fb: FormBuilder
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      city: [''],
      minPrice: [''],
      maxPrice: [''],
      type: [''],
    });
    this.isLoading = true;
    this._propertyService.getAllNewProperties().subscribe({
      next: (data: any) => {
        this.newProperties = data.data.properties;
        this.isLoading = false;
      },
    });
    this._propertyService.getAllCitiesByProperties().subscribe({
      next: (data: any) => {
        this.citiesSearch = data.data;
      },
    });

    this.searchForm
      .get('city')
      ?.valueChanges.pipe(
        debounce((_) => timer(1000)),
        filter((v) => !!v),
        switchMap((v) => this._cityService.getAllCities(v))
      )
      .subscribe({
        next: (data: any) => {
          console.log(data.data.cities);
          this.filteredCities = data.data.cities.map((p: Icity) => p.localite);
        },
      });
  }
  ngOnDestroy() {
    clearInterval(this.timeout);
  }

  onSearchSubmit() {
    this._propertyService.getAll(this.searchForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
      },
    });
  }
}
