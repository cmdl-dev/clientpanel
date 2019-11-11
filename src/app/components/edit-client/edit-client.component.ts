import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;
  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService,
    private _settingService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit = this._settingService.getSettings().disableBalanceOnEdit;
    this.id = this._route.snapshot.paramMap.get("id");
    //Get client
    this._clientService
      .getClient(this.id)
      .subscribe(client => (this.client = client));
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this._flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    } else {
      // add id to client
      value.id = this.id;
      // Update the clientt
      this._clientService.updateClient(value);
      this._flashMessage.show("Client Updated", {
        cssClass: "alert-success",
        timeout: 4000,
      });
      this._router.navigate(["/client/" + this.id]);
    }
  }
}
