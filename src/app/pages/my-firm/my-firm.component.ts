import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Config } from "../../utility/config";
import Swal from "sweetalert2";
import { MyFirmService } from "./my-firm.service";
// import { DateTimeAdapter, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@Component({
  selector: "app-my-firm",
  templateUrl: "./my-firm.component.html",
  styleUrls: ["./my-firm.component.css"],
})
export class MyFirmComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ["name", "email", "mobile", "address"];
  clientForm: FormGroup;
  submitted: boolean;
  company_Info_Id: 1;
  clients: any;
  dataSource: MatTableDataSource<unknown>;
  infoTab: boolean = true;
  bankTab: boolean;
  branchTab: boolean;
  attachmentTab: boolean;
  userObj: any;
  Company_Id: any;

  constructor(
    private MyFirmapi: MyFirmService,
    private config: Config,
    private ClientFormBuilder: FormBuilder,
    private router: Router 
  ) {
    this.clientForm = this.ClientFormBuilder.group({
      company_Info_Id: 0,
      name: "",
      pan: "",
      gstin: "",
      doi: "2020-10-04T11:47:28.934Z",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin_Code: "",
      website: "",
      fb: "",
      twitter: "",
      owner_name: "",
      attachment_Id: 0,
    });
  }

  ngOnInit() {
    this.loadFirm();
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    console.log("companyId", this.Company_Id);
    this.config.stopLoader();

  }
  cancel() {
    this.submitted = false;
    this.clientForm.reset();
  }
  
  

  updateFirm() {
    this.submitted = true;
    if (this.clientForm.value.company_Info_Id == null) {
      this.clientForm.value.company_Info_Id = 0;
    }
    this.clientForm.value.company_Info_Id = parseInt(
      this.clientForm.value.company_Info_Id
    );
    this.MyFirmapi.FirmAddUpdate(this.clientForm.value).subscribe((res) => {
      if (res.status == "1") {
        console.log("MyFirm", res);
        Swal.fire("Success", res.message, "success");
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });

  }

   loadFirm() {
    this.MyFirmapi.getFirmList().subscribe(
      (res) => {
        console.log("Company_info", res);
        this.clientForm.patchValue({
          company_Info_Id: res.clients.company_Info_Id,
          name: res.clients.name,
          pan: res.clients.pan,
          gstin: res.clients.gstin,
          doi: res.clients.doi,
          mobile: res.clients.mobile,
          email: res.clients.email,
          address: res.clients.address,
          city: res.clients.city,
          state: res.clients.state,
          country: res.clients.country,
          pin_Code: res.clients.pin_Code,
          website: res.clients.website,
          fb: res.clients.fb,
          twitter: res.clients.twitter,
          attachment_Id: res.clients.attachment_Id,
          owner_name: res.clients.owner_name,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  currentTab(tabId) {
    this.infoTab = false;
    this.bankTab = false;
    this.branchTab = false;

    if (tabId == "info") {
      this.infoTab = true;
    } else if (tabId == "bank") {
      this.bankTab = true;
    } else if (tabId == "branch") {
      this.branchTab = true;
    } 
  }
}
