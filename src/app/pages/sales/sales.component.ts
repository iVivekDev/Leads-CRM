import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Config } from 'src/app/utility/config';
import Swal from "sweetalert2";
import { SalesService } from '../sales.service';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialService } from '../material-used/material.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  SalesForm: FormGroup;
  Company_Id: any;
  branch_Id: any;
  id: any;
  MaterialList: any;
  Id: any;
  Branch_Id: any;
  TotalAmt: any;
  expenses: any;
  sales: any;



  constructor(
    private fb: FormBuilder,
    private config: Config,
    private api: SalesService,
    private toastr: ToastrService,
    private router: Router,
    private Route: ActivatedRoute,
    private MatApi: MaterialService,
  ) {
    this.SalesForm = this.fb.group({
      Sales_Id: 0,
      date: "2022-01-17T10:47:34.936Z",
      Item_Name: '',
      type: "",
      qty: 0,
      rate: 0,
      amount: 0,
      deposit: 0,
      balance: 0,
      remark: "",
      branch_Id: 0,
      company_Id: 0,
    });

    this.id = this.Route.snapshot.paramMap.get("Id");
  }

  ngOnInit(): void {
    this.Id = JSON.parse(localStorage.getItem("branch_Id"))
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    this.Branch_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.branch_Id;
    console.log(this.Branch_Id);
    this.EditSales(this.id);
    if (this.Branch_Id <= 1) {
      this.Getall(this.Id);
    } else {
      this.Getall(this.Branch_Id);
    }
    this.config.stopLoader();
  }

  SaveSales() {
    if (
      this.SalesForm.value.Item_Name === "" ||
      this.SalesForm.value.qty === "" ||
      this.SalesForm.value.rate === "" ||
      this.SalesForm.value.date === "" 
    ) {
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      this.SalesForm.value.branch_Id = this.Branch_Id
      this.SalesForm.value.company_Id = this.Company_Id;
      this.api.SaveSales(this.SalesForm.value).subscribe((res) => {
        console.log("Sales save", res);
        if (res.status == "1") {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.router.navigate(["/ViewSales"]);
          this.SalesForm.reset();
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


  calculateAmt() {
    let Qty = this.SalesForm.value.qty;
    let Rate = this.SalesForm.value.rate;
    let multiple = Qty * Rate;

    let Deposit = this.SalesForm.value.deposit;
    let Balance = multiple - Deposit;
    this.SalesForm.patchValue({
      amount: multiple,
      balance: Balance
    })
  }

  EditSales(Id) {
    this.config.startLoader();
    this.api.GetSalesById(Id).subscribe(
      (res) => {
        console.log("SalesForm", res);
        this.SalesForm.patchValue({
          Sales_Id: res.sales.sales_Id,
          date: res.sales.date,
          Item_Name: res.sales.item_Name,
          type: res.sales.type,
          qty: res.sales.qty,
          rate: res.sales.rate,
          amount: res.sales.amount,
          deposit: res.sales.deposit,
          balance: res.sales.balance,
          remark: res.sales.remark,
          Material_Id: res.sales.Material_Id
        });
        this.config.stopLoader();
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  Getall(Branch_Id) {
    console.log("Mat Branch_Id", Branch_Id);
    this.config.startLoader();
    this.MatApi.GetAll(Branch_Id).subscribe((res) => {
      console.log("mat", res);
      this.MaterialList = res.material
      console.log("material", this.MaterialList);
      this.config.stopLoader();
    });
  }





}
