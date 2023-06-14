import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Icity } from 'src/app/interfaces/ICity.interface';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';
import { ICitySearch } from 'src/app/interfaces/SearchCity.interface';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cities: Icity[] = [];
  citiesSearch: Icity[] = [];
  filteredCities: any[] = [];
  searchForm!: FormGroup;
  selected: string = '';
  types: any[] = ['Maison', 'Appartement'];
  newProperties: Iproperty[] = [];
  private timeout: any = undefined;
  constructor(
    private _propertyService: PropertyService,
    private _cityService: CityService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      city: [''],
      minPrice: [''],
      maxPrice: [''],
      type: [''],
    });
    this._propertyService.getAllNewProperties().subscribe({
      next: (data: any) => {
        this.newProperties = data.data.properties;
      },
    });
    this._propertyService.getAllCitiesByProperties().subscribe({
      next: (data: any) => {
        this.citiesSearch = data.data;
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

  filterCity(event: { query: ICitySearch }) {
    let query: ICitySearch = event.query;
    if (query) {
      clearInterval(this.timeout);
      this.timeout = setTimeout(() => {
        this._cityService.getAllCities(query).subscribe({
          next: (data: any) => {
            console.log(data.data.cities);
            this.filteredCities = data.data.cities.map(
              (p: Icity) => p.localite
            );
          },
        });
      }, 1000);
    }
  }
}
