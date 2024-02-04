import { Injectable } from "@angular/core";
import { Observable, combineLatest, map } from "rxjs";
import { TripsService } from "./trips.service";
import { Trip } from "../models/trip.model";
import { OnsiteReservationsService } from "./onsite-reservations.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart$: Observable<Trip[]>;

  constructor(
    private tripsService: TripsService,
    private onsiteReservationsService: OnsiteReservationsService
  ) {
    this.cart$ = combineLatest([
      this.tripsService.trips$,
      this.onsiteReservationsService.onsiteReservations$,
    ]).pipe(
      map(([trips, onsiteReservations]) => {
        return trips.filter((trip) => onsiteReservations.includes(trip.id));
      })
    );
  }
}