import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AnalyticsComponent } from './analytics/analytics.component';

export const adminanalyticsroutes: Routes = [
	{path: '', component: AnalyticsComponent},
];

export const AdminAnalytics_routing: ModuleWithProviders = RouterModule.forChild(adminanalyticsroutes);