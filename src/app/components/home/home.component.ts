import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Icity } from 'src/app/interfaces/ICity.interface';
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
  filteredCities: any[] = [];
  searchForm!: FormGroup;
  selected: string = '';
  types: any[] = ['Maison', 'Appartement'];
  private timeout: any = undefined;
  constructor(
    private _propertyService: PropertyService,
    private _cityService: CityService,
    private _fb: FormBuilder
  ) {
    console.log(this.selected);
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      city: [''],
      minPrice: [''],
      maxPrice: [''],
      type: [''],
    });
  }
  ngOnDestroy() {
    clearInterval(this.timeout);
  }

  onSearchSubmit() {}

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
