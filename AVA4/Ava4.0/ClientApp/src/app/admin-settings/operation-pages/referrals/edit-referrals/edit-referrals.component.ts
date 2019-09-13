import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import emailMask from 'text-mask-addons/dist/emailMask';
import { MessageService } from '../../../../core/message.service';


@Component({
  selector: 'app-edit-referrals',
  templateUrl: './edit-referrals.component.html',
  styleUrls: ['./edit-referrals.component.css']
})
export class EditReferralsComponent implements OnInit {
	
	@Input() editdoctor: any;
	@Input() editabledata: any;
	emailMask = emailMask;
	
	anotheroptns_location:boolean = false;
	anotheroptns_doctor:boolean = false;
	error: boolean = false;
	
	selectedLocArr: any[] = [];
	selectedDocArr: any[] = [];
	
	drpdnDocArr: any[] = [];
	drpdnLocArr: any[] = [];
	
	locationform: FormGroup;
	doctorform: FormGroup;
	groupData: any[]=[
		{'label': 'Dentist' , 'selected': false},
		{'label': 'Oral Surgeon' , 'selected': false},
		{'label': 'Periodontist' , 'selected': false},
		{'label': 'Pedodontist' , 'selected': false},
		{'label': 'Endodontist' , 'selected': false},
	];
	isArraychek: boolean =false;

	validation: any = {
		'clinicname': {'type': 'required', 'msg': 'Enter location name'},
		'address': {'type': 'required', 'msg': 'Enter address'},
		'city': {'type': 'required', 'msg': 'Enter city'},
		'state': {'type': 'required', 'msg': 'Enter state'},
		'zip': {'type': 'required', 'msg1': 'Enter zipcode', 'msg2': 'Enter valid zipcode'},
		'phone': {'msg1': 'Enter phone number', 'patterncheck': 'pattern',  'msg2': 'Enter a valid phone number'},
		'email': {'msg1': 'Enter email id', 'msg2': 'Enter valid email id', },
		'notes': {'type': 'required', 'msg': 'Enter note'},
		'doctorname': {'type': 'required', 'msg': 'Enter display name'},
		'firstname': {'type': 'required', 'msg': 'Enter first name'},
		'lastname': {'type': 'required', 'msg': 'Enter last name'},
		'designation': {'type': 'required', 'msg': 'Enter degree name'},
		'dob': {'type': 'required', 'msg1': 'Enter birthdate', 'msg2': 'Enter valid birthdate'},
		
		
	};
	
