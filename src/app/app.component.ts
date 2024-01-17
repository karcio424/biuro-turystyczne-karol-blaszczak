// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  iloscWycieczek: number = 0;
  sumaZamowienia: number = 0;

  aktualizujZamowienie(daneWycieczki: any): void {
    // Logika do aktualizacji ilości wycieczek i sumy zamówienia
    // Użyj odpowiednich danych zdarzeń (event) lub metod z innych komponentów
    // aby zaktualizować ilość wycieczek i sumę zamówienia
    // Poniżej znajduje się przykładowa implementacja, ale dostosuj ją do swoich potrzeb
    this.iloscWycieczek++;
    this.sumaZamowienia += daneWycieczki.cenaJednostkowa;
  }
}
