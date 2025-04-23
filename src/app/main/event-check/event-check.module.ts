import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { EventCheckComponent } from "./event-check.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: EventCheckComponent,
  },
];

@NgModule({
  declarations: [EventCheckComponent],
  imports: [
    RouterModule.forChild(routes),
    ZXingScannerModule,
    FormsModule,
    TranslateModule,
    CoreCommonModule,
    CommonModule,
  ],
})
export class EventCheckModule {}
