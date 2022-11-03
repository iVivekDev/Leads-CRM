import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LeadsComponent } from '../../pages/leads/leads.component';
import { AddEditLeadsComponent } from '../../pages/leads/add-edit-leads/add-edit-leads.component';
import { LookupComponent } from '../../pages/lookup/lookup.component';
import { AddLookupComponent } from '../../pages/lookup/add-lookup/add-lookup.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgSelectModule } from "@ng-select/ng-select";
import { DeveloperOptionComponent } from '../../pages/developer-option/developer-option.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { SignaturePadModule } from "angular2-signaturepad";
import {MatButtonModule} from '@angular/material/button'
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";


FullCalendarModule.registerPlugins([
  interactionPlugin,
  dayGridPlugin
]);
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatSortModule, MatPaginatorModule,
    NgSelectModule ,
    AngularEditorModule ,
     NgxMaskModule.forRoot(maskConfigFunction),
     SignaturePadModule,
     MatButtonModule,
    CKEditorModule
  ],
  declarations: [
    DashboardComponent,
    LeadsComponent,
    AddEditLeadsComponent,
    LookupComponent,
    AddLookupComponent,
    DeveloperOptionComponent,
  ]
})
export class AdminLayoutModule { }
