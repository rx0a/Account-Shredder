import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  baseUrl = 'http://localhost:8084/';
  url = this.baseUrl + 'api/sites';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Site[]> {
    return this.http.get<Site[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('SiteService.index(): Error getting index');
        return throwError(err);
      })
    );

}
}
