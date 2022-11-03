import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { LeadsService } from "./leads.service";

@Component({
  selector: "app-leads",
  templateUrl: "./leads.component.html",
  styleUrls: ["./leads.component.scss"],
})
export class LeadsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "name",
    "branch_Name",
    "mobile",
    "remark",
    "requirments",
    "action",
  ];
  Company_Id: any;
  userObj: any;
  Leads: any;
  Status_Type: any;
  check: any = [];
  contracts: any;
  dataSource: MatTableDataSource<unknown>;
  Branch_Id: any;
  Id: any;
  BranchList: any;
  roleId: any;
  constructor(
    private config: Config,
    private api: LeadsService,
    private router: Router,
    private toastr: ToastrService,
    private Route: ActivatedRoute,
  ) {
    this.Id = this.Route.snapshot.paramMap.get("Id");
   }

  ngOnInit(): void {
    this.Id = JSON.parse(localStorage.getItem("branch_Id"))
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = this.userObj.userInfo.company_Id;
    this.Branch_Id = this.userObj.userInfo.branch_Id;
    this.roleId = this.userObj.role_Id
    console.log("roleId", this.roleId);
    console.log("Branch_Id", this.Branch_Id);

    if (this.roleId <= 1) {
      this.Getall(this.Id);
    } else {
      this.Getall(this.Branch_Id);
    }
    this.getBranchList()
  }

  Getall(Branch_Id) {
    console.log("Branch_Id", Branch_Id);
    this.config.startLoader();
    this.api.GetAll(Branch_Id).subscribe((res) => {
      console.log("leads", res);
      if (res.status == "1") {
        this.config.stopLoader();
        this.dataSource = new MatTableDataSource(res.leads);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.config.stopLoader();
      }
    });
  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  EditRequestResponse(leads_Id) {
    this.router.navigate(["/ViewLeads/" + leads_Id]);
  }

  delete(leads_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.api.DeleteById(leads_Id).subscribe((res) => {
          console.log("success", res);
          if (res.status == 1) {
            console.log("success", res);

            this.toastr.success("Deleted Successfully!", "", {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              positionClass: "toast-top-right",
              toastClass: "alert alert-success alert-with-icon",
            });
            if (this.roleId <= 1) {
              this.Getall(this.Id);
            } else {
              this.Getall(this.Branch_Id);
            }
            this.getBranchList()
          }else {
            this.toastr.error(res.message, "", {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              positionClass: "toast-top-right",
              toastClass: "alert alert-error alert-with-icon",
            });
            console.log("success", res);
            this.Getall(this.Branch_Id);
          }
        });
      }
    });
  }

  getBranchList() {
    this.api.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
      console.log("BranchList", this.BranchList);
    });
  }

}
