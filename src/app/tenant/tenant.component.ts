import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';

import { TenantService } from '../services/tenant.service';
import { FlatService } from '../services/flat.service';

import { TableComponentBase, CrudHandler } from '../shared/components/table-component-base';

import { TenantDetailComponent } from './tenant-detail/tenant-detail.component';
import { ITenant } from '../shared/models/tenant.dto'; 
import { IFlat } from '../shared/models/flat.dto';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent extends TableComponentBase<ITenant> implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'id', 'name', 'isChild', 'moveIn', 'moveOut'];

  constructor(tenantService: TenantService, private readonly _flatService: FlatService, public dialog: MatDialog) {
    super(tenantService, _flatService.crudHandler, TenantDetailComponent, dialog);
  }

  ngOnInit() {
    this._flatService.get().subscribe();

    this.dataSource.sort = this.sort;

    this._init(this.paginator);
  }

  
}
