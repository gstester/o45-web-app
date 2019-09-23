import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FlatType } from '../../shared/models/enumeration';
import { IUsage } from '../../shared/models/usage.dto';
import { FlatService } from '../../services/flat.service';
import { CostKeyService } from '../../services/cost-key.service';
import { ICostKey } from '../../shared/models/cost-key.dto';
import { IFlat } from '../../shared/models/flat.dto';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IIdBaseDto } from '../../shared/models/id-base.dto';
import { IDialogResult, DialogResultType } from '../../shared/components/table-component-base';



@Component({
  selector: 'app-usage-detail',
  templateUrl: './usage-detail.component.html',
  styleUrls: ['./usage-detail.component.scss']
})
export class UsageDetailComponent implements OnInit, OnDestroy {
  detailGroup: FormGroup;

  static id: number = 0;

  costKeys: Array<ICostKey>;
  flats: Array<IFlat>;
  private _destoyed$: Subject<void> = new Subject<void>();


  constructor(private readonly _dialogRef: MatDialogRef<UsageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUsage,
    private readonly _fb: FormBuilder, 
    private readonly _costKeyService: CostKeyService, private readonly _flatService: FlatService) { }

  ngOnInit() {
    this._costKeyService.costKeys$.pipe(takeUntil(this._destoyed$)).subscribe(costKeys => this.costKeys = costKeys);
    this._flatService.flats$.pipe(takeUntil(this._destoyed$)).subscribe(flats => this.flats = flats);

    this.detailGroup = this._fb.group({
      id: [this.data ? this.data.id : (++UsageDetailComponent.id).toString(), Validators.required],
      heating: [this.data ? this.data.heating : 0, Validators.required],
      water: [this.data ? this.data.water : 0, Validators.required],
      flat: [this.data ? this.data.flat : '', Validators.required],
     costKey: [this.data ? this.data.costKey : '', Validators.required]
    });
  }

  ngOnDestroy() {
    this._destoyed$.next();
  }

  compare(a: IIdBaseDto, b: IIdBaseDto): boolean {
    return a.id === b.id;
  }


  // _createUpfrontPaymentGroup(upfrontPayment: IUpfrontPayment): FormGroup {
  //   return this._fb.group({
  //     type: [upfrontPayment.type, Validators.required],
  //     basis: [upfrontPayment.basis, Validators.required],
  //     usage: [upfrontPayment.usage, Validators.required]
  //   });
  // }

  add() {
    const usage: IUsage = this.detailGroup.value as IUsage;

    usage.costKeyId = usage.costKey.id;
    usage.flatId = usage.flat.id;

    const result: IDialogResult = {
      data: null,
      type: DialogResultType.Usage,
      result: usage
    };

    this._dialogRef.close(result);
  }

  close() {
    this._dialogRef.close();
  }

  // _createEmptyUpfrontPayments(): Array<IUpfrontPayment> {
  //   return Object.keys(FlatType).map(k => {
  //     const r: IUpfrontPayment = {
  //       type: FlatType[k],
  //       basis: 0,
  //       usage: 0
  //     };
  //     return r;
  //   });
  // }
}


