import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ICostKey } from '../../shared/models/cost-key.dto';
import { IUpfrontPayment } from '../../shared/models/upfront-payment.dto';
import { FlatType } from '../../shared/models/enumeration';
import { IDialogResult, DialogResultType } from '../../shared/components/table-component-base';


@Component({
  selector: 'app-cost-key-detail',
  templateUrl: './cost-key-detail.component.html',
  styleUrls: ['./cost-key-detail.component.scss']
})
export class CostKeyDetailComponent implements OnInit {
  detailGroup: FormGroup;

  readonly flatTypes: Array<string>
 
  static id: number = 0;

  constructor(private readonly _dialogRef: MatDialogRef<CostKeyDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICostKey,
    private readonly _fb: FormBuilder, ) {
      this.flatTypes = Object.keys(FlatType).map(k => FlatType[k]);
    }

  ngOnInit() {
    const upfrontPayments = this.data ? this.data.upfrontPayments : this._createEmptyUpfrontPayments();

    const upfrontPaymentGroups = upfrontPayments.map(u => this._createUpfrontPaymentGroup(u));
    this.detailGroup = this._fb.group({
      id: [this.data ? this.data.id : (++CostKeyDetailComponent.id).toString(), Validators.required],
      year: [this.data ? this.data.year : "", Validators.required],
      from: [this.data ? this.data.from : null, Validators.required],
      to: [this.data ? this.data.to : null, Validators.required],
      heatingBasisCostKey: [this.data ? this.data.heatingBasisCostKey : 0, Validators.required],
      heatingUsageCostKey: [this.data ? this.data.heatingUsageCostKey : 0, Validators.required],
      waterBasisCostKey: [this.data ? this.data.waterBasisCostKey : 0, Validators.required],
      waterUsageCostKey: [this.data ? this.data.waterUsageCostKey : 0, Validators.required],
      upfrontPayments: this._fb.array(upfrontPaymentGroups)
    });
  }

  _createUpfrontPaymentGroup(upfrontPayment: IUpfrontPayment): FormGroup {
    return this._fb.group({
      type: [upfrontPayment.type, Validators.required],
      basis: [upfrontPayment.basis, Validators.required],
      usage: [upfrontPayment.usage, Validators.required]
    });
  }

  add() {
    const costKey: ICostKey = this.detailGroup.value as ICostKey;

    const result: IDialogResult = {
      data: null,
      type: DialogResultType.CostKey,
      result: costKey
    };

    this._dialogRef.close(result);
  }

  close() {
    this._dialogRef.close();
  }

  _createEmptyUpfrontPayments(): Array<IUpfrontPayment> {
    return Object.keys(FlatType).map(k => {
      const r: IUpfrontPayment = {
        type: FlatType[k],
        basis: 0,
        usage: 0
      };
      return r;
    });
  }
}

