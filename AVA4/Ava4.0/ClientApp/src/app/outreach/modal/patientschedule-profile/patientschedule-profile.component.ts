import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'app-patientschedule-profile',
  templateUrl: './patientschedule-profile.component.html',
  styleUrls: ['./patientschedule-profile.component.css']
})
export class PatientscheduleProfileComponent implements OnInit {

  @Input() patientdata: any;
	@Output() closeModal = new EventEmitter();
	
	appntType: any;
	checkin: boolean = false;

	procedurecode: any = [{"code": "101", "name": "Initial - Child", "time" : "2", "timespan": "days"}, {"code": "102", "name": "Initial - Adult", "time" : "1", "timespan": "days"}, {"code": "103", "name": "Initial - Transfer In", "time" : "6", "timespan": "weeks"}, {"code": "104", "name": "Initial - Transfer Retent", "time" : "3", "timespan": "months"}, {"code": "105", "name": "Initial - Second Opinion", "time" : "1", "timespan": "day"}, {"code": "106", "name": "Recall", "time" : "1", "timespan": "month"}];

	timespan_dd: any[] = [{label: 'months', selected: false}, {label: 'weeks', selected: false}, {label: 'days', selected: false}];

	locations_dd: any[] = [{label: 'Lehi', selected: false}, {label: 'Orem', selected: false}, {label: 'Provo', selected: false}, {label: 'Salt Lake City', selected: false}];

	doctors_dd: any[] = [{label: 'Dr. Smoot', selected: false}, {label: 'Dr. Tobler', selected: false}, {label: 'Dr. Wilson', selected: false}];

	weeklabel: any[] = [{label: 'Sunday', offday: true}, {label: 'Monday', offday: false}, {label: 'Tuesday', offday: false}, {label: 'Wednesday', offday: false}, {label: 'Thursday', offday: false},  {label: 'Friday', offday: false}, {label: 'Saturday', offday: false}];

	appntslot: any[] = [
		{date:'3/17/2019', day: 'Sunday', timeslot: []},
		{date:'3/18/2019', day: 'Monday', timeslot: [
								{location: 'Salt Lake City', time: '8:15am'},
								{location: 'Lehi', time: '8:15am'}
								]},
		{date:'3/19/2019', day: 'Tuesday', timeslot: []},
		{date:'3/20/2019', day: 'Wednesday', timeslot: [
			{location: 'Lehi', time: '12:30am'}, 
			{location: 'Salt Lake City', time: '2:45pm'}, 
			{location: 'Provo', time:'2:45pm'}]},
		{date:'3/21/2019', day: 'Thursday', timeslot: [{location: 'Salt Lake City', time: '9:00am'}]},
		{date:'3/22/2019', day: 'Friday', timeslot: [{location: 'Salt Lake City', time: '9:00am'}]},
		{date:'3/23/2019', day: 'Saturday', timeslot: [{location: 'Provo', time: '3:45pm'}]}
	];

	procedureSrch: boolean = false;
	filterProcedure: any = [];
	procedure_searchStr: any = '';
	timenum: any = '6';

	appntSection: boolean = false;

	today:any;
	currentWeek: any;
	startdt:any;
	enddt:any;
	dateCounter: any = 0;

	showPrevWeekBtn: boolean = false;
	showNextWeekBtn: boolean = true;
	month: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	innerModal: boolean = false;
	appnt_timeslot: any = '';
	selectedSoltIndx: any;
	seledtedDateIndx: any;
	scheduled: boolean = false;
	
	rescheduleAppnt: boolean = false;
	
	curr_appnt: any = {location: 'location#1', date: '03/26/2019', time: '9:20am', chair: 'Chair 4', doctor: 'Dr. Smoot', ins: 'PT IN FOR EMERG, LL3 OF..'};
	
	patientModal_Schedule: boolean = false;
	
	emojiArr: any[] = [
	{"id": "1", "label": "Recent visit to dentist", "emoji": [{"rating": 1, "show": true, "selected": false}, {"rating": 2, "show": false, "selected": false}, {"rating": 3, "show": false, "selected": false}, {"rating": 4, "show": false, "selected": false}, {"rating": 5, "show": true, "selected": false}]},
	
	{"id": "2", "label": "Elastic wear", "emoji": [{"rating": 1, "show": true, "selected": false}, {"rating": 2, "show": true, "selected": false}, {"rating": 3, "show": true, "selected": false}, {"rating": 4, "show": true, "selected": false}, {"rating": 5, "show": true, "selected": false}]},
	
	{"id": "3", "label": "Brushing / Oral hygiene", "emoji": [{"rating": 1, "show": true, "selected": false}, {"rating": 2, "show": true, "selected": false}, {"rating": 3, "show": true, "selected": false}, {"rating": 4, "show": true, "selected": false}, {"rating": 5, "show": true, "selected": false}]},
	
	{"id": "4", "label": "Overall cooperation", "emoji": [{"rating": 1, "show": true, "selected": false}, {"rating": 2, "show": true, "selected": false}, {"rating": 3, "show": true, "selected": false}, {"rating": 4, "show": true, "selected": false}, {"rating": 5, "show": true, "selected": false}]},
	
	{"id": "5", "label": "On track for completion", "emoji": [{"rating": 1, "show": true, "selected": false}, {"rating": 2, "show": false, "selected": false}, {"rating": 3, "show": false, "selected": false}, {"rating": 4, "show": false, "selected": false}, {"rating": 5, "show": true, "selected": false}]},
	
	];
	
