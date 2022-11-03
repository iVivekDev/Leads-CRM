import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { LeadsComponent } from "../../pages/leads/leads.component";
import { AddEditLeadsComponent } from "../../pages/leads/add-edit-leads/add-edit-leads.component";
import { LookupComponent } from "../../pages/lookup/lookup.component";
import { AddLookupComponent } from "../../pages/lookup/add-lookup/add-lookup.component";
import { DeveloperOptionComponent } from "../../pages/developer-option/developer-option.component";
import { MyFirmComponent } from "../../pages/my-firm/my-firm.component";
import { MaterialUsedComponent } from "src/app/pages/material-used/material-used.component";
import { ViewLeadsComponent } from "src/app/pages/leads/view-leads/view-leads.component";
import { UserComponent } from "src/app/pages/auth/user/user.component";
import { InfoComponent } from "src/app/pages/info/info.component";
import { SalesComponent } from "src/app/pages/sales/sales.component";
import { ViewsalesComponent } from "src/app/pages/sales/viewsales/viewsales.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "dashboard/:Id", component: DashboardComponent },
  { path: "firm", component: MyFirmComponent },
  // { path: "Leads", component: LeadsComponent },
  { path: "Leads", component: LeadsComponent },
  { path: "Leads/:Id", component: LeadsComponent },
  { path: "addLeads", component: AddEditLeadsComponent },
  { path: "ViewLeads/:Id", component: ViewLeadsComponent },
  { path: "Lookups", component: LookupComponent },
  { path: "addLookup/:Id", component: AddLookupComponent },
  { path: "addLookup", component: AddLookupComponent },
  { path: "Developer", component: DeveloperOptionComponent },
  {path: "Material", component: MaterialUsedComponent},
  {path: "Material", component: MaterialUsedComponent},
  {path: "CreateUser", component: UserComponent},
  {path: "Sales", component: SalesComponent},
  {path: "Sales/:Id", component: SalesComponent},
  {path: "ViewSales", component:ViewsalesComponent}
];
 