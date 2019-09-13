import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';


import { AdminComponent } from './admin/admin.component';

 const adminroutes: Routes = [
	/*{path: '', component: AdminComponent},*/

	// {path: '', redirectTo: 'admin', pathMatch: 'full'},

	{path: 'admin', component: AdminComponent, children: [
		//{path: '', redirectTo: 'analytics', pathMatch: 'full'},
		{path: 'analytics', loadChildren: '../admin-analytics/admin-analytics.module#AdminAnalyticsModule'},
		{path: 'settings', loadChildren: '../admin-settings/admin-settings.module#AdminSettingsModule'},
		{path: 'pmt', loadChildren: '../admin-pmt/admin-pmt.module#AdminPmtModule'},
	]}

];

@NgModule({
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule],
})
export class Admin_routing {}

//export const Admin_routing: ModuleWithProviders = RouterModule.forChild(adminroutes);
