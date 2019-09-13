import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { Subscription } from 'rxjs';
import { MessageService } from '../../../core/message.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-patientschedule',
  templateUrl: './patientschedule.component.html',
  styleUrls: ['./patientschedule.component.css']
})
export class PatientscheduleComponent implements OnInit {

	@Input() patientdata: any;
	@Output() closeModal = new EventEmitter();
	
	appIndx:any;
	appntType: any;
	checkin: boolean = false;
	locationAnddoctorArray: any;
	multi_weekCounter=0;
	locationAnddoctor:any='All'; 
	proc_err_panel=false;
	initialPatientMulti:any;
	procedurecode: any = [{"code": "101", "name": "Initial - Child", "time" : "2", "timespan": "days"}, {"code": "102", "name": "Initial - Adult", "time" : "1", "timespan": "days"}, {"code": "103", "name": "Initial - Transfer In", "time" : "6", "timespan": "weeks"}, {"code": "104", "name": "Initial - Transfer Retent", "time" : "3", "timespan": "months"}, {"code": "105", "name": "Initial - Second Opinion", "time" : "1", "timespan": "day"}, {"code": "106", "name": "Recall", "time" : "1", "timespan": "month"}];

	timespan_dd: any[] = [{label: 'months', selected: false}, {label: 'weeks', selected: false}, {label: 'days', selected: false}];

	timespan_dd_type: any[] = [{label: 'minutes', selected: false}, {label: 'hours', selected: false}];


	locations_dd: any[] = [{label: 'Lehi', selected: false}, {label: 'Orem', selected: false}, {label: 'Provo', selected: false}, {label: 'Salt Lake City', selected: false}];

	doctors_dd: any[] = [{label: 'All', selected: false},{label: 'Dr. Smoot', selected: false}, {label: 'Dr. Tobler', selected: false}, {label: 'Dr. Wilson', selected: false}];

	weeklabel: any[] = [{label: 'Sunday', offday: true}, {label: 'Monday', offday: false}, {label: 'Tuesday', offday: false}, {label: 'Wednesday', offday: false}, {label: 'Thursday', offday: false},  {label: 'Friday', offday: false}, {label: 'Saturday', offday: false}];

	appntslot: any[] = [
		{day: 'Sunday', timeslot: [
			{location: 'Orem', time: '08:15am', doctorname: 'Dr. Smoot', slotSelected:false},
			{location: 'Lehi', time: '08:15am', doctorname: 'Dr. Wilson', slotSelected:false}
		]},
		{day: 'Monday', timeslot: [
								{location: 'Salt Lake City', time: '08:15am', doctorname: 'Dr. Smoot', slotSelected:false},
								{location: 'Lehi', time: '08:15am', doctorname: 'Dr. Tobler', slotSelected:false},
								{location: 'Orem', time: '08:15am', doctorname: 'Dr. Wilson', slotSelected:false},
								{location: 'Provo', time:'02:45pm', doctorname: 'Dr. Smoot', slotSelected:false }
								]
							},
		{day: 'Tuesday', timeslot: [{location: 'Orem', time: '08:25am', doctorname: 'Dr. Smoot', slotSelected:false}]},
		{day: 'Wednesday', timeslot: [
			{location: 'Lehi', time: '12:30am',  doctorname: 'Dr. Smoot', slotSelected:false}, 
			{location: 'Salt Lake City', time: '02:45pm', doctorname: 'Dr. Wilson', slotSelected:false}, 
			{location: 'Orem', time: '08:15am', doctorname: 'Dr. Tobler', slotSelected:false},
			{location: 'Provo', time:'02:45pm', doctorname: 'Dr. Tobler', slotSelected:false }]},
		{day: 'Thursday', timeslot: [
			{location: 'Lehi', time: '07:00am' , doctorname: 'Dr. Tobler', slotSelected:false},
			{location: 'Salt Lake City', time: '09:00am' , doctorname: 'Dr. Tobler', slotSelected:false},
			{location: 'Orem', time: '12:51pm' , doctorname: 'Dr. Tobler', slotSelected:false},
			{location: 'Salt Lake City', time: '01:16pm' , doctorname: 'Dr. Tobler', slotSelected:false},
			{location: 'Salt Lake City', time: '01:45pm' , doctorname: 'Dr. Tobler', slotSelected:false}
		]},
		{day: 'Friday', timeslot: [{location: 'Salt Lake City', time: '09:00am', doctorname: 'Dr. Smoot', slotSelected:false}]},
		{day: 'Saturday', timeslot: [{location: 'Provo', time: '03:45pm', doctorname: 'Dr. Wilson', slotSelected:false}]}
	];
	
	appntslot1: any []= this.appntslot;

