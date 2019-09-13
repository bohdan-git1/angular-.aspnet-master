import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightSearch } from '../../pipe/highlight.pipe';
import { SearchpanelComponent, SearchPatientBox } from './searchpanel/searchpanel.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { PatientscheduleComponent } from './patientschedule/patientschedule.component';
import { DateSuffix } from '../../pipe/datesuffix.pipe';
import { PatientmodalddComponent } from './patientmodaldd/patientmodaldd.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TextMaskModule } from 'angular2-text-mask';


import { CreateNewAppointmentsComponent } from './modal-component/create-new-appointments/create-new-appointments.component';
import { ResponsiblePartyComponent } from './modal-component/responsible-party/responsible-party.component';
import { CreateNewEventComponent } from './modal-component/create-new-event/create-new-event.component';
import { NewPatientComponent } from './modal-component/new-patient/new-patient.component';
import { ModalComponentComponent } from './modal-component/modal-component/modal-component.component';

import { DropdownSharedComponent } from './modal-component/dropdown-shared/dropdown-shared.component';
import { CreateProcedureEventComponent } from './modal-component/create-procedure-event/create-procedure-event.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
	PerfectScrollbarModule,
	ClickOutsideModule,
	FlexLayoutModule,
	TextMaskModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  declarations: [SearchpanelComponent, SearchPatientBox, HighlightSearch, PatientscheduleComponent, DateSuffix, PatientmodalddComponent, CreateNewAppointmentsComponent, ResponsiblePartyComponent, CreateNewEventComponent, NewPatientComponent, ModalComponentComponent, DropdownSharedComponent, CreateProcedureEventComponent],
  
  entryComponents: [SearchPatientBox],
  
  exports: [CommonModule, SearchpanelComponent, SearchPatientBox, HighlightSearch, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, PatientscheduleComponent, DateSuffix, PatientmodalddComponent, ClickOutsideModule, FlexLayoutModule, CreateNewAppointmentsComponent, ResponsiblePartyComponent, CreateNewEventComponent, NewPatientComponent, ModalComponentComponent, DropdownSharedComponent, TextMaskModule]
})
export class SearchmoduleModule { }
