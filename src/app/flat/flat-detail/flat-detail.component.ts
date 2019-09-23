import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, startWith, tap, take, takeUntil } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ITenant } from '../../shared/models/tenant.dto';
import { FlatType } from '../../shared/models/enumeration';
import { IFlat } from '../../shared/models/flat.dto';
import { IDialogResult, DialogResultType } from '../../shared/components/table-component-base';
import { TenantService } from '../../services/tenant.service';
import { IIdBaseDto } from '../../shared/models/id-base.dto';

export interface IFlatDetailComponentData {
  tenants: Array<ITenant>;
  flat: IFlat;
}

export interface User {
  name: string;
}


@Component({
  selector: 'app-flat-detail',
  templateUrl: './flat-detail.component.html',
  styleUrls: ['./flat-detail.component.scss']
})
export class FlatDetailComponent implements OnInit, OnDestroy {
  @ViewChild('myInput') myInput: ElementRef<HTMLInputElement>;
  @ViewChild('tenantComplete') matAutocomplete2: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tenants: ITenant[] = [];
  myControl = new FormControl();
  options: ITenant[] = [];
  filteredOptions: Observable<ITenant[]>;

  detailGroup: FormGroup;

  static id: number = 0;

  flatTypes: Array<string>;

  constructor(private readonly _dialogRef: MatDialogRef<FlatDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFlat, private readonly _tenantServive: TenantService,
    private readonly _fb: FormBuilder, ) { }

  ngOnInit() {
    this._tenantServive.tenant$.pipe(takeUntil(this._destroyed$)).subscribe(t => this.options = t);

    this.tenants = this.data ? this.data.tenants : [];

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (typeof value === 'string')
            return value;
          if (value) return value.name;

          return value;
        }),
        map(name => name ? this._filterUser(name) : this.options.slice())
      );

    this.flatTypes = Object.keys(FlatType);

    this.detailGroup = this._fb.group({
      id: [this.data ? this.data.id : (++FlatDetailComponent.id).toString(), Validators.required],
      name: [this.data ? this.data.name : "", Validators.required],
      type: [this.data ? this.data.type : "", Validators.required],
      description: [this.data ? this.data.description : "", Validators.required],
      basisParts: [this.data ? this.data.basisParts : ""]
    });
  }

  private _destroyed$ = new Subject<void>();

  ngOnDestroy() {
    this._destroyed$.next();
  }

  addTenant2(event) {
    //console.log($event);
    console.log(event.value);


    if (!this.matAutocomplete2.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if (value) {
        const tenant = this.options.find(o => o.name.toLowerCase() == value.toLowerCase());

        this.tenants.push(tenant);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.myControl.setValue(null);
    }
  }

  displayFnUser(user?: ITenant): string | undefined {
    return user ? user.name : undefined;
  }

  removeTenant(tenant: ITenant): void {
    const index = this.tenants.findIndex(t => t.id === tenant.id);

    if (index >= 0) {
      this.tenants.splice(index, 1);
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log('optionSelected', event);
    this.tenants.push(event.option.value);
    this.myInput.nativeElement.value = '';
    this.myControl.setValue(null);
  }

  private _filterUser(name: string): ITenant[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  tenantCompare(a: IIdBaseDto, b: IIdBaseDto) {
    if (a && b)
      return a.id === b.id;

    return false
  }


  save() {
    const flat: IFlat = this.detailGroup.value as IFlat;

    flat.tenants = this.tenants;

    const result: IDialogResult = {
      data: null,
      type: DialogResultType.Flat,
      result: flat
    };

    this._dialogRef.close(result);
  }

  close() {
    this._dialogRef.close();
  }
}
