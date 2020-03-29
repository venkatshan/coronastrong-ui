import { Injectable } from '@angular/core';
import {environment as env} from  '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoronaCountServicesService {
  constructor(private httpClient: HttpClient) { }

  public getCount(url: string): Observable<any> {
    return this.httpClient.get( url ).pipe(
      map((res) =>  {
        const body = res;
        // console.log( body );
        return body || '';
      }));
  }

  public getClusterHistoryCount(url: string, historyName: string): Observable<any> {
    return this.httpClient.get(url + historyName ).pipe(
      map((res) =>  {
        const body = res;
        // console.log( body );
        return body || '';
      }));
  }

}
