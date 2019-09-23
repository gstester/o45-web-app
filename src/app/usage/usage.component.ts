import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatSelectChange } from '@angular/material';

import { UsageService } from '../services/usage.service';


import { TableComponentBase, CrudHandler } from '../shared/components/table-component-base';
import { IUsage } from '../shared/models/usage.dto';
import { UsageDetailComponent } from './usage-detail/usage-detail.component';
import { FlatService } from '../services/flat.service';
import { CostKeyService } from '../services/cost-key.service';
import { distinct, switchMap, concatAll, takeUntil, map } from 'rxjs/operators';
import { IIdBaseDto } from '../shared/models/id-base.dto';
import { of, from, merge, concat, Subject } from 'rxjs';


@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent extends TableComponentBase<IUsage> implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'id', 'year', 'flatName', 'heating', 'water'];

  pageSize = 25;

  years: Array<number> = [];
  year: number;

  private _destroy$ = new Subject<void>();

  constructor(private readonly _service: UsageService, private readonly _flatService: FlatService, private readonly _costKeyService: CostKeyService, public dialog: MatDialog) {
    super(_service, null, UsageDetailComponent, dialog);
  }

  ngOnInit() {
    this._costKeyService.costKeys$.pipe(takeUntil(this._destroy$), map(keys => keys.map(k => k.year))).subscribe(years => this.years = years);

    this._costKeyService.get().subscribe();
    this._flatService.get().subscribe();

    this._datasourceUpdated$.pipe(takeUntil(this._destroy$)).subscribe((u: IUsage) => this._createYears(this.dataSource.data as Array<IUsage>))

    //this._service.get().subscribe(usages => this._createYears(usages));
     
    
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this._filter;

    this._init(this.paginator);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  yearChange($event: MatSelectChange) {
    this.dataSource.filter = $event.value.toString();
  }

  private _filter(data: IIdBaseDto, filter: string): boolean {
    if (!filter || filter == '')
      return false;
    
    return (data as IUsage).costKey.year === Number(filter);
  }

  private _createYears(usages: Array<IUsage>) {
    from(usages).pipe(distinct((u: IUsage) => u.costKey.year)).subscribe(u => this.years.push(u.costKey.year));
  }
}

