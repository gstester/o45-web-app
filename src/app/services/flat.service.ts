import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

import { IFlat } from '../shared/models/flat.dto'; 
import { tap } from 'rxjs/operators';
import { CrudHandler } from '../shared/components/table-component-base';
import { ITenant } from '../shared/models/tenant.dto';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private readonly _url = `${environment.O45_API}/v1/flat`;

  private readonly _flats$: BehaviorSubject<Array<IFlat>> = new BehaviorSubject<Array<IFlat>>([]);

  public get flats$() { return this._flats$.asObservable(); }

  constructor(private readonly _http: HttpClient) { }

  get(): Observable<Array<IFlat>> {
    return this._http.get<Array<IFlat>>(this._url).pipe(tap(flats => this._flats$.next(flats)));
  }

  getById(id: string): Observable<IFlat> {
    return this._http.get<IFlat>(`${this._url}/${id}`);
  }

  create(tenant: IFlat): Observable<IFlat> {
    return this._http.post<IFlat>(this._url, tenant);
  }

  update(id: string, tenant: IFlat): Observable<IFlat> {
    return this._http.put<IFlat>(`${this._url}/${id}`, tenant);
  }

  addTenant(id: string, tenantId: string, flat: IFlat): Observable<IFlat> {
    return this._http.put<IFlat>(`${this._url}/${id}/tenant/${tenantId}`, flat);
  }

  removeTenant(id: string, tenantId: string) {
    return this._http.delete<IFlat>(`${this._url}/${id}/tenant/${tenantId}`);
  }

  crudHandler: CrudHandler = (savedObject: ITenant, data: IFlat) => {
    if (data) {
      this.addTenant(data.id, savedObject.id, data).subscribe();
    }
  }
}
