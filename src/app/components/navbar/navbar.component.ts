import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LeadsService } from "src/app/pages/leads/leads.service";
import { Config } from "src/app/utility/config";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  closeResult: string;
  userObj: any;
  ModalOpenresetpwd: boolean = false;
  resetPwdFrm = new FormGroup({
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    user_Id: new FormControl(0),
    old_Password: new FormControl(""),
    email: new FormControl(""),
  });
  user_Id: any;
  code: any;
  newleads: any;
  Company_Id: any;
  Branch_Id: any;
  Id: string;
  Branch_Name: any;
  role_Id: any;
  Change: Promise<boolean>;
  LocalBranch_Id: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private config: Config,
    private api: LeadsService,
    private router: Router,
    private toastr: ToastrService,
    private Route: ActivatedRoute,

  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.user_Id = this.route.snapshot.queryParamMap.get("user_Id");
    this.code = this.route.snapshot.queryParamMap.get("code");
  }
  openResetPwdModel() {
    this.ModalOpenresetpwd = true;
  }
  cancelresetpwd() {
    this.ModalOpenresetpwd = false;
    // this.resetPwdFrm.reset();
  }
  SubmitResetPwd() {
    console.log("new pass word value ", this.resetPwdFrm.value);
    return;
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    var navbar = document.getElementsByClassName("navbar")[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add("bg-white");
      navbar.classList.remove("navbar-transparent");
    } else {
      navbar.classList.remove("bg-white");
      navbar.classList.add("navbar-transparent");
    }
  };
  ngOnInit() {
    this.Id = JSON.parse(localStorage.getItem("branch_Id"))
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    window.addEventListener("resize", this.updateColor);
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    this.LocalBranch_Id = this.userObj.userInfo.branch_Name;
    this.role_Id = this.userObj.userInfo.role_Id;
    this.Branch_Name = localStorage.getItem("Branch_Name")
    console.log("branch",this.Branch_Name)

    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    console.log(this.userObj);
    this.resetPwdFrm.patchValue({
      email: this.userObj.userInfo.email,
      password: "",
      confirmPassword: "",
      old_Password: "",
    });
    this.Getall();

  }

  Getall() {
    this.config.startLoader();
    this.api.GetNotifications(this.Company_Id).subscribe((res) => {
      if (res.status == "1") {
        this.config.stopLoader();
        this.newleads = res.leads;
        console.log("iddcrew", this.newleads);
      } else {
        this.config.stopLoader();
      }
    });
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function () {
      toggleButton.classList.add("toggled");
      4;
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  open(content) {
    this.modalService
      .open(content, { windowClass: "modal-search" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }

  logOut() {
    window.localStorage.removeItem('userObj');
    window.localStorage.removeItem('branch_Id');
    window.localStorage.removeItem('LoginMessage');
    window.localStorage.removeItem('Branch_Name');
    this.router.navigate(["/"]);
  }

  Change_Branch() {
    window.localStorage.removeItem('Branch_Name');
    window.localStorage.removeItem('branch_Id');
    this.router.navigate(["/Info"]);
  }

}