	completionOnTrack:boolean = true;
		
  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
    
	//this.patientdata = this.data.patientdata;
	
	console.log(this.patientdata);
	
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
	
	this.getCurrentWeek();
  }
  
  getCurrentWeek(){
	this.today = new Date();
	let dayNum: any = this.today.getDay();
	
	this.startdt = new Date();
	this.startdt.setDate(this.today.getDate() - dayNum);
	
	this.enddt = new Date();
	this.enddt.setDate(this.startdt.getDay() + 6);
	
	let strtdayString: any;
	let enddayString: any;
	
	if(this.startdt.getFullYear() == this.enddt.getFullYear()){
		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
		
		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
	} else {
		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
		
		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
	}
	
	this.currentWeek = strtdayString + enddayString;
  }
  
	dateSuffix(value) {

		let suffix = 'th';
		let day = value;

		if (day == '1' || day == '21' || day == '31') {
			suffix = 'st'
		} else if (day == '2' || day == '22') {
			suffix = 'nd';
		} else if (day == '3' || day == '23') {
		   suffix = 'rd';
		}

		return suffix;
	}
	
	nextPrevWeek(dir){
		
		let strtdayString: any;
		let enddayString: any;
		
		if(dir == 'next'){
			this.dateCounter++;
			this.showPrevWeekBtn = true;
			this.startdt = new Date(this.enddt.getFullYear(), this.enddt.getMonth(), this.enddt.getDate() + 1)
			this.enddt.setDate(this.startdt.getDate() + 6);
		} else {
			this.dateCounter--;
			if(this.dateCounter <= 0){
				this.dateCounter = 0;
				this.showPrevWeekBtn = false;
			}
			this.startdt = new Date(this.startdt.getFullYear(), this.startdt.getMonth(), this.startdt.getDate() - 7);
			this.enddt = new Date(this.startdt);
			this.enddt.setDate(this.startdt.getDate() + 6);
		}
		
		if(this.startdt.getFullYear() == this.enddt.getFullYear()){
			strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
			
			enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		} else {
			strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
			
			enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		}
		
		this.currentWeek = strtdayString + enddayString;
	}
  
  searchProcedureCode(evt){
	let _searchStr: any = this.procedure_searchStr;
	let searchStr: any = _searchStr.toLowerCase();
	
	this.filterProcedure = [];
	this.procedureSrch = false;
	
	if(searchStr.length > 0){
		this.filterProcedure = this.procedurecode.filter(item => {
			return (item.code.includes(searchStr))
		});
		
		if(this.filterProcedure.length == 0){
			this.filterProcedure.push({"code": "", "name": "No procedure code found!"});
		}
		
		if(this.filterProcedure.length > 0){
			this.procedureSrch = true;
		}
	}
  }
  
  selectProcedure(indx) {
	this.procedure_searchStr = `${this.filterProcedure[indx].code}`;
	this.timenum = this.filterProcedure[indx].time;
	this.filterProcedure = [];
	this.procedureSrch = false;
  }
  
  changeCheckin(){
	if(this.checkin == true){
		this.checkin = false;
	} else {
		this.checkin = true;
	}
  }
  
  showAppntSection() {
	this.patientModal_Schedule = true;
	this.appntSection = true;
  }
  
  openInnerModal(dayindx, slotindx) {
		
	this.selectedSoltIndx = slotindx;
	this.seledtedDateIndx = dayindx;
	
	let appntDt: any = new Date(this.appntslot[dayindx].date);
	
	this.appnt_timeslot = `${this.weeklabel[appntDt.getDay()].label}, ${this.month[appntDt.getMonth()]} ${appntDt.getDate()}${this.dateSuffix(appntDt.getDate())} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`;
	
	this.innerModal = true;
  }
  
  confirmSelection(){
	//this.innerModal = false;
	this.scheduled = true;
	this.curr_appnt.date = this.appntslot[this.seledtedDateIndx].date;
	this.curr_appnt.time = this.appntslot[this.seledtedDateIndx].timeslot[this.selectedSoltIndx].time;
	
	setTimeout(() => {
		this.innerModal = false;
		this.scheduled = false;
		this.rescheduleAppnt = false;
	}, 2000);
  }
  
  closeInnerModal() {
	this.innerModal = false;
  }
  
  rescheduleKeepAppnt(type){
	if(type == 'reschedule'){
		this.rescheduleAppnt = true;
		this.appntSection = true;
	} else {
		this.rescheduleAppnt = false;
		this.appntSection = false;
	}
  }
  
  openProfile(section) {
	this.closeModal.emit();
	this.messageService.sendMessage('openpatienttab', {"patient": this.patientdata, "posttreatment": true, "section": section});
  }
  
  addToBucket() {
	this.closeModal.emit();
  }
  
  selectedOption(indx, emojiIndx){
	this.emojiArr[indx].emoji.map((item, i) => {
		if(i == emojiIndx){
			if(item.selected == true){
				item.selected = false;
			} else {
				item.selected = true;
			}
		} else {
			item.selected = false;
		}
	});
	
	
	if(this.emojiArr[indx].id == 5){
		if(this.emojiArr[indx].emoji[emojiIndx].rating == 1){
			this.completionOnTrack = false;
		} else {
			this.completionOnTrack = true;
		}
	}
  }

}
