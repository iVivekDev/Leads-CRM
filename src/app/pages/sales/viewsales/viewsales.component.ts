import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { SalesService } from "../../sales.service";


@Component({
  selector: 'app-viewsales',
  templateUrl: './viewsales.component.html',
  styleUrls: ['./viewsales.component.scss']
})
export class ViewsalesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "date",
    "item_Name",
    "qty",
    "rate",
    "amount",
    "deposit",
    "balance",
    "remark",
    "action",
  ];
  dataSource: MatTableDataSource<unknown>;
  userObj: any;
  Branch_Id: any;
  Id: any;
  roleId: any;
  sales: any;
  allSales: any;
  totalAmount: number;
  totalPaid: number;
  totalBalance: number;
  balance: any
  expenses: any;
  sum: any;
  DepositAmount: any;
  Balance: any;


  constructor(
    private config: Config,
    private api: SalesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.Id = JSON.parse(localStorage.getItem("branch_Id"))
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Branch_Id = this.userObj.userInfo.branch_Id;
    this.roleId = this.userObj.role_Id
    console.log(this.Branch_Id);

    if (this.roleId <= 1) {
      this.Getall(this.Id);
    } else {
      this.Getall(this.Branch_Id);
    }

    if(this.roleId <= 1){
      this.getTotalAmount(this.Id)
    }else{
      this.getTotalAmount(this.Branch_Id)
    }

  }

  Getall(Branch_Id) {
    console.log("Branch_Id", Branch_Id);
    this.config.startLoader();
    this.api.GetAllSales(Branch_Id).subscribe((res) => {
      console.log("sales", res);
      if (res.status == "1") {
        this.config.stopLoader();
        this.dataSource = new MatTableDataSource(res.sales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount(Branch_Id)
      } else {
        this.config.stopLoader();
      }
    });
  }

  getTotalAmount(Branch_Id) {
    let i;
    this.api.GetAllSales(Branch_Id).subscribe((res) => {
      this.sum = 0;
      for ( i = 0; i < res.sales.length; i++) {
        this.sum += res.sales[i].amount;
      }
      this.totalAmount = this.sum;
     });
  }

  getTotalDeposit(Branch_Id) {
    let i;
    this.api.GetAllSales(Branch_Id).subscribe((res) => {
      this.sum = 0;
      for ( i = 0; i < res.sales.length; i++) {
        this.sum += res.sales[i].deposit;
      }
      this.DepositAmount = this.sum;
     });
  }

  getTotalBalance(Branch_Id) {
    let i;
    this.api.GetAllSales(Branch_Id).subscribe((res) => {
      this.sum = 0;
      for ( i = 0; i < res.sales.length; i++) {
        this.sum += res.sales[i].balance;
      }
      this.Balance = this.sum;
     });
  }
  editSales(sales_Id) {
    this.router.navigate(["/Sales/" + sales_Id]);
  }

  delete(sales_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.api.DeleteSalesById(sales_Id).subscribe((res) => {
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
        this.getTotalAmount(this.Branch_Id)

          } else {
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

}
