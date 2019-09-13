//Lazyloading ts

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';

const pageroutes: Routes = [
  { path: '', redirectTo: 'ava', pathMatch: 'full' },

  {
    path: 'ava', component: MainComponent, children: [
      // {path: '', redirectTo: 'admin', pathMatch: 'full'},
      { path: '', loadChildren: '../admin/admin.module#AdminModule' },
      { path: 'schedule', loadChildren: '../schedule/schedule.module#ScheduleModule' },
      { path: 'outreach', loadChildren: '../outreach/outreach.module#OutreachModule' },
      /*{path: 'outreach', loadChildren: '../outreach/outreach.module#OutreachModule', outlet: 'outreachoutletx'},*/



      /*{path: '**', pathMatch: 'full', redirectTo: 'admin'}*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageroutes)],
  exports: [RouterModule],
})
export class Main_routing { }
