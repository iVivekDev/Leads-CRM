import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { CompanyDetailsService } from './company-details.service';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  conpanyInfo: any;
  companyForm: FormGroup;
  

  constructor(private api: CompanyDetailsService,
    private fb: FormBuilder ,private toastr:ToastrService,private config: Config,
  ) {
    this.companyForm = this.fb.group(
      {
        company_Id: 0,
        company_Name: "",
        address: "",
        email: "",
        phone: "",
        is_Active: true,
        is_Deleted: false,
        dts: "2021-08-23T13:39:06.286Z"
      });
  }

  ngOnInit(): void {
    this.getCompanyDetail();
  }

  getCompanyDetail() {
    this.api.getCompanyDetails(1).subscribe,(res => {
      if (res.status == 1) {
        this.conpanyInfo = res.company;
        this.companyForm.patchValue({
          company_Id: res.company.company_Id,
          company_Name: res.company.company_Name,
          address: res.company.address,
          email: res.company.email,
          phone: res.company.phone,
          is_Active: res.company.is_Active,
          is_Deleted: res.company.is_Deleted,
          dts: res.company.dts
        })
      }
    });
  }

  UpdateCompany() {
    this.api.updateCompany(this.companyForm.value).subscribe(res => {
      if (res.status == 1) {
        // Swal.fire("Success", res.message, "success");
        this.toastr.success(res.message,
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          }
        )
      }
      else {
        Swal.fire("Error", res.message, "error");
      }
    })
  }
  onInputChange(event, backspace) {
    this.companyForm.patchValue({
      phone: this.config.onInputChange(event, backspace)
    })
  }}
