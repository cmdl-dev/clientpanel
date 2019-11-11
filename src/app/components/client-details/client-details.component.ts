import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get("id");
    //Get client
    this._clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      console.log(this.client);
    });
  }
  updateBalance() {
    this._clientService.updateClient(this.client);
    this._flashMessage.show("Balance Updated", {
      cssClass: "alert-success",
      timeout: 4000,
    });
  }
  onDeleteClick() {
    if (confirm("Are you sure?")) {
      this._clientService.deleteClient(this.client);

      this._flashMessage.show("Client Removed", {
        cssClass: "alert-success",
        timeout: 4000,
      });
      this._router.navigate(["/"]);
    }
  }
}
