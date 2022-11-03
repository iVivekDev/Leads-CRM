import { Component, OnInit } from "@angular/core";;
import { LeadsService } from "../leads/leads.service";
import { Config } from "src/app/utility/config";
import { UserService } from "../auth/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SalesService } from "../sales.service";
import { MaterialService } from "../material-used/material.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  BranchList: any;
  role_Id: any;
  UserList: any;
  Id: any;
  branch_Id: any;
  Branch_Name: any;
  userObj: any;
  Branch_Id: any;
  LeadsList: any;
  SalesList: any;
  month: any;
  balance: any;
  MatList: any;
  date: any;
  year: any;
  sum: any;
  constructor(
    private LeadsApi: LeadsService,
    private SalesApi: SalesService,
    private MatApi: MaterialService,
    private config: Config,
    private api: UserService,
    private router: Router,
    private Route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem("branch_Id")

    this.getBranchList();
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.role_Id = this.userObj.userInfo.role_Id;
    this.Branch_Id = this.userObj.userInfo.branch_Id;
    this.getMonth();

    if (this.role_Id <= 1) {
      this.GetLeads(this.Id);
    } else {
      this.GetLeads(this.Branch_Id);
    }

    if (this.role_Id <= 1) {
      this.GetSales(this.Id);
    } else {
      this.GetSales(this.Branch_Id);
    }

    if(this.role_Id <= 1){
      this.GetMat(this.Id)
    }else{
      this.GetMat(this.Branch_Id)
    }

    if(this.role_Id <= 1){
      this.getTotalAmount(this.Id)
    }else{
      this.getTotalAmount(this.Branch_Id)
    }
    this.config.stopLoader();
   
  }

  getBranchList() {
    this.config.startLoader();
    this.LeadsApi.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
      console.log("BranchList", this.BranchList);
      this.config.stopLoader();
    });
  
  }

  GetLeads(Branch_Id) {
    this.config.startLoader();
    console.log("Branch_Id", Branch_Id);
    this.LeadsApi.GetAll(Branch_Id).subscribe((res) => {
      console.log("leads", res);
      this.LeadsList = res.leads;
      this.config.stopLoader();
    });

  }

  GetSales(Branch_Id) {
    console.log("Branch_Id", Branch_Id);
    this.SalesApi.GetAllSales(Branch_Id).subscribe((res) => {
      console.log("sales", res);
      this.SalesList = res.sales;
    });

  }
  getTotalAmount(Branch_Id) {
    let i;
    this.SalesApi.GetAllSales(Branch_Id).subscribe((res) => {
      this.sum = 0;
      for ( i = 0; i < res.sales.length; i++) {
        this.sum += res.sales[i].amount;
      }
      console.log("I",i); 
      console.log("sum",this.sum);
     });


  }

  GetMat(Branch_Id) {
    this.MatApi.GetAll(Branch_Id).subscribe((res) => {
      console.log("material", res);
      this.MatList = res.material;
    });
    this.config.stopLoader();
  }
  getMonth() {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let day = d.getDate();
    let name = month[d.getMonth()];
    let year = d.getFullYear();
    this.month = name;
    this.date = day;
    this.year = year
  }

 

}