import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PmsComponent } from './pms/pms.component';
import { PmtOperationsComponent } from './pmt-operations/pmt-operations.component';
import { HrComponent } from './operation-pages/hr/hr.component';

export const adminpmtroutes: Routes = [
	{path: '', redirectTo: 'pmt', pathMatch: 'full'},
	{path: 'pmt', component: PmsComponent, children: [
		{path: 'operations', component: PmtOperationsComponent, children: [
			{ path: 'hr', component: HrComponent},
		]},
	]}
];

export const AdminPMT_routing: ModuleWithProviders = RouterModule.forChild(adminpmtroutes);