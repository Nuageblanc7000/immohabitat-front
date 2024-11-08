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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthComponent } from './components/auth/auth.component';
import { InputTextModule } from 'primeng/inputtext';
import { SignupComponent } from './page/signup/signup.component';
import { ProfilComponent } from './page/profil/profil.component';
import { PasswordComponent } from './page/profil/components/password/password.component';
import { FormProfilComponent } from './page/profil/components/form-profil/form-profil.component';
import { InfoComponent } from './page/profil/components/info/info.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormEmailComponent } from './page/profil/components/form-email/form-email.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MyFavorisComponent } from './page/my-favoris/my-favorites.component';
import { ImageFallbackDirective } from './directives/imgFail';
import { OutsideClickDirective } from './directives/outsideClick';
import { ImmostateComponent } from './page/immostate/immostate.component';
import { StepsModule } from 'primeng/steps';
import { TypeStateComponent } from './page/immostate/components/type-state/type-state.component';
import { AdressStateComponent } from './page/immostate/components/adress-state/adress-state.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ExteriorStateComponent } from './page/immostate/components/exterior-state/exterior-state.component';
import { InteriorStateComponent } from './page/immostate/components/interior-state/interior-state.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { PictureStateComponent } from './page/immostate/components/picture-state/picture-state.component';
import { CalendarModule } from 'primeng/calendar';
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
    AuthComponent,
    SignupComponent,
    ProfilComponent,
    PasswordComponent,
    FormProfilComponent,
    InfoComponent,
    FormEmailComponent,
    MyFavorisComponent,
    ImageFallbackDirective,
    OutsideClickDirective,
    ImmostateComponent,
    TypeStateComponent,
    AdressStateComponent,
    InteriorStateComponent,
    ExteriorStateComponent,
    PictureStateComponent,
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
    OverlayPanelModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    StepsModule,
    InputTextareaModule,
    KeyFilterModule,
    SelectButtonModule,
    CheckboxModule,
    FileUploadModule,
    CalendarModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
