import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _settingService: SettingsService
  ) {}

  canActivate(): boolean {
    if (this._settingService.getSettings().allowRegistration) {
      return true;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
