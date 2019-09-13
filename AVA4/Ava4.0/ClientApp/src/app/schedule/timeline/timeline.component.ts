import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Inject, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {

	patientArr: any[];
	patientArr_1:any[]=[];
	guidePosArr: any[] = [];
	guidePosArr_halfHr: any[] = [];
	
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
	
	startTime = "07:00";
	endTime = "18:30";
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
	
	lunch_startTime: any = "11:00";
	lunch_endTime: any = "11:30";
	lunch_blockWd: any;
	lunch_posLeft: any;
	
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
			this.zoomviewport = Number(window.localStorage.getItem('zoomview'));
		}
			
		/*if(window.innerHeight > 900){
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
		} else {
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
		}*/
		
		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
	}
	
  constructor(private messageService: MessageService, public patientDialog: MatDialog) { 
	
	this.patientArr = [{chair: 'Chair 1', 
						patients: [
					   {id: 11, firstname:'Sheev', lastname: 'Palpatine', stratTime: '08:00', endTime: '08:05', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl', checkedin: true, procedurecode: '204'},
					   {id: 12, firstname:'Kylo', lastname: 'Ren', stratTime: '08:30', endTime: '08:40', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband', checkedin: false, procedurecode: '312'},
					   {id: 13, firstname:'Mace', lastname: 'Windu', stratTime: '09:25', endTime: '09:40', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: true, procedurecode: '201'},
					   {id: 14, firstname:'', lastname: '', stratTime: '10:00', endTime: '10:20', accesscode: '', payment: true, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '102'}, 
					   {id: 15, firstname:'', lastname: '', stratTime: '10:45', endTime: '11:00', accesscode: '', payment: true, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '103'},
					   {id: 16, firstname:'Luke', lastname: 'Skywalker', stratTime: '11:30', endTime: '12:00', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl', checkedin: false, procedurecode: '105'},
					   {id: 17,firstname:'Jabba The Hutt', lastname: 'The Hutt', stratTime: '13:00', endTime: '13:05', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '450'},
					  
					   {id: 18, firstname:'Palpatine', lastname: 'Sheev', stratTime: '14:00', endTime: '14:10', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl', checkedin: false, procedurecode: '310'},
					   {id: 19,firstname:'', lastname: '', stratTime: '14:20', endTime: '14:50', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'dband', checkedin: false, procedurecode: '202'},
					   {id: 21,firstname:'Leia', lastname: 'Organa', stratTime: '15:05', endTime: '15:20', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam', checkedin: true, procedurecode: '533'}, 
					   {id: 23,firstname:'Subhanirmalya', lastname: 'Dasgupta Banerjee', stratTime: '16:00', endTime: '16:20', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'appl', checkedin: false, procedurecode: '531'},
					   {id: 24,firstname:'Hubert Blaine', lastname: 'Wolfeschlegelsteinhausenbergerdorff Sr', stratTime: '16:40', endTime: '17:20', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '204'},
					   {id: 26,firstname:'', lastname: '', stratTime: '17:40', endTime: '18:30', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'dband', checkedin: false, procedurecode: '532'},
					  
						
						]
					  },


					  {chair: 'Chair 2', 
						patients: [

						{id: 27, firstname:'June', lastname: 'Binks', stratTime: '08:00', endTime: '8:35', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband', checkedin: false, procedurecode: '204'},
						{id: 28, firstname:'Han', lastname: 'Solo', stratTime: '08:45', endTime: '9:20', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: true, procedurecode: '534'},
						{id: 29, firstname:'Max', lastname: 'Payne', stratTime: '9:30', endTime: '9:55', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '103'},
						{id: 32, firstname:'', lastname: '', stratTime: '10:05', endTime: '10:45', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'adj', checkedin: false, procedurecode: '302'},
					    {id: 33, firstname:'Bail', lastname: 'Organa', stratTime: '11:50', endTime: '12:30', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband', checkedin: false, procedurecode: '309'},
					    {id: 34, firstname:'Anakin', lastname: 'Skywalker', stratTime: '12:40', endTime: '13:30', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/495827904.png', appntType: 'record', checkedin: false, procedurecode: '450'},
					    {id: 35, firstname:'General', lastname: 'Hux', stratTime: '13:30', endTime: '14:10', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start', checkedin: false, procedurecode: '406'},
					   

					  {id: 39, firstname:'Charlotte', lastname: 'Summer', stratTime: '14:25', endTime: '15:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '310'},
						{id: 41, firstname:'Courtney', lastname:'Hadwin', stratTime: '15:05', endTime: '16:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'adj', checkedin: false, procedurecode: '202'},
					    {id: 42, firstname:'Bail', lastname: 'Organa', stratTime: '16:10', endTime: '16:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband', checkedin: false, procedurecode: '201'},
					    {id: 43, firstname:'', lastname: '', stratTime: '16:55', endTime: '17:40', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'record', checkedin: false, procedurecode: '304'},
					    {id: 44, firstname:'General', lastname: 'Hux', stratTime: '17:45', endTime: '18:30', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start', checkedin: false, procedurecode: '533'}
					   
					
					]
					  },
					  {chair: 'Chair 3', 
						patients: [
					   {id: 45, firstname:'James', lastname:'Brown', stratTime: '07:00', endTime: '08:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '531'},
					   {id: 46, firstname:'Aayla', lastname: 'Secura', stratTime: '08:10', endTime: '8:50', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '405'},
					   {id: 47, firstname:'Daisy', lastname: 'Ridley', stratTime: '09:00', endTime: '09:40', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam', checkedin: false, procedurecode: '530'},
					   {id: 50, firstname:'', lastname: '', stratTime: '09:50', endTime: '10:50', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '305'},
					   {id: 52, firstname:'', lastname: '', stratTime: '11:40', endTime: '12:30', accesscode: '000401', payment: false, alergy: false, profileimg: '', appntType: 'adj', checkedin: false, procedurecode: '306'},
					   {id: 53, firstname:'James', lastname:'Brown', stratTime: '12:40', endTime: '13:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '307'},
					   {id: 54, firstname:'Aayla', lastname: 'Secura', stratTime: '13:25', endTime: '14:10', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '308'},
						
					   {id: 60, firstname:'James', lastname:'Brown', stratTime: '14:20', endTime: '15:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '532'},
					   {id: 61, firstname:'Aayla', lastname: 'Secura', stratTime: '15:10', endTime: '15:55', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '405'},
					   {id: 62, firstname:'Daisy', lastname: 'Ridley', stratTime: '16:00', endTime: '16:45', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam', checkedin: false, procedurecode: '450'},
					   {id: 63, firstname:'Padme', lastname: 'Amidala', stratTime: '17:00', endTime: '17:45', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '204'},
					   {id: 64, firstname:'James', lastname:'Brown', stratTime: '17:50', endTime: '18:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '304'},

					   ]
					  },
					  {chair: 'Chair 4',
						patients: [

					   {id: 65, firstname:'', lastname: '', stratTime: '07:00', endTime: '07:35', accesscode: '', payment: true, alergy: false, profileimg: '', appntType: 'appl', checkedin: false, procedurecode: '307'},
					   {id: 66, firstname:'', lastname: '', stratTime: '7:50', endTime: '8:45', accesscode: '000401', payment: false, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '308'},
					   {id: 68, firstname:'Jabba', lastname: 'Hutt', stratTime: '09:00', endTime: '09:40', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start', checkedin: false, procedurecode: '313'},
					   
					   {id: 70, firstname:'Luke', lastname: 'Skywalker', stratTime: '09:45', endTime: '10:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl', checkedin: false, procedurecode: '402'},
					   {id: 71, firstname:'', lastname: '', stratTime: '11:45', endTime: '12:45', accesscode: '', payment: false, alergy: true, profileimg: '', appntType: 'appl', checkedin: false, procedurecode: '309'},
					   {id: 73, firstname:'', lastname: '', stratTime: '13:05', endTime: '13:45', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '310'},
					   {id: 74, firstname:'Leia', lastname: 'Organa', stratTime: '13:50', endTime: '14:45', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam', checkedin: false, procedurecode: '531'}, 
					   {id: 76, firstname:'Luke', lastname: 'Skywalker', stratTime: '15:00', endTime: '15:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl', checkedin: false, procedurecode: '103'},
					   {id: 77, firstname:'', lastname: '', stratTime: '15:40', endTime: '16:30', accesscode: '', payment: false, alergy: true, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '201'},
					   {id: 78, firstname:'', lastname: '', stratTime: '17:00', endTime: '17:40', accesscode: '', payment: false, alergy: true, profileimg: '', appntType: 'appl', checkedin: false, procedurecode: '401'},
					   {id: 79, firstname:'Kylo', lastname: 'Ren', stratTime: '17:50', endTime: '18:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband', checkedin: false, procedurecode: '306'},
					  
						]
					  },
					  {chair: 'Chair 5',
						patients: [

					   {id: 80, firstname:'', lastname: '', stratTime: '07:00', endTime: '08:00', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'dband', checkedin: false, procedurecode: '402'},
					   {id: 81, firstname:'Poe', lastname: 'Dameron', stratTime: '08:05', endTime: '08:45', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '304'},
					   {id: 82, firstname:'John', lastname: 'Boyega',  stratTime: '08:50', endTime: '09:20', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '102'},
					   {id: 83, firstname:'Charlotte', lastname: 'Summer', stratTime: '9:40', endTime: '10:35', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '537'},

					   {id: 85, firstname:'', lastname: '', stratTime: '11:50', endTime: '12:50', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '204'},
					   {id: 86, firstname:'Max', lastname: 'Payne', stratTime: '13:05', endTime: '13:40', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '311'},
					   {id: 87, firstname:'Charlotte', lastname: 'Summer', stratTime: '13:50', endTime: '14:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '302'},
					   {id: 88, firstname:'Trevor', lastname:'Summer', stratTime: '14:50', endTime: '15:25', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '105'},
					   {id: 89, firstname:'Lennor', lastname:'Binks', stratTime: '15:35', endTime: '16:05', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'adj', checkedin: false, procedurecode: '450'},
					   {id: 90, firstname:'Bail', lastname: 'Organa', stratTime: '16:10', endTime: '16:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband', checkedin: false, procedurecode: '536'},
					   {id: 91, firstname:'Anakin', lastname: 'Skywalker', stratTime: '16:50', endTime: '17:15', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/495827904.png', appntType: 'record', checkedin: false, procedurecode: '535'},
					   {id: 92, firstname:'General', lastname: 'Hux', stratTime: '17:25', endTime: '18:20', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start', checkedin: false, procedurecode: '105'}
					  
					   ]
					  },
					  {chair: 'Chair 6',
						patients: [
					   {id: 93, firstname:'Kylo', lastname: 'Ren', stratTime: '08:00', endTime: '08:30', accesscode: '000204', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'adj', checkedin: false, procedurecode: '204'},
					   {id: 94, firstname:'Jango', lastname: 'Fett', stratTime: '08:40', endTime: '9:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '304'},
					   {id: 95, firstname:'Brian', lastname: 'Herring', stratTime: '09:40', endTime: '10:20', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '401'},
					   
					   {id: 96, firstname:'', lastname: '', stratTime: '10:20', endTime: '11:00', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '201'},  
						 {id: 102, firstname:'James', lastname:'Brown', stratTime: '11:40', endTime: '12:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '101'},

						 {id: 97, firstname:'Padme', lastname: 'Amidala', stratTime: '14:40', endTime: '15:20', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '201'},
					   {id: 98, firstname:'', lastname:'', stratTime: '15:30', endTime: '16:10', accesscode: '', payment: true, alergy: false, profileimg: '', appntType: 'adj', checkedin: false, procedurecode: '304'},
					   {id: 100, firstname:'Daisy', lastname: 'Ridley', stratTime: '16:30', endTime: '17:25', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam', checkedin: false, procedurecode: '301'},
					   {id: 101, firstname:'Padme', lastname: 'Amidala', stratTime: '17:35', endTime: '18:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '531'},
					
					   ]
					  },
					  
					  {chair: 'Chair 7',
						patients: [
					   {id: 103, firstname:'General', lastname: 'Hux', stratTime: '07:50', endTime: '08:30', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband', checkedin: false, procedurecode: '304'},
					   {id: 104, firstname:'Poe', lastname: 'Dameron', stratTime: '08:40', endTime: '09:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '534'},
					   {id: 105, firstname:'', lastname: '',  stratTime: '09:35', endTime: '09:50', accesscode: '', payment: true, alergy: false, profileimg: '', appntType: 'exam', checkedin: false, procedurecode: '305'},
					   
						
					   {id: 107, firstname:'', lastname: '', stratTime: '14:00', endTime: '15:25', accesscode: '', payment: false, alergy: false, profileimg: '', appntType: 'adj', checkedin: false, procedurecode: '205'},
					   {id: 108, firstname:'John', lastname: 'Boyega',  stratTime: '16:00', endTime: '17:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '202'}
					   

					]
					  },
					  
					  {chair: 'Chair 8', 
						patients: [{id: 109, firstname:'James', lastname:'Brown', stratTime: '07:00', endTime: '08:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj', checkedin: false, procedurecode: '304'},
					   {id: 110, firstname:'Aayla', lastname: 'Secura', stratTime: '08:10', endTime: '8:50', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '533'},
					   {id: 111, firstname:'Daisy', lastname: 'Ridley', stratTime: '09:00', endTime: '09:45', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam', checkedin: false, procedurecode: '405'},
					   {id: 112, firstname:'Padme', lastname: 'Amidala', stratTime: '09:55', endTime: '10:40', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '401'},
					   
					   {id: 119, firstname:'Daisy', lastname: 'Ridley', stratTime: '11:45', endTime: '12:25', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam', checkedin: false, procedurecode: '309'},

					   {id: 120, firstname:'Kylo', lastname: 'Ren', stratTime: '12:50', endTime: '13:35', accesscode: '000204', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'adj', checkedin: false, procedurecode: '308'},
					   {id: 121, firstname:'Jango', lastname: 'Fett', stratTime: '14:50', endTime: '15:25', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '102'},
					   {id: 122, firstname:'Brian', lastname: 'Herring', stratTime: '16:45', endTime: '17:55', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '401'},
					   
					   
					   ]
					  },
					  
					  {chair: 'Chair 9', 
						patients: [{id: 123, firstname:'Sheev', lastname: 'Palpatine', stratTime: '07:30', endTime: '08:30', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl', checkedin: false, procedurecode: '304'},
						{id: 124, firstname:'Kylo', lastname: 'Ren', stratTime: '08:40', endTime: '09:20', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband', checkedin: false, procedurecode: '302'},
					   {id: 125, firstname:'Mace', lastname: 'Windu', stratTime: '09:25', endTime: '10:05', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '201'},
					   {id: 126, firstname:'Leia', lastname: 'Organa', stratTime: '10:10', endTime: '10:55', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam', checkedin: false, procedurecode: '309'}, 
					   {id: 128, firstname:'Luke', lastname: 'Skywalker', stratTime: '12:10', endTime: '13:00', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl', checkedin: false, procedurecode: '535'},
					   {id: 129, firstname:'Jabba', lastname: 'The Hutt', stratTime: '13:10', endTime: '14:00', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '406'},
					  
					   {id: 130, firstname:'General', lastname: 'Hux', stratTime: '14:30', endTime: '15:25', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband', checkedin: false, procedurecode: '450'},
					   {id: 131, firstname:'Poe', lastname: 'Dameron', stratTime: '15:35', endTime: '16:05', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj', checkedin: false, procedurecode: '104'},
					   {id: 133, firstname:'John', lastname: 'Boyega',  stratTime: '16:10', endTime: '17:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam', checkedin: false, procedurecode: '311'}
					   
					]
					  }
	
	
	];
	
	let chrData="Chair";
	let i=0;
	while(i<this.patientArr.length){
		let temp={
			chair:chrData+" "+(i+1).toString(),
			patients:[]
		}
		this.patientArr_1.push(temp);
		i++;
	}
	
	
	
	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'scroll'){
			this.timeline_scroll_y = message.data;
			this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
			this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
		}
		
		if(message.event == 'isToday'){
			this._isToday = message.data;
			this.changeView();
		}
		
		if(message.event == 'timelineview'){
			this.getView(message.data);
		}
		
		if(message.event == 'zoomview'){
			this.zoomviewport = message.data;
			/*if(window.innerHeight > 900){
				this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
			} else {
				this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
			}*/
			
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
			
			//this.changeView();
		}
		
		if(message.event == 'addDayEventMsg') {
			this.addDayEventMsg(message.data);
		}
		
		if(message.event == 'remove_day_event') {
			this.dayEventMsgArr = [];
		}
		
		if(message.event == 'showFiveMinGrid') {
			this.showfiveminGuide = message.data;
		}
		
		if(message.event == 'location'){
			this.selectedLocation = message.data;
		}
		
	});
	
  }

  ngOnInit() {
	/*this.windowHt = window.innerHeight - 330;*/
	
	if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
		this.zoomviewport = Number(window.localStorage.getItem('zoomview'));
	}
			
	/*if(window.innerHeight > 900){
		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
	} else {
		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
	}*/
	
	this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
	
	//console.log('timeline windowHt: ', this.windowHt);
	
	this.timer_width = this.timer.nativeElement.offsetWidth;
	this.timer_view = this.views[this.selectedviewIndx].value;
		
	/*this.createTimeGuide();
	this.clock();*/
	
	this.arrUpdt_interval=setInterval(()=>{
		this.updatePatient_arr()
	},1100)
	
	setTimeout(() => {
		this.changeView();
	})
  }
  
  ngOnDestroy(){
	  clearInterval(this.arrUpdt_interval);
  }
  
  updatePatient_arr(){
	var i;
	
	console.log('NEXT INDEX IS',this.nextIndx)
	for(i=0;i<this.patientArr.length;i++)  
	{
		//this.patientArr_1[i].patients=[];
		var j=this.nextIndx;
		if(this.patientArr[i].patients.length!=this.patientArr_1[i].patients.length)
		{	
			
				let innrCount=0;
				while(innrCount<5)
				{
					if(j<this.patientArr[i].patients.length-1)
					{
						this.patientArr_1[i].patients.push(this.patientArr[i].patients[j]);
						j++;
						innrCount++;
					}
					else if(j==this.patientArr[i].patients.length-1){
						this.patientArr_1[i].patients.push(this.patientArr[i].patients[j]);
						break;
					}
					else{
						break;
					}
				}
				
		}
		else{
			clearInterval(this.arrUpdt_interval)
		}
	  
	}
	this.nextIndx=this.nextIndx+5;
	//console.log('P_ARR1 ',this.patientArr_1)

  }
  
  clock() {
		
	this.clockWd = this.block_space;
	
	let today = new Date();
	let start_time_hr:any = Number(this.startTime.split(':')[0]);
	let start_time_min: any = Number(this.startTime.split(':')[1]);
	
	let currentHr = Math.abs(start_time_hr - today.getHours());
	let currentMin = today.getMinutes();
	let currentSec = today.getSeconds();
		
	let workingTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	let start_time_sec = `01/01/2018 ${start_time_hr}:${start_time_min}:${today.getSeconds()}`;
	
	let endTime_hr:any;
	let endTime_min:any;
	let endTime_sec = 0;
	let nowTime_sec;
	let end_time_sec;
	
	if(Date.parse(workingTime_sec) >= Date.parse(start_time_sec)){
		endTime_hr = Number(this.endTime.split(':')[0]);
		endTime_min = Number(this.endTime.split(':')[1]);
		
		nowTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
		end_time_sec = `01/01/2018 ${endTime_hr}:${endTime_min}:${today.getSeconds()}`;
		
		if(Date.parse(nowTime_sec) < Date.parse(end_time_sec)){
			this.clockWd = (currentHr*60 + currentMin + currentSec/60)*(this.slot_space/60) + this.block_space;
		} else {
			this.clockWd = (Math.abs(start_time_hr - endTime_hr)*60 + endTime_min + currentSec/60)*(this.slot_space/60) + this.block_space;
		}
	}
	
	
	this.checkTimeInterval = setInterval(() => {
		
		console.log("checkTimeInterval");
		
		let today = new Date();
		let start_time_hr:any = Number(this.startTime.split(':')[0]);
		let start_time_min: any = Number(this.startTime.split(':')[1]);
		
		let currentHr = Math.abs(start_time_hr - today.getHours());
		let currentMin = today.getMinutes();
		let currentSec = today.getSeconds();
			
		let workingTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
		let start_time_sec = `01/01/2018 ${start_time_hr}:${start_time_min}:${today.getSeconds()}`;
		
		let endTime_hr:any;
		let endTime_min:any;
		let endTime_sec = 0;
		let nowTime_sec;
		let end_time_sec;
		
		if(Date.parse(workingTime_sec) >= Date.parse(start_time_sec)){
			clearInterval(this.checkTimeInterval);
			
			endTime_hr = Number(this.endTime.split(':')[0]);
			endTime_min = Number(this.endTime.split(':')[1]);
			
			nowTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
			end_time_sec = `01/01/2018 ${endTime_hr}:${endTime_min}:${today.getSeconds()}`;
			
			if(Date.parse(nowTime_sec) < Date.parse(end_time_sec)){
				this.clockWd = (currentHr*60 + currentMin + currentSec/60)*(this.slot_space/60) + this.block_space;
			} else {
				this.clockWd = (Math.abs(start_time_hr - endTime_hr)*60 + endTime_min + currentSec/60)*(this.slot_space/60) + this.block_space;
			}			
			
			if(this.clockWd >= 380){
				this.timerScroll = (currentHr*60 + currentMin + currentSec/60)*(this.slot_space/60);
				this.timercomponent.directiveRef.scrollTo(this.timerScroll, 0, 500);
				this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
				this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
			}
			
			today = new Date();
			let secDif: any = (60 - today.getSeconds())*1000;
			
			setTimeout(() => {
				
				today = new Date();
				nowTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
					
				if(this.clockWd >= 380){
					let checkScrollability: any = this.timercomponent.directiveRef.position();
					if(checkScrollability.x != 'end'){
						this.timerScroll += (this.slot_space/60);
					
						this.timercomponent.directiveRef.scrollTo(this.timerScroll, 0, 500);
						this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
						this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
						
					}
				}
					
				if(Date.parse(nowTime_sec) < Date.parse(end_time_sec)){
					console.log('before interval OPEN');
					
					currentHr = Math.abs(start_time_hr - today.getHours());
					currentMin = today.getMinutes();
					currentSec = today.getSeconds();
					
					this.clockWd = (currentHr*60 + currentMin + currentSec/60)*(this.slot_space/60) + this.block_space;
					
				} else {
					console.log('CLOSE');
					clearInterval(this.clockInterval);
				}
				
				this.clockInterval = setInterval(() =>{
				
					today = new Date();
					nowTime_sec = `01/01/2018 ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
					
					if(this.clockWd >= 380){			
						let checkScrollability: any = this.timercomponent.directiveRef.position();
						if(checkScrollability.x != 'end'){
							this.timerScroll += (this.slot_space/60);
						
							this.timercomponent.directiveRef.scrollTo(this.timerScroll, 0, 500);
							this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
							this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
						}
					}
					
					
					if(Date.parse(nowTime_sec) < Date.parse(end_time_sec)){
						console.log('within interval OPEN');
						
						currentHr = Math.abs(start_time_hr - today.getHours());
						currentMin = today.getMinutes();
						currentSec = today.getSeconds();
						
						this.clockWd = (currentHr*60 + currentMin + currentSec/60)*(this.slot_space/60) + this.block_space;
						
					} else {
						console.log('CLOSE');
						clearInterval(this.clockInterval);
					}
					
					/*temporary addition ---- actually need to connect with backend to get the checked-in data*/
		
					this.getCheckedInPatient();
					
				}, 60000);
				
			}, secDif);
			
			
			
		} else {
			//this.clockWd = 54;
			this.clockWd = this.block_space;
		}

		this.getCheckedInPatient();
	
	}, 1000);
  }
  
  getCheckedInPatient(){
	var patientCheckin: any[] = [];
	let checkinTime: any = new Date();
	
	for(var i=0; i<this.patientArr.length; i++){
		for(var j=0; j<this.patientArr[i].patients.length; j++){
			
			var patient_strtTime: any = this.patientArr[i].patients[j].stratTime;
			var today_appntTime: any = new Date();
			
			today_appntTime.setHours(patient_strtTime.split(':')[0]);
			today_appntTime.setMinutes(patient_strtTime.split(':')[1]);
			today_appntTime.setSeconds(checkinTime.getSeconds());
			
			var appntStart = new Date(today_appntTime);
			var minuteDiff = Math.abs(checkinTime.getTime() - appntStart.getTime())/(60*1000);
			if(this.patientArr[i].patients[j].firstname != '' && this.patientArr[i].patients[j].lastname != ''){
				if(this.patientArr[i].patients[j].checkedin == false && minuteDiff < 30){
					patientCheckin.push(this.patientArr[i].patients[j]);
				}
			}
		}
	}
	
	if(patientCheckin.length > 0){
		var pickrandom: any = Math.floor(patientCheckin.length*Math.random());
		
		let id: any = patientCheckin[pickrandom].id;
		
		this.patientArr.map(item => {
			item.patients.map(elem => {
				if(elem.id == id){
					elem.checkedin = true;
				}
			})
		});
		
	}
	
	
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
	
	this.getOverbookedBlockedPos();
	this.createLunchBlock();
	
  }
  
  getView(_view) {
	this.timer_view = _view;
	this.changeView();
  }
  
  changeView() {
	this.slotcont_wd = 114;
	this.scrollablecont_wd = 114;
	this.timerLabelArr = [];
	this.guidePosArr = [];
	this.guidePosArr_halfHr = [];
	this.timerScroll = 0;
	this.timer_width = this.timer.nativeElement.offsetWidth;
	this.timercomponent.directiveRef.scrollTo(this.timerScroll, 0, 0);
	
	this.patientcomponent.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 0);
	this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 0);
	
	this.createTimeGuide();
	
	this.messageService.sendMessage('createblock', {slot_space: this.slot_space, block_space: this.block_space, timer_view: this.timer_view, zoomviewport: this.zoomviewport});
	
	clearInterval(this.checkTimeInterval);
	clearInterval(this.clockInterval);
	
	this.checkTimeInterval = null;
	this.clockInterval = null;
	
	//console.log(this.checkTimeInterval, this.clockInterval);
		
	if(this._isToday == true){
		this.clock();
	} else {
		this.clockWd = this.block_space;
		//this.clockWd = 54;
	}
	
  }
  
  slidetimer(dir){
	let checkScrollability: any = this.timercomponent.directiveRef.position();
	
	let move_x = this.slot_space*(this.timer_view - 1) + this.slot_space/2;
	
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
	this.overbookedcont.directiveRef.scrollTo(this.timerScroll, this.timeline_scroll_y, 500);
  }
  
  getPatientModal(evt){

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

	let appntTime: any = `${appntTime_hr}:${appntTime_min_round}`;
 
	const dialogRef = this.patientDialog.open(TimelinePatientBox, {
		panelClass: 'precedureModal',
		backdropClass: 'whitebackdrop',
		data: { showInitial_section: true, selectedLocation: this.selectedLocation, appntTime: appntTime }
	});
  }
  
  addDayEventMsg(evnt) {
	let evntData:any = JSON.parse(JSON.stringify(evnt));
	this.dayEventMsg_data = JSON.parse(JSON.stringify(evntData));
	this.dayEventMsgArr[0] = evntData;
  }
  
  removeDayEvent(indx){
	this.dayEventMsgArr = [];
	this.messageService.sendMessage('remove_event', {remove_event: false});
  }
  
  getOverbookedBlockedPos(){
	
	this.overbookedArr = [{"startTime": "8:00", "endTime": "8:25"}, {"startTime": "10:20", "endTime": "10:50"}, {"startTime": "11:40", "endTime": "12:20"}, {"startTime": "14:30", "endTime": "15:00"}, {"startTime": "17:30", "endTime": "17:50"}];
	
	if(this.overbookedArr.length > 0){
		this.overbookedArr.map(item => {
			
			
			let tempStart = 7*this.slot_space;
	
			let startTime = item.startTime;
			let startTime_hr = startTime.split(':')[0];
			let startTime_min = startTime.split(':')[1];
			
			let endTime = item.endTime;
			let endTime_hr = endTime.split(':')[0];
			let endTime_min = endTime.split(':')[1];
			
			let startTime_in_hr = Number(startTime_hr) + (startTime_min/60);
			let endTime_in_hr = Number(endTime_hr) + (endTime_min/60);
				
			let overbooked_block_Wd = Math.abs(startTime_in_hr - endTime_in_hr)*this.slot_space;
			let overbooked_block_posLeft = ((startTime_in_hr*this.slot_space) - tempStart + this.block_space);
			
			item.width = overbooked_block_Wd;
			item.left = overbooked_block_posLeft;
		});
	}
	
  }
  
  showOverBookedPopup() {
	const dialogRef = this.patientDialog.open(OverbookedInfo, {
		panelClass: 'overbookedmodal',
		backdropClass: 'transparentbackdrop',
		data: {}
	});
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
  

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class TimelinePatientBox implements OnInit {
 
	closeModal_subscription: Subscription;
	showInitial_section: any;
	selectedLocation; any;
	appntTime: any;
	
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<TimelinePatientBox>, @Inject(MAT_DIALOG_DATA) public data: any) {
	this.showInitial_section = data.showInitial_section;
	this.selectedLocation= data.selectedLocation;
	this.appntTime= data.appntTime;
	}

  ngOnInit() {
	
	this.closeModal_subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'closemodal'){
			this.cancel();
		}
		
	})
	
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 
}

@Component({
  selector: 'app-overbookedinfo-component',
  templateUrl: './dialog-overbooked.component.html',
  styleUrls: ['./dialog-overbooked.component.css']
})
export class OverbookedInfo implements OnInit {
 
	
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<OverbookedInfo>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 
}
