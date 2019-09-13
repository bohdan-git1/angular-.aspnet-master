import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-dentist-card',
  templateUrl: './dentist-card.component.html',
  styleUrls: ['./dentist-card.component.css']
})
export class DentistCardComponent implements OnInit {

  refInsearchBox: boolean= false;
  refOutsearchBox: boolean= false;

  refInsearch: boolean= false;
  refOutsearch: boolean= false;
 
  drListArr: any[] = [
	{"name": "Dr. Jenny Mcmurtrey", "designation": "DDS", "clinic": "Apex Dental", 'phone':'360-892-4242', 'address':'12345 Main Street', 'cityandzip':'Vancouver, WA 98684'},
	{"name": "Dr. Tyson Perrero", "designation": "Ortho", "clinic": "Canyon View Dental Clinic", 'phone':'360-892-4242', 'address':'12345 Main Street', 'cityandzip':'Vancouver, WA 98684'},
	{"name": "Dr. Brett Tobler", "designation": "DDS", "clinic": "Stonehaven Dental", 'phone':'360-892-4242', 'address':'12345 Main Street', 'cityandzip':'Vancouver, WA 98684'},
	{"name": "Dr. Eric Tobler", "designation": "DDS", "clinic": "Hobble Creek Dental", 'phone':'360-892-4242', 'address':'12345 Main Street', 'cityandzip':'Vancouver, WA 98684'},
	{"name": "Dr. Nathan Tobler", "designation": "Ortho", "clinic": "Sunshine Dentistry", 'phone':'360-892-4242', 'address':'12345 Main Street', 'cityandzip':'Vancouver, WA 98684'}
	];
  
	currentDoctor: any = {'id': 1, 'doctorname': 'Dr. Tyson Moab Perrero', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'date': '06/12/19', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	}
	
	historyArr: any[] = [{'id': 20, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'date': '07/30/17', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	},
	
	{'id': 21, 'doctorname': 'Thompson, Harry', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'date': '07/30/17', 'location': {'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	}];

 
  filterInPatient: any[];
  removeCommonInArray: any =[];
  selectedInPatient: any;

  refOutArray : any[];
  selectedOutPatient: any;
  filterOutPatient: any[];
  removeCommonOutArray: any =[];

  @Output() goback = new EventEmitter();
  @Output() updateDentist = new EventEmitter();

  

  constructor(public mat_dialog: MatDialog, private messageService: MessageService) {
	this.messageService.getMessage().subscribe(message => {
		if(message.event == 'addDentist'){
			/*if(message.data.section == 'doctorRefIn'){
				this.docReffInArr.push(message.data.elem);
			} else {
				this.docReffOutArr.push(message.data.elem);
			}*/
			
			this.historyArr.unshift(this.currentDoctor);
			this.currentDoctor = message.data;
			this.currentDoctor.date = new Date();
		}
	});
  }

  ngOnInit() {
    this.updateDentist.emit(this.currentDoctor);
  }
  
  

  backtoMain() {
    this.refInsearch= false;
    this.refOutsearch= false;
    this.refInsearchBox= false;
    this.refOutsearchBox= false;

    this.goback.emit('back');
	this.updateDentist.emit(this.currentDoctor);
  }

  showRefinBox(callfrom) {
    /*this.refInsearchBox= this.refInsearchBox==true? false: true;
    this.refOutsearchBox= false;
    this.refOutsearch= false;*/
	
	const dialogModal = this.mat_dialog.open(DentistReferralModule, {
			panelClass: 'referralModal',
			backdropClass: 'whitebackdrop',
		
      data: {showsection: callfrom}
		});
	
	
  }

  showRefoutBox()
  {
    this.refOutsearchBox= this.refOutsearchBox==true? false: true;
    this.refInsearch= false;
    this.refInsearchBox= false;

  }

  /*searchInPatient(_searchstr){
    this.refInsearch = false;
    let searchstr = _searchstr.toLowerCase();
   
    if(searchstr.length > 1){
      this.filterInPatient = this.drListArr.filter(item => {
        return (item.name.toLowerCase().includes(searchstr))
      });

      if(this.filterInPatient.length == 0){
        this.filterInPatient.push({"name": "No patient found!"});
      }
      this.refInsearch = true;
    }
  }

  showInPrasent() {
    this.refInsearch = this.refInsearch ==true ? false : true;
	this.filterInPatient = this.drListArr;
  }
  
  selectInPatient(dritem){
    this.refInsearch = false;
    
	this.historyArr.unshift(this.currentDoctor);
	
	this.currentDoctor = {"location": dritem.clinic, "name": dritem.name, "designation": dritem.designation, "date": new Date() , 'phone':dritem.phone, 'address':dritem.address, 'cityandzip':dritem.cityandzip}
  }*/



    searchOutPatient(_searchstr){
      this.refOutsearch = false;
      let searchstr = _searchstr.toLowerCase();
      this.removeCommonOutArray =[];
     
     
      if(searchstr.length > 1){
        this.filterOutPatient = this.drListArr.filter(item => {
          return (item.patientname.toLowerCase().includes(searchstr))
        });
  
        if(this.filterOutPatient.length == 0){
          this.filterOutPatient.push({"patientname": "No patient found!"});
        }
        this.refOutsearch = true;
      }
    }
  
    selectOutPatient(patientitem){
      /*this.refOutsearch = false;
      this.refInArray = this.drListArr.filter(function(item) { 
        return item.name !== patientitem;  
      });
      this.selectedOutPatient = patientitem;
      this.refOutArray = this.refInArray

      this.refInArrayEmit.emit(this.refInArray);*/
    }

      showOutPrasent()
      {
        /*this.refOutsearch = this.refOutsearch==true? false : true ;
        this.filterOutPatient = this.refInArray;*/

      }



}

@Component({
  selector: 'doctor-referral-module',
  templateUrl: './doctor-referral-module.component.html',
  styleUrls: ['./doctor-referral-module.component.css']
})
export class DentistReferralModule implements OnInit {
  showsection: any;
  subscriptionArray: any=[];
  subscriptionDoctorArray: any=[];

  doctordetailsArr: any=[];
  doctordetailsArrForOut: any=[];

  
  //closeModal_subscription: Subscription;
  
  constructor(public _matDialogRef: MatDialogRef<DentistReferralModule>, @Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
  }

  ngOnInit() {

  }

  
  cancelModal(): void {
    this._matDialogRef.close(null);
  }

  saveDoctorArray(savedoctor) {
    //this.messageService.sendMessage('savedoctor', savedoctor);
	
	this.messageService.sendMessage('addDentist', savedoctor);
    this._matDialogRef.close(null);
  }

  saveDoctorOutArray(savedoctor) {
    //this.messageService.sendMessage('savedoctorOut', savedoctor);
    this._matDialogRef.close(null);
  }

  
  
}
