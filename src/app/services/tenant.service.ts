import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

import { ITenant } from '../shared/models/tenant.dto';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly _url = `${environment.O45_API}/v1/tenant`;

  private readonly _tenant$: BehaviorSubject<Array<ITenant>> = new BehaviorSubject<Array<ITenant>>([]);

  public get tenant$() { return this._tenant$.asObservable(); }

  constructor(private readonly _http: HttpClient) { }

  get(): Observable<Array<ITenant>> {
    return this._http.get<Array<ITenant>>(this._url).pipe(tap(tenants => this._tenant$.next(tenants)));
  }

  getById(id: string): Observable<ITenant> {
    return this._http.get<ITenant>(`${this._url}/${id}`);
  }

  create(tenant: ITenant): Observable<ITenant> {
    return this._http.post<ITenant>(this._url, tenant);
  }

  update(id: string, tenant: ITenant): Observable<ITenant> {
    return this._http.put<ITenant>(`${this._url}/${id}`, tenant);
  }
}
