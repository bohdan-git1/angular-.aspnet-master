import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountComponent } from './operation-pages/account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchboxComponent, SearchboxDD } from './searchbox/searchbox.component';
import { AdminSettings_routing } from './admin-settings.routing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { ClickOutsideModule } from 'ng-click-outside';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingpageMainComponent } from './settingpage-main/settingpage-main.component';
import { SettingsOperationComponent } from './settings-operation/settings-operation.component';
import { SettingsClinicComponent } from './settings-clinic/settings-clinic.component';
import { SettingsFinanceComponent } from './settings-finance/settings-finance.component';
import { SettingsClinicDiagnosisComponent } from './settings-clinic-diagnosis/settings-clinic-diagnosis.component';
import { ToggleBtnComponent } from './toggle-btn/toggle-btn.component';
import { ScheduleComponent } from './operation-pages/schedule/schedule.component';
import { ReferralsComponent, EditReferralDialog } from './operation-pages/referrals/referrals.component';
import { CalendarSettingsComponent } from './calendar-settings/calendar-settings.component';
import { UserinfoComponent } from './operation-pages/userinfo/userinfo.component';
import { PostingCodesComponent } from './finance-pages/posting-codes/posting-codes.component';
import { InsuranceComponent } from './finance-pages/insurance/insurance.component';
import { PaymentsComponent } from './finance-pages/payments/payments.component';
import { AvaOutreachComponent } from './operation-pages/ava-outreach/ava-outreach.component';
import { ProceduresComponent } from './clinic-pages/procedures/procedures.component';
import { TemplatesComponent } from './operation-pages/templates/templates.component';
import { CasePresentationComponent } from './finance-pages/case-presentation/case-presentation.component';
import { PhotoGalleryComponent } from './clinic-pages/photo-gallery/photo-gallery.component';
import { DiagnosisComponent } from './clinic-pages/diagnosis/diagnosis.component';
import { TreatmentPlanComponent } from './clinic-pages/treatment-plan/treatment-plan.component';
import { VendorsComponent } from './finance-pages/vendors/vendors.component';
import { DropdownComponent } from './clinic-pages/dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionSelectorComponent } from './clinic-pages/diagnosis/option-selector/option-selector.component';


import { UtilityModule } from '../shared-module/utility/utility.module';

import { DragAndDropModule } from 'angular-draggable-droppable';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { TruncatePipe } from '../pipe/truncate';
import { DiagnosisCardComponent } from './clinic-pages/diagnosis/diagnosis-card/diagnosis-card.component';
import { GoalsCardComponent } from './clinic-pages/diagnosis/goals-card/goals-card.component';
import { TxplanCardComponent } from './clinic-pages/diagnosis/txplan-card/txplan-card.component';
import { TxplanOptionselectorComponent } from './clinic-pages/diagnosis/txplan-optionselector/txplan-optionselector.component';

import { StepsCardComponent } from './clinic-pages/diagnosis/steps-card/steps-card.component';
import { PostingDropdownComponent } from './finance-pages/posting-codes/posting-dropdown/posting-dropdown.component';
import { EditReferralsComponent } from './operation-pages/referrals/edit-referrals/edit-referrals.component';
import { CheckboxComponent } from './operation-pages/referrals/checkbox/checkbox.component';

import { NewDoctorAndLocationComponent } from './operation-pages/referrals/new-doctor-and-location/new-doctor-and-location.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ScheduleEditComponent } from './operation-pages/schedule/schedule-edit/schedule-edit.component';
import { ScheduleTimelineComponent } from './operation-pages/schedule/schedule-timeline/schedule-timeline.component';
import { ScheduleProcedureBlockComponent } from './operation-pages/schedule/schedule-procedure-block/schedule-procedure-block.component';

@NgModule({
  imports: [
    CommonModule,
    AdminSettings_routing,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DragAndDropModule,
	UtilityModule,
	ClickOutsideModule,
	TextMaskModule,
	TextareaAutosizeModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  declarations: [AccountComponent, SettingsComponent, SearchboxComponent, SearchboxDD, SettingpageMainComponent, SettingsOperationComponent, SettingsClinicComponent, SettingsFinanceComponent, SettingsClinicDiagnosisComponent, ToggleBtnComponent, ScheduleComponent, ReferralsComponent, CalendarSettingsComponent, UserinfoComponent, PostingCodesComponent, InsuranceComponent, PaymentsComponent, AvaOutreachComponent, ProceduresComponent, TemplatesComponent, CasePresentationComponent, PhotoGalleryComponent, DiagnosisComponent, TreatmentPlanComponent, VendorsComponent, DropdownComponent, OptionSelectorComponent, TruncatePipe, DiagnosisCardComponent, GoalsCardComponent, TxplanCardComponent, TxplanOptionselectorComponent, StepsCardComponent, PostingDropdownComponent, EditReferralsComponent, EditReferralDialog, CheckboxComponent, NewDoctorAndLocationComponent, ScheduleEditComponent, ScheduleTimelineComponent, ScheduleProcedureBlockComponent],
  entryComponents: [SearchboxDD, EditReferralDialog]
})
export class AdminSettingsModule { }
