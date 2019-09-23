import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ISummaryEntry } from '../shared/models/summary';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private readonly _url = `${environment.O45_API}/v1/summary`;

  private _summary$ = new ReplaySubject<Array<ISummaryEntry>>(1);
 
  public get summary$(): Observable<Array<ISummaryEntry>> { return this._summary$.asObservable(); }

  constructor(private readonly _http: HttpClient) { }

  get(costkeyId: string): Observable<Array<ISummaryEntry>> {
    return this._http.get<Array<ISummaryEntry>>(`${this._url}/${costkeyId}`).pipe(tap(d => {
      console.log('service', d);
      this._summary$.next(d);
    }));
  }

  save(costkeyId: string): Observable<Array<ISummaryEntry>> {
    return this._http.post<Array<ISummaryEntry>>(`${this._url}/${costkeyId}`, null).pipe(tap(d => this._summary$.next(d)));
  }
}