	procedureSrch: boolean = false;
	filterProcedure: any = [];
	procedure_searchStr: any = '';
	procedure_searchTime:any='';
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
	delApp_timeslot:any;
	selectedSoltIndx: any;
	seledtedDateIndx: any;
	scheduled: boolean = false;
	delApptmnt=false;
	innerDelAppntModal=false;
	rescheduleAppnt: boolean = false;
	checkCircle=false;

	weekStDt:any;
	weekEndDt:any;

	weekdays:any[]=[];
	
	current_appArr:any[]=[]
	curr_loc='Location #1';
	curr_doc='Dr. Smoot'
	curr_ins= 'PT IN FOR EMERG, LL3 OF..'
	curr_appntDt: any;
	curr_appntDy:any;
	curr_appntMon:any;
	curr_tmslot:any;
	initialWkSt:any;
	clickedDate:any;
	doc_plcHldr="all";
	procedureArr: any[] = [
		{"code": "101", "label": "Initial - Child", "time": "40", "type": "record"},
		{"code": "102", "label": "Initial - Adult", "time": "40", "type": "record"},
		{"code": "103", "label": "Initial - Transfer In", "time": "40", "type": "record"},
		{"code": "104", "label": "Initial - Transfer Retent", "time": "10", "type": "record"},
		{"code": "105", "label": "Initial - Second Opinion", "time": "40", "type": "record"},
		{"code": "201", "label": "Recall", "time": "15", "type": "record"},
		{"code": "202", "label": "Recall - Phase 1", "time": "15", "type": "exam"},
		{"code": "204", "label": "Recall with Pano", "time": "20", "type": "exam"},
		{"code": "301", "label": "Records - Child", "time": "60", "type": "exam"},
		{"code": "302", "label": "Records - Adult", "time": "60", "type": "exam"},
		{"code": "303", "label": "Records - Progress", "time": "60", "type": "exam"},
		{"code": "304", "label": "Records - Update", "time": "60", "type": "exam"},
		{"code": "305", "label": "Records - Update w/ our", "time": "60", "type": "exam"},
		{"code": "306", "label": "Kodas", "time": "20", "type": "exam"},
		{"code": "307", "label": "Pano", "time": "20", "type": "exam"},
		{"code": "308", "label": "Progress Pano", "time": "20", "type": "start"},
		{"code": "309", "label": "Surgical Models & Hook", "time": "60", "type": "start"},
		{"code": "310", "label": "Scan - Rescan", "time": "15", "type": "start"},
		{"code": "311", "label": "Records child w/ our Pano", "time": "60", "type": "start"},
		{"code": "312", "label": "Records child brought", "time": "40", "type": "start"},
		{"code": "313", "label": "Records adult w/ our Pano", "time": "40", "type": "start"},
		{"code": "401", "label": "Consult Child", "time": "35", "type": "appl"},
		{"code": "402", "label": "Consult Adult", "time": "35", "type": "appl"},
		{"code": "405", "label": "Consult - Progress", "time": "15", "type": "appl"},
		{"code": "406", "label": "Consult Extra", "time": "10", "type": "appl"},
		{"code": "450", "label": "SEPS", "time": "10", "type": "adj"},
		{"code": "530", "label": "Dentist referred", "time": "10", "type": "adj"},
		{"code": "531", "label": "Patient referred", "time": "10", "type": "adj"},
		{"code": "532", "label": "IA - Advertisement Referred", "time": "10", "type": "dband"},
		{"code": "533", "label": "IA - Website Referred", "time": "10", "type": "dband"},
		{"code": "534", "label": "IA - Friend Referred", "time": "10", "type": "dband"},
		{"code": "535", "label": "Meeting", "time": "15", "type": "event"},
		{"code": "536", "label": "Luncheon", "time": "30", "type": "event"},
		{"code": "537", "label": "Doctor Event", "time": "10", "type": "event"}
	];


	curr_appnt_obj:any={};
	patientProc_code:any;
	patienProc_tm: any;

	multipleAppnts:any[]=[
		{procCode:"202", tenure:"0 weeks", showDetails:false, details:{
			loc:"Location #1", date:"07/05/2019", chair:"Chair 1", doc:"Dr. Smoot", startTime:"09:00am",
		}},
		{procCode:"305", tenure:"1 weeks", showDetails:false, details:{
			loc:"Location #2", date:"09/18/2019", chair:"Chair 1", doc:"Dr. Smoot", startTime:"08:25am",
		}},
		{procCode:"533", tenure:"1 weeks", showDetails:false, details:{
			loc:"Location #3", date:"10/28/2019", chair:"Chair 1", doc:"Dr. Smoot", startTime:"02:45pm",
		}},
		
	]

	public config: PerfectScrollbarConfigInterface = {suppressScrollX: true};
	
