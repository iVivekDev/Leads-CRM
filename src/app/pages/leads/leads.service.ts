import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient, private config: Config) { }
  GetAll(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Leads/GetAll?Login_Key=" + this.config.login_Key + "&branchid=" + Id;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetNotifications(Company_Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "Leads/GetNotification?Login_Key=" + this.config.login_Key +"&Company_Id="+Company_Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
 
  saveLeads(data): Observable<any> {
    const url = this.config.APIUrl + "Leads/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  GetLeadsById(Id): Observable<any> {
    const url = this.config.APIUrl + "Leads/GetById?Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  
    DeleteById(Id): Observable<any> { 
    const url = this.config.APIUrl + "Leads/DeleteById?id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  } 

  // GetAllLeads(Id): Observable<any>{
  //   this.config.resolveLogin_KeyPromise();
  //   const url = this.config.APIUrl + "Leads/GetAll?Login_Key=" + Id + this.config.login_Key;
  //   return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  // }
  GetByType(type): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  getBranchList(): Observable<any> {
    const url = this.config.APIUrl + "Branch/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getBranchById(Id): Observable<any> { 
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Branch/GetById?Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }


  saveNotes(data): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Notes/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  getNotesList(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Notes/GetAll?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  GetNotesById(Id){
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Notes/GetById?Id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }


  getCallLog(data): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Call/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  getAllCallLog(Id): Observable<any>{
 this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Call/GetAll?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  saveEmailData(data): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Emails/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  getAllEmails(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Emails/GetAll?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  saveSmsData(data): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Sms_Details/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  getAllSms(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Sms_Details/GetAll?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  saveWhatsappMsg(data): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Whatsapp_Details/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  getAllWhatsappMsg(Id): Observable<any>{
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Whatsapp_Details/GetAll?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

}
