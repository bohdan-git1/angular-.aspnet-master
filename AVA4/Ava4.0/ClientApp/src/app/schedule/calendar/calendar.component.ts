import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
	
	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	weeks: any[]= [];
	weeks_next: any[]= [];
	
	currentMonth:any;
	nextMonth:any;
	dateSelected: any;
	
	@Output() selectedDate = new EventEmitter();
	@Input() userseldate: any;
	
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
	
  constructor() {
  
	this.currentMonth = new Date();
	this.nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth()+1, 1);
	
  }

  ngOnInit() {
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
	
	// create calender for next month;
	
	let dynamic_dt_next = new Date(this.nextMonth);
	let firstDay_next = new Date(dynamic_dt_next.getFullYear(), dynamic_dt_next.getMonth(), 1);
	let lastDay_next = new Date(dynamic_dt_next.getFullYear(), dynamic_dt_next.getMonth() + 1, 0);
	
	let numOfDays_next: any = lastDay_next.getDate() - firstDay_next.getDate();
	
	let week_next = [];
	
	let _startDate_next = new Date(firstDay_next);
	let firstDay_next_WeekGrid = start_weekGrid - _startDate_next.getDay();
	
	if(firstDay_next_WeekGrid < 0){
		for(let j=0; j<Math.abs(firstDay_next_WeekGrid); j++){
			week_next.push({weekdate: null, holiday: false, today: false, selected: false, longerday: false, shorterday: false, reddots: false});
		}
	}
	
	for(let i=0; i<=numOfDays_next; i++){
	
		let startDate_week_next = new Date(firstDay_next);
		startDate_week_next.setDate(firstDay_next.getDate()+i);
		let holiday = false;
		if(startDate_week_next.getDay() == 0){
			holiday = true;
		} else {
			holiday = false;
		}
		
		let today_bool = false;
		
		if(today.getDate() == startDate_week_next.getDate() && today.getMonth() == startDate_week_next.getMonth() && today.getFullYear() == startDate_week_next.getFullYear()){
			today_bool = true;
		} else {
			today_bool = false;
		}
		
		week_next.push({'weekdate': startDate_week_next, holiday: holiday, 'today': today_bool, selected: false, longerday: false, shorterday: false, reddots: false});
		
		let day_of_month_next = startDate_week_next.getDay() + 1;
		
		if(day_of_month_next % 7 == 0){
			week_next = this.createCalenderRule(week_next, this.weeks_next);
			this.weeks_next.push(week_next);
			week_next = [];
		}
		
		if(i == numOfDays_next){
			week_next = this.createCalenderRule(week_next, this.weeks_next);
			this.weeks_next.push(week_next);
			week_next = [];
		}
	}
	
	let _useldt = new Date(this.userseldate);
	
	if(today.getDate() == _useldt.getDate() && today.getMonth() == _useldt.getMonth() && today.getFullYear() == _useldt.getFullYear()){
	
		//do nothing;
		
	} else {
		
		this.weeks.map((days, weekindx)  =>{
			days.map((day, dayIndx) =>{
				
				let _caldt = new Date(day.weekdate);
			
				if(_caldt.getDate() == _useldt.getDate() && _caldt.getMonth() == _useldt.getMonth() && _caldt.getFullYear() == _useldt.getFullYear()) {
					day.selected = true;
					
					this.dateSelected = {dir: 'current', weekindx:weekindx, dayIndx:dayIndx};
				}
			});
		});
		
		this.weeks_next.map((days, weekindx) =>{
			days.map((day, dayIndx) =>{
				
				let _caldt_nxt = new Date(day.weekdate);
			
				if(_caldt_nxt.getDate() == _useldt.getDate() && _caldt_nxt.getMonth() == _useldt.getMonth() && _caldt_nxt.getFullYear() == _useldt.getFullYear()) {
					day.selected = true;
					this.dateSelected = {dir: 'next', weekindx:weekindx, dayIndx:dayIndx};
				}
			});
		});
		
	}
	
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
  
  selectedDateClick(d, weekindx, dayIndx, dir) {
	
	if(d != null){
		let dt = new Date(d);
		let today = new Date();
		let today_bool: boolean;
		
		this.userseldate = dt;
		
		if(this.dateSelected){
			let _dir: any = this.dateSelected.dir;
			let _weekindx: any = this.dateSelected.weekindx;
			let _dayIndx:any = this.dateSelected.dayIndx;
			
			if(_dir == 'current'){
				this.weeks[_weekindx][_dayIndx]['selected'] = false;
			} else {
				this.weeks_next[_weekindx][_dayIndx]['selected'] = false;
			}
		}
		
		if(today.getDate() == dt.getDate() && today.getMonth() == dt.getMonth() && today.getFullYear() == dt.getFullYear()){
			today_bool = true;
		} else {
			today_bool = false;
		}
		
		if(today_bool == false){
			if(dir == 'current'){
				this.weeks[weekindx][dayIndx]['selected'] = true;
			} else {
				this.weeks_next[weekindx][dayIndx]['selected'] = true;
			}
		}
		
		this.dateSelected = {dir: dir, weekindx:weekindx, dayIndx:dayIndx};
		this.selectedDate.emit(dt);
	}
	
  }
  
  goToPrevSet(){
	
	this.weeks = [];
	this.weeks_next = [];
	this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth()-1, 1);
	this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth()-1, 1);
	this.generateCalendar();
	
  }
  
  goToNextSet(){
	
	this.weeks = [];
	this.weeks_next = [];
	this.currentMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth(), 1);
	this.nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth()+1, 1);
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
