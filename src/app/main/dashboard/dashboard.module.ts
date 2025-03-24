import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes),
    FontAwesomeModule,
      TranslateModule,
      CoreCommonModule,
      CommonModule
  ]
})
export class DashboardModule {}
