import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type HistoryFilter = {
  past: boolean;
  active: boolean;
  future: boolean;
};

@Injectable({
  providedIn: "root",
})
export class HistoryFilterService {
  private filterSubject = new BehaviorSubject<any>({});
  filters$ = this.filterSubject.asObservable();

  constructor() {
    const initialFilter: HistoryFilter = {
      past: true,
      active: true,
      future: true,
    };
    this.filterSubject.next(initialFilter);
  }

  setFilters(filters: HistoryFilter) {
    this.filterSubject.next(filters);
  }

  clearFilters() {
    this.filterSubject.next({
      past: true,
      active: true,
      future: true,
    });
  }
}