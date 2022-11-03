import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { LeadsService } from '../leads/leads.service';

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

  constructor(
    private LeadsApi: LeadsService,
    private config: Config,
    private Route: ActivatedRoute,
    private router: Router,

  ) { }

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

}
