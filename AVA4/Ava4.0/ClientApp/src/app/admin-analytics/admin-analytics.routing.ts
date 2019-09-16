import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AnalyticsComponent } from './analytics/analytics.component';

const adminanalyticsroutes: Routes = [
	{path: '', component: AnalyticsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(adminanalyticsroutes)],
  exports: [RouterModule],
})
export class AdminAnalytics_routing {}
