import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';

import { FlatService } from '../services/flat.service';
import { TenantService } from '../services/tenant.service';

import { ITenant } from '../shared/models/tenant.dto';

import { FlatDetailComponent, IFlatDetailComponentData } from './flat-detail/flat-detail.component';
import { IFlat } from '../shared/models/flat.dto';
import { TableComponentBase } from '../shared/components/table-component-base';


@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss']
})
export class FlatComponent  extends TableComponentBase<IFlat> implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'basisParts', 'tenantCount'];

  tenants: Array<ITenant>;

  constructor(flatService: FlatService, private readonly _tenantService: TenantService, public dialog: MatDialog) {
    super(flatService, null, FlatDetailComponent, dialog);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this._tenantService.get().subscribe(ts => this.tenants = ts);

    this._init(this.paginator);
    // this.dataSource.sort = this.sort;

    // this._flatService.get().subscribe(flats => {
    //   this.dataSource.data = flats;
    //   this.listCount = flats.length;

    //   this.dataSource.paginator = this.paginator;
    // });

    // this._tenantService.get().subscribe(ts => this.tenants = ts);

    // this.selection.changed.subscribe(v => {
    //   console.log(v);

    //   if (v.added.length) {
    //     this._openUpdate(v.added[0]);
    //   }
    // });

  }

  // private _openUpdate(flat: IFlat) {
  //   const data: IFlatDetailComponentData = {
  //     flat: flat,
  //     tenants: [...this.tenants]
  //   };

  //   const dialogRef = this.dialog.open(FlatDetailComponent, { data: data });

  //   dialogRef.afterClosed().subscribe((result: IFlat) => {
  //     console.log(result);
  //     this._flatService.update(result.id, result).subscribe(t => {
  //       this.selection.clear();
  //       const idx = this.dataSource.data.findIndex(d => d.id === t.id);
  //       if (idx !== -1) {
  //         const tmp = this.dataSource.data;
  //         tmp[idx] = t;
  //         this.dataSource.data = [...tmp];
  //       }
  //     });
  //   });
  // }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // add() {
  //   const cfg: MatDialogConfig = {
  //     height: '400px',
  //     width: '600px'
  //   }

  //   this._openCreate();
  // }

  // private _openCreate() {
  //   const data: IFlatDetailComponentData = {
  //     flat: null,
  //     tenants: [...this.tenants]
  //   };
  //   const dialogRef = this.dialog.open(FlatDetailComponent, { data: data });
  //   dialogRef.afterClosed().subscribe((result: IFlat) => {
  //     console.log(result);
  //     result.id = null;
  //     this._flatService.create(result).subscribe(t => {
  //       this.selection.clear();
  //       this.dataSource.data = [...this.dataSource.data, t];

  //       this.listCount += 1;
  //     });
  //   });
  // }
}

