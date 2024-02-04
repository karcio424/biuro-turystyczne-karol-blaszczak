import { Routes } from "@angular/router";
import { TripsComponent } from "./components/trips/trips.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { AddTripFormComponent } from "./components/trips/add-trip-form/add-trip-form.component";
import { TripCartComponent } from "./components/onsite-reservation/trip-cart/trip-cart.component";
import { TripDetailComponent } from "./components/trips/trip-detail/trip-detail.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { LogoutComponent } from "./components/auth/logout/logout.component";
import { authGuard } from "./guards/auth.guard";
import { PurchaseHistoryComponent } from "./components/onsite-reservation/purchase-history/purchase-history.component";
import { UpdateTripFormComponent } from "./components/trips/update-trip-form/update-trip-form.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "trip", component: TripsComponent },
  { path: "cart", component: TripCartComponent },
  {
    path: "trip/add",
    component: AddTripFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "trip/bought",
    component: PurchaseHistoryComponent,
    canActivate: [authGuard],
  },
  { path: "trip/:id", component: TripDetailComponent },
  {
    path: "trip/:id/update",
    component: UpdateTripFormComponent,
    canActivate: [authGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent, canActivate: [authGuard] },
];