import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) {}

  ngOnInit() {}
  async onSubmit() {
    try {
      const res = await this._authService.register(this.email, this.password);
      this._flashMessage.show("You are now Registered and logged in", {
        cssClass: "alert-success",
        timeout: 4000,
      });
      this._router.navigate(["/"]);
    } catch (err) {
      console.log(err.messages);
      this._flashMessage.show("There is an error with creating your account", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    }
  }
}
