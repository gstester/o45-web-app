import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostKeyService } from '../services/cost-key.service';
import { SummaryService } from '../services/summary.service';
import { ICostKey } from '../shared/models/cost-key.dto';
import { BehaviorSubject, Subject } from 'rxjs';
import { ISummaryEntry } from '../shared/models/summary';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  costKeys: Array<ICostKey>;

  public get summary$() { return this._summaryService.summary$; }

  private _destroy$ = new Subject<void>();

  total: number = 0;
  totalDifference: number = 0;
  totalUpfront: number = 0;
  totalHeating: number = 0;
  totalWater: number = 0;

  summary: any;

  constructor(private readonly _costKeyService: CostKeyService, private readonly _summaryService: SummaryService) { }

  ngOnInit() {
    this._costKeyService.get().subscribe(costKeys => this.costKeys = costKeys);

    this._summaryService.summary$.pipe(takeUntil(this._destroy$)).subscribe(summaries => {
      const allUpfront = summaries.reduce((acc, cur) => {
        acc.total += cur.SummeGesamt;
        acc.totalDifference += cur.Differenz;
        acc.totalUpfront += cur.SummeGezahlt;
        acc.water += cur.SummeWasser;
        acc.heating += cur.SummeHeizung;
        return acc;
      }, {total: 0, totalDifference: 0, totalUpfront: 0, water: 0, heating: 0});
        
      this.total = allUpfront.total;
      this.totalDifference = allUpfront.totalDifference;
      this.totalUpfront = allUpfront.totalUpfront;
      this.totalHeating = allUpfront.heating;
      this.totalWater = allUpfront.water;
      // summaries.forEach(s => {
      //   this.total += s.SummeGesamt;
      //   this.totalDifference += s.Differenz;
      //   this.totalUpfront += s.GrundkostenGezahlt;
      // });
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  public calculate(costKey: ICostKey) {
    this._summaryService.get(costKey.id).subscribe();
  }

  public print(costKey: ICostKey) {
    this._summaryService.save(costKey.id).subscribe(s => console.log('Printed'));
  }
}
