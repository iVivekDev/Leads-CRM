import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { UserService } from "./user.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeadsService } from "../../leads/leads.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() ResultDataCompanyBank: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['full_Name','email', 'role_Name', 'action'];
  dataSource: any;
  CreateUserForm: FormGroup;
  user_Id: any;
  Id: any;
  BranchList: any;
  ModalOpen: boolean;
  Company_Id: any;
  role_Id: any;
  Isactive : boolean=true

  constructor(
    private fb: FormBuilder,
    private config: Config,
    private api: UserService,
    private router: Router,
    private Route: ActivatedRoute,
    private toastr: ToastrService,
    private LeadsApi: LeadsService,
  ) {
    this.CreateUserForm = this.fb.group({
      user_Id: 0,
      company_Id: 0,
      email: "",
      first_Name: "",
      last_Name: "",
      role_Id: 0,
      is_Active: true,
      is_Deleted: true,
      password: "",
      branch_Id: 0,
    });

  }
  
  ngOnInit() {
    this.user_Id = this.Route.snapshot.paramMap.get("Id");
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    this.role_Id = JSON.parse(localStorage.getItem("userObj")).role_Id;
    console.log("role_Id", this.role_Id);
    this.Getall();
    this.getBranchList();
  }

  addEmployee() {
    this.ModalOpen = true;
  }
  cancel() {
    this.ModalOpen = false;
    this.CreateUserForm.reset();
  }

  saveCreateUser() {
    if (
      this.CreateUserForm.value.email === "" ||
      this.CreateUserForm.value.phone === "" ||
      this.CreateUserForm.value.first_Name === "" ||
      this.CreateUserForm.value.last_Name === "" ||
      this.CreateUserForm.value.role_Id === "" ||
      this.CreateUserForm.value.creadted_By === "" ||
      this.CreateUserForm.value.password === "" ||
      this.CreateUserForm.value.branch_Id === "" ||
      this.CreateUserForm.value.user_Id == null
    ) {
      this.CreateUserForm.value.user_Id == 0
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      this.CreateUserForm.value.company_Id = this.Company_Id;
      this.CreateUserForm.value.branch_Id = parseInt(this.CreateUserForm.value.branch_Id)
      this.api.saveEmp(this.CreateUserForm.value).subscribe((res) => {
        console.log("saveEmp", res);
        if (res.status == "1") {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.CreateUserForm.reset();
          this.Getall();
          this.ModalOpen = false;
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      })
    }
  }


  Getall() {
    this.config.startLoader();
    this.api.GetEmp(this.Isactive).subscribe(res => {
      console.log("Emp", res);
      if (res.status == 1) {
        this.config.stopLoader();
        this.dataSource = new MatTableDataSource(res.user);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.config.stopLoader();
        console.log("Something went wrong");
      }
    });
  }

  GetById(Id) {
    console.log("user_Id",Id);
    this.config.startLoader();
    this.api.GetEmpById(Id).subscribe(
      (res) => {
        console.log("edit user", res);
        this.ModalOpen = true;
        this.CreateUserForm.patchValue({
          user_Id: res?.user.user_Id,
          first_Name: res.user.first_Name,
          last_Name: res.user.last_Name,
          email: res.user.email,
          phone: res.user.phone,
          role_Id: res.user.role_Id,
          creadted_By: res.user.creadted_By,
          password: res.user.password,
          branch_Id: res.user.branch_Id,
        });
        this.config.stopLoader();

      },
    );
  }


  delete(Id) {
    console.log("user_Id", Id);
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.api.DeleteEmp(Id).subscribe((res) => {
          console.log("success", res);
          // if (res.status == 1) {
          //   console.log("success", res);
          //   this.toastr.success("Deleted Successfully!", "", {
          //     timeOut: 4000,
          //     closeButton: true,
          //     enableHtml: true,
          //     positionClass: "toast-top-right",
          //     toastClass: "alert alert-success alert-with-icon",
          //   });
          //   this.Getall();
          // } else {
          //   this.toastr.error(res.message, "", {
          //     timeOut: 4000,
          //     closeButton: true,
          //     enableHtml: true,
          //     positionClass: "toast-top-right",
          //     toastClass: "alert alert-error alert-with-icon",
          //   });
          //   console.log("success", res);
          //   this.Getall();
          // }
        });
      }
    });
  }


  getBranchList() {
    this.LeadsApi.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
      console.log("BranchList", this.BranchList);
      // this.getBranchId(this.branch_Id)
    });
  }
}
