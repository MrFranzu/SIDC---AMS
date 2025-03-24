import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { AttendanceComponent } from "./attendance.component";

const routes: Routes = [
  {
    path: "",
    component: AttendanceComponent,
  },
];

@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,
    CoreCommonModule,
    CommonModule,
  ],
})
export class AttendanceModule {}
