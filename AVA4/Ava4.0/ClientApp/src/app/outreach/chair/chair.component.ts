import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

	@Input() public chairDetails;
	@Input() public activepatient;
	
	radius = 20;
	circumference = 2 * Math.PI * this.radius;
	dashoffset: number;
	
	progressValue = {'progress__value': true, 'progress_complete': false};
	
	clickCount:any = 1;
	clickTimer: any;
	preventSingleClick: boolean; 
	
  constructor(private messageService: MessageService, public patientDialog: MatDialog) { 
  
  }

  ngOnInit() {
	
	if(this.chairDetails.progress == 100){
		this.progressValue = {'progress__value': false, 'progress_complete': true};
	}
	this.progress(this.chairDetails.progress);
  }
  
  progress(value: number) {
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }
  
  changeCount(){
	this.clickTimer = 0;
	this.preventSingleClick = false;
	
	let delay = 250;
	
	this.clickTimer = setTimeout(() => {
		if(!this.preventSingleClick){
			console.log('single click');
			
			this.clickCount++;
			if(this.clickCount > 2){
				this.clickCount = 1;
			}
		}
	}, delay);
  }
  
  dblclickEvent(){
	this.preventSingleClick = true;
	clearTimeout(this.clickTimer);
	this.clickCount = 3;
	console.log("double click");
  }
  
  addtoBucket() {
	
	this.messageService.sendMessage('addtobucket', this.chairDetails);
	
	this.chairDetails.patient = null;
	this.chairDetails.dr = null;
	this.chairDetails.seated = null;
	this.chairDetails.progress = null;
	this.chairDetails.bookingtime = null;
	this.chairDetails.bookingtimeMin = null;
	this.chairDetails.excesstime = null;
  }
  
  openPateientModal() {
	const dialogRef = this.patientDialog.open(PatientBox, {
		panelClass: 'patientModal',
		backdropClass: 'whitebackdrop',
	  data: {patientdata: this.chairDetails}
	});
  }
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class PatientBox implements OnInit {
  
  patientdata: any;
 
  constructor(public _matDialogRef: MatDialogRef<PatientBox>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	this.patientdata = this.data.patientdata;
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 
}
