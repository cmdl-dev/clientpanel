import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";

import { Settings } from "../../models/Settings";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private _flashMessage: FlashMessagesService,
    private _router: Router,
    private _settingService: SettingsService
  ) {}

  ngOnInit() {
    this.settings = this._settingService.getSettings();
  }
  onSubmit() {
    this._settingService.changeSettings(this.settings);
    this._flashMessage.show("Settings Saved", {
      cssClass: "alert-success",
      timeout: 4000,
    });
  }
}
