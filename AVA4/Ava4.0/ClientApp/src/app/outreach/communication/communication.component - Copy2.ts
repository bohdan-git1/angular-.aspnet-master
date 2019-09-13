import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

showDropdown:boolean=false;
showDropdownforphone:boolean=false;

showDropdownforcommunication:boolean=false;



communication_entry_boxactive_var: boolean= true;

communication_entry_boxactive  = 'msg';
height_width_set_email='30';
height_width_set_call='30';
height_width_set_msg='26';

width_set='';
setto_emailid='';
setto_emailid_for_msg='';
height_width_set_communication='';

setto_call='';



dropdownOption:any;
dropdownforphoneOption: any;

dropdownforcommunicationOption: any;

communicationDropdownArr=[
  { "label": "Brush & Floss every night"},
	{"label":"Rubber bands"},
	{"label":"Appliance wear - retainer"},
	{"label":"Appliance wear - LHA"}
	
];


templetesDropdownArr=[
  { "label": "Templates"},
	{"label":"Excuse Slip"},
	{"label":"Appointment"},
	{"label":"Financial"},
	{"label":"Insurance"},
];


phonenoDropdownArr=[
  { "label": "(858) 888-8889"},
];


  constructor() { }

  ngOnInit() {
   this.dropdownOptionselected(0);

   this.dropdownOptionforphoneselected(0);

   this.dropdownOptionselectedforcommunication(0);

  }
  
  dropDownselect(){
    if(this.showDropdown==true){
	  this.showDropdown=false;
	}else{
	    this.showDropdown=true;
	}
  }

  

  dropDownselectforcommunication(){
    if(this.showDropdownforcommunication==true){
	  this.showDropdownforcommunication=false;
	}else{
	    this.showDropdownforcommunication=true;
	}
  }


  dropdownOptionselectedforcommunication(indx){
    this.dropdownforcommunicationOption=this.communicationDropdownArr[indx].label;

  }

  dropdownOptionselected(indx){
    this.dropdownOption=this.templetesDropdownArr[indx].label;

  }


  dropdownOptionforphoneselected(indx){
    this.dropdownforphoneOption=this.phonenoDropdownArr[indx].label;

  }


  dropDownselectforphone(){
    if(this.showDropdownforphone==true){
	  this.showDropdownforphone=false;
	}else{
	    this.showDropdownforphone=true;
	}
  }


  communication(communication_type)
  {
    this.setto_emailid='';
    this.setto_call= '';
    this.setto_emailid_for_msg='';
  

     
      if(communication_type=='email')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_email='26';
      }

      if(communication_type=='call')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_call='26';
      }

      if(communication_type=='msg')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_msg='26';
      }

      if(communication_type=='communication')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_communication='26';
      }

      

  }


  selectemail(setemail)
  {
      this.setto_emailid=setemail;
      this.setto_call= '';
      this.setto_emailid_for_msg='';
      
  }

  selectemailformsg(setemail)
  {
      this.setto_emailid_for_msg=setemail;
      this.setto_call= '';
      this.setto_emailid='';
  }

  

  send_email(){
    this.setto_emailid='';
  }

  send_msg(){
    this.setto_emailid_for_msg='';
  }

  savenotes(){
    this.setto_call= '';
  }
  


  selectcall(setcall)
  {
    this.setto_call= setcall;
    this.setto_emailid='';
    this.setto_emailid_for_msg='';

  }
}
