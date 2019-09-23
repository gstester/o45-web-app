import { Observable } from 'rxjs';
import { IIdBaseDto } from '../shared/models/id-base.dto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

export interface ICrudServiceBase {
  get(): Observable<Array<any>>;

  getById(id: string): Observable<any>;

  create(data: any): Observable<any>;

  update(id: string, data: any): Observable<any>
}

export interface ICrudService<T extends IIdBaseDto> {
  get(): Observable<Array<T>>;

  getById(id: string): Observable<T>;

  create(data: T): Observable<T>;

  update(id: string, data: T): Observable<T>
}

export class CrudServiceProvider<T extends IIdBaseDto> {
  constructor(private readonly _service: ICrudService<T>, private readonly _selection: SelectionModel<T>, private readonly _dataSource: MatTableDataSource<IIdBaseDto>) { }

  public get(): Observable<number> {
    return this._service.get().pipe(map(data => {
      this._dataSource.data = data;
      return data.length;
    }));
  }

  public create(data: T): Observable<T> {
    data.id = null;

    return this._service.create(data).pipe(
      map(t => {
        this._selection.clear();
        this._dataSource.data = [...this._dataSource.data, t];

        return t;
      })
    );
  }

  public update(id: string, data: T): Observable<T> {
    return this._service.update(id, data).pipe(map(t => {
      this._selection.clear();

      const idx = this._dataSource.data.findIndex(d => d.id === t.id);

      if (idx !== -1) {
        const tmp = this._dataSource.data;
        tmp[idx] = t;
        this._dataSource.data = [...tmp];
      }

      return data;
    }));
  }
}