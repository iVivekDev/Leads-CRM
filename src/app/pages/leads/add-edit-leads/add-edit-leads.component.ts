import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { LeadsService } from "../leads.service";

@Component({
  selector: "app-add-edit-leads",
  templateUrl: "./add-edit-leads.component.html",
  styleUrls: ["./add-edit-leads.component.scss"],
})
export class AddEditLeadsComponent implements OnInit {
  LeadForm: FormGroup;
  userObj: any;
  Company_Id: any;
  lead_Id: any;
  Status_Type: any;
  BranchList: any;
  branch_Id: any;
  Branch_Id: any;
  Id: string;
  roleId: any;

  constructor(
    private fb: FormBuilder,
    private config: Config,
    private api: LeadsService,
    private router: Router,
    private Route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.LeadForm = this.fb.group({
      lead_Id: 0,
      name: "",
      mobile: "",
      email: "",
      address: "",
      remark: "",
      requirments: "",
      branch_Id: 0,
      company_Id: 0,
      dts: "2022-01-17T10:47:34.936Z",
    });

    this.lead_Id = this.Route.snapshot.paramMap.get("Id");
  }

  ngOnInit() {
    this.getBranchList();
    this.Id = localStorage.getItem("branch_Id")
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = this.userObj.userInfo.company_Id;
    this.Branch_Id = this.userObj.userInfo.branch_Id;
    this.roleId = this.userObj.userInfo.role_Id;
    console.log("roleId", this.roleId);
    
    console.log("Company_Id", this.Company_Id);
    console.log("Branch_Id", this.Branch_Id);
    
   if(this.roleId <=1){
    this.LeadForm.patchValue({
      branch_Id: this.Id
    }); 
   } else{
    this.LeadForm.patchValue({
      branch_Id: this.Branch_Id
    });
   }
  }

  saveleads() {
    if (
      this.LeadForm.value.name === "" ||
      this.LeadForm.value.mobile === "" ||
      this.LeadForm.value.address === "" ||
      this.LeadForm.value.branchList === "" ||
      this.LeadForm.value.lead_Id == null
    ) {
      this.LeadForm.value.lead_Id = 0;
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      this.LeadForm.value.branch_Id = parseInt(this.LeadForm.value.branch_Id);
      this.LeadForm.value.company_Id = this.Company_Id;
      this.api.saveLeads(this.LeadForm.value).subscribe((res) => {
        console.log(res);

        if (res.status == "1") {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.router.navigate(["/Leads"]);
          this.Getall(this.Branch_Id)
          this.LeadForm.reset();
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


  Getall(Branch_Id) {
    console.log("Branch_Id", Branch_Id);
    this.config.startLoader();
    this.api.GetAll(Branch_Id).subscribe((res) => {
      console.log("leads", res);
    });
  }
  loadRequestById(Id) {
    this.config.startLoader();
    this.api.GetLeadsById(Id).subscribe(
      (res) => {
        console.log("edit value", res);
        this.LeadForm.patchValue({
          lead_Id: res.leads.lead_Id,
          name: res.leads.name,
          email: res.leads.email,
          phone: res.leads.phone,
          branch_Name: res.branch_Name,
          company_Id: res.leads.company_Id,
          dts: res.leads.dts,
          status: res.leads.status,
        });
        this.config.stopLoader();
      },
      (err) => {
        throw new Error(err);
      }
    );
  }
  onInputChange(event, backspace) {
    this.LeadForm.patchValue({
      phone: this.config.onInputChange(event, backspace),
    });
  }

  getBranchList() {
    this.api.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
    });
  }

}