	previousAppnt:any[] = [
		{"location": "Location#2", "date": "04/11/18", "time": "09:20 am", "chair": "Chair 2", "status": "showedup", "prev_procedure": "900 - Arch Wire(s) Simple", "visit_notes": "Change Arch wire to 018 U", "multipleappt": false, "next_procedure": "450 - Adjustment", "week": "6 weeks"},
		
		{"location": "Location#2", "date": "03/27/18", "time": "10:30 am", "chair": "Chair 7", "status": "showedup", "prev_procedure": "753 - Broken bracket", "visit_notes": "PT IN FOR EMERG, LL3 OFF R..", "multipleappt": true, "next_procedure": "753 - Broken bracket", "week": "6 weeks"},
		
		{"location": "Location#2", "date": "03/14/18", "time": "09:00 am", "chair": "Chair 1", "status": "noshow", "prev_procedure": "753 - Broken bracket", "visit_notes": "", "multipleappt": false, "next_procedure": "", "week": ""},
		
		{"location": "Location#2", "date": "12/12/17", "time": "09:00 am", "chair": "Chair 3", "status": "cancelled", "prev_procedure": "908 - Retie", "visit_notes": "", "multipleappt": false, "next_procedure": "", "week": ""},
		
		{"location": "Location#2", "date": "08/03/17", "time": "04:45 pm", "chair": "Chair 2", "status": "showedup", "prev_procedure": "753 - Broken bracket", "visit_notes": "PT IN FOR EMERG, LL3 OFF R..", "multipleappt": false, "next_procedure": "753 - Broken bracket", "week": "8 weeks"},
		
		{"location": "Location#2", "date": "04/19/17", "time": "09:30 pm", "chair": "Chair 1", "status": "reschedule", "prev_procedure": "753 - Broken bracket", "visit_notes": "", "multipleappt": false, "next_procedure": "", "week": ""},
		
		{"location": "Location#2", "date": "11/30/16", "time": "04:45 pm", "chair": "Chair 5", "status": "showedup", "prev_procedure": "908 - Retie", "visit_notes": "", "multipleappt": false, "next_procedure": "", "week": ""},
	]
	
	showAllApnts: boolean = false;
	showAppntsArr: any[] = [];
	


	numberArray: any[]=[];
	numberSelectBox: boolean = false;
	selectedNumber: any = 0;

	selectedWeek="weeks";
	barSelectBox: boolean = false;


	selectedLocation="all";
	locationSelectBox: boolean = false;

	selectedDoctor="all";
	doctorSelectBox: boolean = false;





  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
	
	this.calculateNumber(this.selectedWeek);
	//this.patientdata = this.data.patientdata;
	
	//console.log(this.patientdata);
	if(this.patientdata.multipleAppnts){
		this.initialPatientMulti=true;
	}
	else{
		this.initialPatientMulti=false;
	}
	
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
	
	//this.getCurrentWeek();
	this.calWeekStartEnd();
	this.initialAppnt();
	
	this.initializeAppt();
	
	
  }

  numberBoxOpen()
  {
	  this.numberSelectBox= this.numberSelectBox== true ? false : true ;
  }

  selectedNumberId(sel)
  {
	  this.selectedNumber= sel;
	  this.numberSelectBox= false;
  }


  barBoxOpen()
  {
	  this.barSelectBox= this.barSelectBox== true ? false : true ;
  }

  selectedBarId(sel)
  {
	  
	  this.selectedWeek= sel;
	  this.barSelectBox= false;
	  this.selectedNumber=1;
	  this.calculateNumber(this.selectedWeek);
  }


  locationBoxOpen()
  {
	  this.locationSelectBox= this.locationSelectBox== true ? false : true ;
  }

  selectedLocationId(sel)
  {
	  
	  this.selectedLocation= sel;
	  this.locationSelectBox= false;
	 
  }

  doctorBoxOpen()
  {
	  this.doctorSelectBox= this.doctorSelectBox== true ? false : true ;
  }

  selectedDoctorId(sel)
  {
	  this.selectedDoctor= sel;
	  this.doctorSelectBox= false;
  }



  calculateNumber(numberType)
  {
	   var lastDay;
	   this.numberArray= [];
		if(numberType=='weeks')
		{
			lastDay= 54;
		}else if (numberType=='days')
		{
			lastDay= 365;
		}else {
			lastDay=12
		}

		for(var i=1; i<=lastDay; i++)
		{
			this.numberArray.push({'no': i});
		}
  }

  initialAppnt(){
	  var today=new Date();
	  var prTm;
	  this.procedureArr.forEach(ele=>{
		if(ele.code==this.patientdata.procedurecode){
			this.patientProc_code=this.patientdata.procedurecode+"-"+ele.label;
			prTm=ele.time
			this.patienProc_tm="("+ele.time+"mins"+")"
		}
	});
	let stTm=this.patientdata.stratTime.split(':');
	let sTm;
	if(+stTm[0]>=12){
		
			sTm=+stTm[0]-12+":"+stTm[1]+"pm";
		
	}
	else{
		
		
			sTm=+stTm[0]+":"+stTm[1]+"am";
		
	}
	if(+sTm.split(':')[0]<10){
		sTm="0"+Number(sTm.split(':')[0])+":"+sTm.split(':')[1]
	}
	let prcCd;
	if(this.patientProc_code.length>17){
		prcCd=this.patientProc_code.substring(0,17)+'..'
	}
	else{
		prcCd=this.patientProc_code;
	}

	let tempSchObj={
		location:this.curr_loc,
		date:this.weeklabel[today.getDay()].label+","+" "+this.month[today.getMonth()].substring(0,3)+" "+today.getDate()+this.dateSuffix(today.getDate()),
		time:sTm,
		procedure_tm:this.patienProc_tm,
		procedure_code:prcCd,
		doc:this.curr_doc,
		ins:this.curr_ins,
		prc_time:prTm,
		rescheduleAppnt:false

	}
	this.current_appArr.push(tempSchObj);
	

  }

  getProcedureCodeLabel(data){
	  let result;
	  
	  this.procedureArr.forEach(ele=>{
		  if(ele.code==data){
			  result=ele.code+"-"+ele.label;
			
		  }
	  });
	  
	if(result.length>15){
		return result.substring(0,12)+"..."
	}
	else{
		return result;
	}
	
  }

  getProcedureTime(data){
	  let result;
	  this.procedureArr.forEach(ele=>{
		if(ele.code==data){
			result="("+ele.time+"mins"+")";
			// return result;
		}
	});
	//console.log(result);
	return result;
  }

