//Lazyloading ts

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';

const pageroutes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', loadChildren: '../admin/admin.module#AdminModule' },
      { path: 'schedule', loadChildren: '../schedule/schedule.module#ScheduleModule' },
      { path: 'outreach', loadChildren: '../outreach/outreach.module#OutreachModule' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageroutes)],
  exports: [RouterModule],
})
export class Main_routing { }
