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
import { ProfilComponent } from './page/profil/profil.component';
import { IsAuthGuard } from './guards/is-auth.guard';
import { PasswordComponent } from './page/profil/components/password/password.component';
import { FormProfilComponent } from './page/profil/components/form-profil/form-profil.component';
import { InfoComponent } from './page/profil/components/info/info.component';
import { FormEmailComponent } from './page/profil/components/form-email/form-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [dataUserGuard, IsAuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      {
        path: 'info',
        component: InfoComponent,
        canActivate: [dataUserGuard, IsAuthGuard],
      },
      {
        path: 'profil-modify',
        component: FormProfilComponent,
        canActivate: [dataUserGuard, IsAuthGuard],
      },
      {
        path: 'email-modify',
        component: FormEmailComponent,
        canActivate: [dataUserGuard, IsAuthGuard],
      },
      {
        path: 'password-modify',
        component: PasswordComponent,
        canActivate: [dataUserGuard, IsAuthGuard],
      },
    ],
  },
  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'property/:id',
    resolve: { data: PropertyResolver },
    component: PropertyComponent,
    canActivate: [dataUserGuard],
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
