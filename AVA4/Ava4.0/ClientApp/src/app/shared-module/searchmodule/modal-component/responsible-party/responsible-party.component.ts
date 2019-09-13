import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';
import {MessageService} from '../../../../core/message.service';


@Component({
  selector: 'app-responsible-party',
  templateUrl: './responsible-party.component.html',
  styleUrls: ['./responsible-party.component.css']
})
export class ResponsiblePartyComponent implements OnInit {
	
	@Input() patientinfo: any;
	@Input() newPratientData: any;
	@Input() responsibleBackup: any;

	@Output() backtoparent = new EventEmitter();
	@Output() responsibleBackupval=  new EventEmitter();

	emailMask = emailMask;
	storeBackupResposibleVal: any={};

	phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	ssnmask: any = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	zipcodeMask: any = [/\d/, /\d/, /\d/, /\d/, /\d/];
	
	relationshiparr: any[] = [{"option": "Relationship to patient"}, {"option": "Mother"}, {"option": "Father"}, {"option": "Spouse"}, {"option": "Stepmother"}, {"option": "Stepfather"}, {"option": "Grandmother"}, {"option": "Grandfather"}, {"option": "Foster Parent"}, {"option": "Partner"}, {"option": "Aunt"}, {"option": "Uncle"}, {"option": "Other"}];
	
