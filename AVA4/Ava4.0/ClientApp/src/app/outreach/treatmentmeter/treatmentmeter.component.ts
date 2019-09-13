import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treatmentmeter',
  templateUrl: './treatmentmeter.component.html',
  styleUrls: ['./treatmentmeter.component.css']
})
export class TreatmentmeterComponent implements OnInit {
	
	@Input() all:boolean;
	
	treatmentMonth = 9;
	elapsedMonth = 7.8;
	markerArr: any[] = [];
	markerHt: any = 505;
	markerHt_all: any = 338;
	timeElaspsed: any = 0;
	timeElaspsed_percentage: any = 72;
	
	leftMeter_timeElapsed:any = 0;
	leftMater_time_percentage: any = 33;
	
	redmarker: any = 0;
	redmarker_percentage = 60;
	redmarker_days = 52;
	
	todayCount: any = 0;
	todayCountDays: any = 65;
	
	movePos: any = 0;
	movecount: any = 0;
	
	singleMeter: any = true;
	financialMeter: any = false;
	
	flipcard: any = false;
	
	card2: boolean = true;
	card3: any = false;
	
	rotateOnY = 0;
	
  constructor() { }

  ngOnInit() {
	
		if(this.all){
			this.markerHt = 338;
			this.showPanel();
		} else {
			this.markerHt = 550;
		}
		
		let markerSpace = ((this.markerHt-4)/10);
		
		this.leftMeter_timeElapsed = (this.markerHt/10)*(this.leftMater_time_percentage/10) + 1;
		this.redmarker = (this.markerHt/10)*(this.redmarker_percentage/10) + 1;
		
		this.timeElaspsed = (this.markerHt/10)*(this.timeElaspsed_percentage/10) + 1;
		this.todayCount = (this.markerHt/10)*(this.todayCountDays/10) + 1;
				
		for(let i=0; i<11; i++){
			this.markerArr[i] = markerSpace*i;
		}	
  }
  
  showPanel() {
	/*this.card2 = true;
	this.card3 = false;*/
	
	
	this.singleMeter = this.singleMeter == true ? false : true;
	this.financialMeter = this.financialMeter == true ? false : true;
  }
  
  nextSlide() {
	/*this.movecount++;
	if(this.movecount > 1){
		this.movecount = 0;
	}
	
	this.movePos = -(this.movecount*167);*/
	
	this.card2 = false;
	this.card3 = true;
		
	/*this.flipcard = this.flipcard == true ? false : true;*/
	
	this.rotateOnY -= 180;
	
  }

}
