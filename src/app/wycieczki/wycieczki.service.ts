// wycieczki.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WycieczkiService {
  private apiUrl = 'http://localhost:4200/'; // Replace with your actual API endpoint
  private wycieczkiSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Dostosuj typ zgodnie z potrzebami
  public wycieczki$: Observable<any[]> = this.wycieczkiSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Example method to get trips
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wycieczki`);
  }

  // Example method to add a new trip
  addTrip(newTrip: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wycieczki`, newTrip);
  }

  // Example method to delete a trip
  deleteTrip(tripId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wycieczki/${tripId}`);
  }

  // Example method to update a trip
  updateTrip(tripId: string, updatedTrip: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/wycieczki/${tripId}`, updatedTrip);
  }

  // Add more methods as needed based on your application requirements
}
