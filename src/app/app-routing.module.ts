import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ThankuYouPageComponent } from './thanku-you-page/thanku-you-page.component';
import { ResetPasswordComponent } from "./pages/auth/login/reset-password/reset-password.component";
import { InfoComponent } from "./pages/info/info.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "Info", component: InfoComponent },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },
  
  {
    path: "Thanku_You",
    component: ThankuYouPageComponent,
    children: [
      {
        path: "",
       
      }
    ]
  },
 
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    children: [
      {
        path: "",
       
      }
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
