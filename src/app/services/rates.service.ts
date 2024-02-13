import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ITrip } from "../models/trip.model";
import { Rating } from "../models/rate.model";
import firebase from "firebase/compat/app"; // Dodaj import firebase

@Injectable({
  providedIn: "root",
})
export class RatesService {
  constructor(private firestore: AngularFirestore) {}

  getUserRate(userEmail: string, tripId: string): Observable<Rating | undefined> {
    return this.firestore
      .collection<ITrip>("trips")
      .doc(tripId)
      .collection<Rating>("rates")
      .doc(userEmail)
      .valueChanges();
  }

  setUserRate(userEmail: string, tripId: string, rating: number): Promise<void> {
    const rateRef = this.firestore
      .collection<ITrip>("trips")
      .doc(tripId)
      .collection<Rating>("rates")
      .doc(userEmail);

    return rateRef.set({ userId: userEmail, rate: rating });
  }

  getTripRates(tripId: string): Observable<Rating[]> {
    return this.firestore
      .collection<ITrip>("trips")
      .doc(tripId)
      .collection<Rating>("rates")
      .valueChanges();
  }
}
