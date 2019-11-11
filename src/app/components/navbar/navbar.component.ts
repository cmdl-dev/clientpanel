import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _settingService: SettingsService
  ) {}

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        console.log("This person is not logged in");
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this._settingService.getSettings().allowRegistration;
  }
  onLogoutClick() {
    this._authService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = "";
    // Show message
    this._flashMessage.show("You have been successfully logged out", {
      cssClass: "alert-success",
      timeout: 4000,
    });
    this._router.navigate(["/login"]);
  }
}
