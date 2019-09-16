import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PmsComponent } from './pms/pms.component';
import { PmtOperationsComponent } from './pmt-operations/pmt-operations.component';
import { HrComponent } from './operation-pages/hr/hr.component';

 const adminpmtroutes: Routes = [
	// {path: '', redirectTo: 'pmt', pathMatch: 'full'},
	{path: '', component: PmsComponent, children: [
		{path: 'operations', component: PmtOperationsComponent, children: [
			{ path: 'hr', component: HrComponent},
		]},
	]}
];

@NgModule({
  imports: [RouterModule.forChild(adminpmtroutes)],
  exports: [RouterModule],
})
export class AdminPMT_routing {}
// export const AdminPMT_routing: ModuleWithProviders = RouterModule.forChild(adminpmtroutes);
