import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['lookup_Type', 'lookup_Value', 'lookup_Name', 'action'];
  lookupList: any;
  userObj: any;
  Company_Id: any;
  dataSource: MatTableDataSource<any>;
  IsUsersList: boolean = true;
  IsUsersForm: boolean = false;
  LookupForm: FormGroup;

  lookup_Id: any;

  constructor(private config: Config, private fb: FormBuilder, private api: LookupService, private router: Router, private Route: ActivatedRoute,private toastr:ToastrService) {
    this.LookupForm = this.fb.group(
      {
        lookup_Id: 0,
        lookup_Type: "",
        lookup_Value: "",
        lookup_Name: "",
        is_Deleted: true,
        short_Order: "",
        lookup_Icon: "",
        lookup_Color: "",
        discription: "",
        lookup_SubType: "",

      });

    this.lookup_Id = this.Route.snapshot.paramMap.get("Id");


  }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;

    this.userObj = JSON.parse(localStorage.getItem("userObj"));

    if (this.lookup_Id > 0) {
      this.loadRequestById(this.lookup_Id);
    }

    console.log("id", this.Company_Id)

    console.log("jayy", this.userObj)
    this.Getall();
  }

  cancel() {
    this.IsUsersForm = false;
    this.IsUsersList = true;
    this.router.navigate(['/Developer/'], { queryParams: { page: 'Lookups' } });
  }
  LookupFormopen() {
    this.LookupForm.reset();
    this.IsUsersForm = true;
    this.IsUsersList = false;
  }


  savelookup() {
    this.config.startLoader();
    console.log("form value", this.LookupForm.value)
    if (this.LookupForm.value.lookup_Id == null) {
      this.LookupForm.value.lookup_Id = 0;
    }
    if (this.LookupForm.value.is_Deleted == null) {
      this.LookupForm.value.is_Deleted = true;
    } 
    if (this.LookupForm.value.short_Order == null) {
      this.LookupForm.value.short_Order = "";
    } 
    if (this.LookupForm.value.lookup_Icon == null) {
      this.LookupForm.value.lookup_Icon = "";
    } 
    if (this.LookupForm.value.lookup_Color == null) {
      this.LookupForm.value.lookup_Color = "";
    } 
     else {

    }
    this.api.saveLookup(this.LookupForm.value).subscribe(res => {
      if (res.status == '1') {
        this.config.stopLoader();

        this.toastr.success("save Successfully", "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          positionClass: "toast-top-right",
          toastClass: "alert alert-success alert-with-icon",
        });
  
        this.IsUsersForm = false;
        this.IsUsersList = true;



      }
      else {
        this.toastr.error(res.message, "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          positionClass: "toast-top-right",
          toastClass: "alert alert-error alert-with-icon",
        });
      }
    });
  }
  async loadRequestById(Id) {

    this.api.GetLookupById(Id).subscribe(
      res => {

        console.log("edit value", res)
        this.LookupForm.patchValue({
          lookup_Id: res.lookup.lookup_Id,
          lookup_Type: res.lookup.lookup_Type,
          lookup_Value: res.lookup.lookup_Value,
          lookup_Name: res.lookup.lookup_Name,
          is_Deleted: res.lookup.is_Deleted,
          short_Order: res.lookup.short_Order,
          lookup_Icon: res.lookup.lookup_Icon,
          lookup_Color: res.lookup.lookup_Color,
          discription: res.lookup.discription,
          lookup_SubType: res.lookup.lookup_SubType


        });
        this.config.stopLoader();
      },
      err => {
        throw new Error(err);

      }
    );
  }
  Getall() {

    this.config.startLoader();
    this.api
      .GetAll()
      .subscribe(res => {
        if ((res.status == '1')) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.lookupList);
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
  EditRequestResponse(Id) {
    this.config.startLoader();
    this.IsUsersForm = true;
    this.IsUsersList = false;

    this.loadRequestById(Id)
    this.router.navigate(['/Developer/'], { queryParams: { page: 'Lookups', Id: Id } });
  }
  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.api.DeleteById(Id).subscribe(res => {
          console.log("success", res);
          if (res.status == 1) {
            console.log("success", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            console.log("success", res);
            this.Getall();
          }
        });
      }
    });
  }
}
