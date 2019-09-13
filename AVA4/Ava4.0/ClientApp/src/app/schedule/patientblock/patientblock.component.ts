import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-patientblock',
  templateUrl: './patientblock.component.html',
  styleUrls: ['./patientblock.component.css']
})
export class PatientblockComponent implements OnInit {
	
	@Input() public patientdata;
	@Input() public block_space: any;
	@Input() public slot_space: any;
	@Input() patientblockSettings: any = {};
	
	inputChanged = false;
	
	posLeft: any;
	blockWd: any;
	appntType: any;
	
	duration_min: any;
	timer_view: any;
	subscription: Subscription;
	
	selectedappntType: any = 'all';
	
	windowHt: any;
	zoomviewport: any;
	selectedLocation: any;
	
  constructor(public patientDialog: MatDialog, private messageService: MessageService) {
	
	this.subscription = this.messageService.getMessage().subscribe(message => {
		
		if(message.event == 'createblock'){
			this.block_space = Number(message.data.block_space);
			this.slot_space = Number(message.data.slot_space);
			this.timer_view = message.data.timer_view;
			this.zoomviewport = message.data.zoomviewport;
						
			this.createBlock();
		}
		
		if(message.event == 'showappnttype'){
			//console.log('showappnttype', message.data);
			this.selectedappntType = message.data.toLowerCase();
		}
		
		if(message.event == 'location'){
			this.selectedLocation = message.data;
		}
	});
	
  }

  ngOnInit() {
	this.windowHt = window.innerHeight;	
	this.createBlock();
  }
  
  ngAfterViewInit(){
	setTimeout(() => {this.calculateBlockDim()});
  }
  
  ngOnChanges(){
	setTimeout(() => {
		this.calculateBlockDim();
	});
  }
  
  calculateBlockDim(){
	//console.log(this.patientblockSettings);
  }
  
  createBlock(){
	let tempStart = 7*this.slot_space;
	
	let startTime = this.patientdata.stratTime;
	let startTime_hr = startTime.split(':')[0];
	let startTime_min = startTime.split(':')[1];
	
	let endTime = this.patientdata.endTime;
	let endTime_hr = endTime.split(':')[0];
	let endTime_min = endTime.split(':')[1];
	
	let startTime_in_hr = Number(startTime_hr) + (startTime_min/60);
	let endTime_in_hr = Number(endTime_hr) + (endTime_min/60);
	
	this.duration_min = Math.round(Math.abs(startTime_in_hr - endTime_in_hr)*60);
		
	this.blockWd = Math.abs(startTime_in_hr - endTime_in_hr)*this.slot_space;
	this.posLeft = ((startTime_in_hr*this.slot_space) - tempStart + this.block_space);
		
	if(this.patientdata.appntType == 'exam'){
		this.appntType = '#FD7474';
	} else if(this.patientdata.appntType == 'start'){
		this.appntType = '#74B3FD';
	} else if(this.patientdata.appntType == 'appl'){
		this.appntType = '#F6CC61';
	} else if(this.patientdata.appntType == 'adj'){
		this.appntType = '#8CF1E4';
	} else if(this.patientdata.appntType == 'dband'){
		this.appntType = '#B48CF6';
	} else if(this.patientdata.appntType == 'record'){
		this.appntType = '#FCFF7C';
	}
  }
  
  
  openPatientBlock(){
	
	let modalClass: any;
		
	if(this.patientdata.firstname != '' && this.patientdata.lastname != '') {
		modalClass = 'patientModal';
	} else {
		modalClass = 'precedureModal';
	}
	
	const dialogRef = this.patientDialog.open(PatientBox, {
		panelClass: modalClass,
		backdropClass: 'whitebackdrop',
	  data: {patientdata: this.patientdata, selectedLocation: this.selectedLocation}
	});
  }
  
  formatName(fname, lname) {
	
	let patientName: any;
	if(this.patientblockSettings.chairHt <= 80 && this.blockWd < 170){
		
		patientName = fname + ' ' + lname;
		if(patientName.length > 5){
			patientName = patientName.substring(0, 4) + '...';
		}
	} else {
		patientName = fname + '\n' + lname;
	}
	
	return patientName;
	
  }
  
  sliceString(str){
	let num:any;
	let charWidth: any = 8;
	let boxWd: any;
	
	if(this.duration_min >= 20 && this.duration_min <= 25){
		boxWd = this.blockWd - 42;
	} else {
		boxWd = this.blockWd - 35;
	}
	
	let stringWd: any = str.length * charWidth;
	
	//console.log(boxWd, stringWd, str, );
	
	if(stringWd > boxWd){
		num = boxWd/charWidth;
	} else {
		num = str.length;
	}
	
	return num;
  }
  
  getFullName(fname, lname){
	let fullname = `${fname} ${lname}`;
	return fullname;
	
  }
  
  
	getFormattedTime(_time) {
		let hr: any = _time.split(':')[0];
		let min: any = _time.split(':')[1];
		
		let amOrpm: any;
		let formatedTime: any;
		
		if(hr >= 12 && min > 0){
			amOrpm = 'pm';
		} else {
			amOrpm = 'am';
		}
		
		if(hr > 12){
			formatedTime = `${hr - 12}:${min} ${amOrpm}`;
		} else {
			formatedTime = `${_time} ${amOrpm}`;
		}
		
		return formatedTime;
		
	
	}
  


}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class PatientBox implements OnInit {
  selectedLocation: any;
  patientdata: any;
  closeModal_subscription: Subscription;
  procedurecode: any = '';
 
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<PatientBox>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	this.patientdata = this.data.patientdata;
	
	if(this.patientdata.procedurecode){
		this.procedurecode = this.patientdata.procedurecode;
	}
	
	console.log(this.data);
	
	this.selectedLocation = this.data.selectedLocation;
	
	
	this.closeModal_subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'closemodal'){
			this.cancel();
		}
		
	});
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 
}
