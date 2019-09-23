import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITenant } from '../../shared/models/tenant.dto';
import { FlatService } from '../../services/flat.service';
import { IFlat } from '../../shared/models/flat.dto';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IDialogResult, DialogResultType } from '../../shared/components/table-component-base';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit, OnDestroy {
  detailGroup: FormGroup;

  private _destroy$ = new Subject<void>();
  tenantId: string;
  flats: Array<IFlat>;

  selectedFlat: IFlat;
 
  static id: number = 0;

  constructor(private readonly _dialogRef: MatDialogRef<TenantDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITenant,
    private readonly _fb: FormBuilder, private readonly _flatService: FlatService) { }

  ngOnInit() {
    this.tenantId = this.data ? this.data.id : (++TenantDetailComponent.id).toString();

    this.detailGroup = this._fb.group({
      id: [this.tenantId, Validators.required],
      name: [this.data ? this.data.name : '', Validators.required],
      isChild: [this.data ? this.data.isChild : false],
      moveIn: [this.data ? this.data.moveIn : null, Validators.required],
      moveOut: [this.data ? this.data.moveOut : null]
    });

    this._flatService.flats$.pipe(takeUntil(this._destroy$)).subscribe(flats => {
      this.flats = flats;
      this.selectedFlat = flats.find(f => f.tenants.some(t => t.id === this.tenantId));
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  add() {
    const tenant: ITenant = this.detailGroup.value as ITenant;

    const result: IDialogResult = {
      data: this.selectedFlat,
      type: DialogResultType.Tenant,
      result: tenant
    };

    this._dialogRef.close(result);
  }

  close() {
    this._dialogRef.close();
  }

  onFlatChange(flat: IFlat) {
    this.selectedFlat = flat;
  }
}
