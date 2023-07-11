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
import { MyFavorisComponent } from './page/my-favoris/my-favorites.component';
import { ImmostateComponent } from './page/immostate/immostate.component';
import { TypeStateComponent } from './page/immostate/components/type-state/type-state.component';
import { AdressStateComponent } from './page/immostate/components/adress-state/adress-state.component';
import { InteriorStateComponent } from './page/immostate/components/interior-state/interior-state.component';
import { ExteriorStateComponent } from './page/immostate/components/exterior-state/exterior-state.component';
import { PictureStateComponent } from './page/immostate/components/picture-state/picture-state.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [dataUserGuard],
  },
  {
    path: 'create-immo',
    component: ImmostateComponent,
    canActivate: [dataUserGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'adress-state',
      },

      {
        path: 'adress-state',
        component: AdressStateComponent,
      },

      {
        path: 'type-state',
        component: TypeStateComponent,
      },
      {
        path: 'interior-state',
        component: InteriorStateComponent,
      },
      {
        path: 'exterior-state',
        component: ExteriorStateComponent,
      },
      {
        path: 'picture-state',
        component: PictureStateComponent,
      },
    ],
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
    path: 'favorites-list',
    component: MyFavorisComponent,
    canActivate: [dataUserGuard, IsAuthGuard],
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
