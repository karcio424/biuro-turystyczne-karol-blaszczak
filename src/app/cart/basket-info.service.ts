import { Injectable } from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.model';

@Injectable({
  providedIn: 'root'
})
export class BasketInfoService {

  constructor() { }

  wycieczka: Wycieczka[] = []

  setBasket(wycieczka: Wycieczka[]){
    this.wycieczka=wycieczka
  }

  getBasket(): Wycieczka[]{
    return this.wycieczka
  }
}
