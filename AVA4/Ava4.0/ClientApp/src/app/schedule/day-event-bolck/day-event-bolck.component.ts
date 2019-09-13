import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-day-event-bolck',
  templateUrl: './day-event-bolck.component.html',
  styleUrls: ['./day-event-bolck.component.css']
})
export class DayEventBolckComponent implements OnInit {
	
	@Input() dayevntData: any;
	@Input() block_space: any;
	@Input() slot_space: any;
	@Input() clockWd: any;
	
	@Output() removeDayEvent = new EventEmitter();
	
	posLeft: any;
	blockWd: any;
	
	showDetail:boolean = false;
	
  constructor() { }

  ngOnInit() {
	this.createBlock();
  }
  
  createBlock(){
	
	let startTime:any = "11:00";
	let startTime_hr = startTime.split(':')[0];
	let startTime_min = startTime.split(':')[1];
	
	let endTime:any = "12:00";
	let endTime_hr = endTime.split(':')[0];
	let endTime_min = endTime.split(':')[1];
	
	let startTime_in_hr = Number(startTime_hr) + (startTime_min/60);
	let endTime_in_hr = Number(endTime_hr) + (endTime_min/60);
	
	this.blockWd = Math.abs(endTime_in_hr - startTime_in_hr)*this.slot_space;
  }
  
	openDayEvent(){
		this.showDetail = this.showDetail == true ? false : true;
	}
	
	removeEvent() {
		this.removeDayEvent.emit(0);
	}

}
