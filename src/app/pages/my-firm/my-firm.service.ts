import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../utility/config';
import { Observable } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MyFirmService {

  constructor(private http: HttpClient, private config: Config) { }
  
  getFirmList(): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetClientList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  FirmAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Myfirm/ClientSaveUpdate?Login_Key=" + this.config.login_Key;
    console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetFirmById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetClientsById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteFirm(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/DeleteById" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getBankList(Company_Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetBankList?Company_Id=" + Company_Id + "&Login_Key="+ this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  BankAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Myfirm/BankSaveUpdate?Login_Key=" + this.config.login_Key;
    console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetBankTopOne(): Observable<any> { //Added by Akshay, as it was hard coded
    const url = this.config.APIUrl + "Myfirm/GetBankTopOne?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetBankById(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/GetBankById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteBank(Id): Observable<any> {
    const url = this.config.APIUrl + "Myfirm/DeleteBankById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }


  // Branch Data
  getBranchList(): Observable<any> {
    const url = this.config.APIUrl + "Branch/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  BranchAddUpdate(data): Observable<any> {
    const url = this.config.APIUrl + "Branch/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url,data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetBranchById(Id): Observable<any> {
    const url = this.config.APIUrl + "Branch/GetById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  
  DeleteBranch(Id): Observable<any> {
    const url = this.config.APIUrl + "Branch/DeleteById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  
}
