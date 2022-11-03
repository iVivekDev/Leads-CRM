import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { MaterialService } from "./material.service";
import { LeadsService} from "../leads/leads.service";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: "app-material-used",
  templateUrl: "./material-used.component.html",
  styleUrls: ["./material-used.component.scss"],
})
export class MaterialUsedComponent implements OnInit {

  title = 'ProductQr';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["name", "description","Qr", "action"];
  MaterialForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  Company_Id: any;
  userObj: any;
  Materials: any;
  IsMaterilaList: boolean = true;
  IsMaterilaForm: boolean = false;
  Id: any;
  menu: any;
  Branch_Id: any;
  submitted: any;
  BranchList: any;
  branch_Id:any;
  material_Id: any;
  roleId: any;


  constructor(
    private fb: FormBuilder,
    private api: MaterialService,
    private LeadsApi: LeadsService,
    private config: Config,
    private router: Router,
    private Route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.MaterialForm = this.fb.group({
      material_Id: 0,
      branch_Id: 0,
      company_Id: 0,
      name: "",
      description: "",
      dts: "2022-10-13T05:56:52.558Z"
    });
  }

  ngOnInit(): void {
    this.getBranchList();
    this.Id = localStorage.getItem("branch_Id")
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = this.userObj.userInfo.company_Id;
    this.Branch_Id = this.userObj.userInfo.branch_Id;
    this.roleId = this.userObj.userInfo.role_Id;

    if (this.roleId <= 1) {
      this.Getall(this.Id);
    } else {
      this.Getall(this.Branch_Id);
    }
    
  }
  
 

  Getall(Branch_Id) {
    this.config.startLoader();
    this.api.GetAll(Branch_Id).subscribe((res) => {
      console.log("material", res);
      if (res.status == "1") {
        this.config.stopLoader();
        this.dataSource = new MatTableDataSource(res.material);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.config.stopLoader();
      }
    });
  }

  editMaterial(Id) {
    this.IsMaterilaForm = true;
    this.IsMaterilaList = false;
    this.loadRequestById(Id);
    this.router.navigate(["/Material/"], {
      queryParams: { page: "Material", Id: Id },
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  openMaterilaForm() {
    this.MaterialForm.reset();
    if(this.roleId <=1){
      this.MaterialForm.patchValue({
        branch_Id: this.Id
      }); 
     } else{
      this.MaterialForm.patchValue({
        branch_Id: this.Branch_Id
      });
     }

    this.IsMaterilaForm = true;
    this.IsMaterilaList = false;
  }

  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.api.DeleteById(Id).subscribe((res) => {
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
            this.Getall(this.Branch_Id);
          this.router.navigate(["/Material"]);
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

  SaveMaterials() {
    console.log("form value", this.MaterialForm.value);
    this.submitted = true;
    if (this.MaterialForm.value.material_Id == null) {
      this.MaterialForm.value.material_Id = 0;
    }
    if (this.MaterialForm.value.dts == null) {
      this.MaterialForm.value.dts = "2022-10-13T05:56:52.558Z";
    }
    else {
      this.MaterialForm.value.company_Id = this.Company_Id;
      this.MaterialForm.value.branch_Id = parseInt(this.MaterialForm.value.branch_Id)
      this.api.savematerials(this.MaterialForm.value).subscribe((res) => {
        console.log("material", res);
        if (res.status == 1) {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.MaterialForm.reset();
          this.submitted = false;
          this.IsMaterilaForm = false;
          this.IsMaterilaList = true;
          if (this.Branch_Id <= 1) {
            this.Getall(this.Id);
          } else {
            this.Getall(this.Branch_Id);
          }
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



  cancel() {
    this.MaterialForm.reset();
    this.submitted = false;
    this.IsMaterilaForm = false;
    this.IsMaterilaList = true;
    this.router.navigate(["/Material/"], { queryParams: { page: "Material" } });
  }

 loadRequestById(Id) {
    console.log("id", Id);
    this.config.startLoader();
    this.api.GetMaterialsById(Id).subscribe(
      (res) => {
        console.log("mat edit", res);
        this.MaterialForm.patchValue({
          material_Id: res.material.material_Id,
          company_Id: res.material.company_Id,
          name: res.material.name,
          description: res.material.description,
          branch_Id: res.material.branch_Id
        });
        this.config.stopLoader();
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

getBranchList() {
  this.LeadsApi.getBranchList().subscribe((res) => {
    console.log("Branch", res);
    this.BranchList = res.branch;
    console.log("BranchList", this.BranchList);
    // this.getBranchId(this.branch_Id)
  });
}

}
