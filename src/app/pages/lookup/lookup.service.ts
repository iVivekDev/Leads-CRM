import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  constructor(private http: HttpClient, private config: Config) { }
  GetAll(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "Lookup/GetAll?Login_Key=" + this.config.login_Key ;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
 
  saveLookup(data): Observable<any> {
    const url = this.config.APIUrl + "Lookup/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetLookupById(Id): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetByLookupId?Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  DeleteById(Id): Observable<any> { 
    const url = this.config.APIUrl + "Lookup/DeleteById?id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  } 
  
}
