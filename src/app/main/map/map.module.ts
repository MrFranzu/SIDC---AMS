import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { MapComponent } from "./map.component";



const routes: Routes = [
  {
    path: "",
    component: MapComponent,
  },
];

@NgModule({
  declarations: [MapComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,
    CoreCommonModule,
    CommonModule,
  ],
})
export class MapModule {}