//   getAppntDateFormat(data){
// 	let res;
// 	res=this.weeklabel[data.details.day].label+", "+this.month[data.details.month].substring(0,3)+" "+data.details.date+this.dateSuffix(data.details.date)
// 	//return res;
//   }

  apptDetails(indx){
	var i;
	for(i=0;i<this.multipleAppnts.length;i++){
		if(i!=indx){
			this.multipleAppnts[i].showDetails=false;
		}
		else{
			this.multipleAppnts[i].showDetails=!this.multipleAppnts[i].showDetails
		}
	}
	let appt=this.multipleAppnts[indx];
	let prcCd;
	let prcTime;
	//this.procedure_searchStr=this.getProcedureCodeLabel(appt.procCode);
	this.procedureArr.forEach(ele=>{
		if(ele.code==appt.procCode){
			prcCd=ele.code+"-"+ele.label;
			prcTime=ele.time;
		}
	});
	this.doc_plcHldr=appt.details.doc;
	this.timenum=appt.tenure[0];
	this.procedure_searchStr=prcCd;
	this.procedure_searchTime=prcTime;
	

  }

  slot_select(dayIndx:number, selTime:any){
	

	var i;
	for(i=0;i<this.appntslot1.length;i++){
		if(i==dayIndx){
			this.appntslot1[i].timeslot.forEach(ele => {
				if(ele.time==selTime)
				{
					ele.slotSelected=true;
				}
				else{
					ele.slotSelected=false;
				}
			});
		}
		else{
			this.appntslot1[i].timeslot.forEach(ele => {
					ele.slotSelected=false;
			});
		}
	}
  }


  calWeekStartEnd(){
	  var today=new Date();
	  if(today.getDay()!=0){
		  this.weekStDt=new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay());
	  }
	  else{
		  this.weekStDt=new Date(today.getFullYear(),today.getMonth(),today.getDate());
	  }
	  //this.weekEndDt=new Date(this.weekStDt.getFullYear(),this.weekStDt.getMonth(),this.weekStDt.getDate()+6);
	  this.initialWkSt=new Date(this.weekStDt);
	  this.calWeekArr(this.weekStDt);
  }

  calWeekArr(strtdate){
	  
		this.weekdays=[];
	// while(this.weekdays.length!=0){
	// 	this.weekdays.pop();
	// }
	  //console.log(this.weekdays)
	  var i=0;
	  while(i<7){
		var tempDt=new Date(strtdate);
		tempDt.setDate(strtdate.getDate() + i);
		if(i==0){
			var offday=true;
		}
		else{
			offday=false;
		}
		var weekObj={
			weekOff:offday,
			day:this.weeklabel[tempDt.getDay()].label,
			date:tempDt.getDate(),
			mon:tempDt.getMonth(),
			year:tempDt.getFullYear()
		}
		this.weekdays.push(weekObj);
		// if(i==6)
		// 	{
		// 		this.weekStDt= tempDt;
		// 	}
		i++
	  }
	  //console.log(this.weekdays.length)
  }
  
//   getCurrentWeek(){
// 	this.today = new Date();
// 	let dayNum: any = this.today.getDay();
	
