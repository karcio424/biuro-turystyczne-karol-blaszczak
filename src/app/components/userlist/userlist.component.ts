import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"]
})
export class UserlistComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  banUser(userId: string): void {
    this.userService.banUser(userId).then(() => {
      console.log("User banned successfully!");
      // Możesz dodać powiadomienie lub odświeżyć listę użytkowników
      this.loadUsers();
    }).catch(error => {
      console.error("Error banning user:", error);
      // Obsłużenie błędu
    });
  }

  unbanUser(userId: string): void {
    this.userService.unbanUser(userId).then(() => {
      console.log("User unbanned successfully!");
      // Możesz dodać powiadomienie lub odświeżyć listę użytkowników
      this.loadUsers();
    }).catch(error => {
      console.error("Error unbanning user:", error);
      // Obsłużenie błędu
    });
  }

  isBanned(user: User): boolean {
    // Tutaj możemy sprawdzić, czy użytkownik jest zbanowany
    return user.banned === true;
  }
}
