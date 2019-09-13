import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

showDropdown:boolean=false;
dropdownOption:any;

templetesDropdownArr=[
	{"label":"Excuse Slip"},
	{"label":"Appointment"},
	{"label":"Financial"},
	{"label":"Insurance"},
];

  constructor() { }

  ngOnInit() {
   this.dropdownOptionselected(0);
  }
  
  dropDownselect(){
    if(this.showDropdown==true){
	  this.showDropdown=false;
	}else{
	    this.showDropdown=true;
	}
  }
  
  dropdownOptionselected(indx){
    this.dropdownOption=this.templetesDropdownArr[indx].label;

  }

}
