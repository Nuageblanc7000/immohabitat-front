import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CityService } from './services/city.service';
import { PropertyService } from './services/property.service';
import { PropertyComponent } from './page/property/property.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'property/:id',
    component: PropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CityService, PropertyService],
})
export class AppRoutingModule {}
