// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { WycieczkaDodajComponent } from './wycieczki/wycieczka-dodaj/wycieczka-dodaj.component'; // Importujemy nowy komponent

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    WycieczkaDodajComponent // Dodajemy nowy komponent do deklaracji
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
