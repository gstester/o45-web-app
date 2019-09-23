import { Component } from '@angular/core';
import { ViewType } from './shared/models/enumerations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'o45-web';

  tenant = ViewType.Tenant;
  flat = ViewType.Flat;
  usage = ViewType.Usage;
  costKey = ViewType.CostKey;
  summary = ViewType.Summary;

  constructor(private readonly _router: Router) {}

  navigate(target: ViewType) {
    this._router.navigateByUrl(`${target.toLowerCase()}`);
  }
}