// 	this.startdt = new Date();
// 	this.startdt.setDate(this.today.getDate() - dayNum);
	
// 	this.enddt = new Date();
// 	this.enddt.setDate(this.startdt.getDay() + 6);
	
// 	let strtdayString: any;
// 	let enddayString: any;
	
// 	if(this.startdt.getFullYear() == this.enddt.getFullYear()){
// 		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
		
// 		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
// 	} else {
// 		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
		
// 		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
// 	}
	
// 	this.currentWeek = strtdayString + enddayString;
//   }
  
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
		
		// let strtdayString: any;
		// let enddayString: any;
		
		// if(dir == 'next'){
		// 	this.dateCounter++;
		// 	this.showPrevWeekBtn = true;
		// 	this.startdt = new Date(this.enddt.getFullYear(), this.enddt.getMonth(), this.enddt.getDate() + 1)
		// 	this.enddt.setDate(this.startdt.getDate() + 6);
		// } else {
		// 	this.dateCounter--;
		// 	if(this.dateCounter <= 0){
		// 		this.dateCounter = 0;
		// 		this.showPrevWeekBtn = false;
		// 	}
		// 	this.startdt = new Date(this.startdt.getFullYear(), this.startdt.getMonth(), this.startdt.getDate() - 7);
		// 	this.enddt = new Date(this.startdt);
		// 	this.enddt.setDate(this.startdt.getDate() + 6);
		// }
		
		// if(this.startdt.getFullYear() == this.enddt.getFullYear()){
		// 	strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
			
		// 	enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		// } else {
		// 	strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
			
		// 	enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		// }
		
		// this.currentWeek = strtdayString + enddayString;

		if(dir == 'next'){
			this.dateCounter++;
			if(this.initialPatientMulti){
				this.multi_weekCounter++;
			}
			this.showPrevWeekBtn = true;
			this.weekStDt=new Date(this.weekStDt.getFullYear(),this.weekStDt.getMonth(),this.weekStDt.getDate()+7);
			//this.weekStDt.setDate(this.weekEndDt.getDate()+1);
			//this.weekEndDt=new Date(this.weekStDt.getFullYear(),this.weekStDt.getMonth(),this.weekStDt.getDate()+6);
			//this.weekEndDt.setDate(this.weekStDt.getDate()+6);
			
		}
		else{
			this.dateCounter--;
			if(this.initialPatientMulti){
				this.multi_weekCounter--;
			}
			if(this.dateCounter <= 0){
				this.dateCounter = 0;
				this.showPrevWeekBtn = false;
			}
			let stDT=new Date(this.weekStDt.getFullYear(),this.weekStDt.getMonth(),this.weekStDt.getDate())
			this.weekStDt.setDate(stDT.getDate()-7);
			
			
		}

		//console.log('START1',this.weekStDt);
		//console.log('END1',this.weekEndDt);
		this.calWeekArr(this.weekStDt);


	}

	showAppntWeek(appt,data,time){
		if(appt.showDetails==true){
			this.multi_weekCounter=0;
			let temp=data.split('/');
			this.clickedDate=new Date(+temp[2],+temp[0]-1, +temp[1]);
			console.log('CLICKED DATE', this.clickedDate);
			if(this.clickedDate.getDay()!=0){
				this.weekStDt=new Date(this.clickedDate.getFullYear(),this.clickedDate.getMonth(),this.clickedDate.getDate()-this.clickedDate.getDay());
			}
			else{
				this.weekStDt=new Date(this.clickedDate.getFullYear(),this.clickedDate.getMonth(),this.clickedDate.getDate());
			}
			this.calWeekArr(this.weekStDt);
			this.appntSection=true;
			this.slot_select(this.clickedDate.getDay(),time);
		}
		else{
			this.appntSection=false;
			this.procedure_searchStr='';
			this.procedure_searchTime='';
			this.doc_plcHldr="all"
			this.calWeekStartEnd();

		}
		
		
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

  searchListallProcedureCode()
  {
	this.procedureSrch = this.procedureSrch==true? false: true;
	this.filterProcedure = this.procedurecode;
  }
  
  selectProcedure(indx) {
	this.procedure_searchStr = `${this.filterProcedure[indx].code}`;
	this.timenum = this.filterProcedure[indx].time;
	this.filterProcedure = [];
	this.procedureSrch = false;
  }
  
  patientCheckin(){
	// if(this.checkin == true){
	// 	this.checkin = false;
	// } else {
	// 	this.checkin = true;
	// }
	if(!this.patientdata.checkedin)
	{
		let x= new Date()
		let currentTime;
		if(x.getHours()>=12){
			currentTime=x.getHours()-12+":"+x.getMinutes()+" pm";
		}
		else{
			currentTime=x.getHours()+":"+x.getMinutes()+" am";
		}
		let pStart;
		if(+(this.patientdata.stratTime.split(':')[0])>=12){
			pStart=+(this.patientdata.stratTime.split(':')[0])-12+":"+this.patientdata.stratTime.split(':')[1]+" pm";
		}
		else{
			pStart=this.patientdata.stratTime+" am";
		}
		let pSt=this.patientdata.stratTime.split(":");
		let pSt_hrs=+pSt[0]*60+(+pSt[1]);
		let chk_hrs=x.getHours()*60+ x.getMinutes();
		let time_gap=Math.abs(pSt_hrs-chk_hrs);
		let t_gap;
		if(time_gap>60){
			t_gap=Math.floor(time_gap/60)+"h"+" "+time_gap%60+"m";
		}
		else{
			t_gap=time_gap+"m"
		}
		let temp ={
			id:this.patientdata.id,
			patientFullName:this.patientdata.firstname+" "+this.patientdata.lastname,
			startTime:pStart,
			checkInTime:currentTime,
			timeGap:t_gap,
			appntType:this.patientdata.appntType
		}
		let msg="addToOnDeck"
		
		this.messageService.sendMessage(msg,temp)
		/*setTimeout(()=>{
			this.closeModal.emit();
		});*/
		this.patientdata.checkedin=true;
	}
	else{
		let msg="remove from deck";
		this.messageService.sendMessage(msg,this.patientdata.id);
		/*setTimeout(()=>{
			this.closeModal.emit();
		});*/
		this.patientdata.checkedin=false;
	}
	
  }
  
  showAppntSection() {
	  if(this.procedure_searchStr==''){
		  //window.alert('select a procedure');
		  this.proc_err_panel=true;
		  this.appntSection = false;
		  return;
	  }
	this.proc_err_panel=false;
	this.calWeekStartEnd();
	this.appntSection = true;
  }
  
  openInnerModal(dayindx, slotindx) {
	let clickedObj=this.weekdays[dayindx];
	let clickd_Dt=new Date(clickedObj.year, clickedObj.mon,clickedObj.date);
	let today=new Date();
	let currentDt=new Date(today.getFullYear(),today.getMonth(),today.getDate());
	let clkd_tmSlot=this.appntslot[dayindx].timeslot[slotindx].time.split(':');
	let clkd_minsuffix=clkd_tmSlot[1].split('');
	let clkd_suffix=clkd_minsuffix[2]+clkd_minsuffix[3];
	let clkd_min=+(clkd_tmSlot[1].split(clkd_tmSlot[1][2])[0]);
	let clkd_hr;
	if(clkd_suffix=='am'){
		clkd_hr=+clkd_tmSlot[0];
	}
	else if(clkd_suffix=='pm'){
		if(+clkd_tmSlot[0]==12){
			clkd_hr=+clkd_tmSlot[0]
		}
		else{
			clkd_hr=+clkd_tmSlot[0]+12;
		}
	}
	if(!(currentDt>clickd_Dt)){
		if(currentDt<clickd_Dt){
			
			this.appnt_timeslot=`${clickedObj.day}, ${this.month[clickedObj.mon]} ${clickedObj.date}${this.dateSuffix(clickedObj.date)} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`
			this.curr_appntDt=clickedObj.date;
			this.curr_appntMon=this.month[clickedObj.mon];
			this.curr_appntDy=clickedObj.day;
			this.curr_tmslot=this.appntslot[dayindx].timeslot[slotindx].time;
			this.innerModal = true;
			return;
		}
		else{
			
			if(clkd_hr>today.getHours()){

				this.appnt_timeslot=`${clickedObj.day}, ${this.month[clickedObj.mon]} ${clickedObj.date}${this.dateSuffix(clickedObj.date)} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`
				this.curr_appntDt=clickedObj.date;
				this.curr_appntMon=this.month[clickedObj.mon];
				this.curr_appntDy=clickedObj.day;
				this.curr_tmslot=this.appntslot[dayindx].timeslot[slotindx].time;
				this.innerModal = true;
				return;
			}
			else if(clkd_hr==today.getHours())
			{
				
				if(clkd_min>=today.getMinutes()){
					
					this.appnt_timeslot=`${clickedObj.day}, ${this.month[clickedObj.mon]} ${clickedObj.date}${this.dateSuffix(clickedObj.date)} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`
					this.curr_appntDt=clickedObj.date;
					this.curr_appntMon=this.month[clickedObj.mon];
					this.curr_appntDy=clickedObj.day;
					this.curr_tmslot=this.appntslot[dayindx].timeslot[slotindx].time;
					this.innerModal = true;
					return;
				}
			}
			
		}
		
	}
	
	
	//console.log(dec)
		
	// this.selectedSoltIndx = slotindx;
	// this.seledtedDateIndx = dayindx;
	
	// let appntDt: any = new Date(this.appntslot[dayindx].date);
	
	//this.appnt_timeslot = `${this.weeklabel[appntDt.getDay()].label}, ${this.month[appntDt.getMonth()]} ${appntDt.getDate()}${this.dateSuffix(appntDt.getDate())} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`;
	
	// this.innerModal = true;
  }
  
  confirmSelection(){
	//this.innerModal = false;
	//console.log(this.patientdata)
	var proc_code;
	var proc_time;
	var prc_tm;
	var prcCd;
	this.procedureArr.forEach(ele=>{
		if(ele.code==this.procedure_searchStr.split('-')[0]){
			proc_code=this.procedure_searchStr+"-"+ele.label;
			prc_tm=ele.time
			proc_time="("+ele.time+"mins"+")"
		}
	})
	if(proc_code.length>17){
		prcCd=proc_code.substring(0,17)+".."
	}
	else{
		prcCd=proc_code;
	}
	this.scheduled = true;
	let tempSchObj={
		location:this.curr_loc,
		date:this.curr_appntDy+","+" "+this.curr_appntMon.substring(0,3)+" "+this.curr_appntDt+this.dateSuffix(this.curr_appntDt),
		time:this.curr_tmslot,
		procedure_tm:proc_time,
		procedure_code:prcCd,
		doc:this.curr_doc,
		ins:this.curr_ins,
		prc_time:prc_tm,
		rescheduleAppnt:false
	}
	if(this.rescheduleAppnt){
		this.current_appArr.splice(this.appIndx,1,tempSchObj)
	}
	else{
		this.current_appArr.push(tempSchObj);
	}
	
	console.log(this.current_appArr)
	
	// this.curr_appnt.date = this.appntslot[this.seledtedDateIndx].date;
	// this.curr_appnt.time = this.appntslot[this.seledtedDateIndx].timeslot[this.selectedSoltIndx].time;
	
	setTimeout(() => {
		this.innerModal = false;
		this.scheduled = false;
		this.rescheduleAppnt = false;
		this.procedure_searchStr='';
		this.procedure_searchTime='';
		this.appntSection=false;
		
		
	}, 2000);
	this.multipleAppnts.forEach(ele=>{
		ele.showDetails=false;
	});
  }
  scheduleMultiAppnts(){
	this.multipleAppnts.forEach(ele=>{
		let prTm
		this.procedureArr.forEach(el=>{
			if(el.code==ele.procCode){
				prTm=el.time
			}
		});

		let tempObj={
			location:ele.details.loc,
			date:this.getDate_multiAppnts(ele.details.date),
			time:ele.details.startTime,
			procedure_tm:this.getProcedureTime(ele.procCode),
			procedure_code:this.getProcedureCodeLabel(ele.procCode),
			doc:ele.details.doc,
			ins:this.curr_ins,
			prc_time:prTm,
			rescheduleAppnt:false
		}

		this.current_appArr.push(tempObj);

	})
	this.initialPatientMulti=false;
	this.appntSection=false;
	this.procedure_searchStr='';
	this.procedure_searchTime='';
	this.doc_plcHldr='all'
	this.innerModal=false;
	this.calWeekStartEnd();

	this.appntslot1.forEach(dy=>{
		dy.timeslot.forEach(element => {
			element.slotSelected=false;
		});
	})

  }

  getDate_multiAppnts(data){
	let tempDt=data.split('/');
	let dt=new Date(+tempDt[2],+tempDt[0]-1,tempDt[1]);
	let res=this.weeklabel[dt.getDay()].label+","+" "+this.month[dt.getMonth()].substring(0,3)+" "+dt.getDate()+this.dateSuffix(dt.getDate());
	return res;
  }
  
  closeInnerModal() {
	
	this.current_appArr.forEach(ele=>{
		ele.rescheduleAppnt=false;
	});
	this.rescheduleAppnt=false;
	this.innerModal = false;
	this.appntSection=false;
	this.procedure_searchStr='';
	this.procedure_searchTime='';
	this.multipleAppnts.forEach(ele=>{
		ele.showDetails=false;
	});
  }
  
  rescheduleKeepAppnt(type,indx){
	this.calWeekStartEnd();
	this.showPrevWeekBtn=false;
	this.createCurrAppObj(indx);
	if(type == 'reschedule'){
		//this.current_appArr[indx].rescheduleAppnt=true;
		var i;
		for(i=0;i<this.current_appArr.length;i++){
			if(i==indx){
				this.current_appArr[i].rescheduleAppnt=true;
			}
			else{
				this.current_appArr[i].rescheduleAppnt=false;
			}
		}
		//this.rescheduleAppnt = true;
		this.appntSection = true;
		this.procedure_searchStr=this.current_appArr[indx].procedure_code;
		this.procedure_searchTime=this.current_appArr[indx].prc_time;
		this.rescheduleAppnt=true;

	} else {
		this.current_appArr[indx].rescheduleAppnt=false;
		//this.rescheduleAppnt = false;
		this.appntSection = false;
		this.procedure_searchStr='';
		this.procedure_searchTime='';
		this.rescheduleAppnt=false;
	}
  }

  createCurrAppObj(ap_indx){
	this.curr_appnt_obj=this.current_appArr[ap_indx];
	this.delApp_timeslot=this.curr_appnt_obj.date+" at "+this.curr_appnt_obj.time+" ?"
	this.appIndx=ap_indx;
  }

  delAppnt(){
	this.current_appArr.splice(this.appIndx,1);
	if(!this.checkCircle){
		this.procedure_searchStr='';
		this.procedure_searchTime='';
	}
	this.rescheduleAppnt=false;
	this.checkCircle=false;
	this.appntSection=false;
  }
  
  openProfile(section) {
	this.closeModal.emit();
	this.messageService.sendMessage('openpatienttab', {"patient": this.patientdata, "posttreatment": true, "section": section});
  }
  
  addToBucket() {
	this.closeModal.emit();
	}
	
	location_filter_fu(locationAnddoctorArray) {

		this.locationAnddoctorArray= locationAnddoctorArray;
		var locationAnddoctor = this.locationAnddoctor;
		
		var arr= this.locationAnddoctorArray;
		var myJSON1 = JSON.stringify(this.appntslot);
		this.appntslot1 = JSON.parse((myJSON1));
		if(locationAnddoctor=='All' && arr.length == 0)
			{
				var myJSON1 = JSON.stringify(this.appntslot);
				this.appntslot1 = JSON.parse((myJSON1));
			}
			else 
			{ 
				var myJSON1 = JSON.stringify(this.appntslot);
					this.appntslot1 = JSON.parse((myJSON1));
					this.appntslot1.filter(function(appntslotonebyone) {
						let arrayfilter1=  appntslotonebyone.timeslot.filter(function(locationone){
							if (locationAnddoctor != "" && arr.length == 0 ) {
								if(locationone.doctorname == locationAnddoctor)
								{
									return true;
								}

							} else {
								return arr.some(srch => {
									if (typeof arr !== 'undefined' && arr.length > 0 && typeof(locationAnddoctor) != "undefined" && locationAnddoctor!='All')
									{
										return (locationone.location.includes(srch) && locationone.doctorname == locationAnddoctor)
									}
									else if (typeof arr !== 'undefined' && arr.length > 0 ){

										return (locationone.location.includes(srch))
									}
								})
							}
						});
						appntslotonebyone.timeslot=arrayfilter1;
					});
		}
	}



  doctor_filter_fu(locationAnddoctor) {
	this.locationAnddoctor= locationAnddoctor;
	var arr =[];
	arr= this.locationAnddoctorArray;
	if(locationAnddoctor=='All')
	{
		var myJSON = JSON.stringify(this.appntslot);
		this.appntslot1 = JSON.parse((myJSON));
		if (typeof arr !== 'undefined' && arr.length > 0)
		{
			this.appntslot1.filter(function(appntslotonebyone) {
				let arrayfilter1=  appntslotonebyone.timeslot.filter(function(locationone){
						return arr.some(srch => {
							return (locationone.location.includes(srch))
						})
				});
				appntslotonebyone.timeslot=arrayfilter1;
			});
		}
	} else {
	var myJSON = JSON.stringify(this.appntslot);
	this.appntslot1 = JSON.parse((myJSON));
		this.appntslot1.filter(function(appntslotonebyone) {
			let arrayfilter1=  appntslotonebyone.timeslot.filter(function(locationone){
				if (typeof arr !== 'undefined' && arr.length > 0)
					{
					return arr.some(srch => {
						if (typeof arr !== 'undefined' && arr.length > 0 && typeof(locationAnddoctor) != "undefined" && locationAnddoctor!='All')
						{
							return (locationone.location.includes(srch) && locationone.doctorname == locationAnddoctor)
						}
						else if (typeof arr !== 'undefined' && arr.length > 0 ){
							return (locationone.location.includes(srch))
						}
					})
					}else {
					if(locationone.doctorname == locationAnddoctor)
					{
						return true;
					}
				} 
			});
			appntslotonebyone.timeslot=arrayfilter1;
		});
	}	
	
  }
  
  initializeAppt(){
		this.showAppntsArr = this.previousAppnt.filter(item => {
			return (item.status != 'cancelled' && item.status != 'reschedule');
		})
  }
  
  showAppnts() {
	this.showAllApnts = this.showAllApnts == true ? false : true;
	if(this.showAllApnts == true){
		this.showAppntsArr = this.previousAppnt.map(item => {
			return item;
	})
	} else {
		this.initializeAppt();
	}
	
	
  }
	
	

}
