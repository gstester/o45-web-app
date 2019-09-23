import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { IIdBaseDto } from '../models/id-base.dto';
import { CrudServiceProvider, ICrudService } from '../../services/ICrudService';
import { Subject } from 'rxjs';

export enum DialogResultType { CostKey, Tenant, Flat, Usage, Summary }


export interface IDialogResult {
  result: IIdBaseDto;
  type: DialogResultType;
  data: IIdBaseDto;
}

export type CrudHandler = (savedObject: IIdBaseDto, data: IIdBaseDto) => void;

export abstract class TableComponentBase<T extends IIdBaseDto> {
    protected _datasourceUpdated$: Subject<IIdBaseDto> = new Subject<IIdBaseDto>();
    dataSource = new MatTableDataSource<IIdBaseDto>([]);
    selection = new SelectionModel<IIdBaseDto>(false, []);

    listCount = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 50];

    private readonly _serviceProvider: CrudServiceProvider<IIdBaseDto>;

    constructor(service: ICrudService<T>, private readonly _crudHandler: CrudHandler, private readonly _component: any, public dialog: MatDialog) {
        this._serviceProvider = new CrudServiceProvider(service, this.selection, this.dataSource);
    }

    public add() {
        const cfg: MatDialogConfig = {
          height: '400px',
          width: '600px'
        };
    
        this._openCreate();
      }

    protected _init(paginator: MatPaginator) {
        this._serviceProvider.get().subscribe(length => {
            this.listCount = length;
            this.dataSource.paginator = paginator;
        });

        this.selection.changed.subscribe(v => {
            console.log(v);

            if (v.added.length) {
                this._openUpdate(v.added[0]);
            }
        });
    }

    protected _openUpdate(data: IIdBaseDto) {
        const dialogRef = this.dialog.open(this._component, { data: data });
    
        dialogRef.afterClosed().subscribe((result: IDialogResult) => {
          if (!result) return;
          console.log(result);
          //this.selection.clear()
    
          this._serviceProvider.update(result.result.id, result.result).subscribe(saved => this._handleDialogResult(saved, result.data));
          
        });
      }

      protected _openCreate() {
        const dialogRef = this.dialog.open(this._component, { data: null });
        dialogRef.afterClosed().subscribe((result: IDialogResult) => {
          if (!result) return;

          console.log(result);
          result.result.id = null;
    
          this._serviceProvider.create(result.result).subscribe(saved => {
            this._handleDialogResult(saved, result.data);
            this.listCount++
          });
        });
      }

      private _handleDialogResult(savedObject: IIdBaseDto, data: IIdBaseDto) {
        this._datasourceUpdated$.next(savedObject);
        
        if (this._crudHandler)
          this._crudHandler(savedObject, data);
      }
}