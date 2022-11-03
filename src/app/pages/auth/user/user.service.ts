import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/utility/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private config: Config) { }


  saveEmp(data): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "User/UserSaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }


  GetEmp(Isactive): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key + "&OnlyActive=" +Isactive ;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetEmpById(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "User/GetById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  DeleteEmp(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Employee/DeleteById?id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
