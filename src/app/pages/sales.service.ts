import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private config: Config) { }

 
  SaveSales(data): Observable<any> {
    const url = this.config.APIUrl + "Sales/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  GetAllSales(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Sales/GetAll?Login_Key=" + this.config.login_Key + "&branchid=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 

  GetSalesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Sales/GetById?Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  DeleteSalesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Sales/DeleteById?id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }


}
