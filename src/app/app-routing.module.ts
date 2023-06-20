import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CityService } from './services/city.service';
import { PropertyService } from './services/property.service';
import { PropertyComponent } from './page/property/property.component';
import { PropertyResolver } from './resolver/property.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'property/:id',
    resolve: { data: PropertyResolver },
    component: PropertyComponent,
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
