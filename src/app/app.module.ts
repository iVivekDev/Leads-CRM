import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from "./pages/auth/login/login.component";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { MaterialUsedComponent } from "./pages/material-used/material-used.component";
import { CompanyDetailsComponent } from "./pages/company-details/company-details.component";
import { SignaturePadModule } from "angular2-signaturepad";
import { ThankuYouPageComponent } from "./thanku-you-page/thanku-you-page.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ResetPasswordComponent } from "./pages/auth/login/reset-password/reset-password.component";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MyFirmComponent } from "./pages/my-firm/my-firm.component";
import { BankComponent } from "./pages/my-firm/bank/bank.component";
import { PatnerComponent} from "./pages/my-firm/patner/partner.component";
import { ViewLeadsComponent } from './pages/leads/view-leads/view-leads.component';
import { UserComponent } from './pages/auth/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ViewsalesComponent } from './pages/sales/viewsales/viewsales.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'; 


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "red",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "ball-spin-clockwise",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "red",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300,
};
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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    SignaturePadModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    NgxQRCodeModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    MaterialUsedComponent,
    CompanyDetailsComponent,
    CompanyDetailsComponent,
    ThankuYouPageComponent,
    ResetPasswordComponent,
    MyFirmComponent,
    BankComponent,
    PatnerComponent,
    ViewLeadsComponent,
    UserComponent,
    InfoComponent,
    SalesComponent,
    ViewsalesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
