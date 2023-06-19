import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  constructor(
    private _activateRoute: ActivatedRoute,
    private _propertyService: PropertyService
  ) {}
  properties: Iproperty[] = [];
  ngOnInit(): void {
    this._activateRoute.queryParamMap
      .pipe(
        switchMap((v: any) => {
          return this._propertyService.getAll({ ...v.params });
        })
      )
      .subscribe({
        next: (data: any) => {
          this.properties = data.data.properties;
          console.log(data.data.properties);
        },
      });
  }
}
