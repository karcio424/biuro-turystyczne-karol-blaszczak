// app/wycieczki/filtr-wycieczek/filtr-wycieczek.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Wycieczka } from '../wycieczki.model';
import { WycieczkiService } from '../wycieczki.service'; // Importuj serwis wycieczek

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<any>({});
  filters$ = this.filterSubject.asObservable();
  filteredTrips$!: Observable<Wycieczka[]>;

  constructor(private wycieczkaService: WycieczkiService) {
    this.filteredTrips$ = combineLatest([
      this.wycieczkaService.wycieczki$,
      this.filters$,
    ]).pipe(
      map(([wycieczki, filters]) => {
        return this.filterTrips(wycieczki, filters);
      })
    );
  }

  private filterTrips(wycieczki: Wycieczka[], filters: any): Wycieczka[] {
    let filteredTrips = [...wycieczki];
    if (filters.location) {
      filteredTrips = filteredTrips.filter((wycieczka) => {
        return wycieczka.kraj
          .toLowerCase()
          .includes(filters.location.toLowerCase());
      });
    }

    if (filters.priceMin) {
      filteredTrips = filteredTrips.filter(
        (wycieczka) => wycieczka.cenaJednostkowa >= filters.priceMin
      );
    }

    if (filters.priceMax) {
      filteredTrips = filteredTrips.filter(
        (wycieczka) => wycieczka.cenaJednostkowa <= filters.priceMax
      );
    }

    if (filters.startDateMin) {
      filteredTrips = filteredTrips.filter(
        (wycieczka) => new Date(wycieczka.dataRozpoczecia) >= new Date(filters.startDateMin)
      );
    }

    if (filters.startDateMax) {
      filteredTrips = filteredTrips.filter(
        (wycieczka) => new Date(wycieczka.dataRozpoczecia) <= new Date(filters.startDateMax)
      );
    }

    if (filters.rating) {
      filteredTrips = filteredTrips.filter(
        (wycieczka) => wycieczka.ocena === filters.rating
      );
    }
    return filteredTrips;
  }

  setFilters(filters: any) {
    this.filterSubject.next(filters);
  }

  clearFilters() {
    this.filterSubject.next({});
  }
}