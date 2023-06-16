import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Iproperty } from '../interfaces/Iproperty.interface';
import { inject } from '@angular/core';
import { PropertyService } from '../services/property.service';

export const PropertyResolver: ResolveFn<Iproperty> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id: string | null = route.paramMap.get('id');
  return inject(PropertyService).getById(id);
};
