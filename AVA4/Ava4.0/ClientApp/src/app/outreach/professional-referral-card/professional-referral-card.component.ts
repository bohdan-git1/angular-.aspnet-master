import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';


@Component({
  selector: 'app-professional-referral-card',
  templateUrl: './professional-referral-card.component.html',
  styleUrls: ['./professional-referral-card.component.css']
})
export class ProfessionalReferralCardComponent implements OnInit {

  @Output() goback = new EventEmitter();
  @Output() doctordetailsSelectArrlen = new EventEmitter();
  @Output() countFilterLocationDoc = new EventEmitter();

  @Input() doctordetailsArr;
  @Input() doctorFilterArray;
  @Input() doctorFilterArrayForOut;

  @Input () doctordetailsArrForOut;

  subscription: any=[];
  subscriptionDoctor: any=[];

  subscription1: any=[];
  subscriptionDoctorOut: any=[];
  
  docReffInArr: any[] = [
	{'id': 20, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	},
	
	{'id': 21, 'doctorname': 'Thompson, Harry', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	}
  ];
  
  
  docReffOutArr: any[] = [
	{'id': 1, 'doctorname': 'Dr. Tyson Moab Perrero', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	},
	
	{'id': 2, 'doctorname': 'Dr. Jenny Mcmurtrey Moab', 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	}
  ];
  
  @Output() updatepofessionalRef = new EventEmitter();
  
  constructor(public mat_dialog: MatDialog, private messageService: MessageService) { 
	this.messageService.getMessage().subscribe(message => {
		if(message.event == 'addDoctor'){
			if(message.data.section == 'doctorRefIn'){
				this.docReffInArr.unshift(message.data.elem);
				this.updatepofessionalRef.emit(message.data.elem);
			} else {
				this.docReffOutArr.unshift(message.data.elem);
			}
		}
	});
  }

  ngOnInit() {

    this.subscription= this.doctordetailsArr;
    this.subscriptionDoctor= this.doctorFilterArray;


    this.subscription1= this.doctordetailsArrForOut;
    this.subscriptionDoctorOut= this.doctorFilterArrayForOut;
    
    
    this.messageService.getMessage().subscribe(message => {
      var doctordetailsSelectArrlen1 =0;
      if(message.event == 'savedoctor'){
       
       this.subscription= message.data;
	   
	   
        this.subscription.filter(item => {
          item.doctoroptions.filter( items =>{
          if (items.selected===true)
          {
              doctordetailsSelectArrlen1++;
            
          }
        })
      });
	  
	  
      this.doctordetailsSelectArrlen.emit(doctordetailsSelectArrlen1);
      
      }
      if(message.event == 'savedoctorOut'){
       
        this.subscription1= message.data;
       }

       if(message.event == 'savedoctorFilterforCls'){
       
        this.subscriptionDoctor= message.data;

        this.subscriptionDoctor.map(function(element,key) {
          var count=0;
          element.clinicnames.map(function(element1, key1){
            if(element1.selected==true)
            {
              count=1;
            }
          });  
          if(count==1)
          {
            element.accept=true;
          }else {
            element.accept=false;
          }

         });
         
         message.event='';

       }


       if(message.event == 'savedoctorFilterforoutCls'){
       
        this.subscriptionDoctorOut= message.data;

        this.subscriptionDoctorOut.map(function(element,key) {
          var count=0;
          
          element.clinicnames.map(function(element1, key1){
            if(element1.selected==true)
            {
              count=1;
            }
          });  
          if(count==1)
          {
            element.accept=true;
          }else {
            element.accept=false;
          }
         });
         message.event='';
       }
    });
  }

  backtoMain() {
    this.goback.emit('back');
  }

  showRefinBox(callfrom){
	const matdialog = this.mat_dialog.open(DoctorReferralModule, {
			panelClass: 'referralModal',
			backdropClass: 'whitebackdrop',
			data: {showsection: callfrom}
	});
  }
  
}



@Component({
  selector: 'doctor-referral-module',
  templateUrl: './doctor-referral-module.component.html',
  styleUrls: ['./doctor-referral-module.component.css']
})
export class DoctorReferralModule implements OnInit {
  showsection: any;
  subscriptionArray: any=[];
  subscriptionDoctorArray: any=[];

  doctordetailsArr: any=[];
  doctordetailsArrForOut: any=[];

  
  closeModal_subscription: Subscription;
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<DoctorReferralModule>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	
  this.showsection = this.data.showsection;
  this.subscriptionArray= this.data.subscriptionArray;
  this.subscriptionDoctorArray= this.data.subscriptionDoctorArray;
  
  //console.log(this.subscriptionDoctorArray);

  this.doctordetailsArr= this.data.doctordetailsArr;
  if(this.showsection=='doctorRefOut')
  {
    this.doctordetailsArrForOut= this.data.doctordetailsArrForOut;
    console.log(this.doctordetailsArrForOut);
  }



  this.messageService.getMessage().subscribe(message => {
    if(message.event == 'savedoctorforCls'){
     this.messageService.sendMessage('savedoctor', message.data);
    }
    if(message.event == 'savedoctorforOut'){
      this.messageService.sendMessage('savedoctorOut', message.data);
     }
    });

  }

  
  cancelModal(): void {
    this._matDialogRef.close(null);
  }

  saveDoctorArray(docelem) {
    //this.messageService.sendMessage('savedoctor', savedoctor);
	
	this.messageService.sendMessage('addDoctor', {elem: docelem, section: this.showsection});
    this._matDialogRef.close(null);
  }

  saveDoctorOutArray(savedoctor)
  {
    this.messageService.sendMessage('savedoctorOut', savedoctor);
    this._matDialogRef.close(null);
  }

  
  
}
