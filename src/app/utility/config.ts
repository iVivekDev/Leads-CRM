import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class Config {
  httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type": "text/json"
    })
  };
  APIUrl: string;
  login_Key: string;
  memberId: string;

  constructor(private ngxService: NgxUiLoaderService) {
    this.resolveLogin_KeyPromise();
    if (
      this.login_Key !== "" &&
      this.login_Key !== "undefined" &&
      this.login_Key !== null
    ) {
    } else {
      this.login_Key =
        JSON.parse(localStorage.getItem("userObj")) !== null
          ? JSON.parse(localStorage.getItem("userObj")).key
          : "";
    }
    this.APIUrl = environment.BaseApi;
  }

  updateGlobalKey(key) {
    this.login_Key = key;
  }
  

  onInputChange(ev, bs) {
    let newVal = ev.replace(/\D/g, '');
    if (bs && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    console.log(newVal);
    return newVal;
    // this.ngControl.valueAccessor.writeValue(newVal);
  }


  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}" + error
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
  resolveLogin_KeyPromise() {
    return new Promise<void>(resolve => {
      this.login_Key =
        JSON.parse(localStorage.getItem("userObj")) !== null
          ? JSON.parse(localStorage.getItem("userObj")).key
          : "";
      resolve();
    });
  }
  startLoader() {
    this.ngxService.start();
  }
  stopLoader() {
    this.ngxService.stopAll();
  }
}

export enum eRoleType {
  SuperAdmin = 0,
  Admin = 1,
  salesmanager = 2,
  Operations = 3,
  crewMember = 5,
  CrewForeman = 4

}
