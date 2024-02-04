import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ITrip, Trip } from "../models/trip.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import _trips from "../../assets/trips.json";

@Injectable({
  providedIn: "root",
})
export class TripsService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  trips$ = this.tripsSubject.asObservable();

  constructor(private store: AngularFirestore) {
    this.store
      .collection<ITrip>("trips")
      .valueChanges({ idField: "id" })
      .subscribe((trips) => {
        this.tripsSubject.next(trips.map((trip: ITrip) => new Trip(trip)));
      });
  }

  addTrip(trip: ITrip): Promise<void> {
    const tripsCollection = this.store.collection<ITrip>("trips");
    return tripsCollection.doc(trip.id).set(trip);
  }

  getTrips(): Observable<ITrip[]> {
    const tripsCollection = this.store.collection<ITrip>("trips");
    return tripsCollection.valueChanges({ idField: "id" });
  }

  getTripById(tripId: string): Observable<ITrip | undefined> {
    const tripsCollection = this.store.collection<ITrip>("trips");
    const tripDocument = tripsCollection.doc(tripId);
    return tripDocument.valueChanges({ idField: "id" });
  }

  updateTrip(trip: ITrip): Promise<void> {
    const tripsCollection = this.store.collection<ITrip>("trips");
    const tripDocument = tripsCollection.doc(trip.id);
    return tripDocument.update(trip);
  }

  deleteTrip(tripId: string): Promise<void> {
    const tripsCollection = this.store.collection<ITrip>("trips");
    const tripDocument = tripsCollection.doc(tripId);
    return tripDocument.delete();
  }
}