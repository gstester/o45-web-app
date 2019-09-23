import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUsage } from '../shared/models/usage.dto';

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  private readonly _url = `${environment.O45_API}/v1/usage`;

  constructor(private readonly _http: HttpClient) { }

  get(): Observable<Array<IUsage>> {
    return this._http.get<Array<IUsage>>(this._url);
  }

  getById(id: string): Observable<IUsage> {
    return this._http.get<IUsage>(`${this._url}/${id}`);
  }

  create(tenant: IUsage): Observable<IUsage> {
    return this._http.post<IUsage>(this._url, tenant);
  }

  update(id: string, tenant: IUsage): Observable<IUsage> {
    return this._http.put<IUsage>(`${this._url}/${id}`, tenant);
  }
}
