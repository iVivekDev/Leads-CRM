import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '../../../utility/config';
import Swal from 'sweetalert2';
import { MyFirmService } from '../my-firm.service';
// import { DateTimeAdapter, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@Component({
  selector: 'app-patner',
  templateUrl: './patner.component.html',
  styleUrls: ['./patner.component.css']
})
export class PatnerComponent implements OnInit {
  @Input() ResultDataCompanybranch: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'mobile', 'address', 'action'];
  dataSource: any;
  EditFormBranch: FormGroup;
  userDisabled: boolean;
  userInfo: any;
  userObj: any;
  Company_Id: any;
  branch_Id: any;

  constructor(private FormBuilder: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private MyFirmAPI: MyFirmService,
  ) {
    this.EditFormBranch = this.FormBuilder.group({
      branch_Id: 0,
      name: "",
      company_Id: 0,
      mobile: "",
      address: ""
    });
  }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    console.log("companyId",this.Company_Id)
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    console.log(this.userInfo)
    this.Getall();
    if (this.userInfo.userInfo.role_Id > 1) {
      this.userDisabled = true;
    }
  }


  Getall() {
    this.config.startLoader();
    this.MyFirmAPI.getBranchList().subscribe(res => {
        if ((res.status == '1')) {
          console.log("branch", res);
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.branch);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
          console.log("Something went wrong");
        }
      });
  }


  saveBranch(){
    if(this.EditFormBranch.value.name == "" ||
    this.EditFormBranch.value.address == ""){
      Swal.fire("Oops...", "Please enter valid data", "error")
    }else{
      if (this.EditFormBranch.value.branch_Id == null) {
        this.EditFormBranch.value.branch_Id = 0;
      }
      this.EditFormBranch.value.company_Id = 0;
      this.MyFirmAPI.BranchAddUpdate(this.EditFormBranch.value).subscribe((res) =>{
        if(res.status == "1"){
          this.Getall();
          this.EditFormBranch.reset();
          // console.log("Save", res);
          Swal.fire("Success", "Branch added successfully", "success");
        }else{
          Swal.fire("Oops..", res.message, "error");
        }
      })
    }
  }


EditBranch(branch_Id) {
  console.log("Id", branch_Id);
    this.MyFirmAPI.GetBranchById(branch_Id).subscribe(
      res => {
        console.log("respond", res);
        this.EditFormBranch.patchValue({
          branch_Id: res.branch.branch_Id,
          name: res.branch.name,
          company_Id:res.branch.company_Id,
          mobile: res.branch.mobile,
          address: res.branch.address
        });
      },
      err => {
        console.log("errrrr", err);
      }
    );
    this.Getall();
  }


  delete(branch_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.MyFirmAPI.DeleteBranch(branch_Id).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.Getall();
          }
        });
      }
    });
    this.Getall();
  }
}


