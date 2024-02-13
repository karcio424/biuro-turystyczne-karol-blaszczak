import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user$: Observable<any> = this.auth.authState;

  constructor(
    private router: Router, 
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public async register(email: string, password: string, role: string): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const user = credential.user;
        if (user) {
          return user.updateProfile({
            displayName: role,
          }).then(() => {
            return this.firestore.collection('users').doc(user.uid).set({
              role: role
            });
          }).then(() => {
            this.router.navigate(["/login"]);
          });
        } else {
          throw new Error("User is null");
        }
      });
  }

  public async login(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(["/"]);
    });
  }

  public logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.firestore.collection<User>("users").valueChanges();
  }

  banUser(userId: string): Promise<void> {
    // Tutaj możesz dodać kod do zbanowania użytkownika
    // Na przykład, możesz ustawić flagę w dokumencie użytkownika w Firestore
    return this.firestore.collection("users").doc(userId).update({ banned: true });
  }
  unbanUser(userId: string): Promise<void> {
    // Tutaj możesz dodać kod do zbanowania użytkownika
    // Na przykład, możesz ustawić flagę w dokumencie użytkownika w Firestore
    return this.firestore.collection("users").doc(userId).update({ banned: false });
  }
  isBanned(user: User): boolean {
    // Tutaj możemy sprawdzić, czy użytkownik jest zbanowany
    return user.banned === true;
  }
}