	name_data: any = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "state": "UT", "city": "Salt Lake City", "zip": "84109"},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "state": "UT", "city": "Draper", "zip": "84070"},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "state": "UT", "city": "Draper", "zip": "84070"},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "state": "UT", "city": "Orem", "zip": "84058"},
		
		{"id": 5, "firstname": "Dover", "lastname": "Benson", "dob": "08/20/1993", "email": "doverbenson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "state": "UT", "city": "Orem", "zip": "84058"},
		
		{"id": 5, "firstname": "Kate", "lastname": "Dover", "dob": "03/22/1978", "email": "tatedover@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "state": "UT", "city": "Orem", "zip": "84058"},
		
		{"id": 5, "firstname": "Mary", "lastname": "Dover", "dob": "07/03/1972", "email": "marydover@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "state": "UT", "city": "Orem", "zip": "84058"},
	];
	
	searchactive: boolean = false;
	filterPatient: any[] = [];
	showFamilyResult:boolean = false;
	responsiblefname: any;
	responsiblelname: any;
	responsibleemail: any;
	responsiblephone: any;
	responsibledob: any;
	responsibleStreet:any;
	responsibleState: any;
	responsibleCity: any;
	responsibleZip: any;
	
	sameaddr:boolean = false;
	policyholder:boolean = false;
	searchParty: any;
	
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
	
	showConfirmation: boolean=false;
	errorMessage: any;
	newResponsiblePartyform: FormGroup;
	patientResponsible: boolean= false;
	patientInsuranceHolder: boolean = false;
	open: any='yes';

  constructor(private formBuilder: FormBuilder, private dataService: MessageService) { }

  ngOnInit() {
	
	
				this.initializeResponsiblePartyform();
			
				this.newResponsiblePartyform.get('responsiblefname').setValue(this.responsibleBackup.storeBackup.responsiblefname);
				
				this.newResponsiblePartyform.get('responsiblemiddlename').setValue(this.responsibleBackup.storeBackup.patientMiddleName);

				this.newResponsiblePartyform.get('responsiblelastname').setValue(this.responsibleBackup.storeBackup.responsiblelastname);
				this.newResponsiblePartyform.get('responsibleemail').setValue(this.responsibleBackup.storeBackup.responsibleemail);
				this.newResponsiblePartyform.get('responsiblephone').setValue(this.responsibleBackup.storeBackup.responsiblephone);
				this.newResponsiblePartyform.get('responsibledob').setValue(this.responsibleBackup.storeBackup.responsibledob);
				this.newResponsiblePartyform.get('responsibleStreet').setValue(this.responsibleBackup.storeBackup.responsibleStreet);

				this.newResponsiblePartyform.get('responsibleState').setValue(this.responsibleBackup.storeBackup.responsibleState);
				this.newResponsiblePartyform.get('responsibleCity').setValue(this.responsibleBackup.storeBackup.responsibleCity);
				this.newResponsiblePartyform.get('responsibleZip').setValue(this.responsibleBackup.storeBackup.responsibleZip);

				this.newResponsiblePartyform.get('responsiblePreferred').setValue(this.responsibleBackup.storeBackup.responsiblePreferred);
				this.newResponsiblePartyform.get('responsibleHomeNu').setValue(this.responsibleBackup.storeBackup.responsibleHomeNu);
				this.newResponsiblePartyform.get('responsibleSsn').setValue(this.responsibleBackup.storeBackup.responsibleSsn);

				this.newResponsiblePartyform.get('responsibleEmp').setValue(this.responsibleBackup.storeBackup.responsibleEmp);

				this.sameaddr=this.responsibleBackup.sameaddr;
				this.policyholder= this.responsibleBackup.policyholder;
				if(this.policyholder==true)
				{
					this.patientInsuranceHolder= true;
				}
				this.patientResponsible= this.responsibleBackup.patientResponsible;
			
	
	
	}
	  
	initializeResponsiblePartyform(){
	this.newResponsiblePartyform = this.formBuilder.group({
	
		responsiblefname : ['', Validators.required],
		responsiblemiddlename: [''],

		responsiblelastname: ['', Validators.required],

		responsibleemail: ['', [Validators.required, Validators.email]],
		responsiblephone: ['', [Validators.required,Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
		responsibledob: [''],
		responsibleStreet: [''],
		responsibleState: [''],
		responsibleCity: [''],
		responsibleZip: [''],
		responsiblePreferred: [''],
		responsibleHomeNu: [''],
		responsibleInsurance: [''],
		responsibleSsn: [''],
		responsibleEmpid: [''],
		responsibleEmp: [''],
		responsibleGroup: ['']
		
		
		});
	
	}

	onSubmitResponsiblePartyform()
	{
		//console.log(this.newPratientform.value)	;
		if (this.newResponsiblePartyform.invalid) {
			this.showConfirmation = true;
			
			if(this.newResponsiblePartyform.controls.responsiblefname.value=='')
			{
				this.errorMessage= 'Ooops! \n' +
				'add a first name for this patient.\n';
			
			}
			else if(this.newResponsiblePartyform.controls.responsiblelastname.value=='')
			{
				this.errorMessage= 'Ooops! \n' +
				'add a last name for this patient.\n';
			
			}else 
			if ((this.newResponsiblePartyform.controls.responsibleemail.value=='' || (this.newResponsiblePartyform.controls.responsibleemail.value!='' && this.newResponsiblePartyform.controls.responsibleemail.invalid)) && (this.newResponsiblePartyform.controls.responsiblephone.value=='' || (this.newResponsiblePartyform.controls.responsiblephone.value!='' && this.newResponsiblePartyform.controls.responsiblephone.invalid)))
			{
				this.errorMessage= 'Ooops! \n' +
				'add a contact phone \n or email for this patient.\n';
			}
			else 
			{
				this.showConfirmation = false;
				this. saveResponsible();
			}

		
            return;
		}else {
			this. saveResponsible();
		}
		
	}
  
  changePolicyholder_chk(evt){
	this.policyholder = evt.target.checked;
	
	if(this.policyholder){
		this.patientInsuranceHolder= true;
		this.responsiblefname = this.patientinfo.fname;
		this.responsiblelname = this.patientinfo.lname;
		this.responsibleemail = this.patientinfo.email;
		this.responsiblephone = this.patientinfo.cellphone;
		this.responsibledob = this.patientinfo.birthday;
		this.responsibleStreet = this.patientinfo.street;
		this.responsibleState = this.patientinfo.state;
		this.responsibleCity = this.patientinfo.city;
		this.responsibleZip = this.patientinfo.zip;
	} else {
		this.patientInsuranceHolder= false;
		if(this.searchParty){
			this.responsiblefname = this.searchParty.firstname;
			this.responsiblelname = this.searchParty.lastname;
			this.responsibleemail = this.searchParty.email;
			this.responsiblephone = this.searchParty.phone;
			this.responsibledob = this.searchParty.dob;
			this.responsibleStreet = this.searchParty.address;
			this.responsibleState = this.searchParty.state;
			this.responsibleCity = this.searchParty.city;
			this.responsibleZip = this.searchParty.zip;
		} else {
			this.responsiblefname = "";
			this.responsiblelname = "";
			this.responsibleemail = "";
			this.responsiblephone = "";
			this.responsibledob = "";
			this.responsibleStreet = "";
			this.responsibleState = "";
			this.responsibleCity = "";
			this.responsibleZip = "";
		}
	}
	
	
  }
  
  changeSameaddr_chk(evt){
	this.sameaddr = evt.target.checked;
	
	if(this.sameaddr){
	
		this.newResponsiblePartyform.get('responsibleStreet').setValue(this.newPratientData.patientStreetAd);
		this.newResponsiblePartyform.get('responsibleState').setValue(this.newPratientData.patientState);
		this.newResponsiblePartyform.get('responsibleCity').setValue(this.newPratientData.patientCity);
		this.newResponsiblePartyform.get('responsibleZip').setValue(this.newPratientData.patientZipCode);
		this.newResponsiblePartyform.get('responsibleHomeNu').setValue(this.newPratientData.patientHomePh);
		this.newResponsiblePartyform.get('responsiblephone').setValue(this.newPratientData.patientCellPhone);



	} else {
		if(this.searchParty){
		this.newResponsiblePartyform.get('responsibleStreet').setValue(this.newPratientData.patientStreetAd);
		this.newResponsiblePartyform.get('responsibleState').setValue(this.newPratientData.patientState);
		this.newResponsiblePartyform.get('responsibleCity').setValue(this.newPratientData.patientCity);
		this.newResponsiblePartyform.get('responsibleZip').setValue(this.newPratientData.patientZipCode);
		this.newResponsiblePartyform.get('responsibleHomeNu').setValue(this.newPratientData.patientHomePh);
		this.newResponsiblePartyform.get('responsiblephone').setValue(this.newPratientData.patientCellPhone);


		} else {
		this.newResponsiblePartyform.get('responsibleStreet').setValue('');
		this.newResponsiblePartyform.get('responsibleState').setValue('');
		this.newResponsiblePartyform.get('responsibleCity').setValue('');
		this.newResponsiblePartyform.get('responsibleZip').setValue('');
		this.newResponsiblePartyform.get('responsibleHomeNu').setValue('');
		this.newResponsiblePartyform.get('responsiblephone').setValue('');


		}
	}
  }
  
  dateMask() {
	const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
	return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
  }
  
  
  saveResponsible()
  {
	this.backtoparent.emit('backtoparent');
  }
  
  activeSearchPanel() {
	this.searchactive = true;
  }
  
  searchResponsible(_searchStr){
	let searchStr: any = _searchStr.toLowerCase();
	this.filterPatient = [];
	this.showFamilyResult = false;
	
	if(searchStr.length > 1){
		this.filterPatient = this.name_data.filter(item => {
			return (item.firstname.toLowerCase().includes(searchStr) || item.lastname.toLowerCase().includes(searchStr));
		});
		
		if(this.filterPatient.length == 0){
			this.filterPatient.push({"firstname": "No patient found!"})
		}
		this.showFamilyResult = true;
	}
  }
  
  selectResponsible(item) {
	
	this.searchParty = item;
	
	this.newResponsiblePartyform.get('responsiblefname').setValue(this.searchParty.firstname);

	this.newResponsiblePartyform.get('responsiblelastname').setValue(this.searchParty.lastname);
	this.newResponsiblePartyform.get('responsibleemail').setValue(this.searchParty.email);
	this.newResponsiblePartyform.get('responsiblephone').setValue(this.searchParty.phone);
	this.newResponsiblePartyform.get('responsibledob').setValue(this.searchParty.dob);
	this.newResponsiblePartyform.get('responsibleStreet').setValue(this.searchParty.address);

	this.newResponsiblePartyform.get('responsibleState').setValue(this.searchParty.state);
	this.newResponsiblePartyform.get('responsibleCity').setValue(this.searchParty.city);
	this.newResponsiblePartyform.get('responsibleZip').setValue(this.searchParty.zip);

	
	this.showFamilyResult = false;
	this.searchactive = false;
  }


  btnAction(action){
		if(action == 'back'){
			this.showConfirmation = false;
		} 
	}

	checkPatientResponsible()
	{
		this.patientResponsible= this.patientResponsible== false ? true : false ;
		if(this.patientResponsible==true)
		{
			this.patientInsuranceHolder = true; 

			this.newResponsiblePartyform.get('responsiblefname').setValue(this.newPratientData.patientFirstName);
			this.newResponsiblePartyform.get('responsiblemiddlename').setValue(this.newPratientData.patientMiddleName);

			this.newResponsiblePartyform.get('responsiblelastname').setValue(this.newPratientData.patientLastName);
			this.newResponsiblePartyform.get('responsibleemail').setValue(this.newPratientData.patientEmail);
			this.newResponsiblePartyform.get('responsiblephone').setValue(this.newPratientData.patientCellPhone);
			this.newResponsiblePartyform.get('responsibledob').setValue(this.newPratientData.patientdob);
			this.newResponsiblePartyform.get('responsibleStreet').setValue(this.newPratientData.patientStreetAd);

			this.newResponsiblePartyform.get('responsibleState').setValue(this.newPratientData.patientState);
			this.newResponsiblePartyform.get('responsibleCity').setValue(this.newPratientData.patientCity);
			this.newResponsiblePartyform.get('responsibleZip').setValue(this.newPratientData.patientZipCode);

			this.newResponsiblePartyform.get('responsiblePreferred').setValue(this.newPratientData.patientPreferred);
			this.newResponsiblePartyform.get('responsibleHomeNu').setValue(this.newPratientData.patientHomePh);
			//this.newResponsiblePartyform.get('responsibleInsurance').setValue(this.newPratientData.patientdob);
			this.newResponsiblePartyform.get('responsibleSsn').setValue(this.newPratientData.patientSsn);

			//this.newResponsiblePartyform.get('responsibleEmpid').setValue(this.newPratientData.patientState);
			this.newResponsiblePartyform.get('responsibleEmp').setValue(this.newPratientData.patientEmp);
			//this.newResponsiblePartyform.get('responsibleGroup').setValue(this.newPratientData.patientCity);
			this.sameaddr=true;
			this.policyholder= true;

		}else {

			this.patientInsuranceHolder = false; 
			this.newResponsiblePartyform.get('responsiblefname').setValue('');
			this.newResponsiblePartyform.get('responsiblemiddlename').setValue('');

			this.newResponsiblePartyform.get('responsiblelastname').setValue('');
			this.newResponsiblePartyform.get('responsibleemail').setValue('');
			this.newResponsiblePartyform.get('responsiblephone').setValue('');
			this.newResponsiblePartyform.get('responsibledob').setValue('');
			this.newResponsiblePartyform.get('responsibleStreet').setValue('');

			this.newResponsiblePartyform.get('responsibleState').setValue('');
			this.newResponsiblePartyform.get('responsibleCity').setValue('');
			this.newResponsiblePartyform.get('responsibleZip').setValue('');

			this.newResponsiblePartyform.get('responsiblePreferred').setValue('');
			this.newResponsiblePartyform.get('responsibleHomeNu').setValue('');
			//this.newResponsiblePartyform.get('responsibleInsurance').setValue(this.newPratientData.patientdob);
			this.newResponsiblePartyform.get('responsibleSsn').setValue('');

			//this.newResponsiblePartyform.get('responsibleEmpid').setValue(this.newPratientData.patientState);
			this.newResponsiblePartyform.get('responsibleEmp').setValue('');
			//this.newResponsiblePartyform.get('responsibleGroup').setValue(this.newPratientData.patientCity);
			this.sameaddr=false;
			this.policyholder= false;
		}
	}


	cancel() {

		
		this.storeBackupResposibleVal['storeBackup']= this.newResponsiblePartyform.value;
		this.storeBackupResposibleVal['sameaddr']=this.sameaddr;
		this.storeBackupResposibleVal['policyholder']=this.policyholder;
		this.storeBackupResposibleVal['patientResponsible']=this.patientResponsible;

		this.responsibleBackupval.emit(this.storeBackupResposibleVal);
		this.backtoparent.emit('backtoparent');
	  }


}
