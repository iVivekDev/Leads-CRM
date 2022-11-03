import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { LeadsService } from "../../leads/leads.service";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  message: string;
  name: string;
  password: string;
  LoginMessage: string;
  IsUsersList: boolean = true;
  IsUsersForm: boolean = false;
  loginForm: FormGroup;
  forgotForm: FormGroup;
  showModal: boolean;
  BranchList: any;
  Branch_Id: any;
  Id: any;
  role_Id: any;
  userObj: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: LoginService,
    private config: Config,
    private LeadsApi: LeadsService,
    private toastr: ToastrService,
    private Route: ActivatedRoute,

  ) {
    this.loginForm = this.fb.group({
      email: [""],
      password: [""],
    });
    this.forgotForm = this.fb.group({
      email: [""],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem("userObj");
    this.LoginMessage = localStorage.getItem("LoginMessage");
    localStorage.setItem("LoginMessage", "");
 
    this.getBranchList();
    // if(this.userObj == ''){
    //   this.Branch_Id = null
    // }else{
    // this.userObj = JSON.parse(localStorage.getItem("userObj"));
    //   this.Branch_Id = this.userObj.userInfo.branch_Id;
    //   this.getBranchName(this.Branch_Id);
    // }
  }
  Openform() {
    this.IsUsersList = false;
    this.IsUsersForm = true;
  }
  back() {
    this.IsUsersList = true;
    this.IsUsersForm = false;
  }

  Send() {}

  sign(Id) {

    if (
      this.loginForm.value.email == "" ||
      this.loginForm.value.email == null ||
      this.loginForm.value.email == undefined
    ) {
      this.toastr.warning("Please enter Email", "", {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-right",
        toastClass: "alert alert-warning alert-with-icon",
      });
    } else if (
      this.loginForm.value.password == "" ||
      this.loginForm.value.password == null ||
      this.loginForm.value.password == undefined
    ) {
      this.toastr.warning("Please enter Password", "", {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-right",
        toastClass: "alert alert-warning alert-with-icon",
      });
    } else {
      this.api.login(this.loginForm.value).subscribe((res) => {
        if (res.status == 1) {
          localStorage.setItem("userObj", JSON.stringify(res));
          this.config.updateGlobalKey(res.key);
           
          this.toastr.success(res.message, "", {
            timeOut: 2000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.role_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.role_Id;
          if( this.role_Id == 0){
            this.router.navigateByUrl("/Info");
          }else{
            this.router.navigateByUrl("/dashboard");
          }  
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }

  forgotPwd() {
    if (
      this.forgotForm.value.email == "" ||
      this.forgotForm.value.email == null ||
      this.forgotForm.value.email == undefined
    ) {
      Swal.fire("Oops...", "Please enter Email Address!", "error");
    } else {
      if (this.forgotForm.value.email.length > 3) {
        this.config.startLoader();
        this.api.forgot(this.forgotForm.value.email).subscribe((res) => {
          if (res.status == 1) {
            this.showModal = true;
            this.message = res.message;
            Swal.fire("Please check Your Email");
            this.config.stopLoader();
          } else {
            this.config.stopLoader();
            Swal.fire("Oops...", res.message, "error");
          }
        });
      }
    }
  }
  cancelAction() {
    this.showModal = false;
    this.router.navigateByUrl("/login");
  }

  getBranchList() {
    this.LeadsApi.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
      // this.Branch_Id = res.branch.branch_Id;
      this.config.stopLoader();
      console.log("BranchList", this.BranchList);
      // console.log("Branch_Id", this.Branch_Id);
    });
  }

  getBranchName(branch_Id){
    console.log("branch_Id", branch_Id);
    
    this.LeadsApi.getBranchById(branch_Id).subscribe((res) => {
      localStorage.setItem("Branch_Name", res.branch.name)
      }); 
  }
}

