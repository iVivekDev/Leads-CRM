import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';
import Swal from "sweetalert2";
import { LoginService } from '../login.service';
//import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPwdFrm: FormGroup;
  showModal: boolean;
  message: any;
  user_Id: any;
  code: any;
  constructor(
    private api: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.user_Id = params['user_Id'];
      this.code = params['code'];
      
    this.user_Id = this.route.snapshot.queryParamMap.get("user_Id");
    this.code = this.route.snapshot.queryParamMap.get("code");
  });

    this.resetPwdFrm = this.fb.group({
      password: [""],
      confirmPassword: [""],
      user_Id:parseInt( this.user_Id),
      old_Password: this.code,
      email: [""]
    });

  }

  ngOnInit() {
     console.log("User_Id=> " + this.user_Id);
     console.log("Code=> " + this.code);
  }
  resetPwd() {
    if (this.resetPwdFrm.value.password == "" || this.resetPwdFrm.value.password == null || this.resetPwdFrm.value.password == undefined) {
      Swal.fire("Oops...", "Please enter Password!", "error");
    }
    else
    if (this.resetPwdFrm.value.confirmPassword == "" || this.resetPwdFrm.value.confirmPassword == null || this.resetPwdFrm.value.confirmPassword == undefined) {
      Swal.fire("Oops...", "Please enter Confirm Password!", "error");
    }
    else
      if (this.resetPwdFrm.value.password !== this.resetPwdFrm.value.confirmPassword) {
        Swal.fire("Oops...", "Confirm Password not matched!", "error");
      }
      else {
        //if (this.resetPwdFrm.value.email_Address.length > 3) {
          this.config.startLoader();
        this.api.resetPassword(this.resetPwdFrm.value).subscribe(res => {
          if (res.status == 1) {
            //this.showModal = true;
            this.message = res.message;
            console.log("res==> "+res);
            Swal.fire("Success", res.message, "success");
            this.config.stopLoader();
            this.router.navigateByUrl("/login");
          } else {
            this.config.stopLoader();
            Swal.fire("Oops...", res.message, "error");
          }
        });
        //}
      }
  }
  // cancelAction() {
  //   this.showModal = false;
  //   this.router.navigateByUrl('/login');
  // }
}
