import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchedularComponent, CalenderBox, CreateAppointment } from './schedular/schedular.component';

import { Schedulerouting } from './schedule.routing';
import { DropdownlistComponent, DDListExpansion } from './dropdownlist/dropdownlist.component';
import { ChairComponent } from './chair/chair.component';
import { TimelineComponent, TimelinePatientBox, OverbookedInfo } from './timeline/timeline.component';
import { PatientblockComponent, PatientBox } from './patientblock/patientblock.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
/*import { NoopAnimationsModule } from '@angular/platform-browser/animations';*/
import { CalendarComponent } from './calendar/calendar.component';
import { ListboxComponent, PatientCard } from './listbox/listbox.component';
import { LocationComponent } from './location/location.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { OndeckComponent } from './ondeck/ondeck.component';

/*import { DateSuffix } from '../pipe/datesuffix.pipe';
import { HighlightSearch } from '../pipe/highlight.pipe';*/

import {MatSelectModule} from '@angular/material/select';
import { ViewselectorComponent, ListPopUp } from './viewselector/viewselector.component';

import {MatTableModule} from '@angular/material/table';
/*import { SearchpanelComponent, SearchPatientBox } from './searchpanel/searchpanel.component';*/
import { ChairNumSelectorComponent } from './chair-num-selector/chair-num-selector.component';
/*import { PatientmodalddComponent } from './patientmodaldd/patientmodaldd.component';*/

/*import { ClickOutsideModule } from 'ng-click-outside';*/
/*import { PatientscheduleComponent } from './patientschedule/patientschedule.component';*/
/*import { CreateNewAppointmentsComponent } from './modal-component/create-new-appointments/create-new-appointments.component';
import { NewPatientComponent } from './modal-component/new-patient/new-patient.component';
import { ModalComponentComponent } from './modal-component/modal-component/modal-component.component';
import { DropdownComponent } from './modal-component/dropdown/dropdown.component';*/

/*import { TextMaskModule } from 'angular2-text-mask';*/

/*import { ResponsiblePartyComponent } from './modal-component/responsible-party/responsible-party.component';
import { CreateNewEventComponent } from './modal-component/create-new-event/create-new-event.component';*/

import { SingleCalenderComponent } from './single-calender/single-calender.component';
import { SearchmoduleModule } from '../shared-module/searchmodule/searchmodule.module';
import { DayEventBolckComponent } from './day-event-bolck/day-event-bolck.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    CommonModule,
	FlexLayoutModule,
	MatAutocompleteModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatDialogModule,
	Schedulerouting,
	/*NoopAnimationsModule,*/
	MatDatepickerModule,
	MatNativeDateModule,
	MatButtonModule,
	PerfectScrollbarModule,
	MatSelectModule,
	FormsModule,
	MatTableModule,
	/*ClickOutsideModule,
	TextMaskModule,*/
	SearchmoduleModule
  ],
  declarations: [SchedularComponent, DropdownlistComponent, ChairComponent, TimelineComponent, PatientblockComponent, DDListExpansion, CalenderBox, CalendarComponent, PatientBox, ListboxComponent, LocationComponent, OndeckComponent, ViewselectorComponent, ListPopUp, PatientCard, ChairNumSelectorComponent, CreateAppointment, TimelinePatientBox, SingleCalenderComponent, DayEventBolckComponent, OverbookedInfo],
  
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  
  entryComponents: [DDListExpansion, CalenderBox, PatientBox, ListPopUp, PatientCard, CreateAppointment, TimelinePatientBox, OverbookedInfo]
})
export class ScheduleModule { }
