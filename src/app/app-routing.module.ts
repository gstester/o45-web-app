import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { TenantComponent } from './tenant/tenant.component';
import { FlatComponent } from './flat/flat.component';
import { CostKeyComponent } from './cost-key/cost-key.component';
import { UsageComponent } from './usage/usage.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path: '', component: WellcomeComponent },
  {path: 'tenant', component: TenantComponent },
  {path: 'flat', component: FlatComponent },
  {path: 'costkey', component: CostKeyComponent },
  {path: 'usage', component: UsageComponent },
  {path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
