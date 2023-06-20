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
import { BooleanPipe } from './pipes/boolean.pipe';
import { AccordionModule } from 'primeng/accordion';
import { PropertiesComponent } from './page/properties/properties.component';
import { CardComponent } from './components/card/card.component';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
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
    BooleanPipe,
    PropertiesComponent,
    CardComponent,
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
    AccordionModule,
    DialogModule,
    OverlayPanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
