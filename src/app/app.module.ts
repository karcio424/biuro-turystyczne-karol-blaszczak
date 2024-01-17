// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { WycieczkaDodajComponent } from './wycieczki/wycieczka-dodaj/wycieczka-dodaj.component';
import { WycieczkaOcenaComponent } from './wycieczki/wycieczka-ocena/wycieczka-ocena.component'; // Dodaj import
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WycieczkiComponent,
    WycieczkaDodajComponent,
    WycieczkaOcenaComponent, // Dodaj do declarations
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
