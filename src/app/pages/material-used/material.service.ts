import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient, private config: Config) { }

  GetAll(Id): Observable<any> {
    const url =
      this.config.APIUrl + "Material/GetAll?Login_Key=" + this.config.login_Key + "&branchid=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  savematerials(data): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Material/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetMaterialsById(Id): Observable<any> {
    const url = this.config.APIUrl + "Material/GetById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteById(Id): Observable<any> {
    const url = this.config.APIUrl + "Material/DeleteById?id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
