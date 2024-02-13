import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { NgbModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationSumComponent } from "./components/reservation-sum/reservation-sum.component";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { TripsService } from "./services/trips.service";
import _trips from "../assets/trips.json";
import { ITrip } from "./models/trip.model";
import { CurrencySelectorComponent } from "./components/currency-selector/currency-selector.component";
import { Auth, User } from "@angular/fire/auth";
import { UserService } from "./services/user.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    RouterLink,
    RouterLinkActive,
    ReservationSumComponent,
    AngularFirestoreModule,
    CurrencySelectorComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "tanie-zwiedzanie";
  isMenuCollapsed = true;
  user: User | null = null;
  role: string | undefined;

  populate = () => {
    _trips.forEach((trip: ITrip) => {
      this.tripsService.addTrip(trip);
    });
  };

  constructor(
    private firestore: AngularFirestore,
    private modalService: NgbModal,
    private tripsService: TripsService,
    private userService: UserService
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit(): void {
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
  }
}