import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.service";
import { Trip } from "../../../models/trip.model";
import { CommonModule } from "@angular/common";
import { CurrencyPipe } from "../../../pipes/currency.pipe";
import { ReservationsService } from "../../../services/reservations.service";
import { IReservation, Reservation } from "../../../models/reservation.model";
import { CurrencyService } from "../../../services/currency.service";
import { OnsiteReservationsService } from "../../../services/onsite-reservations.service";
import { OnsiteReservationComponent } from "../onsite-reservation.component";
import { UserService } from "../../../services/user.service";
import { User } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-trip-cart",
  standalone: true,
  templateUrl: "./trip-cart.component.html",
  styleUrl: "./trip-cart.component.css",
  imports: [CommonModule, CurrencyPipe, OnsiteReservationComponent],
})
export class TripCartComponent implements OnInit {
  tripsInCart: Trip[] = [];
  selectedTrips: Trip[] = [];
  currency = "PLN";
  user: User | null = null;

  isTripSelected = (trip: Trip): boolean => {
    return this.selectedTrips.some((selected) => trip.id === selected.id);
  };

  tripOnsiteReservations = (tripId: string): number => {
    return this.onsiteReservationService.getTripReservationsCount(tripId);
  };

  tripSelectionChange = (trip: Trip): void => {
    if (!this.selectedTrips.includes(trip)) {
      this.selectedTrips.push(trip);
    } else {
      const indexToRemove = this.selectedTrips.indexOf(trip);
      this.selectedTrips.splice(indexToRemove, 1);
    }
  };

  buy = (): void => {
    if (this.user === null) this.router.navigate(["/login"]);

    this.selectedTrips.forEach((trip) => {
      const reservation: IReservation = {
        userId: !this.user ? "" : this.user.email ? this.user.email : "",
        tripId: trip.id,
        count: this.onsiteReservationService.getTripReservationsCount(trip.id),
        purchaseDate: new Date(Date.now()),
      };
      this.reservationsService.addReservation(reservation);
      this.onsiteReservationService.removeReservation(
        trip.id,
        this.onsiteReservationService.getTripReservationsCount(trip.id)
      );
    });
    this.selectedTrips = [];
  };

  selectedTripsValue = (): number => {
    return this.selectedTrips.reduce((result, trip) => {
      return (
        result +
        trip.price *
          this.onsiteReservationService.getTripReservationsCount(trip.id)
      );
    }, 0);
  };

  viewDetails(tripId: string): void {
    this.router.navigate(["/trip", tripId]);
  }

  constructor(
    private cartService: CartService,
    private reservationsService: ReservationsService,
    private currencyService: CurrencyService,
    private onsiteReservationService: OnsiteReservationsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((trips) => {
      this.tripsInCart = trips;
    });
    this.selectedTrips = [...this.tripsInCart];
    this.onsiteReservationService.onsiteReservations$.subscribe(
      (onsiteReservations) => {
        this.selectedTrips = this.selectedTrips.filter((trip) =>
          onsiteReservations.includes(trip.id)
        );
      }
    );
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}