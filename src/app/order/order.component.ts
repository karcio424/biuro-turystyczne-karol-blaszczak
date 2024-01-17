// order.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  @Input() iloscWycieczek: number = 0;
  @Input() sumaZamowienia: number = 0;
}
