import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {
	
	monthname: any;
	calenderRule: any = {
		"closed": {
		  "repeat": ["0", "1"],
		  "specific": [{"date": "Fri Oct 17 2018 00:00:00 GMT+0530 (India Standard Time)"}, {"date" : "Fri Oct 31 2018 00:00:00 GMT+0530 (India Standard Time)"}]
		},
		"longerdays": {
			"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["6", "4"]},
			"specific": []
		},
		"shorterdays": {
			"repeat": {"weeknum": ["2", "4"], "days": ["2"]},
			"specific": []
		},
		
		"otherofficeopen": {
			"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["1", "6"]},
			specific: []
		}
	}
	
	dayNames: any = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	weeks: any = [];
	dateSelected: any;
	
	@Output() selectedDate = new EventEmitter();
	
  constructor() { }

  ngOnInit() {
	this.monthname = new Date();
	this.generateCalendar();
	this.selectedDate.emit(this.monthname);
  }
  
  generateCalendar() {
	let today = new Date();
	
	let dynamic_dt = this.monthname;
	let firstDay = new Date(dynamic_dt.getFullYear(), dynamic_dt.getMonth(), 1);
	let lastDay = new Date(dynamic_dt.getFullYear(), dynamic_dt.getMonth() + 1, 0);
	
	let numOfDays: any = lastDay.getDate() - firstDay.getDate();
	
	let week = [];
	let _startDate = new Date(firstDay);
	let start_weekGrid = 0;
	let firstDay_WeekGrid = start_weekGrid - _startDate.getDay();
	
	if(firstDay_WeekGrid < 0){
		for(let j=0; j<Math.abs(firstDay_WeekGrid); j++){
			week.push({weekdate: null, holiday: false, today: false, selected: false});
		}
	}
	
	for(let i=0; i<=numOfDays; i++){
		let startDate_week = new Date(firstDay);
		startDate_week.setDate(firstDay.getDate()+i);
		
		let holiday = false;
		let today_bool = false;
		
		if(today.getDate() == startDate_week.getDate() && today.getMonth() == startDate_week.getMonth() && today.getFullYear() == startDate_week.getFullYear()){
			today_bool = true;
		} else {
			today_bool = false;
		}
		
		if(startDate_week.getDay() === 0){
			holiday = true;
		} else {
			holiday = false;
		}
		
		week.push({weekdate: startDate_week, holiday: holiday, today: today_bool, selected: false, longerday: false, shorterday: false, reddots: false});
		
		let day_of_month = startDate_week.getDay() + 1;
		
		if(day_of_month % 7 == 0){
			//week = this.createCalenderRule(week, this.weeks);
			this.weeks.push(week);
			week = [];
		}
		
		if(i == numOfDays){
			//week = this.createCalenderRule(week, this.weeks);
			this.weeks.push(week);
			week = [];
		}
	}
  }
  
  createCalenderRule(week, weekarr){
	let weekNum = weekarr.length + 1;
			
			/*---- for longer days -----*/
			
			for(let k=0; k<this.calenderRule.longerdays.repeat.weeknum.length; k++){
				if(weekNum == Number(this.calenderRule.longerdays.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.longerdays.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.longerdays.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].longerday = true;
						}
					}
				}
			}
			
			/*---- for shorter days ---- */
			
			for(let k=0; k<this.calenderRule.shorterdays.repeat.weeknum.length; k++){
				
				if(weekNum == Number(this.calenderRule.shorterdays.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.shorterdays.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.shorterdays.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].shorterday = true;
						}
					}
				}
				
			}
			
			/*---- for holidays ---*/
			for(let j=0; j<this.calenderRule.closed.repeat.length; j++){
				let dayNum = Number(this.calenderRule.closed.repeat[j]);
				if(week[dayNum]){
					week[dayNum].holiday = true;
				}
			}
			
			if(this.calenderRule.closed.specific.length > 0){
			
				week.forEach(weekelem =>{
					
					let officeClosedDt = this.calenderRule.closed.specific.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(officeClosedDt){
						let specificDate = new Date(officeClosedDt.date);
						let speficDay = specificDate.getDay();
						if(week[speficDay]){
							week[speficDay].holiday = true;
						}
					}
				})
			}
			
			/*----- otherofficeopen -------------*/
			
			for(let k=0; k<this.calenderRule.otherofficeopen.repeat.weeknum.length; k++){
				
				if(weekNum == Number(this.calenderRule.otherofficeopen.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.otherofficeopen.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.otherofficeopen.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].reddots = true;
						}
					}
				}
				
			}
			
	return week
  }
  
  selectedDateClick(d, weekindx, dayIndx) {
	
	if(d != null){
		let dt = new Date(d);
		let today = new Date();
		let today_bool: boolean;
		
		
		if(this.dateSelected){
			let _weekindx: any = this.dateSelected.weekindx;
			let _dayIndx:any = this.dateSelected.dayIndx;
			this.weeks[_weekindx][_dayIndx]['selected'] = false;
		}
		
		if(today.getDate() == dt.getDate() && today.getMonth() == dt.getMonth() && today.getFullYear() == dt.getFullYear()){
			today_bool = true;
		} else {
			today_bool = false;
		}
		
		if(today_bool == false){
			this.weeks[weekindx][dayIndx]['selected'] = true;
		}
		
		this.dateSelected = {weekindx:weekindx, dayIndx:dayIndx};
		
		this.selectedDate.emit(dt);
	}
	
  }
  
  gotoMonth(dir) {
	this.weeks = [];
	if(dir == 'prev'){
		this.monthname = new Date(this.monthname.getFullYear(), this.monthname.getMonth()-1, 1);
	} else {
		this.monthname = new Date(this.monthname.getFullYear(), this.monthname.getMonth()+1, 1);
		
	}
	
	this.generateCalendar();
  }

}
