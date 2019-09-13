import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingsComponent } from './settings/settings.component';
import { SettingsOperationComponent } from './settings-operation/settings-operation.component';

import { AccountComponent } from './operation-pages/account/account.component';
import { ReferralsComponent } from './operation-pages/referrals/referrals.component';
import { ScheduleComponent } from './operation-pages/schedule/schedule.component';
import { UserinfoComponent } from './operation-pages/userinfo/userinfo.component';

import { SettingsClinicComponent } from './settings-clinic/settings-clinic.component';

import { SettingsFinanceComponent } from './settings-finance/settings-finance.component';

import { InsuranceComponent } from './finance-pages/insurance/insurance.component';
import { PaymentsComponent } from './finance-pages/payments/payments.component';
import { PostingCodesComponent } from './finance-pages/posting-codes/posting-codes.component';
import { AvaOutreachComponent } from './operation-pages/ava-outreach/ava-outreach.component';

import { ProceduresComponent } from './clinic-pages/procedures/procedures.component';
import { TemplatesComponent } from './operation-pages/templates/templates.component';
import { CasePresentationComponent } from './finance-pages/case-presentation/case-presentation.component';
import { PhotoGalleryComponent } from './clinic-pages/photo-gallery/photo-gallery.component';
import { DiagnosisComponent } from './clinic-pages/diagnosis/diagnosis.component';
import { TreatmentPlanComponent } from './clinic-pages/treatment-plan/treatment-plan.component';
import { VendorsComponent } from './finance-pages/vendors/vendors.component';

export const adminsettingsroutes: Routes = [
	{path: '', redirectTo: 'settings', pathMatch: 'full'},
	{path: 'settings', component: SettingsComponent, children: [

		{path: 'clinic', component: SettingsClinicComponent, children: [
			{ path: 'diagnosis', component: DiagnosisComponent },
			{ path: 'procedures', component: ProceduresComponent },
			{ path: 'photogallery', component: PhotoGalleryComponent },
			{ path: 'treatmentplan', component: TreatmentPlanComponent },
		]},


		{path: 'operations', component: SettingsOperationComponent, children: [
			{path: 'account', component: AccountComponent},
			{path: 'schedule', component: ScheduleComponent},
			{path: 'referrals', component: ReferralsComponent},
			{path: 'users', component: UserinfoComponent},
			{path: 'ava-outreach', component: AvaOutreachComponent},
			{path: 'templates', component: TemplatesComponent},
		]},
		{path: 'finances', component: SettingsFinanceComponent, children: [
			{path: 'casepresentation', component: CasePresentationComponent},
			{path: 'payments', component: PaymentsComponent},
			{path: 'postingcodes', component: PostingCodesComponent},
			{path: 'insurance', component: InsuranceComponent},
			{path: 'vendors', component: VendorsComponent}
		]},

	]},


];

export const AdminSettings_routing: ModuleWithProviders = RouterModule.forChild(adminsettingsroutes);
