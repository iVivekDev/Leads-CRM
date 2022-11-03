import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { LookupService } from '../lookup.service';

@Component({
  selector: 'app-add-lookup',
  templateUrl: './add-lookup.component.html',
  styleUrls: ['./add-lookup.component.scss']
})
export class AddLookupComponent implements OnInit {

  LookupForm: FormGroup;
  userObj: any;
  Company_Id: any;
  lookup_Id: any;
  

  constructor(private fb: FormBuilder,private config: Config, private api:LookupService, private router: Router, private Route: ActivatedRoute,) {
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
    if (this.lookup_Id > 0) {
      this.loadRequestById(this.lookup_Id);
    }
    
  }
  savelookup(){
    this.config.startLoader();
    console.log("form value",this.LookupForm.value)
    if (this.LookupForm.value.lookup_Id == null) {
      this.LookupForm.value.lookup_Id = 0;
    } else {

    }
    this.api.saveLookup(this.LookupForm.value).subscribe(res => {
      if (res.status == '1') {
        this.config.stopLoader();

         Swal.fire("Success", res.message, "success");
        
         this.router.navigate(['/Lookups']);
       
         this.LookupForm.reset();

      }
      else {
        err => {
          
        }
      }
    });
  }
  async loadRequestById(Id) {
 
    this.api.GetLookupById(Id).subscribe(
      res => {

       console.log("edit value",res)
        this.LookupForm.patchValue({
          lookup_Id: res.lookup.lookup_Id,
          lookup_Type:res.lookup.lookup_Type,
          lookup_Value:res.lookup.lookup_Value,
          lookup_Name:res.lookup.lookup_Name,
          is_Deleted:res.lookup.is_Deleted,
          short_Order:res.lookup.short_Order,
          lookup_Icon:res.lookup.lookup_Icon,
          lookup_Color:res.lookup.lookup_Color,
          discription:res.lookup.discription,
          lookup_SubType:res.lookup.lookup_SubType


        });
        this.config.stopLoader();
      },
      err => {
        throw new Error(err);
       
      }
    );
  }
 


}


