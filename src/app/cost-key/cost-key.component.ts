import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';

import { CostKeyService } from '../services/cost-key.service';
import { ICostKey } from '../shared/models/cost-key.dto';
import { CostKeyDetailComponent } from './cost-key-detail/cost-key-detail.component';

import { TableComponentBase } from '../shared/components/table-component-base';

@Component({
  selector: 'app-cost-key',
  templateUrl: './cost-key.component.html',
  styleUrls: ['./cost-key.component.scss']
})
export class CostKeyComponent extends TableComponentBase<ICostKey> implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'id', 'year', 'basisCostKey', 'usageCostKey']; 

  constructor(costKeyService: CostKeyService, public dialog: MatDialog) {
    super(costKeyService, null, CostKeyDetailComponent, dialog);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this._init(this.paginator);
  }
}
