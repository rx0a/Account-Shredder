import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private url = environment.baseUrl+ 'api/sites';

  constructor(
    private http: HttpClient
  ) { }

  public index(): Observable<Site[]> {
    return this.http.get<Site[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('SiteService.index(): Error getting index');
        return throwError(err);
      })
    );
  }
  // New additions from todo //
  public keyword(keyword: string) {
    return this.http.get<Site[]>(this.url + '/search/' + keyword)
      .pipe(
        catchError((err: any) => {
          console.log('SiteService.show(): Error keyword search ' + keyword);
          return throwError(err);
        })
      );
  }

  public show(siteId: any) {
    return this.http.get<Site>(this.url + '/' + siteId)
      .pipe(
        catchError((err: any) => {
          console.log('SiteService.show(): error retrieving todo id ' + siteId);
          return throwError(err);
        })
      );
  }

  public create(site: Site) {
    console.log(site);
    return this.http.post<Site>(this.url, site)
      .pipe(
        catchError(this.handleError)
      );
  }
  handleError(error: any) {
    console.error(error);
    return throwError(error.json().error || 'Server Error');
  }

  public destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error('SiteService.destroy(): error deleting site');
        return throwError(err);
      })
    );
  }

  public update(site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.url}`, site).pipe(
      catchError((err: any) => {
        console.error('SiteService.update(): error updating site');
        return throwError(err);
      })
    );
  }

}
