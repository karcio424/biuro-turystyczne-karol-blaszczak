import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TripsService } from "../../services/trips.service";
import { Trip } from "../../models/trip.model";
import { CommonModule, DatePipe } from "@angular/common";
import { CurrencyPipe } from "../../pipes/currency.pipe";
import { CurrencyService } from "../../services/currency.service";
import { OnsiteReservationComponent } from "../onsite-reservation.component";
import { TripRateComponent } from "../trip-rate/trip-rate.component";
import { GoBackComponent } from "../go-back/go-back.component";
import { UserService } from "../../services/user.service";
import { User } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-trip-detail",
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    OnsiteReservationComponent,
    TripRateComponent,
    GoBackComponent,
  ],
  templateUrl: "./trip-detail.component.html",
  styleUrl: "./trip-detail.component.css",
})
export class TripDetailComponent implements OnInit {
  user: User | null = null;
  tripId: string = "";
  trip: Trip | undefined;
  currency = "PLN";
  role: string | undefined;

  deleteTrip = (): void => {
    if (this.trip) this.tripService.deleteTrip(this.trip.id);
  };

  updateTrip = (): void => {
    if (this.trip) this.router.navigate(["/trip", this.trip.id, "update"]);
  };

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private tripService: TripsService,
    private currencyService: CurrencyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tripId = params.get("id");
      this.tripId = tripId ? tripId : "null id/contact administratos";
      if (!tripId) {
        this.trip = undefined;
        return;
      }
      this.tripService.getTripById(tripId).subscribe((trip) => {
        this.trip = trip ? new Trip(trip) : undefined;
      });
      this.currencyService.currency$.subscribe((currency) => {
        this.currency = currency;
      });
      this.userService.user$.subscribe((user) => {
        this.user = user;
        if (user) {
          this.firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .subscribe((doc) => {
              if (doc.exists) {
                this.role = (doc.data() as any)?.role;
              }
            });
        }
      });
    });
  }
}