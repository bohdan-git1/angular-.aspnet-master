import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-calender',
  templateUrl: './single-calender.component.html',
  styleUrls: ['./single-calender.component.css']
})
export class SingleCalenderComponent implements OnInit {
		
	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	weeks: any[]= [];
	weeks_next: any[]= [];
	
	currentMonth:any;
	dateSelected: any;
	
	calenderRule: any = {
		"closed": {
		  "repeat": ["0"],
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
	
	monthGlanceArr:any[] = [
		{"day": 1, "patentnum": 95},
		{"day": 2, "patentnum": 95},
		{"day": 3, "patentnum": 87},
		{"day": 4, "patentnum": 91},
		{"day": 5, "patentnum": 78},
		{"day": 6, "patentnum": 123},
		{"day": 7, "patentnum": 95},
		{"day": 8, "patentnum": 95},
		{"day": 9, "patentnum": 112},
		{"day": 10, "patentnum": 72},
		{"day": 11, "patentnum": 84},
		{"day": 12, "patentnum": 90},
		{"day": 13, "patentnum": 98},
		{"day": 14, "patentnum": 90},
		{"day": 15, "patentnum": 90},
		{"day": 16, "patentnum": 94},
		{"day": 17, "patentnum": 98},
		{"day": 18, "patentnum": 87},
		{"day": 19, "patentnum": 102},
		{"day": 20, "patentnum": 112},
		{"day": 21, "patentnum": 90},
		{"day": 22, "patentnum": 56},
		{"day": 23, "patentnum": 90},
		{"day": 24, "patentnum": 84},
		{"day": 25, "patentnum": 79},
		{"day": 26, "patentnum": 88},
		{"day": 27, "patentnum": 97},
		{"day": 28, "patentnum": 76},
		{"day": 29, "patentnum": 90},
		{"day": 30, "patentnum": 81},
		{"day": 31, "patentnum": 93}
	]
	
  constructor() { }

  ngOnInit() {
	this.currentMonth = new Date();
	this.generateCalendar();
  }
  
  generateCalendar() {
	let today = new Date();
	
	let dynamic_dt = new Date(this.currentMonth);
	let firstDay = new Date(dynamic_dt.getFullYear(), dynamic_dt.getMonth(), 1);
	let lastDay = new Date(dynamic_dt.getFullYear(), dynamic_dt.getMonth() + 1, 0);
	
	let numOfDays: any = lastDay.getDate() - firstDay.getDate();
	let numOfWeek: any = Math.ceil(numOfDays/7);
	
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
			
			week = this.createCalenderRule(week, this.weeks);
			this.weeks.push(week);
			week = [];
		}
		
		if(i == numOfDays){
			week = this.createCalenderRule(week, this.weeks);
			this.weeks.push(week);
			week = [];
		}
		
	}
	
  }
  
  getPatientNum(day) {
	
	let _day = new Date(day);
	let dayNum = _day.getDate();
		
	let patentnum: any = this.monthGlanceArr[dayNum-1].patentnum;
	return patentnum;
  }
  
  getHoliday(d) {
	if(d != null){
		let dt = new Date(d);
		if(dt.getDay() == 0){
			return true;
		} else {
			return false;
		}
	}
  }
  
  goToPrevSet(){
	
	this.weeks = [];
	this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth()-1, 1);
	this.generateCalendar();
	
  }
  
  goToNextSet(){
	this.weeks = [];
	
	let _currentMonth: any = this.currentMonth;
	
	this.currentMonth = new Date(_currentMonth.getFullYear(), _currentMonth.getMonth()+1, 1);
	this.generateCalendar();
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

}
