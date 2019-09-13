import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analytics-calender',
  templateUrl: './analytics-calender.component.html',
  styleUrls: ['./analytics-calender.component.css']
})
export class AnalyticsCalenderComponent implements OnInit {
	
	@Input() monthname: any;
	@Input() calenderRule: any;
	
	dayNames: any = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	weeks: any = [];
	
  constructor() { }

  ngOnInit() {
	this.generateCalendar();
  }
  
  generateCalendar() {
	let today = new Date();
	
	let dynamic_dt = new Date(this.monthname);
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
