import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const DEFAULT_CURRENCY = "PLN";

export const CURRENCIES = {
  PLN: 1.0,
  USD: 1 / 4.0,
  EUR: 1 / 4.4,
} as const;

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>(DEFAULT_CURRENCY);
  currency$ = this.currencySubject.asObservable();

  changeCurrency = (curency: string) => {
    this.currencySubject.next(curency);
  };
}