import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
  };

  disableBalanceOnAdd: boolean;

  @ViewChild("clientForm", { static: false }) form: any;
  constructor(
    private _flashMessage: FlashMessagesService,
    private _clientService: ClientService,
    private _router: Router,
    private _settingService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this._settingService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this._flashMessage.show("Please Fill out the form correctly", {
        cssClass: "alert-danger",
        timeoute: 4000,
      });
    } else {
      // Add new Client
      this._clientService.newClient(value);
      // Show Messages
      this._flashMessage.show("New Client Added", {
        cssClass: "alert-success",
        timeoute: 4000,
      });
      // Redirect to dashboard
      this._router.navigate(["/"]);
    }
    console.log(value, valid);
  }
}
