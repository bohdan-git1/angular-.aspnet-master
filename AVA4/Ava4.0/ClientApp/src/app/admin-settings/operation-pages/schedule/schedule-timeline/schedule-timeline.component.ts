import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Inject, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../../../core/message.service';

@Component({
  selector: 'app-schedule-timeline',
  templateUrl: './schedule-timeline.component.html',
  styleUrls: ['./schedule-timeline.component.css']
})
export class ScheduleTimelineComponent implements OnInit {
	@Input() templt_sel:any;
	errAdd_proc=false;
	patientArr: any[];
	patientArr_1:any[]=[];
	guidePosArr: any[] = [];
	guidePosArr_halfHr: any[] = [];
	selctd_stTm:any;
	selctd_endTm:any;
	windowHt: any;
	
	clockWd: any = 0;
	clockInterval:any;
	checkTimeInterval:any;
	
	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0, suppressScrollX: false};
	public timerConfig: PerfectScrollbarConfigInterface = {wheelSpeed:0, suppressScrollX: false};
	
	@ViewChild('patientcomponent') patientcomponent: PerfectScrollbarComponent;
	@ViewChild('timercomponent') timercomponent: PerfectScrollbarComponent;
	@ViewChild('overbookedcont') overbookedcont: PerfectScrollbarComponent;
	
	@ViewChild('timer') timer: ElementRef;
	
	@Input() patientblockSettings: any = {};
	selectedLocation: any;
	
	subscription: Subscription;
	timeline_scroll_y = 0;
	timerScroll = 0;
	
	startTime:any;
	endTime:any;
	endTime_minutes: any;
	
	timerLabelArr: any[] = [];
	slotcont_wd = 114;
	scrollablecont_wd = 114;
	
	timer_width: any;
	timer_view: any = 4;
	
	slot_space:any;
	block_space: any;
	
	views: any[] = [{label: "4 hour", value: 4}, {label: "2 hour", value: 2}, {label: "Entire day", value: 9}];
	selectedviewIndx: any = 0;
	
	_isToday: any = true;
	
	zoomviewport: any = 100;
	
	dayEventMsg_data: any = {};
	dayEventMsgArr: any[] = [];
	
	fiveminposArr: any[] = [];
	showfiveminGuide:boolean = false;
	
	scrollableContHt: any;
	overbookedArr: any = [];
	arrUpdt_interval:any;
	nextIndx=0;
	
	lunch_startTime: any;
	lunch_endTime: any;
	lunch_blockWd: any;
	lunch_posLeft: any;
	
	showEntryPopup:boolean = false;
	entryPopupPos: any = {left: 0, top: 0};
	appntTime: any;
	
	searchResult: boolean = false;
	
	selectedProcedureOptn: any = {};
	procedureEndTime: any;
	
	selectedProcedureIndx: any;
	selectedProcdBlockIndx: any;
	selectedProcOptn: any;
	filteSearchProcedure: any[] = [];
	// patientArr_temp:any[]=[];
	nosearchMsg: any = "No group/procedure found!";
	editBlock: boolean = false;
	
	procedureArr: any[] = [
		{"type": "record", "label": "Record", "color": "#FCFF7C", "time": "40", "selected": false, "subprocedure": [
		  {"code": "101", "label": "Initial - Child", "count": "40"},
		  {"code": "102", "label": "Initial - Adult", "count": "40"},
		  {"code": "103", "label": "Initial - Transfer In", "count": "40"},
		  {"code": "104", "label": "Initial - Transfer Retent", "count": "40"},
		  {"code": "105", "label": "Initial - Second Opinion", "count": "40"},
		  {"code": "106", "label": "Recall", "count": "40"}
		]},
		{"type": "exam", "label": "Exam", "color": "#FD7474", "time": "60", "selected": false, "subprocedure" : [
		  { "code": "201", "label": "Recall - Phase 1", "count": "60"},
		  { "code": "202", "label": "Recall with Pano", "count": "60"},
		  { "code": "203", "label": "Records - Child", "count": "60"},
		  { "code": "204", "label": "Records - Adult", "count": "60"},
		  { "code": "205", "label": "Records - Progress", "count": "60"},
		  { "code": "206", "label": "Records - Update", "count": "60"},
		  { "code": "207", "label": "Records - Update w/ our", "count": "60"},
		  { "code": "208", "label": "Kodas", "count": "60"},
		  { "code": "209", "label": "Pano", "count": "60"}
		]},
		{"type": "start", "label": "Start", "color": "#74B3FD", "time": "40", "selected": false, "subprocedure" : [
			{ "code": "301", "label": "Progress Pano", "count": "40"},
			{ "code": "302", "label": "Surgical Models & Hook", "count": "40"},
			{ "code": "303", "label": "Scan - Rescan", "count": "40"},
			{ "code": "304", "label": "Records child w/ our Pano", "count": "40"},
			{ "code": "305", "label": "Records child brought", "count": "40"},
			{ "code": "306", "label": "Records adult w/ our Pano", "count": "40"}]},
		
		{"type": "appl", "label": "Appl", "color": "#F6CC61", "time": "70", "selected": false, "subprocedure" : [{ "code": "401", "label": "Consult Child", "count": "70"},
      { "code": "402", "label": "Consult Adult", "count": "70"},
      { "code": "405", "label": "Consult - Progress", "count": "70"},
      { "code": "406", "label": "Consult Extra", "count": "70"}]},
		
		{"type": "adj", "label": "ADJ", "color": "#8CF1E4", "time": "10", "selected": false, "subprocedure" : [
      { "code": "450", "label": "SEPS", "count": "10"},
      { "code": "530", "label": "IA - Dentist referred", "count": "10"},
      { "code": "531", "label": "IA - Patient referred ", "count": "10"}
    ]},
		{"type": "dband", "label": "D - Band", "color": "#B48CF6", "time": "60", "selected": false, "subprocedure" : [
		{ "code": "532", "label": "IA - Advertisement Referred", "count": "60"},
		{ "code": "533", "label": "IA - Website Referred", "count": "60"},
		{ "code": "534", "label": "IA - Friend Referred", "count": "60"}]},
		
		{"type": "events", "label": "Events", "color": "#C4C4C4", "time": "60", "selected": false, "subprocedure" : [{ "code": "532", "label": "IA - Meeting", "count": "60"},
      { "code": "533", "label": "IA - Luncheon", "count": "60"},
      { "code": "534", "label": "IA - Friend Referred", "count": "60"}]}
	];
	
	@HostListener('window:resize', ['$event'])
	onResize(event) {
				
		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
	}
	
	
	
  constructor(private messageService: MessageService, public patientDialog: MatDialog) { 
	
	this.patientArr = [{chair: 'Exam', 
						procedures: [
					   {stratTime: '08:00', endTime: '09:00', group: 'exam', color: '#FD7474', time: '60', procedurecode: '204'},
					   {stratTime: '09:00', endTime: '09:40', group: 'start', color: '#74B3FD', time: '40', procedurecode: '302'},
					   {stratTime: '09:50', endTime: '10:50', group: 'exam', color: '#FD7474', time: '60', procedurecode: '201'},
					   {stratTime: '11:30', endTime: '12:10', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '105'},
					   {stratTime: '13:00', endTime: '13:10', group: 'adj', color: '#8CF1E4', time: '10', procedurecode: '450'},
					   {stratTime: '14:00', endTime: '14:40', group: 'start', color: '#74B3FD', time: '40', procedurecode: '301'},
					   {stratTime: '15:00', endTime: '16:00', group: 'exam', color: '#FD7474', time: '60', procedurecode: '202'},
					   {stratTime: '16:05', endTime: '17:05', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '533'}, 
					   {stratTime: '17:20', endTime: '18:20', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '531'},

						]
					  },

					  {chair: '2', 
						procedures: [
						{stratTime: '08:00', endTime: '09:00', group: 'exam', color: '#FD7474', time: '60', procedurecode: '204'},
						{stratTime: '09:05', endTime: '10:05', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '534'},
						{stratTime: '10:10', endTime: '10:50', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '103'},

					    {stratTime: '11:50', endTime: '12:30', group: 'start', color: '#74B3FD', time: '40', procedurecode: '303'},
					    {stratTime: '12:40', endTime: '12:50', group: 'adj', color: '#8CF1E4', time: '10', procedurecode: '450'},
					    {stratTime: '13:30', endTime: '14:40', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '406'},
						{stratTime: '14:40', endTime: '15:20', group: 'start', color: '#74B3FD', time: '40', procedurecode: '304'},
						{stratTime: '15:25', endTime: '16:25', group: 'exam', color: '#FD7474', time: '60', procedurecode: '202'},
					    {stratTime: '16:30', endTime: '17:30', group: 'exam', color: '#FD7474', time: '60', procedurecode: '201'},
					    {stratTime: '17:30', endTime: '18:10', group: 'start', color: '#74B3FD', time: '40', procedurecode: '304'},
					]
					  },
					  {chair: '3', 
						procedures: [
						
					   {stratTime: '09:50', endTime: '10:30', group: 'start', color: '#74B3FD', time: '40', procedurecode: '301'},
					   {stratTime: '11:40', endTime: '12:20', group: 'start', color: '#74B3FD', time: '40', procedurecode: '306'},
					   {stratTime: '16:00', endTime: '16:10', group: 'adj', color: '#8CF1E4', time: '10', procedurecode: '450'},
					   {stratTime: '16:45', endTime: '17:45', group: 'exam', color: '#FD7474', time: '60', procedurecode: '204'},
					   
					   ]
					  },
					  {chair: '4',
						procedures: [

					   {stratTime: '07:00', endTime: '07:40', group: 'start', color: '#74B3FD', time: '40', procedurecode: '301'},
					   {stratTime: '07:50', endTime: '08:30', group: 'start', color: '#74B3FD', time: '40', procedurecode: '302'},
					   {stratTime: '11:30', endTime: '12:40', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '402'},
					   {stratTime: '12:45', endTime: '13:25', group: 'start', color: '#74B3FD', time: '40', procedurecode: '304'},
					   {stratTime: '13:30', endTime: '14:40', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '405'},
					   {stratTime: '15:05', endTime: '15:45', group: 'start', color: '#74B3FD', time: '40', procedurecode: '305'},
					   {stratTime: '17:00', endTime: '18:10', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '401'},
					  
						]
					  },
					  {chair: '5',
						procedures: [

					   {stratTime: '07:00', endTime: '08:10', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '402'},
					   {stratTime: '08:15', endTime: '08:55', group: 'start', color: '#74B3FD', time: '40', procedurecode: '304'},
					   {stratTime: '09:00', endTime: '09:40', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '102'},
					   {stratTime: '16:10', endTime: '17:10', group: 'exam', color: '#FD7474', time: '60', procedurecode: '202'},
					   {stratTime: '16:10', endTime: '18:10', group: 'exam', color: '#FD7474', time: '60', procedurecode: '203'},
					  
					   ]
					  },
					  {chair: '6',
						procedures: [
					   {stratTime: '08:00', endTime: '09:00', group: 'exam', color: '#FD7474', time: '60', procedurecode: '203'},
					   {stratTime: '09:10', endTime: '10:10', group: 'exam', color: '#FD7474', time: '60', procedurecode: '204'},

					   {stratTime: '12:45', endTime: '11:55', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '405'},
					   
					
					   ]
					  },
					  
					  {chair: '7',
						procedures: [
						{stratTime: '07:00', endTime: '08:00', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '531'},
					   {stratTime: '08:10', endTime: '09:20', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '405'},
					   {stratTime: '09:20', endTime: '10:20', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '530'},
					   {stratTime: '13:50', endTime: '14:30', group: 'start', color: '#74B3FD', time: '40', procedurecode: '302'},
					   {stratTime: '14:50', endTime: '15:30', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '105'},
					   {stratTime: '15:35', endTime: '15:45', group: 'adj', color: '#8CF1E4', time: '10', procedurecode: '450'},
					]
					  },
					  
					  {chair: '8', 
						procedures: [
							{stratTime: '08:40', endTime: '09:40', group: 'exam', color: '#FD7474', time: '60', procedurecode: '203'},
							{stratTime: '09:45', endTime: '10:25', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '103'},
							{stratTime: '13:50', endTime: '14:50', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '531'},
							{stratTime: '15:00', endTime: '15:40', group: 'record', color: '#FCFF7C', time: '40', procedurecode: '103'},
							{stratTime: '15:40', endTime: '16:40', group: 'exam', color: '#FD7474', time: '60', procedurecode: '201'}
					   ]
					  },
					  
					  {chair: '9', 
						procedures: [
							{stratTime: '12:40', endTime: '13:40', group: 'exam', color: '#FD7474', time: '60', procedurecode: '207'},
							{stratTime: '13:25', endTime: '14:05', group: 'start', color: '#74B3FD', time: '40', procedurecode: '303'},
							{stratTime: '14:20', endTime: '15:20', group: 'dband', color: '#B48CF6', time: '60', procedurecode: '532'},
							{stratTime: '15:25', endTime: '16:35', group: 'appl', color: '#F6CC61', time: '70', procedurecode: '405'},
							{stratTime: '17:50', endTime: '18:30', group: 'start', color: '#74B3FD', time: '40', procedurecode: '304'}
					   
					]
					  }
	
	
	];
	
	
	
	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'scroll'){
			this.timeline_scroll_y = message.data;
			this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
		}
		
		
		
	});
	
  }

  ngOnInit() {

	this.startTime=this.templt_sel.startTime;
	this.endTime=this.templt_sel.endTime;
	this.lunch_startTime=this.templt_sel.startLunch;
	this.lunch_endTime=this.templt_sel.endLunch;

	this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);	
	this.timer_width = this.timer.nativeElement.offsetWidth;
	this.timer_view = this.views[this.selectedviewIndx].value;
	
	this.intializeProcedureBlockItem();
	this.createTimeGuide();
	this.patientArr_1=this.patientArr;
	this.messageService.getMessage().subscribe(res=>{
		if(res.event==="total chairs"){
			this.editPatientArr(res.data.total_Ch);
		}
	})
	
  }

  editPatientArr(chairNum){
	  //console.log('Inside edit patient arr')
	if(+chairNum!==0 && +chairNum<=this.patientArr.length && chairNum!==''){
		this.patientArr_1=this.patientArr.slice(0,+chairNum)
	}
	else{
		this.patientArr_1=this.patientArr;
	}

	//console.log(this.patientArr_1)

  }
  
  intializeProcedureBlockItem() {
	
	/*for(var i=0; i<this.patientArr.length; i++){
		for(var j=0; j<this.patientArr[i].procedures.length; j++){
			var prockey = this.patientArr[i].procedures[j].procedurecode;
			
			for(var k=0; k<this.procedureArr.length; k++){
				for(var l=0; l<this.procedureArr[k].subprocedure.length; l++){
					if(this.procedureArr[k].subprocedure[l].code == prockey){
						this.patientArr[i].procedures[j].color = this.procedureArr[k].color;
						this.patientArr[i].procedures[j].time = this.procedureArr[k].time;
						break;
					}
				}
			}
		}
	}*/
	
	this.filteSearchProcedure = this.procedureArr;
  }
  
  
  createTimeGuide(){
	let startTime_hr:any = this.startTime.split(':')[0];
	let startTime_min:any = this.startTime.split(':')[1];
	
	let endTime_hr:any = this.endTime.split(':')[0];
	let endTime_min:any = this.endTime.split(':')[1];
	
	this.endTime_minutes = Number(endTime_min);
	
	this.slot_space = this.timer_width/this.timer_view;
	this.block_space = (this.slot_space/6)/2 + (56+27);
	
	//console.log('in guide: ', this.block_space);
	
	let hrDif:any = Math.abs(startTime_hr-endTime_hr) + 1;
	
	this.guidePosArr = [];
	this.guidePosArr_halfHr = [];
	this.fiveminposArr = [];
	this.timerLabelArr = [];
	this.slotcont_wd = 114;
	this.scrollablecont_wd = 114;
	
	for(let i=0; i<hrDif; i++){
		
		let leftpos:any = ((i*this.slot_space) + this.block_space);		
		this.guidePosArr.push(leftpos-1);
		
		let halfHrPos: any = (leftpos + this.slot_space/2);
		
		if(halfHrPos != leftpos){
			this.guidePosArr_halfHr.push(halfHrPos-1);
		}
		
		for(let j=0; j<12; j++){
			let fiveMinPos: any = leftpos + (j+1)*(this.slot_space/12);
			
			if(fiveMinPos != leftpos && fiveMinPos != halfHrPos){
				this.fiveminposArr.push(fiveMinPos);
			}
		}
		
		let labelHr = Number(startTime_hr) + i;
		if(labelHr > 12){
			labelHr = Math.abs(12-labelHr);
		}
		
		let timelabel: any
		if(labelHr < 10){
			timelabel = `0${labelHr}:00`;
		} else {
			timelabel = `${labelHr}:00`;
		}
		
		if(i < hrDif-1){
			this.slotcont_wd += this.slot_space;
			this.scrollablecont_wd += this.slot_space;
		}
		
		this.timerLabelArr.push(timelabel);
	}
	
	if(this.endTime_minutes > 0 && this.endTime_minutes < 30){
		this.slotcont_wd += this.slot_space/4;
		this.scrollablecont_wd += this.slot_space/4;
	} else if(this.endTime_minutes >= 30 && this.endTime_minutes < 45){
		this.slotcont_wd += (this.slot_space/4)*2;
		this.scrollablecont_wd += (this.slot_space/4)*2;
	} else if(this.endTime_minutes == 45){
		this.slotcont_wd += (this.slot_space/4)*3;
		this.scrollablecont_wd += (this.slot_space/4)*3;
	}
	
	this.slotcont_wd += (this.slot_space/4);
	this.scrollablecont_wd = this.slotcont_wd + 56*2;
	
	this.scrollableContHt = (70+28)*8;
	
	
	this.createLunchBlock();
	
  }
  
  slidetimer(dir){
	let checkScrollability: any = this.timercomponent.directiveRef.position();
	let move_x = this.slot_space*(this.timer_view - 3) + this.slot_space/2;
	
	if(dir == 'left'){
		if(checkScrollability.x != 'start'){
			this.timerScroll -= move_x;
		}
	} else {
		if(checkScrollability.x != 'end'){
			this.timerScroll += move_x;
		}
	}
	
	this.timercomponent.directiveRef.scrollTo(this.timerScroll, 0, 500);
	this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
  }
  
  getEntryPopup(evt, indx){
	
	let getAppntTime: any = ((evt.pageX - evt.target.getBoundingClientRect().left) + (7*this.slot_space) - this.block_space)/this.slot_space;

	let appntTime_hr: any = getAppntTime.toFixed(2).split('.')[0];
	let appntTime_min: any = Math.round((getAppntTime.toFixed(2).split('.')[1]/100)*60);
	let appntTime_min_round: any = Math.floor(appntTime_min/5)*5;
	
	if(appntTime_hr < 10){
	appntTime_hr = '0' + appntTime_hr;
	}

	if(appntTime_min_round < 10){
	appntTime_min_round = '0' + appntTime_min_round;
	}

	this.appntTime = `${appntTime_hr}:${appntTime_min_round}`;
	
	this.selectedProcedureOptn = {};
	this.procedureEndTime = null;
	
	this.showEntryPopup = true;
	this.selectedProcedureIndx = indx;
	
	/*height: 58; margin: 24*/
	
	let topPosY: any = (evt.pageY - evt.target.getBoundingClientRect().top) + indx*(58 + 24);   
	this.entryPopupPos = {left: this.entryPopupPosition(this.appntTime), top: topPosY};
	this.editBlock = false;
	
  }
  
  entryPopupPosition(_startTime){
	let popUpPos: any;
	
	let tempStart = 7*this.slot_space;
	
	let startTime_hr = _startTime.split(':')[0];
	let startTime_min = _startTime.split(':')[1];
	
	let startTime_in_hr = Number(startTime_hr) + (startTime_min/60);
	
	popUpPos = ((startTime_in_hr*this.slot_space) - tempStart + this.block_space);
	
	return popUpPos;
	
  }
  
  createLunchBlock(){
	let tempStart = 7*this.slot_space;
	
	let _startTime: any = this.lunch_startTime;
	let _endTime: any = this.lunch_endTime;
	
	let startTime_hr = _startTime.split(':')[0];
	let startTime_min = _startTime.split(':')[1];
	
	let endTime_hr = _endTime.split(':')[0];
	let endTime_min = _endTime.split(':')[1];
	
	let startTime_in_hr = Number(startTime_hr) + (startTime_min/60);
	let endTime_in_hr = Number(endTime_hr) + (endTime_min/60);
	
	this.lunch_blockWd = Math.abs(startTime_in_hr - endTime_in_hr)*this.slot_space;
	this.lunch_posLeft = ((startTime_in_hr*this.slot_space) - tempStart + this.block_space);
	
  }
  
	getFormattedTime(_time) {
		if(_time){
			let hr: any = _time.split(':')[0];
			let min: any = _time.split(':')[1];
			
			let amOrpm: any;
			let formatedTime: any;
			
			if(hr >= 12 && min >= 0){
				amOrpm = 'pm';
			} else {
				amOrpm = 'am';
			}
			
			if(hr > 12){
				let hr12 = hr - 12;
				if(hr12 < 10){
					formatedTime = `0${hr12}:${min} ${amOrpm}`;
				} else {
					formatedTime = `${hr12}:${min} ${amOrpm}`;
				}
			} else {
				formatedTime = `${_time} ${amOrpm}`;
			}
			
			return formatedTime;
		}
	}
	
	remove() {
		if(this.editBlock == true){
			this.patientArr[this.selectedProcedureIndx].procedures.splice(this.selectedProcdBlockIndx, 1);
		}
		
		this.showEntryPopup = false;
		this.selectedProcedureOptn = {};
		this.procedureEndTime = null;
		this.selectedProcOptn = '';
	}
	
	closePopup() {
		this.showEntryPopup = false;
		this.selectedProcedureOptn = {};
		this.procedureEndTime = null;
		this.selectedProcOptn = '';
	}
	
	showProcedureOptions() {
		this.searchResult = this.searchResult == true ? false : true;
	}
	
	selectSearchOption(which, grpindx, subproIndx){
		
		this.selectedProcedureOptn = {};
		this.procedureEndTime = null;
		this.selectedProcOptn = '';
		
		if(which == 'group'){
			this.selectedProcedureOptn = {
				label: this.filteSearchProcedure[grpindx].label, 
				group:this.filteSearchProcedure[grpindx].type, 
				procedurecode: '',  
				time: this.filteSearchProcedure[grpindx].time, 
				color: this.filteSearchProcedure[grpindx].color};
		} else {
			this.selectedProcedureOptn = {
				label: this.filteSearchProcedure[grpindx].subprocedure[subproIndx].label,
				group:this.filteSearchProcedure[grpindx].type,
				procedurecode: this.filteSearchProcedure[grpindx].subprocedure[subproIndx].code,
				time: this.filteSearchProcedure[grpindx].subprocedure[subproIndx].count, 
				color: this.filteSearchProcedure[grpindx].color
			};
		}
		
		this.selectedProcOptn = this.selectedProcedureOptn.label;
		
		let startTime = this.appntTime;
		let startTime_hr = startTime.split(':')[0];
		let startTime_min = startTime.split(':')[1];

		let strtTimeS = (startTime_hr*60*60)+ (startTime_min*60);
		let endTimeS = strtTimeS + (this.selectedProcedureOptn.time*60);

		let endTime_hr = Math.floor(endTimeS/3600);
		let endTime_min = Math.floor((endTimeS%3600)/60);
		
		let endTime_hr_temp: any;
		let endTime_min_temp: any;
		
		if(endTime_hr < 10){
			endTime_hr_temp =  `0${endTime_hr}`;
		} else {
			endTime_hr_temp = endTime_hr;
		}
		
		if(endTime_min < 10){
			endTime_min_temp = `0${endTime_min}`;
		} else {
			endTime_min_temp = endTime_min;
		}
				
		this.procedureEndTime = `${endTime_hr_temp}:${endTime_min_temp}`;
		this.searchResult = false;
	}
	
	applyProcedure() {
		if(this.selectedProcOptn){
			
			if(this.editBlock == true){
				
				this.patientArr[this.selectedProcedureIndx].procedures[this.selectedProcdBlockIndx] = {
						stratTime: this.appntTime, 
						endTime: this.procedureEndTime,
						group: this.selectedProcedureOptn.group,
						procedurecode: this.selectedProcedureOptn.procedurecode, 
						color: this.selectedProcedureOptn.color, 
						time: this.selectedProcedureOptn.time
				}
				
				
			} else {
				let temp={
					stratTime: this.appntTime, 
					endTime: this.procedureEndTime,
					group: this.selectedProcedureOptn.group,
					procedurecode: this.selectedProcedureOptn.procedurecode, 
					color: this.selectedProcedureOptn.color, 
					time: this.selectedProcedureOptn.time
			}
			let chkFlag=0;
			this.patientArr[this.selectedProcedureIndx].procedures.forEach(proc=>{
				if(proc.stratTime>temp.stratTime && proc.stratTime<temp.endTime){
					chkFlag=1;
					//alert('Procedures getting overlapped. Please select another procedure')
				}
			})
			if(chkFlag==1){
				// alert('Procedures getting overlapped. Please select another procedure')
				this.selctd_stTm=this.getFormattedTime(temp.stratTime);
				this.selctd_endTm=this.getFormattedTime(temp.endTime);
				this.errAdd_proc=true;
			}
			else{
				this.patientArr[this.selectedProcedureIndx].procedures.push(temp)
			}
			
				// this.patientArr[this.selectedProcedureIndx].procedures.push({
				// 		stratTime: this.appntTime, 
				// 		endTime: this.procedureEndTime,
				// 		group: this.selectedProcedureOptn.group,
				// 		procedurecode: this.selectedProcedureOptn.procedurecode, 
				// 		color: this.selectedProcedureOptn.color, 
				// 		time: this.selectedProcedureOptn.time
				// })
			}
			
			this.showEntryPopup = false;
			this.selectedProcOptn = '';
			this.editBlock = false;
		}
	}
	
	selectProcedueBlock(evt, indx, procIndx){
		
		this.selectedProcedureIndx = indx;
		this.selectedProcdBlockIndx = procIndx;
		
		this.appntTime = this.patientArr[indx].procedures[procIndx].stratTime;
		this.procedureEndTime = this.patientArr[indx].procedures[procIndx].endTime;
		
		let topPosY: any = (evt.pageY - evt.target.getBoundingClientRect().top) + indx*(58 + 24);   
		this.entryPopupPos = {left: this.entryPopupPosition(this.appntTime), top: topPosY};
		
		this.selectedProcedureOptn = {};
		this.showEntryPopup = true;
		this.editBlock = true;
		
		//this.selectedProcOptn = 
		let procdItem: any;
		
		if(this.patientArr[indx].procedures[procIndx].procedurecode == ''){
			procdItem = this.patientArr[indx].procedures[procIndx].group;
			for(var k=0; k<this.procedureArr.length; k++){
				if(this.procedureArr[k].type == procdItem){
					this.selectedProcOptn = this.procedureArr[k].type;
					this.selectedProcedureOptn = {label: this.procedureArr[k].label, time: this.procedureArr[k].time, color: this.procedureArr[k].color};
					break;
				}
			}
		} else {
			procdItem = this.patientArr[indx].procedures[procIndx].procedurecode;
			for(var k=0; k<this.procedureArr.length; k++){
				for(var l=0; l<this.procedureArr[k].subprocedure.length; l++){
					if(this.procedureArr[k].subprocedure[l].code == procdItem){
						this.selectedProcOptn = this.procedureArr[k].subprocedure[l].label;
						this.selectedProcedureOptn = {label: this.procedureArr[k].subprocedure[l].label, time: this.procedureArr[k].subprocedure[l].count, color: this.procedureArr[k].color};
						break;
					}
				}
			}
		}
	}
	
	searchProcedure(evt){
		let _searchStr: any = this.selectedProcOptn;
		let searchStr: any = _searchStr.toLowerCase();
		
		this.filteSearchProcedure = [];
		this.searchResult = false;
		
		if(searchStr.length > 0){
			this.filteSearchProcedure = this.procedureArr.filter(item => {
				return item.subprocedure.some(subpro => {
					return (subpro.code.includes(searchStr) || subpro.label.toLowerCase().includes(searchStr))
				})
				
			});
			
			if(this.filteSearchProcedure.length == 0){
				//this.filteSearchProcedure.push({"code": "", "label": "No group/procedure found!"});
			} else {			
				
			}
			
			this.searchResult = true;
		} else {
			this.filteSearchProcedure = this.procedureArr;
		}
	}
	
	onSearchOutside() {
		this.searchResult = false;
	}

}
