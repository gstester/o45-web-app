import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedMaterialModule } from './shared/material.module';
import { TenantComponent } from './tenant/tenant.component';
import { FlatComponent } from './flat/flat.component';
import { UsageComponent } from './usage/usage.component';
import { CostKeyComponent } from './cost-key/cost-key.component';
import { SummaryComponent } from './summary/summary.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { TenantService } from './services/tenant.service';
import { HttpClientModule } from '@angular/common/http';
import { TenantDetailComponent } from './tenant/tenant-detail/tenant-detail.component';
import { FlatDetailComponent } from './flat/flat-detail/flat-detail.component';
import { FlatTenantTableComponent } from './flat/flat-detail/flat-tenant-table/flat-tenant-table.component';
import { FlatService } from './services/flat.service';
import { CostKeyDetailComponent } from './cost-key/cost-key-detail/cost-key-detail.component';
import { UsageDetailComponent } from './usage/usage-detail/usage-detail.component';
import { FlatAssignmentComponent } from './tenant/tenant-detail/flat-assignment/flat-assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    TenantComponent,
    FlatComponent,
    UsageComponent,
    CostKeyComponent,
    SummaryComponent,
    WellcomeComponent,
    TenantDetailComponent,
    FlatDetailComponent,
    FlatTenantTableComponent,
    CostKeyDetailComponent,
    UsageDetailComponent,
    FlatAssignmentComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    SharedMaterialModule
  ],
  providers: [TenantService, FlatService],
  bootstrap: [AppComponent],
  entryComponents: [TenantDetailComponent, FlatDetailComponent, CostKeyDetailComponent, UsageDetailComponent]
})
export class AppModule { }
