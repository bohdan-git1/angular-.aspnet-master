import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-patient-status',
  templateUrl: './patient-status.component.html',
  styleUrls: ['./patient-status.component.css']
})
export class PatientStatusComponent implements OnInit {
	
	@ViewChild('dtinput') dtinput: ElementRef;
	opendrpdn:boolean = false;
	
	statusdata: any[] = [
		{"date": "12/31/2017", "from": "Call In", "to": "Child Exam", "office": "1", "changed_by": "AVA"},
		{"date": "01/15/2018", "from": "Child Exam", "to": "Phase II", "office": "1", "changed_by": "JB"},
		{"date": "01/28/2018", "from": "Phase II", "to": "Phase II Complete", "office": "1", "changed_by": "AVA"},
		{"date": "06/01/2019", "from": "Phase II Complete", "to": "Retainer Recall", "office": "1", "changed_by": "AVA"}
	];
	
	statusDrpdnOptn: any[] = [
		{"label": "Call in - Phone", "selected": false},
		{"label": "Virtual Consult", "selected": false},
		{"label": "Adult Exam", "selected": false},
		{"label": "Child Exam", "selected": false},
		{"label": "New patient Recall", "selected": false},
		{"label": "Retainer Recall", "selected": false}
	];
	
	selectedStatus: any = 'Status List';
	showStatusDrdpOptn:boolean = false;
	selectedDate: any;
	showRowModal:boolean = false;
	
	currentStatus: any;
	manualDt: boolean = false;
	inputDt: any = '';
	
	manualDtclicked:boolean = false;
	
  constructor() { }

  ngOnInit() {
	this.currentStatus = this.statusdata[this.statusdata.length-1].to;
  }
  
  onClickedOutside($event){
	this.opendrpdn = false;
  }
  
  selectOption(indx) {
	this.selectedStatus = this.statusDrpdnOptn[indx].label;
	
	setTimeout(() => {
		this.showStatusDrdpOptn = false;
	})
	
  }
  
  getSelectedDate(evt){
	this.manualDt = false;
	this.selectedDate = evt;
  }
  
  addnewRow() {
	if(this.selectedStatus != 'Status List'){
		let lastEntry: any = this.statusdata[this.statusdata.length-1];
		
		if(this.inputDt != ''){
			this.selectedDate = this.inputDt;
		}
		
		let newEntry: any = {"date": this.selectedDate, "from": lastEntry.to, "to": this.selectedStatus, "office": "1", "changed_by": "AVA"};
		
		this.statusdata.push(newEntry);
		this.selectedStatus == 'Status List';
		this.currentStatus = this.statusdata[this.statusdata.length-1].to;
		this.inputDt = '';
		this.manualDt = false;
		
		setTimeout(() => {
			this.showRowModal = false;
		});
	}
  }
  
  closeRowModal() {
	setTimeout(() => {
		this.showRowModal = false;
		this.selectedStatus == 'Status List';
		this.inputDt = '';
		this.manualDt = false;
	});
  }
  
  enterManualDt(){
	setTimeout(() => {
		if(!this.manualDtclicked){
			this.manualDt = this.manualDt==true?false : true;
		} else {
			this.manualDtclicked = false;
		}
		setTimeout(() => {
			if(this.manualDt){
				this.dtinput.nativeElement.focus();
			}
		})
		
		
	});
	
  }
  
  updateDt(){
	if(this.inputDt != ''){
		this.selectedDate = this.inputDt;
		this.inputDt = '';
	}
	
	this.manualDt = false;
	this.manualDtclicked = true;
	
  }
  
  removeInput() {
	this.manualDtclicked = false;
  }
  
  dateMask() {
	const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
	return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
  }

}
