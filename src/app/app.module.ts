import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { HeroComponent } from './components/home/component/hero.component';
import { CarouselModule } from 'primeng/carousel';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PropertyComponent } from './page/property/property.component';
import { NavComponent } from './components/nav/nav.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MenuPhoneComponent } from './components/menu-phone/menu-phone.component';
import { GalleriaModule } from 'primeng/galleria';
import { FavorisComponent } from './components/favoris/favoris.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    HeaderComponent,
    FooterComponent,
    PropertyComponent,
    NavComponent,
    LoaderComponent,
    MenuPhoneComponent,
    FavorisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    CarouselModule,
    GalleriaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
