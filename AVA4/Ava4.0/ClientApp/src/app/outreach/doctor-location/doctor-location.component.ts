import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-doctor-location',
  templateUrl: './doctor-location.component.html',
  styleUrls: ['./doctor-location.component.css']
})
export class DoctorLocationComponent implements OnInit {
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	
	@Input() section: any;
	@Output() saveDoctorArray = new EventEmitter();

	doctorAlocationFilter: boolean= false;

	defaultDoctor:boolean = false;
	searchPlaceholderTxt: any;
	searchDoctorArr:any[] = [];
	searchLocationArr:any[] = [];
	
	selectedDoctor: any = {};
	
	doctorListArr=[
		{'id': 17, 'doctorname': 'Addison, Mary', 'location': 'Spanish Fork, UT', 'designation': 'Ortho', 'selected': false, 'accept': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
			{ 'clinicname': 'Sunshine Dentistry', 'city': 'Spanish Forke', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
							
			{ 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 18, 'doctorname': 'Adomson, Larry', 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
			{ 'clinicname': 'Sunshine Larry Dentistry', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
							
			{ 'clinicname': 'Riverside Larry Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 19, 'doctorname': 'Bentley, George', 'designation': 'Admin', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine George Dentistry', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside George Dental Care', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 20, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside John Dental Care', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 21, 'doctorname': 'Thompson, Harry', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine Dental Dentistry', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},
  ];

	  locationListArr: any [] = [
		{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jim Holmes', 'designation':'OS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Jane Nolan', 'designation':'Pedo', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
	
		{'id': 2, 'clinicname': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Canyon Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Canyon Tyson Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Canyon Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Canyon Tobler', 'designation':'DDS', 'selected': true, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Canyon Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Canyon Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Creek Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Creek Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Creek Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler Creek', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Creek Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Creek Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Ston Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Ston Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Ston Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Ston Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Ston Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Ston Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 5, 'clinicname': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Orem Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Orem Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Orem Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Orem Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Orem Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Orem Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jordan Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Jordan Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Jordan Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Jordan Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Jordan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Jordan Kate Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
	
		{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Care Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Care Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Care Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Care Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Care Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone Care', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Mcmurtrey Moab', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Moab Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Moab Brett Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler Moab', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Moab Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone Moab', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
	  ];
	
  constructor(private messageService: MessageService) {
	
  }

  ngOnInit() {
	this.doctorAlocationFilterFn();
  }
  
  showDoctorDetail(id)
  {
    this.locationListArr.map((element,key) => {
      if(element.selected==true && element.id != id)
        {
          element.selected= false;
        }
     });
	 
	
	let index: any = this.locationListArr.findIndex(elem => {
		return elem.id == id;
	});
	
	this.locationListArr[index].selected = this.locationListArr[index].selected==false ? true : false;

  }

  showLocationDetail(id)
  {
    this.doctorListArr.map((element,key) => {
		if(element.selected==true && element.id != id) {
			element.selected= false;
		}
     });
	 
	 let index: any = this.doctorListArr.findIndex(elem => {
		return elem.id == id;
	});
	 
    this.doctorListArr[index].selected = this.doctorListArr[index].selected==false ? true : false;
   
  }

  selectDoctor(id, index) {
	let inxd: any = this.locationListArr.findIndex(elem => {
		return elem.id == id;
	});
	
	this.locationListArr[inxd]['doctoroptions'].map((elem, i) => {
		if(elem.selected == true && index != i){
			elem.selected = false;
		}
	});
	
    this.locationListArr[inxd]['doctoroptions'][index].selected = this.locationListArr[inxd]['doctoroptions'][index].selected==false ? true : false;
	
	/*
	
	{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jim Holmes', 'designation':'OS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Jane Nolan', 'designation':'Pedo', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]}
	
	*/
	
	this.selectedDoctor = {
		'id': this.locationListArr[inxd].id, 
		'doctorname': this.locationListArr[inxd]['doctoroptions'][index].doctorname, 
		'designation': this.locationListArr[inxd]['doctoroptions'][index].designation, 
		'phone': this.locationListArr[inxd]['doctoroptions'][index].phone, 
		'email': this.locationListArr[inxd]['doctoroptions'][index].email,
		'location': {
			'clinicname': this.locationListArr[inxd].clinicname, 
			'city': this.locationListArr[inxd].city,
			'state': this.locationListArr[inxd].state,
			'addr': this.locationListArr[inxd].addr,
			'phone': this.locationListArr[inxd].phone
		}
		
	}
	
  }

  selectClinic(id, index){
   let inxd: any = this.doctorListArr.findIndex(elem => {
		return elem.id == id;
	});
	
	this.doctorListArr[inxd]['clinicnames'].map((elem, i) => {
		if(elem.selected == true && index != i){
			elem.selected = false;
		}
	});
	
    this.doctorListArr[inxd]['clinicnames'][index].selected = this.doctorListArr[inxd]['clinicnames'][index].selected==false ? true : false;
	
	
	this.selectedDoctor = {
		'id': this.doctorListArr[inxd].id, 
		'doctorname': this.doctorListArr[inxd].doctorname, 
		'designation': this.doctorListArr[inxd].designation, 
		'phone': this.doctorListArr[inxd].phone, 
		'email': this.doctorListArr[inxd].email,
		'location': {
			'clinicname': this.doctorListArr[inxd]['clinicnames'][index].clinicname, 
			'city': this.doctorListArr[inxd]['clinicnames'][index].city,
			'state': this.doctorListArr[inxd]['clinicnames'][index].state,
			'addr': this.doctorListArr[inxd]['clinicnames'][index].addr,
			'phone': this.doctorListArr[inxd]['clinicnames'][index].phone
		}
		
	}
    
  }

  saveDetails() {
	
	/*if(this.section == 'doctorRefIn'){
		this.messageService.sendMessage('savedoctorFilterforCls', this.doctorListArr);
		this.messageService.sendMessage('savedoctorforCls', this.locationListArr);
				
	} else {
		this.messageService.sendMessage('savedoctorFilterforoutCls', this.doctorListArr);
		this.messageService.sendMessage('savedoctorforOut', this.locationListArr);
	}*/
	
	/*if(this.defaultDoctor == true) {
		this.saveDoctorArray.emit(this.doctorListArr);
	} else {
		this.saveDoctorArray.emit(this.locationListArr);
	}*/
	
	this.saveDoctorArray.emit(this.selectedDoctor);
	
  }

  doctorAlocationFilterFn() {
    if(this.defaultDoctor == true) {
		this.searchPlaceholderTxt = 'Find by location';
		this.searchLocationArr = this.locationListArr;
		this.defaultDoctor = false;
    } else {
		this.searchPlaceholderTxt = 'Find doctor...';
		this.searchDoctorArr = this.doctorListArr;
		this.defaultDoctor = true;
    }
  }
  
  search(evt){
	
	let searchTxt: any = evt.target.value;
	let searchItem: any = searchTxt.toLowerCase();
	
	if(this.defaultDoctor){
		if(searchItem.length > 1){
		
			this.searchDoctorArr = this.doctorListArr.filter(item => {
				return (item.doctorname.toLowerCase().includes(searchItem));
			})
		} else {
			this.searchDoctorArr = this.doctorListArr;
		} 
	} else {
		if(searchItem.length > 1){
			this.searchLocationArr = this.locationListArr.filter(item => {
				return (item.clinicname.toLowerCase().includes(searchItem));
			})
		} else {
			this.searchLocationArr = this.locationListArr;
		}
	}
  }

}
