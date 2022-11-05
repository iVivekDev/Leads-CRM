import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { LeadsService } from '../leads/leads.service';
import Swal from 'sweetalert2';
import { MyFirmService } from '../my-firm/my-firm.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  BranchList: any;
  branch_Id: any;
  Role_Id: any;
  Branch_Id: any;
  Id: any;
  Branch_name: any;
  Branch_Name: string;
  ModalOpen: boolean;
  EditFormBranch: FormGroup;
  // fb: any;

  constructor(
    private LeadsApi: LeadsService,
    private config: Config,
    private Route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private MyFirmAPI: MyFirmService,

  ) {
    this.EditFormBranch = this.fb.group({
      branch_Id: 0,
      name: "",
      company_Id: 0,
      mobile: "",
      address: ""
    });

   }

  ngOnInit(): void {
    this.getBranchList();
  }
  getBranchList() {
    this.config.startLoader();
    this.LeadsApi.getBranchList().subscribe((res) => {
      console.log("Branch", res);
      this.BranchList = res.branch;
      this.config.stopLoader();
    });
  }
  addBranch() {
    this.ModalOpen = true;
  }
  cancel() {
    this.ModalOpen = false;
    // this.CreateUserForm.reset();
  }
  Enter(branch_Id) {
    this.config.startLoader();
    this.LeadsApi.getBranchById(branch_Id).subscribe((res) => {
      this.router.navigate(["/dashboard"]);
      localStorage.setItem("branch_Id", branch_Id)
      localStorage.setItem("Branch_Name", res.branch.name)
      this.config.stopLoader();
    });
  }
  Add_Branch() {
    this.config.startLoader();
    this.router.navigate(["/firm"]);
    this.config.stopLoader();
  }

  saveBranch(){
    console.log("Branch Vale",this.EditFormBranch.value);
    
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
          this.getBranchList();
          this.EditFormBranch.reset();
          this.ModalOpen = false;
          Swal.fire("Success", "Branch added successfully", "success");
        }else{
          Swal.fire("Oops..", res.message, "error");
        }
      })
    }
  }

}
