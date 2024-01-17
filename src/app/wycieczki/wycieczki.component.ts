// wycieczki.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Wycieczka } from './wycieczki.model'; // Zaimportuj interfejs Wycieczka

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css'],
  providers: [CurrencyPipe],
})
export class WycieczkiComponent implements OnInit {
  wycieczki: Wycieczka[] = [];
  najtanszaWycieczka: Wycieczka | null = null;
  najdrozszaWycieczka: Wycieczka | null = null;
  wybranaWaluta: string = 'PLN';
  sumarycznaIloscZarezerwowanych: number = 0;

  wycieczkaForm: FormGroup;
  ocenaForm: FormGroup; // Dodaj formularz dla oceny

  constructor(
    private http: HttpClient,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder
  ) {
    this.wycieczkaForm = this.fb.group({
      nazwa: ['', Validators.required],
      kraj: ['', Validators.required],
      dataRozpoczecia: ['', Validators.required],
      dataZakonczenia: ['', Validators.required],
      cenaJednostkowa: ['', Validators.required],
      maxIloscMiejsc: ['', Validators.required],
      opis: ['', Validators.required],
      zdjecie: ['', Validators.required],
      ilosc: 0,
      selected: false,
    });

    this.ocenaForm = this.fb.group({
      ocena: null,
    });
  }

  ngOnInit(): void {
    this.http.get<Wycieczka[]>('/assets/wycieczki.json').subscribe((data) => {
      this.wycieczki = data.map((wycieczka) => ({
        ...wycieczka,
        dostepneMiejsca: wycieczka.maxIloscMiejsc,
        cenaWaluta: this.formatujCene(wycieczka.cenaJednostkowa, 'PLN'),
      }));

      this.znajdzNajtanszaINajdrozszaWycieczke();
      this.obliczSumarycznaIloscZarezerwowanych();
    });
  }

  zarezerwujMiejsce(wycieczka: Wycieczka): void {
    if (wycieczka.dostepneMiejsca > 0) {
      wycieczka.dostepneMiejsca--;
      wycieczka.ilosc++;
      wycieczka.selected = true;
      this.znajdzNajtanszaINajdrozszaWycieczke();
      this.obliczSumarycznaIloscZarezerwowanych();
    }
  }

  anulujRezerwacje(wycieczka: Wycieczka): void {
    if (wycieczka.dostepneMiejsca < wycieczka.maxIloscMiejsc) {
      wycieczka.dostepneMiejsca++;
      wycieczka.ilosc--;
      if (wycieczka.ilosc === 0) {
        wycieczka.selected = false;
      }
      this.znajdzNajtanszaINajdrozszaWycieczke();
      this.obliczSumarycznaIloscZarezerwowanych();
    }
  }

  shouldHideButton(wycieczka: Wycieczka): boolean {
    return wycieczka.dostepneMiejsca === 0;
  }

  getButtonStyle(wycieczka: Wycieczka): any {
    return {
      'background-color': wycieczka.dostepneMiejsca <= 3 ? 'red' : 'white',
      color: wycieczka.dostepneMiejsca <= 3 ? 'white' : 'black',
    };
  }

  znajdzNajtanszaINajdrozszaWycieczke(): void {
    this.najtanszaWycieczka = this.wycieczki.reduce(
      (prev, current) =>
        Number(
          prev.cenaWaluta.replace(/[^\d.-]/g, '')
        ) < Number(current.cenaWaluta.replace(/[^\d.-]/g, ''))
          ? prev
          : current
    );

    this.najdrozszaWycieczka = this.wycieczki.reduce(
      (prev, current) =>
        Number(
          prev.cenaWaluta.replace(/[^\d.-]/g, '')
        ) > Number(current.cenaWaluta.replace(/[^\d.-]/g, ''))
          ? prev
          : current
    );
  }

  zmienWalute(waluta: string): void {
    if (this.wybranaWaluta !== waluta) {
      this.wybranaWaluta = waluta;

      this.wycieczki.forEach((wycieczka) => {
        wycieczka.cenaWaluta = this.formatujCene(
          wycieczka.cenaJednostkowa,
          waluta
        );
      });

      this.znajdzNajtanszaINajdrozszaWycieczke();
    }
  }

  formatujCene(cena: number, waluta: string): string {
    switch (waluta) {
      case 'PLN':
        return `${Math.round(cena)} PLN`;
      case 'USD':
        return `$${Math.round(cena / 4.0358)}`;
      case 'EUR':
        return `${Math.round(cena / 4.3934)} €`;
      default:
        return `${Math.round(cena)} ${waluta}`;
    }
  }

  obliczSumarycznaIloscZarezerwowanych(): void {
    this.sumarycznaIloscZarezerwowanych = this.wycieczki.reduce(
      (sum, wycieczka) =>
        sum + (wycieczka.maxIloscMiejsc - wycieczka.dostepneMiejsca),
      0
    );
  }

  usunWycieczke(wycieczka: Wycieczka): void {
    const index = this.wycieczki.indexOf(wycieczka);
    if (index !== -1) {
      this.wycieczki.splice(index, 1);
      this.obliczSumarycznaIloscZarezerwowanych();
      this.znajdzNajtanszaINajdrozszaWycieczke();
    }
  }

  dodajNowaWycieczke(daneWycieczki: any): void {
    this.wycieczki.push({
      id: this.wycieczki.length + 1,
      ...daneWycieczki,
      dostepneMiejsca: daneWycieczki.maxIloscMiejsc,
      cenaWaluta: this.formatujCene(
        daneWycieczki.cenaJednostkowa,
        this.wybranaWaluta
      ),
    });
    this.obliczSumarycznaIloscZarezerwowanych();
    this.znajdzNajtanszaINajdrozszaWycieczke();
  }

  // Dodaj funkcję do obsługi oceny wycieczki
  ocenWycieczke(wycieczka: Wycieczka, ocena: number): void {
    wycieczka.ocena = ocena;
  }
}
