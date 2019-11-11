import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(["/"]);
      }
    });
  }
  async onSubmit() {
    try {
      const res = await this._authService.login(this.email, this.password);
      this._flashMessage.show("You are now Logged In", {
        cssClass: "alert-success",
      });
      this._router.navigate(["/"]);
    } catch (err) {
      console.log(err.message);
      this._flashMessage.show("Invalid Email or Password", {
        cssClass: "alert-danger",
      });
    }
  }
}
