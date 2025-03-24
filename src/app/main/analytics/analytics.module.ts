import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { AnalyticsComponent } from "./analytics.component";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: "",
    component: AnalyticsComponent,
  },
];

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    FontAwesomeModule,
    RouterModule.forChild(routes),
    ChartsModule,
    TranslateModule,
    CoreCommonModule,
    NgxChartsModule,
    CommonModule,
  ],
})
export class AnalyticsModule {}
