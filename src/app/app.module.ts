// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { WycieczkaDodajComponent } from './wycieczki/wycieczka-dodaj/wycieczka-dodaj.component';
import { WycieczkaOcenaComponent } from './wycieczki/wycieczka-ocena/wycieczka-ocena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Dodaj import

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    WycieczkaDodajComponent,
    WycieczkaOcenaComponent, // Dodaj do declarations
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
