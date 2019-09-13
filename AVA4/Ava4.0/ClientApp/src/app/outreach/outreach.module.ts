import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OutreachmainComponent, MedicalHistory, CreateAppointment } from './outreachmain/outreachmain.component';
import { Outreachrouting } from './outreach.routing';
import { TreatmentComponent, ImageModal} from './treatment/treatment.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ChairComponent, PatientBox } from './chair/chair.component';
import { AcordionddnComponent } from './acordionddn/acordionddn.component';
import { MultileveldrpdnComponent } from './multileveldrpdn/multileveldrpdn.component';
import { TreatmentmeterComponent } from './treatmentmeter/treatmentmeter.component';
import { CardaccordionComponent } from './cardaccordion/cardaccordion.component';
import { StepsdrdnComponent } from './stepsdrdn/stepsdrdn.component';
import { RelationshipcardComponent } from './relationshipcard/relationshipcard.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FinanceComponent } from './finance/finance.component';
import { CommunicationComponent } from './communication/communication.component';
import { VerticalMeterComponent } from './vertical-meter/vertical-meter.component';
import { SelectedDDOptionsComponent } from './selected-ddoptions/selected-ddoptions.component';
import { TxplanBackComponent } from './txplan-back/txplan-back.component';
import { NontxplanBackComponent } from './nontxplan-back/nontxplan-back.component';
import { TreatmentNotificationComponent } from './treatment-notification/treatment-notification.component';

import { XrayScanComponent } from './xray-scan/xray-scan.component';
import { PayscheduleComponent } from './payschedule/payschedule.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { PatientProfileHomeComponent } from './patient-profile-home/patient-profile-home.component';

/*import { PatientscheduleComponent } from './modal/patientschedule/patientschedule.component';
import { PatientmodalddComponent } from './modal/patientmodaldd/patientmodaldd.component';*/

import { UploadComponent } from './treatment/upload/upload.component';
import { DropdownComponent } from './treatment/dropdown/dropdown.component';
import { GalleryComponent } from './treatment/gallery/gallery.component';
import { CropImageComponent } from './treatment/crop-image/crop-image.component';
import { GalleryModalComponentComponent } from './treatment/gallery-modal-component/gallery-modal-component.component';
import { ElasticTreatmentComponent } from './elastic-treatment/elastic-treatment.component';
import { ElasticDropdownComponent } from './elastic-treatment/elastic-dropdown/elastic-dropdown.component';
import { MedicalHistoryComponent } from './outreachmain/medical-history/medical-history.component';

import { SearchmoduleModule } from '../shared-module/searchmodule/searchmodule.module';
import { PatientscheduleProfileComponent } from './modal/patientschedule-profile/patientschedule-profile.component';
import { PatientmodalddProfileComponent } from './modal/patientmodaldd-profile/patientmodaldd-profile.component';
import { TxCardDdrpdnComponent } from './treatment/tx-card-ddrpdn/tx-card-ddrpdn.component';
import { GoalsAcordionddnComponent } from './goals-acordionddn/goals-acordionddn.component';

import { NgxFileDropModule } from 'ngx-file-drop';

import { MedicalAlertcardComponent } from './medical-alertcard/medical-alertcard.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { PatientPreferencescardComponent } from './patient-preferencescard/patient-preferencescard.component';
import { PatientPreferencesDropdownComponent } from './patient-preferencescard/patient-preferences-dropdown/patient-preferences-dropdown.component';
import { PatientReferralCardComponent } from './patient-referral-card/patient-referral-card.component';
import { ProfessionalReferralCardComponent, DoctorReferralModule } from './professional-referral-card/professional-referral-card.component';
import { DoctorReferralInComponent } from './professional-referral-card/doctor-referral-in/doctor-referral-in.component';
import { DoctorReferralOutComponent } from './professional-referral-card/doctor-referral-out/doctor-referral-out.component';

import { PatientStatusComponent } from './outreachmain/patient-status/patient-status.component';
import { DentistCardComponent, DentistReferralModule } from './dentist-card/dentist-card.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { BracketCardComponent } from './bracket-card/bracket-card.component';
import { DateSelectorComponent } from './outreachmain/date-selector/date-selector.component';
import { DropdownRelationshipCardComponent } from './relationshipcard/dropdown-relationship-card/dropdown-relationship-card.component';
import { DoctorLocationComponent } from './doctor-location/doctor-location.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    CommonModule,
	FlexLayoutModule,
	MatIconModule,
	MatDialogModule,
	MatButtonModule,
	MatAutocompleteModule,
	Outreachrouting,
	PerfectScrollbarModule,
	TextMaskModule,
	FormsModule,
	MatDatepickerModule,
	MatNativeDateModule,
	SearchmoduleModule,
	NgxFileDropModule,
	ImageCropperModule
  ],
  
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  
  declarations: [OutreachmainComponent, TreatmentComponent, ChairComponent, AcordionddnComponent, MultileveldrpdnComponent, TreatmentmeterComponent, CardaccordionComponent, StepsdrdnComponent, RelationshipcardComponent, FinanceComponent, CommunicationComponent, VerticalMeterComponent, SelectedDDOptionsComponent, TxplanBackComponent, NontxplanBackComponent, TreatmentNotificationComponent, XrayScanComponent, PayscheduleComponent, PatientProfileHomeComponent, PatientBox, UploadComponent, DropdownComponent, GalleryComponent, CropImageComponent, GalleryModalComponentComponent, ElasticTreatmentComponent, ElasticDropdownComponent, MedicalHistoryComponent, MedicalHistory, PatientscheduleProfileComponent, PatientmodalddProfileComponent, CreateAppointment, TxCardDdrpdnComponent, GoalsAcordionddnComponent, ImageModal, MedicalAlertcardComponent, CommentCardComponent, PatientPreferencescardComponent, PatientPreferencesDropdownComponent, PatientReferralCardComponent, PatientStatusComponent, DentistCardComponent, ProfessionalReferralCardComponent, DoctorReferralModule, DoctorReferralInComponent, DoctorReferralOutComponent, BracketCardComponent, DateSelectorComponent, DropdownRelationshipCardComponent, DoctorLocationComponent, DentistReferralModule],
  
  entryComponents: [PatientBox, ImageModal, MedicalHistoryComponent, MedicalHistory, CreateAppointment, DoctorReferralModule, DentistReferralModule]
})
export class OutreachModule { }
