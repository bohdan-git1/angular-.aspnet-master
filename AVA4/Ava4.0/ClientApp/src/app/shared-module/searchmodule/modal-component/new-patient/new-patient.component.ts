import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../../core/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {
	
	@Output() showCreateAppnt = new EventEmitter();
	@Output() showProcedureEvent = new EventEmitter();
	@Output() passPatientInfo= new EventEmitter();
	emailMask = emailMask;
	
	@Input() patientPopUpOpen: any;
	responsibleBackup: any={};
	
	preferredPracArr: any[] = [{"option": "Preferred Location"}, {"option": "Lehi"}, {"option": "Provo"}, {"option": "Salt Lake City"}];
	
	preferredDoctorArr: any[] = [{"option": "Preferred Doctor"}, {"option": "Dr. Smoot"}, {"option": "Dr. Tobler"}, {"option": "Dr. Wilson"}];

	

	genderArr: any[] = [{"option": "Female"}, {"option": "Male"}];
	
	familyNameArr: any[] = [
		{"patientname": "Braiden Higa", "familyname": "Tea Family", "address": "1415 S. Jasper Ave."},
		{"patientname": "Dougie Higa", "familyname": "Douglas Higa Family", "address": "229 W 1060 S"},
		{"patientname": "Douglas Higa", "familyname": "Douglas Higa Family", "address": "229 W 1060 S"},
		{"patientname": "Jessica Higa", "familyname": "Douglas Higa Family", "address": "229 W 1060 S"},
		{"patientname": "Jason Higa", "familyname": "Higa Family", "address": "1656 Grand Ave."},
		{"patientname": "Jason Higa Jr.", "familyname": "Higa Family", "address": "1656 Grand Ave."},
		{"patientname": "Ryan Higa", "familyname": "", "address": "1235 NE 7th Ave"},
		{"patientname": "Sheila Higa", "familyname": "Higa Family", "address": "1656 Grand Ave."}
	
	]
	
	filterPatientFamily: any[] = [];
	showFamilyResult: boolean = false;
	searchedFamily:any = '';
	familyName: any;
	newPratientData: any;
	
	phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	
	dobmask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
	
	/*dobmask: any = [/[0-1]/, /[0-9]/, '/', /[0-3]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
	
	dobmask: any = [/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/]*/
	
	ssnmask: any = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	zipcodeMask: any = [/\d/, /\d/, /\d/, /\d/, /\d/];
	
	showConfirmation: boolean = false;
	showResponsibleParty_modal: boolean = false;
	
	patientInfo: any = {
		"fname" : "",
		"mname": "",
		"lname": "",
		"prefferedname": "",
		"birthday": "",
		"ssn": "",
		"email": "",
		"cellphone": "",
		"homephone": "",
		"street": "",
		"city": "",
		"state": "",
		"zip": "",
		"employer":""
	}
	
	errorMessage= 'Are you sure you want to abandon patient information before saving?';
	abandonButton: boolean= false;
	newPratientform: FormGroup;

	showPatientResult: boolean = false ;
	filterPatient: any[] = [];

	patient_data: any = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "SP", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "FA", "is_patient": true}, {"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "MO", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "SP", "is_patient": true}, {"id": 3, "firstname": "Lydia", "lastname": "Adams", "relation_type": "MO", "is_patient": true}], "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true}
	];

	searchEnable: boolean = false;


	
  constructor(private formBuilder: FormBuilder,private dataService: MessageService) { }

  ngOnInit() {
	this.initializePatientForm();
  }

 

  initializePatientForm(){
		
	this.newPratientform = this.formBuilder.group({
	
		patientFirstName : ['', Validators.required],
		patientLastName : ['', Validators.required],
		patientEmail: ['', [Validators.required, Validators.email]],
		patientCellPhone: ['', [Validators.required,Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],

		patientdob : [''],
		patientMiddleName : [''],
		patientSsn : [''],
		patientPreferred : [''],
		patientEmp : [''],
		patientHomePh : [''],
		patientStreetAd : [''],
		patientCity : [''],
		patientState : [''],
		patientZipCode : [''],
		patientSearchFamily : [''],
		patientEditFamily : [''],

		
		});
	
	}

	onSubmitNewPatientform(type)
	{

		this.newPratientData= this.newPratientform.value;

		if (this.newPratientform.invalid) {
			this.showConfirmation = true;
			this.abandonButton= false;
			if(this.newPratientform.controls.patientFirstName.value=='')
			{
				this.errorMessage= 'Ooops! \n' +
				'add a first name for this patient.\n';
			
			}
			else if(this.newPratientform.controls.patientLastName.value=='')
			{
				this.errorMessage= 'Ooops! \n' +
				'add a last name for this patient.\n';
			
			}else
			if ((this.newPratientform.controls.patientEmail.value=='' || (this.newPratientform.controls.patientEmail.value!='' && this.newPratientform.controls.patientEmail.invalid)) &&  (this.newPratientform.controls.patientCellPhone.value=='' || (this.newPratientform.controls.patientCellPhone.value!='' && this.newPratientform.controls.patientCellPhone.invalid)))
			{
				this.errorMessage= 'Ooops! \n' +
				'add a contact phone \n or email for this patient.\n';
			}else {
				this.showConfirmation = false;
				this.abandonButton= false;
				if(type=='save')
				{
					this.scheduled();
				}else {
					this.showResponsibleParty();
				}
			}
			 
            return;
		}else {
			if(type=='save')
				{
					this.scheduled();
				}else {
					this.showResponsibleParty();
				}
		}
		
	}
  
  
  
  dateMask() {
	const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
	return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
  }
  
  enableSearchOption()
  {
	  this.searchEnable= this.searchEnable== false ? true : false ;
	  if( this.searchEnable== false)
	  {
		this.showPatientResult = false;
	  }
  }

  selectPatient(selectedData)
  {
	if(selectedData.firstname=='No patient found!')
	{
		//this.searchEnable= true;
		//this.newPratientform.get('patientFirstName').setValue('');
	}else {
		this.newPratientform.get('patientFirstName').setValue(selectedData.firstname);
		this.searchEnable= false;
	}
	this.searchEnable= false;
	this.showPatientResult= false;

  }

  findPatient(_searchStr){
	let searchStr: any = _searchStr.toLowerCase();
	this.filterPatient = [];
	this.showPatientResult = false;
	
	if(searchStr.length > 1 && this.searchEnable== true ){
		this.filterPatient = this.patient_data.filter(item => {
			return item.firstname.toLowerCase().includes(searchStr);
		});
		
		this.showPatientResult = true;
		if(this.filterPatient.length == 0){
			//this.showPatientResult = false;
			this.filterPatient.push({"firstname": "No patient found!"})
		}
		
	}
  }


  findFamily(_searchStr){
	let searchStr: any = _searchStr.toLowerCase();
	this.filterPatientFamily = [];
	this.showFamilyResult = false;
	
	if(searchStr.length > 1){
		this.filterPatientFamily = this.familyNameArr.filter(item => {
			return item.patientname.toLowerCase().includes(searchStr);
		});
		
		if(this.filterPatientFamily.length == 0){
			this.filterPatientFamily.push({"patientname": "No patient found!"})
		}
		this.showFamilyResult = true;
	}
  }
  
  selectFamily(searchitem){
	this.searchedFamily = searchitem.address;
	this.familyName = searchitem.familyname;
	
	this.newPratientform.get('patientSearchFamily').setValue(this.searchedFamily);
	this.newPratientform.get('patientEditFamily').setValue(this.familyName);
	this.showFamilyResult = false;
  }
  
	scheduled() {
		if(this.patientPopUpOpen=='emptyCell')
		{
			this.showProcedureEvent.emit("showProcedureEvent");
		}else {
			this.showCreateAppnt.emit("showcreateappnt");
			this.passPatientInfo.emit(this.newPratientform.value);
		} 
 
	}
	
	cancel() {
		this.showConfirmation = true;
		this.errorMessage= 'Are you sure you want to abandon patient information before saving?';
		this.abandonButton= true;

	}
	
	btnAction(action){
		if(action == 'back'){
			this.showConfirmation = false;
		} else  {
			if(this.patientPopUpOpen=='emptyCell')
			{
				this.showProcedureEvent.emit("showProcedureEvent");
			}else {
				this.showCreateAppnt.emit("showcreateappnt");
			}
		
		}
	}
	
	showResponsibleParty(){
		this.showResponsibleParty_modal = true;
	}

	responsibleBackupval(evt)
	{
		this.responsibleBackup= evt;
	}

}
