import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../../../core/message.service';

@Component({
  selector: 'app-schedule-procedure-block',
  templateUrl: './schedule-procedure-block.component.html',
  styleUrls: ['./schedule-procedure-block.component.css']
})
export class ScheduleProcedureBlockComponent implements OnInit {
	
	@Input() public patientdata;
	@Input() public block_space: any;
	@Input() public slot_space: any;
	@Input() patientblockSettings: any = {};
	@Output() selectblock = new EventEmitter();
	
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
  
  createBlock(){
	let tempStart = 7*this.slot_space;
	
	let startTime = this.patientdata.stratTime;
	let startTime_hr = startTime.split(':')[0];
	let startTime_min = startTime.split(':')[1];
	
	let strtTimeS = (startTime_hr*60*60)+ (startTime_min*60);
	let endTimeS = strtTimeS + (this.patientdata.time*60);
	
	let endTime_hr = Math.floor(endTimeS/3600);
	let endTime_min = Math.floor((endTimeS%3600)/60);
	
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
	
	selectProcedureblock(evt){
		this.selectblock.emit(evt);
	}
	
	

}
