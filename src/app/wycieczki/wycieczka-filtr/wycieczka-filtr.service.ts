// wycieczka-filtr.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WycieczkaFiltrService {
  private _filtrSource = new BehaviorSubject<any>({});
  aktualnyFiltr = this._filtrSource.asObservable();

  zmienFiltr(filtr: any) {
    this._filtrSource.next(filtr);
  }
}
