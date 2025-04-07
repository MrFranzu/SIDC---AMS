import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { EventCheckComponent } from './event-check/event-check.component';



const routes: Routes = [
  // {
  //   path: 'error',
  //   loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  // },
  // {
  //   path: 'customers',
  //   loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  // },
  // {
  //   path: 'meters',
  //   loadChildren: () => import('./meters/meters.module').then(m => m.MetersModule)
  // },
  // {
  //   path: 'accounts',
  //   loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'attendances',
    loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule),
  },
  {
    path: 'analyticss',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
  },
  {
    path: 'maps',
    loadChildren: () => import('./map/map.module').then(m => m.MapModule),
  },
  {
    path: 'eventcheck',
    loadChildren: () => import('./event-check/event-check.module').then(m => m.EventCheckModule),
  },
];

@NgModule({
  declarations: [
  

  
  
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
  providers: []
})
export class MainModule { }
