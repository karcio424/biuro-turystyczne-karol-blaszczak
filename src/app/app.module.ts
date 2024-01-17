// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { WycieczkaDodajComponent } from './wycieczki/wycieczka-dodaj/wycieczka-dodaj.component';
import { WycieczkaOcenaComponent } from './wycieczki/wycieczka-ocena/wycieczka-ocena.component';
import { WycieczkaFiltrComponent } from './wycieczki/wycieczka-filtr/wycieczka-filtr.component'; // Dodaj import
import { WycieczkaFiltrService } from './wycieczki/wycieczka-filtr/wycieczka-filtr.service'; // Dodaj import

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    WycieczkaDodajComponent,
    WycieczkaOcenaComponent,
    WycieczkaFiltrComponent, // Dodaj deklarację
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [WycieczkaFiltrService], // Dodaj serwis do providers
  bootstrap: [AppComponent],
})
export class AppModule {}
