// app/wycieczki/wycieczka-ocena/wycieczka-ocena.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wycieczka-ocena',
  templateUrl: './wycieczka-ocena.component.html',
  styleUrls: ['./wycieczka-ocena.component.css'],
})
export class WycieczkaOcenaComponent {
  @Input() ocena: number | null = null;
  @Output() ocenWycieczke = new EventEmitter<number>();

  gwiazdki: number[] = [1, 2, 3, 4, 5];

  ocen(wartosc: number): void {
    this.ocenWycieczke.emit(wartosc);
  }
}
