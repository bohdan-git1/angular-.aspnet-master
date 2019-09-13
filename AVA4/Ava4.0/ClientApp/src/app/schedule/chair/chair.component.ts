import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

	@Input() public chairDetails;
	@Input() chairsettings: any;
	@ViewChild('countersvgcont') countersvgcont;
	
	radius = 21;
	circumference = 2 * Math.PI * this.radius;
	dashoffset: number;
	rangeSliderBar: number;
	
	progressValue = {'progress__value': true, 'progress_complete': false};
	
	clickCount:any = 1;
	clickTimer: any;
	preventSingleClick: boolean; 
	count=15;
	counterDim: any = 50;
	
	
  constructor(private messageService: MessageService) { 
  
  }

  ngOnInit() {
	
	if(this.chairDetails.progress == 100){
		this.progressValue = {'progress__value': false, 'progress_complete': true};
	}
	this.progress(this.chairDetails.progress);
	//this.chairsettings.chairHt=this.chairsettings.chairHt +1;
  }
  
  ngAfterViewInit(){
	setTimeout(() => {this.calculateCounterDim()});
  }
  
  ngOnChanges(){
	setTimeout(() => {this.calculateCounterDim()});
  }
  
  calculateCounterDim(){
	this.counterDim = Math.floor((50/70)*this.countersvgcont.nativeElement.clientHeight);
	if(this.counterDim > 50){
		this.counterDim = 50;
	}
	
	
	
  }
  
  progress(value: number) {
    const progress = value / 100;
	this.dashoffset = this.circumference * (1 - progress);
	//console.log(this.circumference);
	//console.log(this.dashoffset);
	this.rangeSliderBar= this.circumference-this.dashoffset;
	
	this.rangeSliderBar=100*this.rangeSliderBar/this.circumference;
	if(this.rangeSliderBar>=100)
	{
		this.rangeSliderBar=99;
	}
	
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
	

	let tempChr_obj={
		id:this.count,
		firstname:this.chairDetails.patient.split(' ')[0],
		lastname:this.chairDetails.patient.split(' ')[1],
		stratTime:'09:30',
		endTime:'09:45',
		accesscode:'000305',
		payment: true, 
		alergy: false,
		profileimg: 'assets/images-1.png', 
		appntType: 'exam', 
		checkedin: false, 
		procedurecode: '405', 
		multipleAppnts:false
	}
	
	this.messageService.sendMessage('addtobucket', tempChr_obj);
	
	this.chairDetails.patient = null;
	this.chairDetails.dr = null;
	this.chairDetails.seated = null;
	this.chairDetails.progress = null;
	this.chairDetails.bookingtime = null;
	this.chairDetails.bookingtimeMin = null;
	this.chairDetails.excesstime = null;
  }

}