	locationListArr: any [] = [
		{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
	
		{'id': 2, 'clinicname': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
		
		{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
		
		{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
		
		{'id': 5, 'clinicname': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
		
		{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
	
		{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
		
		{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
	];
	  
	doctorListArr=[
		{'id': 1, 'doctorname': 'Dr. Jenny Mcmurtrey', 'firstname': 'Jenny', 'middlename': '', 'lastname': 'Mcmurtrey', 'group': 'Dentist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 2, 'doctorname': 'Dr. Tyson Perrero', 'firstname': 'Tyson', 'middlename': '', 'lastname': 'Perrero', 'group': 'Oral Surgeon', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 3, 'doctorname': 'Dr. Michael Tobler', 'firstname': 'Michael', 'middlename': '', 'lastname': 'Tobler', 'group': 'Periodontist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 5, 'doctorname': 'Dr. Karen Mullins', 'firstname': 'Karen', 'middlename': '', 'lastname': 'Mullins', 'group': 'Pedodontist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 6, 'doctorname': 'Dr. Nathan Tobler', 'firstname': 'Nathan', 'middlename': '', 'lastname': 'Tobler', 'group': 'Endodontist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 7, 'doctorname': 'Dr. Patrick Nobel', 'firstname': 'Patrick', 'middlename': '', 'lastname': 'Nobel', 'group': 'Prosthodontist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 8, 'doctorname': 'Dr. Nelson Remington', 'firstname': 'Nelson', 'middlename': '', 'lastname': 'Remington', 'group': 'Dentist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},

		{'id': 9, 'doctorname': 'Dr. Brett Tobler', 'firstname': 'Brett', 'middlename': '', 'lastname': 'Tobler', 'group': 'Dentist', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 10, 'doctorname': 'Dr. Jane Paulson', 'firstname': 'Jane', 'middlename': '', 'lastname': 'Paulson', 'group': 'Oral Surgeon', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		
		{'id': 11, 'doctorname': 'Dr. Larry Adomson', 'firstname': 'Larry', 'middlename': '', 'lastname': 'Adomson', 'group': 'Oral Surgeon', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},

		{'id': 12, 'doctorname': 'Dr. George Bentley', 'firstname': 'George', 'middlename': '', 'lastname': 'Bentley', 'group': 'Periodontist', 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},

		{'id': 13, 'doctorname': 'Dr. John Smith', 'firstname': 'John', 'middlename': '', 'lastname': 'Smith', 'group': 'Prosthodontist', 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},

		{'id': 14, 'doctorname': 'Dr. Harry Thompson', 'firstname': 'Harry', 'middlename': '', 'lastname': 'Thompson', 'group': 'Pedodontist', 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com'}
	];
	
	phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


	constructor(private formBuilder: FormBuilder,private messageService: MessageService) { }
	
	ngOnInit() {
		this.initalizeData();
		this.initializeLocationForm();
		this.initializeDoctorForm();
		

	}

	dateMask() {
		const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
		return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
	  }


	zipMask: any =[/\d/, /\d/, /\d/, /\d/];

	
	initializeLocationForm(){
		
		this.locationform = this.formBuilder.group({
		
			clinicname: [this.editabledata.clinicname, Validators.required],
			address: [this.editabledata.addr, Validators.required],
			city: [this.editabledata.city, Validators.required],
			state: [this.editabledata.state, Validators.required],
			zip: [this.editabledata.zip, [Validators.required,Validators.pattern('^[0-9]{4}$')]],
		//	phone: [this.editabledata.phone, [Validators.required, Validators.pattern(jp)]],
			phone: [this.editabledata.phone, [Validators.required,Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
			//phone: ['(360) 89', [Validators.required, Validators.minLength(11)]],
			email: [this.editabledata.email, [Validators.required, Validators.email]],
			notes: [this.editabledata.notes, Validators.required],
			faxForlocation: [this.editabledata.fax],
			

		});
	//console.log(this.locationform.controls.zip)	;
	}
	
	initializeDoctorForm()
	{
		this.doctorform = this.formBuilder.group({
			
			doctorname: [this.editabledata.doctorname, Validators.required],
			firstname: [this.editabledata.firstname, Validators.required],
			lastname: [this.editabledata.lastname, Validators.required],
			designation: [this.editabledata.designation, Validators.required],
			//birthday: [this.editabledata.birthday, Validators.required],
			birthday: [this.editabledata.birthday, [Validators.required,Validators.pattern('\\d{2}\\/\\d{2}\\/\\d{4}')]],

			phone: [this.editabledata.phone, [Validators.required,Validators.pattern('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$')]],
			email: [this.editabledata.email, [Validators.required, Validators.email]],
			notes: [this.editabledata.notes, Validators.required],
			nickName: [this.editabledata.nickname],
			middleName: [this.editabledata.middlename],

			


			
		});
		//console.log(this.doctorform.controls.birthday);
	}
	


	initalizeData() {
				
		if(this.editdoctor){
			this.selectedLocArr = this.editabledata.clinicnames;
			
			let selectedLocIds: any = this.selectedLocArr.map(item => {return item.id});
			this.drpdnLocArr = this.locationListArr.filter(item => {
				return !selectedLocIds.includes(item.id);
			});

			if(Array.isArray(this.editabledata.group)){
				this.isArraychek= true; 

				this.editabledata.group.map((element, key)=>{
					this.groupData.map( element1=>{
							
							if(element.label==element1.label)
							{
								element1.selected= true;
							}
					})
				})
			}else {
				this.groupData.map( element1=>{
							
					if(this.editabledata.group==element1.label)
					{
						element1.selected= true;
					}
					})
			}

		} else {
			
			this.selectedDocArr = this.editabledata.doctoroptions;
			let selectedDocids: any = this.selectedDocArr.map(item => {return item.id});
			
			this.drpdnDocArr = this.doctorListArr.filter(item => {
				return !selectedDocids.includes(item.id);
			});

			
		}
	}
	
	showDrpOptns(section){
		if(section == 'doctorlist'){
			this.anotheroptns_doctor = this.anotheroptns_doctor == true ? false : true;
		} else {
			this.anotheroptns_location = this.anotheroptns_location == true ? false : true;
		}
	}
	
	selectAnother(item, section){
		if(section == 'doctor'){
			this.selectedDocArr.push(item);
			
			let docListIndx = this.drpdnDocArr.findIndex(elem => {
				return elem.id == item.id;
			});
			
			this.drpdnDocArr.splice(docListIndx, 1);
			
			this.anotheroptns_doctor = false;
			
		} else {
			this.selectedLocArr.push(item);
			
			let locListIndx = this.drpdnLocArr.findIndex(elem => {
				return elem.id == item.id;
			});
			
			this.drpdnLocArr.splice(locListIndx, 1);
			
			this.anotheroptns_location = false;
		}
	}
	
	removefromList(section, indx){
		if(section == 'location' && this.selectedLocArr.length>1){
			
			this.selectedLocArr.splice(indx, 1);
			let selectedLocIds: any = this.selectedLocArr.map(item => {return item.id});
			this.drpdnLocArr = this.locationListArr.filter(item => {
				return !selectedLocIds.includes(item.id);
			});
		} else if(section == 'doctor' && this.selectedDocArr.length>1){
			
			this.selectedDocArr.splice(indx, 1);
			let selectedDocids: any = this.selectedDocArr.map(item => {return item.id});
			this.drpdnDocArr = this.doctorListArr.filter(item => {
				return !selectedDocids.includes(item.id);
			});
		}
	}
	


	errorTnsf(event)
	{
		this.error=event;
		//console.log(this.groupData);
	}

	onSubmitLocationform()
	{
		if (this.locationform.invalid) {
			
            return;
        }else {
			this.editabledata.clinicname=this.locationform.value.clinicname;
			this.editabledata.addr=this.locationform.value.address;
			this.editabledata.city=this.locationform.value.city;
			this.editabledata.state=this.locationform.value.state;
			this.editabledata.zip=this.locationform.value.zip;
			this.editabledata.phone=this.locationform.value.phone;
			this.editabledata.fax=this.locationform.value.faxForlocation;
			this.editabledata.notes=this.locationform.value.notes;
			this.editabledata.email=this.locationform.value.email;
			this.editabledata.doctoroptions=this.selectedDocArr ;
		}
		this.messageService.sendMessage('closemodal', {'event': 'close'});
	}

	onSubmitDoctorform()
	{
		if (this.doctorform.invalid) {
            return;
        }else {
		
		this.editabledata.doctorname=this.doctorform.value.doctorname;
		this.editabledata.firstname=this.doctorform.value.firstname;
		this.editabledata.middlename=this.doctorform.value.middleName;
		this.editabledata.lastname=this.doctorform.value.lastname;
		this.editabledata.designation=this.doctorform.value.designation;
		this.editabledata.nickname=this.doctorform.value.nickName;
		this.editabledata.birthday=this.doctorform.value.birthday;
		this.editabledata.phone=this.doctorform.value.phone;
		this.editabledata.email=this.doctorform.value.email;
		this.editabledata.notes=this.doctorform.value.notes;
		this.editabledata.clinicnames=this.selectedLocArr ;

		this.groupData= this.groupData.filter(item => {
			if(item.selected==true)
			{
				return true;
			}
		});

		this.editabledata.group=this.groupData ;
		this.messageService.sendMessage('closemodal', {'event': 'close'});
		}
	}

	
}
