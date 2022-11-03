import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;

  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/ViewSales",
    title: "Sales ",
    icon: "icon-book-bookmark",
    class: ""
  },
  {
    path: "/Leads",
    title: "Leads & Clients",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/Material",
    title: "Products",
    icon: "icon-basket-simple",
    class: ""
  },
 
];

export const ROUTES2: RouteInfo[] = [
  {
    path: "/dashboard"  ,
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/ViewSales",
    title: "Sales ",
    icon: "icon-book-bookmark",
    class: ""
  },
  {
    path: "/Leads",
    title: "Leads & Clients",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/Material",
    title: "Products",
    icon: "icon-basket-simple",
    class: ""
  },
 

];


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  RoleId: any;
  branch_Id: any;

  constructor() { }

  ngOnInit() {
    this.RoleId = JSON.parse(localStorage.getItem("userObj")).role_Id;
    this.branch_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.branch_Id;
    this.menuItems = ROUTES2.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (this.RoleId == 2) {
      this.menuItems = ROUTES2.filter(menuItem => menuItem);
    }
    else{
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

}
