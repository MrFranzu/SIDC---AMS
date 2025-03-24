import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr"; // For auth after login toast
import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";
import { coreConfig } from "app/app-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { MainModule } from "./main/main.module";
import { BlockUIModule } from "ng-block-ui";
import { JwtModule } from "@auth0/angular-jwt";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ApiInterceptor } from "./common/interceptors/api-interceptor";
import { BASE_PATH, IdentityService, MembersService } from "./api";
import { environment } from "environments/environment";
import { AttendanceModule } from "./main/attendance/attendance.module";
import { DashboardComponent } from "./main/dashboard/dashboard.component";
import { AnalyticsModule } from "./main/analytics/analytics.module";
import { AttendanceComponent } from "./main/attendance/attendance.component";
import { AnalyticsComponent } from "./main/analytics/analytics.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./main/auth/login/login.component";


const appRoutes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full" }, // Redirect root to login
  { path: "login", component: LoginComponent },
  { path: "dashboards", component: DashboardComponent },
  { path: "attendances", component: AttendanceComponent },
  { path: "analytics", component: AnalyticsComponent },
  { path: "**", redirectTo: "/auth/login" }, // Redirect unknown routes to login
];

@NgModule({
  declarations: [AppComponent],
  imports: [
  
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BlockUIModule.forRoot({
      message: "Loading...",
    }),

    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost:4201"],
      },
    }),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    MainModule,
    ReactiveFormsModule,
    FormsModule, // Add this
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    IdentityService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: BASE_PATH, useValue: environment.apiUrl },
    MembersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
