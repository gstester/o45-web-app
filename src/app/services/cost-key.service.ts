import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ICostKey } from '../shared/models/cost-key.dto';
import { ICrudService } from './ICrudService';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CostKeyService implements ICrudService<ICostKey> {
  private readonly _url = `${environment.O45_API}/v1/costkey`;

  private readonly _costKeys$: BehaviorSubject<Array<ICostKey>> = new BehaviorSubject<Array<ICostKey>>([]);

  public get costKeys$() { return this._costKeys$.asObservable(); }

  constructor(private readonly _http: HttpClient) { }

  get(): Observable<Array<ICostKey>> {
    return this._http.get<Array<ICostKey>>(this._url).pipe(tap(costKeys => this._costKeys$.next(costKeys)));
  }

  getById(id: string): Observable<ICostKey> {
    return this._http.get<ICostKey>(`${this._url}/${id}`);
  }

  create(tenant: ICostKey): Observable<ICostKey> {
    return this._http.post<ICostKey>(this._url, tenant);
  }

  update(id: string, tenant: ICostKey): Observable<ICostKey> {
    return this._http.put<ICostKey>(`${this._url}/${id}`, tenant);
  }
}
