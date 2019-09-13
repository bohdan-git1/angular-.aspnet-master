import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-settings.component.html',
  styleUrls: ['./calendar-settings.component.css']
})
export class CalendarSettingsComponent implements OnInit {
	@Input() month_all:boolean;
	@Input() monthname: any;
	@Input() monthIndx:any;
	@Input() calenderRule: any;
	@Input() mon_sel=false;
	@Output()month_selected=new EventEmitter<boolean>();
	@Input() selMonthIndex:any;
	
	dayNames: any = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	weeks: any = [];
	scheduledDays:any[]=[];
	@Output()checkDaySelect=new EventEmitter<boolean>();
	daySelect=false;
	@Output() editDelDate= new EventEmitter<any>();
	
	
	
  constructor(private msgService:MessageService) { }

  ngOnInit() {
		  //console.log('again in ngOnInit')
		
		this.generateCalendar();
		this.msgService.getMessage().subscribe(res=>{
			
			if(res.event=="select Days To Schedule"){
				if(this.month_all){
					this.selectDaysForRange(res.data.daySel)
				}
				else{
					if(this.selMonthIndex==this.monthIndx){
						this.selectDaysForRange(res.data.daySel)
					}
				}
			}
			else if(res.event== "new month selected"){
				this.refreshMonthCalender(res.data.monIndx)
			}
			else if(res.event=="generate selected days"){
				//console.log(this.monthIndx, this.selMonthIndex)
				if(this.month_all){
					this.generateSelectedDays();
				}
				else{
					if(this.selMonthIndex==this.monthIndx){
						//console.log('going to generate days')
					this.generateSelectedDays();
					}
				}
			}
			else if(res.event=="delete specific date"){
				//console.log(this.monthIndx, this.selMonthIndex)
				if(this.selMonthIndex==this.monthIndx){
				this.delete_SpecificDay_Schedule(res.data);
				}
			}
		});
		
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
		
		/*if(startDate_week.getDay() === 0){
			holiday = true;
		} else {
			holiday = false;
		}*/
		
		week.push({weekdate: startDate_week, holiday: holiday, today: today_bool, selected: false, longerday: false, shorterday: false, reddots: false, normalday:false, selectedSchedule:false, scheduled:false, selectDeselect:0, type:null, single_sel:false});
		
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
	
		/*---- for normal days -----*/
			
			for(let k=0; k<this.calenderRule.normaldays.repeat.weeknum.length; k++){
				if(weekNum == Number(this.calenderRule.normaldays.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.normaldays.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.normaldays.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].normalday = true;
							week[dayNum].scheduled = true;
							week[dayNum].color = this.calenderRule.normaldays.color;
							week[dayNum].type = 'normal';
						}
					}
				}
			}
			
			/*---- for longer days -----*/
			
			for(let k=0; k<this.calenderRule.longerdays.repeat.weeknum.length; k++){
				if(weekNum == Number(this.calenderRule.longerdays.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.longerdays.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.longerdays.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].longerday = true;
							week[dayNum].scheduled = true;
							week[dayNum].color = this.calenderRule.longerdays.color;
							week[dayNum].type = 'long';
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
							week[dayNum].shorterday = false;
							week[dayNum].scheduled = false;
							week[dayNum].color = this.calenderRule.shorterdays.color;
							week[dayNum].type = 'short';
						}
					}
				}
				
			}
			
			/*---- for holidays ---*/
			
			for(let k=0; k<this.calenderRule.closed.repeat.weeknum.length; k++){
				
				if(weekNum == Number(this.calenderRule.closed.repeat.weeknum[k])) {
					for(let j=0; j<this.calenderRule.closed.repeat.days.length; j++){
						let dayNum = Number(this.calenderRule.closed.repeat.days[j]);
						if(week[dayNum]){
							week[dayNum].holiday = true;
							week[dayNum].scheduled = true;
							week[dayNum].color = this.calenderRule.closed.color;
							week[dayNum].type = 'holiday';
						}
					}
				}
				
			}
			
			if(this.calenderRule.normaldays.exclude.length > 0){
			
				week.forEach(weekelem =>{
					
					let excludeDt = this.calenderRule.normaldays.exclude.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(excludeDt){
						let exclude_Date = new Date(excludeDt.date);
						let exclude_day = exclude_Date.getDay();
						
						if(week[exclude_day]){
							week[exclude_day].normalday = false;
							week[exclude_day].scheduled = false;
						}
					}
				})
			}
			
			if(this.calenderRule.longerdays.exclude.length > 0){
			
				week.forEach(weekelem =>{
					
					let excludeDt = this.calenderRule.longerdays.exclude.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(excludeDt){
						let exclude_Date = new Date(excludeDt.date);
						let exclude_day = exclude_Date.getDay();
						
						if(week[exclude_day]){
							week[exclude_day].longerday = false;
							week[exclude_day].scheduled = false;
						}
					}
				})
			}
			
			if(this.calenderRule.shorterdays.exclude.length > 0){
			
				week.forEach(weekelem =>{
					
					let excludeDt = this.calenderRule.shorterdays.exclude.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(excludeDt){
						let exclude_Date = new Date(excludeDt.date);
						let exclude_day = exclude_Date.getDay();
						
						if(week[exclude_day]){
							week[exclude_day].shorterday = false;
							week[exclude_day].scheduled = false;
						}
					}
				})
			}
			
			if(this.calenderRule.closed.exclude.length > 0){
			
				week.forEach(weekelem =>{
					
					let excludeDt = this.calenderRule.closed.exclude.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(excludeDt){
						let exclude_Date = new Date(excludeDt.date);
						let exclude_day = exclude_Date.getDay();
						
						if(week[exclude_day]){
							week[exclude_day].holiday = false;
							week[exclude_day].scheduled = false;
						}
					}
				})
			}
			
			if(this.calenderRule.normaldays.specific.length > 0){
			
				week.forEach(weekelem =>{
					
					let specDt = this.calenderRule.normaldays.specific.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(specDt){
						let specificDate = new Date(specDt.date);
						let speficDay = specificDate.getDay();
						
						if(week[speficDay]){
							week[speficDay].normalday = true;
							week[speficDay].scheduled = true;
							week[speficDay].color = this.calenderRule.normaldays.color;
							week[speficDay].type = 'normal';
						}
					}
				})
			}
			
			if(this.calenderRule.longerdays.specific.length > 0){
			
				week.forEach(weekelem =>{
					
					let specDt = this.calenderRule.longerdays.specific.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(specDt){
						let specificDate = new Date(specDt.date);
						let speficDay = specificDate.getDay();
						
						if(week[speficDay]){
							week[speficDay].longerday = true;
							week[speficDay].scheduled = true;
							week[speficDay].color = this.calenderRule.longerdays.color;
							week[speficDay].type = 'long';
						}
					}
				})
			}
			
			if(this.calenderRule.shorterdays.specific.length > 0){
			
				week.forEach(weekelem =>{
					
					let specDt = this.calenderRule.shorterdays.specific.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(specDt){
						let specificDate = new Date(specDt.date);
						let speficDay = specificDate.getDay();
						
						if(week[speficDay]){
							week[speficDay].shorterday = true;
							week[speficDay].scheduled = true;
							week[speficDay].color = this.calenderRule.shorterdays.color;
							week[speficDay].type = 'short';
						}
					}
				})
			}
			
			if(this.calenderRule.closed.specific.length > 0){
			
				week.forEach(weekelem =>{
					
					let specDt = this.calenderRule.closed.specific.find(({date}) => {
						let _weekdate = new Date(weekelem.weekdate);
						let _spcdate = new Date(date);
						
						return _weekdate.getTime() === _spcdate.getTime()
						
					});
					
					if(specDt){
						let specificDate = new Date(specDt.date);
						let speficDay = specificDate.getDay();
						
						if(week[speficDay]){
							week[speficDay].holiday = true;
							week[speficDay].scheduled = true;
							week[speficDay].color = this.calenderRule.closed.color;
							week[speficDay].type = 'holiday';
						}
					}
				})
			}
			
	return week
  }

  selectMonth(){
	//console.log(this.mon_sel)
	if(this.month_all){
		this.mon_sel=true;
	}
	else{
		this.mon_sel=!this.mon_sel
	}
	//console.log(this.mon_sel, this.month_all);
	this.month_selected.emit(this.mon_sel);
		
	
  }


  refreshMonthCalender(indx){
	this.selMonthIndex=indx;
	this.weeks.forEach(week=>{
		week.forEach(day=>{
			if(day.weekdate!=null){
				if(!day.scheduled){
					day.selectDeselect=0;
					day.selectedSchedule=false;
					day.normalday=false;
					day.longerday=false;
					day.shorterday=false;
					day.holiday=false;
					
					/*if(day.weekdate.getDay()!=0){
						day.holiday=false;
					}*/
				}
				else{
					day.selectDeselect=0;
					day.selectedSchedule=false;
				}
			}	
			
		})
	})
  }

  sel_date(data){
  
	  //console.log(data);
	  
	  //console.log(this.monthIndx, this.selMonthIndex)
	  if(this.selMonthIndex==this.monthIndx){
		
		//console.log('sel_date: ', data.scheduled)
	  
		if(data.scheduled != true){
			if(data.selectDeselect==1){
				
				//console.log("single selection if");
				
				data.selectDeselect=0;
				data.single_sel=false;
				data.selectedSchedule=false;
				data.normalday=false;
				data.longerday=false;
				data.shorterday=false;
				data.holiday=false;
				data.type = null;
				
				/*if(data.weekdate.getDay()!=0){
					data.holiday=false;
				}*/
				this.daySelect=false;
			}
			else{
				//if(data.weekdate.getDay()!=0){
					
					data.selectDeselect=1;
					data.selectedSchedule=true;
					data.single_sel=true;
					
					//console.log("single selection else", this.msgService.dayType);
					
					if(this.msgService.dayType=='normal'){
						data.normalday=true;
						data.type = 'normal';
						data.color = this.calenderRule.normaldays.color;
					} else if(this.msgService.dayType=='short') {
						data.shorterday=true;
						data.type = 'short';
						data.color = this.calenderRule.shorterdays.color;
					} else if(this.msgService.dayType=='long') {
						data.longerday=true;
						data.type = 'long';
						data.color = this.calenderRule.longerdays.color;
					} else if(this.msgService.dayType=='holiday') {
						data.holiday=true;
						data.type = 'holiday';
						data.color = this.calenderRule.closed.color;
					}
					
					this.editDelDate.emit({sel_type:'Non-scheduledDay', day:data});
					this.daySelect=true;
				//}
			}
		}
		else{
			this.editDelDate.emit({sel_type:'scheduledDay', day:data});
		}
	  }
	  
  }

  selectDaysForRange(data){
	//console.log("inside select days of calendar")
	//console.log(this.monthIndx, this.selMonthIndex)
	this.weeks.forEach(week=>{
		week.forEach(day=>{
			day.selectDeselect=0;
		})
	})
	//console.log(data)

	for(var i=0; i<data.length;i++){
		this.weeks.forEach(week=>{
			week.forEach(day=>{
				if(day.weekdate!=null){

					if(day.weekdate.getDay()==data[i].dayIndex){
						if(day.scheduled!=true){
							day.selectDeselect=1;
							day.selectedSchedule=true;
							if(data[i].type=='normal'){
								day.normalday=true;
								day.color = this.calenderRule.normaldays.color;
							}
							else if(data[i].type=='long'){
								day.longerday=true;
								day.color = this.calenderRule.longerdays.color;
							}
							else if(data[i].type=='short'){
								day.shorterday=true;
								day.color = this.calenderRule.shorterdays.color;
							}
							else if(data[i].type=='holiday'){
								day.holiday=true;
								day.color = this.calenderRule.closed.color;
							}
						}
					}
					
					
				}
				
			})
		})
	}

	this.weeks.forEach(week=>{
		week.forEach(day=>{
			if(day.selectDeselect!=1 && day.single_sel!=true){
				if(day.scheduled != true){
					day.selectedSchedule=false;
					day.normalday=false;
					day.longerday=false;
					day.shorterday=false;
					if(day.weekdate!=null){
						day.holiday=false;
					}
					day.type=null;
				}
				else{
					day.selectedSchedule=false;
				}
				
			};
		})
	})
	
  }

  generateSelectedDays(){
	let flag=0;
	//console.log(this.msgService.dayType)
	
	//console.log(this.calenderRule);
	
	
	this.weeks.forEach(week=>{
		week.forEach(day=>{
			if(day.weekdate!=null){
				if(day.selectedSchedule==true){
					flag=1;
					day.scheduled=true;
					day.selectDeselect=0;
					day.selectedSchedule=false;
					if(this.msgService.dayType=='normal'){
						day.normalday=true;
						day.type='normal'
						day.longerday=false;
						day.shorterday=false;
						day.color = this.calenderRule.normaldays.color;
					}
					else if(this.msgService.dayType=='long'){
						day.normalday=false;
						day.longerday=true;
						day.type='long'
						day.shorterday=false;
						day.color = this.calenderRule.longerdays.color;
					}
					else if(this.msgService.dayType=='short'){
						day.normalday=false;
						day.longerday=false;
						day.shorterday=true;
						day.type='short'
						day.color = this.calenderRule.shorterdays.color;
					}
					else if(this.msgService.dayType=='holiday'){
						day.normalday=false;
						day.longerday=false;
						day.shorterday=false;
						day.holiday=true;
						day.type='holiday';
						day.color = this.calenderRule.closed.color;
					}
				}
				
			}
		})
	});

	if(flag!=1){
		this.checkDaySelect.emit(true);
	} else{
		this.checkDaySelect.emit(false);
	}
  }

  delete_SpecificDay_Schedule(dy){
	this.weeks.forEach(week=>{
		week.forEach(day=>{
			if(day.weekdate!=null){
				if(day.weekdate==dy.weekdate)
				{
					day.scheduled=false;
					day.normalday=false;
					day.longerday=false;
					day.shorterday=false;
					day.selectDeselect=0;
					day.selectedSchedule=false;
					day.holiday=false;
					
					/*if(day.weekdate.getDay()!=0){
						day.holiday=false;
					}*/
					day.type=null;
				}
				else{
					if(day.scheduled!=true){
						day.scheduled=false;
						day.normalday=false;
						day.longerday=false;
						day.shorterday=false;
						day.selectDeselect=0;
						day.single_sel=false;
						day.selectedSchedule=false;
						day.holiday=false;
						/*if(day.weekdate.getDay()!=0){
							day.holiday=false;
						}*/
						day.type=null;
					}
				}
			}
		})
	})
  }

 

}
