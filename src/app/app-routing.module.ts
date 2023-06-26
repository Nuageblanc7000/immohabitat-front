import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CityService } from './services/city.service';
import { PropertyService } from './services/property.service';
import { PropertyComponent } from './page/property/property.component';
import { PropertyResolver } from './resolver/property.resolver';
import { PropertiesComponent } from './page/properties/properties.component';
import { dataUserGuard } from './guards/current-user.guard';
import { SignupComponent } from './page/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [dataUserGuard] },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'property/:id',
    resolve: { data: PropertyResolver },
    component: PropertyComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers: [CityService, PropertyService],
})
export class AppRoutingModule {}
