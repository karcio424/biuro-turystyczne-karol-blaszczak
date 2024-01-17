// wycieczki.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Wycieczka } from './wycieczki.model';
import { WycieczkaFiltrService } from './wycieczka-filtr/wycieczka-filtr.service';

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
  ocenaForm: FormGroup;

  constructor(
    private http: HttpClient,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder,
    private filtrService: WycieczkaFiltrService
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

    this.filtrService.aktualnyFiltr.subscribe((filtr) => {
      this.applyFiltr(filtr);
    });
  }

  zarezerwujMiejsce(wycieczka: Wycieczka): void {
    if (wycieczka.dostepneMiejsca > 0) {
      wycieczka.dostepneMiejsca--;
      this.znajdzNajtanszaINajdrozszaWycieczke();
      this.obliczSumarycznaIloscZarezerwowanych();
    }
  }

  anulujRezerwacje(wycieczka: Wycieczka): void {
    if (wycieczka.dostepneMiejsca < wycieczka.maxIloscMiejsc) {
      wycieczka.dostepneMiejsca++;
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

  ocenWycieczke(wycieczka: Wycieczka, ocena: number): void {
    wycieczka.ocena = ocena;
  }

  applyFiltr(filtr: any): void {
    // Tutaj należy zaimplementować logikę filtracji na podstawie otrzymanego obiektu filtru
    // Wartości z filtru dostępne są w filtr.lokalizacje, filtr.cenaMin, filtr.cenaMax, filtr.dataMin, filtr.dataMax, filtr.oceny
    // Aby zastosować filtrację, należy odpowiednio modyfikować this.wycieczki
    // Poniżej znajdziesz przykładową logikę, ale wymaga ona dostosowania do rzeczywistych danych w Twojej aplikacji

    this.wycieczki = this.wycieczki.filter((wycieczka) => {
      // Filtruj lokalizacje
      if (filtr.lokalizacje && filtr.lokalizacje.length > 0) {
        if (!filtr.lokalizacje.includes(wycieczka.kraj)) {
          return false;
        }
      }

      // Filtruj cenę
      if (filtr.cenaMin && wycieczka.cenaJednostkowa < filtr.cenaMin) {
        return false;
      }
      if (filtr.cenaMax && wycieczka.cenaJednostkowa > filtr.cenaMax) {
        return false;
      }

      // Filtruj datę
      if (filtr.dataMin && new Date(wycieczka.dataRozpoczecia) < filtr.dataMin) {
        return false;
      }
      if (filtr.dataMax && new Date(wycieczka.dataZakonczenia) > filtr.dataMax) {
        return false;
      }

      // Filtruj ocenę
      if (filtr.oceny && filtr.oceny.length > 0 && wycieczka.ocena) {
        if (!filtr.oceny.includes(wycieczka.ocena)) {
          return false;
        }
      }

      return true;
    });

    this.znajdzNajtanszaINajdrozszaWycieczke();
    this.obliczSumarycznaIloscZarezerwowanych();
  }
}
