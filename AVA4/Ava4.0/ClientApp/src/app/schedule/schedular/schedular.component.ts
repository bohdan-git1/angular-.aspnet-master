import { Component, OnInit, ElementRef, Inject, ViewChild, EventEmitter, Output, Input, HostListener, ViewEncapsulation } from '@angular/core';

import { DatePipe } from '@angular/common';

import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

import { MatCalendar } from '@angular/material';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { Router } from '@angular/router';

/*import domtoimage from 'dom-to-image';*/

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class SchedularComponent implements OnInit {

	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
	@ViewChild('scrollercomponent') scrollercomponent: PerfectScrollbarComponent;

	@ViewChild('schedularcont') schedularcont: ElementRef;

	dd_deck_label: string;
	dd_chair_label: string;

	chair_labelArr: any = [];

	alignLeft: string;
	alignRight: string;

	search_options: any[] = [{'name': 'Becca Kurfin', 'id': 1}, {'name': 'Estelle Goslin', 'id': 2}, {'name': 'Becky Smith', 'id': 3}, {'name': 'Belamy Wilson', 'id': 4}, {'name': 'Berry Holmes', 'id': 5}, {'name': 'Bethany Roland', 'id': 6}];

	legend_arr: any[] = [{"label": "Record", "color": "#FCFF7C", "selected": false, "appnttype": "record"}, {"label": "Exam", "color": "#FD7474", "selected": false, "appnttype": "exam"}, {"label": "Start", "color": "#74B3FD", "selected": false, "appnttype": "start"}, {"label": "Appl", "color": "#F6CC61", "selected": false, "appnttype": "appl"}, {"label": "Adj", "color": "#8CF1E4", "selected": false, "appnttype": "adj"}, {"label": "D-Band", "color": "#B48CF6", "selected": false, "appnttype": "dband"}];

	selectedDate: any;
	userseldate: any;

	timeline_scroll_y = 0;
	windowHt: any;
	window_innerHt: any;

	showScrollUp: boolean = false;
	showScrollDn: boolean = true;

	isToday: boolean = true;
	dateLabel: any = {'date-selector-label': true, 'other-day': !this.isToday};

	scroll_up: boolean = false;
	scroll_dn: boolean = true;

	showlastList: boolean = false;

	lastlistArr: any[] = [{name: 'Obi- Wan Kenobi', dob: '06/19/1996'}, {name: 'Sheeve Palpatine', dob: '06/19/1996'}, {name: 'Jar Jar Binks', dob: '06/19/1996'}, {name: 'Darth Maul', dob: '06/19/1996'}, {name: 'Qui - Gonn Jinn', dob: '06/19/1996'}, {name: 'Padme Amidala', dob: '06/19/1996'}, {name: 'Sio Bibble', dob: '06/19/1996'}, {name: 'Poe Dameron', dob: '06/19/1996'}, {name: 'Aayla Secura', dob: '06/19/1996'}, {name: 'Jessika Pava', dob: '06/19/1996'}];

	views: any[] = [{label: "4 hour", value: 4}, {label: "2 hour", value: 2}, {label: "Entire day", value: 9}];
	selectedviewIndx: any = 0;

	notifictn_listArray: any[] = [
		{'time': '48 s', 'name': 'Adam Swasey', 'purpose': 'Case Presentation'},
		{'time': '3 m', 'name': 'Arrow Smith', 'purpose': 'Case Presentation'},
		{'time': '15 m', 'name': 'Angel Acosta', 'purpose': 'Case Presentation'},
		{'time': '22 m', 'name': 'Braiden Maxwell', 'purpose': 'New Lead'},
		{'time': '48 m', 'name': 'Caroline Jimmel', 'purpose': 'New Lead'},
		{'time': '1 hr', 'name': 'Cindy Douit', 'purpose': 'New Lead'},
		{'time': '2 hr', 'name': 'Dalia Andrade', 'purpose': 'New Lead'},
		{'time': '2 hr', 'name': 'Dover Benson', 'purpose': 'New Lead'},
		{'time': '3 hr', 'name': 'Errick Munic', 'purpose': 'New patient scheduler'},
		{'time': '3 hr', 'name': 'Francis Kerplots', 'purpose': 'New patient scheduler'},
		{'time': '3 hr', 'name': 'Gianna Angelucci', 'purpose': 'New patient scheduler'},
		{'time': '4 hr', 'name': 'Hailey Rose', 'purpose': 'New patient thank you'},
		{'time': '4 hr', 'name': 'Ignacio Juarez', 'purpose': 'New patient thank you'},
		{'time': '3 hr', 'name': 'Francis Kerplots', 'purpose': 'New patient tracker'},

		{'time': '3 hr', 'name': 'Gianna Angelucci', 'purpose': 'New patient tracker'},
		{'time': '4 hr', 'name': 'Hailey Rose', 'purpose': 'New patient welcome'},
		{'time': '4 hr', 'name': 'Ignacio Juarez', 'purpose': 'New patient welcome'},
		{'time': '1 d', 'name': 'Jason Keoki', 'purpose': 'New patient welcome'},
		{'time': '1 d', 'name': 'Jimi Isomes', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Kendell Lear', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Lamont Perez', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Meri Monsu', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Nick Mims', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Nixon Janis', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Pippa Knox', 'purpose': 'Virtual Consult'},
		{'time': '1 d', 'name': 'Stephen Woods', 'purpose': 'Virtual Consult'},
		{'time': '2 d', 'name': 'Tyler Christensen', 'purpose': 'Virtual Consult'},
		{'time': '2 d', 'name': 'Winston Hill', 'purpose': 'Virtual Consult'}

	];

	zoomviewport: any = 100;
	zoomWd: any;
	topbarZoomWd: any;

	subscription: Subscription;
	openNewTab = 2;

	chairsettings: any = {};
	selectedChairNum:any = 9;
	showMonthGlance: boolean = false;
	showDayReminder:boolean = false;
	notification_Available: boolean = false;

	dayEventMsg:any = {};
	dayEventError: any[] = [{error: false, erortxt: 'Add title'}, {error: false, erortxt: 'Add a valid date'}, {'error': false, erortxt: 'Add notes'}];

	dayEventStartDt: any;
	dayEventMaxDt: any;
	topbarwidth: any;

	showFiveMinGrid:boolean = false;

	chairscrollStop: boolean = true;
	selectedLocation: any;

	@HostListener('window:resize', ['$event']) onResize(event) {
		/*if(window.innerHeight > 900){
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
		} else {
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
		}*/

		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
		this.window_innerHt = window.innerHeight - 4;
	}

	/*@HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {

		if(event.ctrlKey==true && event.which == 90){
			console.log("ctrl + z pressed");

			var node = document.getElementById('schedularcont');

			domtoimage.toPng(node).then(function (dataUrl) {
				console.log(dataUrl);
			}).catch(function (error) {
				console.error('oops, something went wrong!', error);
			});


		}
	}*/

  constructor(public overlaydialog: MatDialog, private messageService: MessageService, private datePipe: DatePipe, private router:Router) {

	this.dd_deck_label = 'On Deck';
	this.dd_chair_label = 'In Chair';

	this.chair_labelArr = [{label: 'Exam', patient: 'Sheev Palpatine', dr: 'Dr. Roberts', seated: '07:32', progress: '100', bookingtime: '1 hr', bookingtimeMin: null, excesstime: '+16m'}, {label: '2', patient: null, dr: null, seated: null, progress: null, bookingtime: null, excesstime: 0}, {label: '3', patient: 'Qui-Gonn Jinn', dr: 'Dr. Tobler', seated: '07:45', progress: '100', bookingtime: null, bookingtimeMin: '45m', excesstime: 0}, {label: '4', patient: 'Aayla Secura', dr: 'Dr. Doria', seated: '8:03', progress: '50', bookingtime: '1 hr', bookingtimeMin: null, excesstime: 0}, {label: '5', patient: "Padme Amidala", dr: null, seated: '8:28', 'progress': 80, bookingtime: null, bookingtimeMin: '45m', excesstime: 0}, {label: '6', patient: null, dr: null, seated: null, 'progress': null, bookingtime: null, excesstime: 0, bookingtimeMin: null}, {label: '7', patient: 'Sheev Palpatine', dr: 'Dr. Roberts', seated: '07:32', progress: '100', bookingtime: '1 hr', bookingtimeMin: null, excesstime: '+16m'}, {label: '8', patient: null, dr: null, seated: null, progress: null, bookingtime: null, excesstime: 0}];

	this.alignLeft = 'left';
	this.alignRight = 'right';

	this.selectedDate = new Date();
	this.dayEventStartDt = new Date();
	this.dayEventMaxDt = new Date(this.dayEventStartDt.getFullYear()+1, 11, 31);

	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'newtabopen'){
			let _newtabOpen = message.data;
			this.openNewTab =  _newtabOpen;

			let innerWd: any = window.innerWidth - (this.openNewTab*46);

			/*if(window.innerWidth < 1758){
				innerWd = 1758 - (this.openNewTab*48);
			} else {
				innerWd = window.innerWidth - (this.openNewTab*48);
			}*/

			this.zoomWd = (innerWd - 395)*((100 + (100 - this.zoomviewport))/100);
			this.topbarZoomWd = (innerWd)*((100 + (100 - this.zoomviewport))/100);

			//this.zoomWd = (1758 - 383 - (this.openNewTab*46))*((100 + (100 - this.zoomviewport))/100);


		}

		if(message.event == 'remove_event'){
			this.dayEventMsg = {
				title: '',
				date: '',
				fromtime: '',
				totime: '',
				notes: '',
				msgavailable: false,
				datepicker: ''
			}
		}
	});

	this.dayEventMsg = {
		title: '',
		date: '',
		fromtime: '',
		totime: '',
		notes: '',
		msgavailable: false,
		datepicker: ''
	}
  }

  ngOnInit() {



		this.topbarwidth = this.schedularcont.nativeElement.clientWidth;
		this.checkResolution();

		/*if(window.innerHeight > 900){
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);
		} else {
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
		}*/

		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);

		this.window_innerHt = window.innerHeight - 4;

		setTimeout(() => {

			let chckScrollPos: any = this.scrollercomponent.directiveRef.position();

			if(chckScrollPos.y == 'end'){
				this.scroll_dn = false;
			} else {

				if(this.chair_labelArr.length < 10 && this.selectedChairNum == 9){
					this.scroll_dn = false;
				} else {
					this.scroll_dn = true;
				}
			}



		}, 500);

		this.getSelectedNum(this.selectedChairNum);
	}

	selectedLocationData(selectedLocation)
	{
		this.selectedLocation= selectedLocation
	}

	checkResolution(){
		if(window.innerWidth == 1920){
			this.zoomviewport = 100;
		} else if(window.innerWidth == 1680){
			this.zoomviewport = 97;
		} else if(window.innerWidth == 1600){
			this.zoomviewport = 95;
		} else if(window.innerWidth == 1440){
			this.zoomviewport = 90;
		} else if(window.innerWidth == 1366){
			this.zoomviewport = 87.6;
		}

		window.localStorage.setItem('zoomview', this.zoomviewport);

		setTimeout(() => {
			if(window.innerWidth > 1440){
				this.topbarwidth = this.schedularcont.nativeElement.clientWidth;
			} else {
				this.topbarwidth = this.schedularcont.nativeElement.clientWidth + 15;
			}

		})
	}

	onShowCalender(evt: MouseEvent): void {
		const target = new ElementRef(evt.currentTarget);
		let dialog_config: any = {data: { trigger: target, dt: this.selectedDate }, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'calenderClass'};

		const dialogRef = this.overlaydialog.open(CalenderBox, dialog_config);

		const sub = dialogRef.componentInstance.selectedDate.subscribe((data: any) => {
		 this.selectedDate = data;

		 let today = new Date();
		today.setHours(0,0,0,0);

		let _selectedDate = this.selectedDate;
		_selectedDate.setHours(0,0,0,0);

		if(_selectedDate.getTime() === today.getTime()){
			this.isToday = true;
		} else {
			this.isToday = false;
		}

		this.messageService.sendMessage('isToday', this.isToday);

		this.dateLabel['other-day'] = !this.isToday;

		});

		dialogRef.afterClosed().subscribe(_res => {

		});
	}

	nextPrevDate(dir){

		let seldt = new Date(this.selectedDate);

		if(dir == 'nextday'){
			seldt.setDate(seldt.getDate() + 1);
		} else if(dir == 'prevday') {
			seldt.setDate(seldt.getDate() - 1);
		} else if(dir == 'prevweek') {
			seldt.setDate(seldt.getDate() - 7);
		} else if(dir == 'nextweek') {
			seldt.setDate(seldt.getDate() + 7);
		}

		this.selectedDate = seldt;

		let today = new Date();
		today.setHours(0,0,0,0);

		let _selectedDate = this.selectedDate;
		_selectedDate.setHours(0,0,0,0);

		if(_selectedDate.getTime() === today.getTime()){
			this.isToday = true;
		} else {
			this.isToday = false;
		}

		this.messageService.sendMessage('isToday', this.isToday);

		this.dateLabel['other-day'] = !this.isToday;
	}

	scroll(dir) {

		let checkScrollability: any = this.scrollercomponent.directiveRef.position();

		if(dir == 'up'){
			if(checkScrollability.y != 'start'){
				this.timeline_scroll_y -= this.chairsettings.chairHt + this.chairsettings.bottomMargin;
				this.showScrollDn = true;
			} else {
				this.showScrollUp = false;
			}
		} else {
			if(checkScrollability.y != 'end'){
				this.timeline_scroll_y += this.chairsettings.chairHt + this.chairsettings.bottomMargin;
				this.showScrollUp = true;
			} else {
				this.showScrollDn = false;
			}
		}

		setTimeout(() => {

			let chckScrollPos: any = this.scrollercomponent.directiveRef.position();

			if(chckScrollPos.y == 'start'){
				this.scroll_up = false;
			} else {
				this.scroll_up = true;
			}

			if(chckScrollPos.y == 'end'){
				this.scroll_dn = false;
			} else {
				this.scroll_dn = true;
			}

		}, 500);

		this.messageService.sendMessage('scroll', this.timeline_scroll_y);
		this.scrollercomponent.directiveRef.scrollTo(0, this.timeline_scroll_y, 500);
	}

	resetCalender(){
		this.selectedDate = new Date();
		this.isToday = true;
		this.messageService.sendMessage('isToday', this.isToday);
		this.dateLabel['other-day'] = !this.isToday;
	}

	showLast() {
		this.showlastList = this.showlastList === true ? false : true;
	}

	getView(view){
		this.messageService.sendMessage('timelineview', view);
	}

	zoomView(dir) {
		if(dir == 'in'){
			this.zoomviewport -= 1;
		} else {
			this.zoomviewport += 1;
		}
		if(this.zoomviewport < 25){
			this.zoomviewport = 25;
		}

		if(this.zoomviewport > 200){
			this.zoomviewport = 200;
		}

		//this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 350);

		/*if(window.innerHeight > 900){
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 300);
		} else {
			this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 230);
		}*/

		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 286);

		/*let innerWd: any = window.innerWidth - (this.openNewTab*46);
		if(window.innerWidth < 1758){
			innerWd = 1758 - (this.openNewTab*46);
		} else {
			innerWd = window.innerWidth - (this.openNewTab*46);
		}



		this.zoomWd = (innerWd - 420)*((100 + (100 - this.zoomviewport))/100);
		this.topbarZoomWd = (innerWd-4)*((100 + (100 - this.zoomviewport))/100);*/


		console.log('clientWidth: ', this.schedularcont.nativeElement.clientWidth);


		this.messageService.sendMessage('zoomview', this.zoomviewport);

		setTimeout(() => {

			let chckScrollPos: any = this.scrollercomponent.directiveRef.position();

			//console.log(chckScrollPos);

			if(chckScrollPos.y == 'start'){
				this.scroll_up = false;
			} else {
				this.scroll_up = true;
			}

			if(chckScrollPos.y == 'end'){
				this.scroll_dn = false;
				this.scroll_up = false;
			} else {
				this.scroll_dn = true;
			}

		}, 500);

		window.localStorage.setItem('zoomview', this.zoomviewport);
	}

	onSelection(evt){
		this.messageService.sendMessage('openpatienttab', evt.option.value);
	}

	getSelectedNum(chairnum) {
		this.selectedChairNum = chairnum;
		let scrollBottomMargin:any = 0;
		/*let bottomMargin: any = 13;

		if(window.innerHeight <= 900){
			bottomMargin = 5;
		}*/

		/*if(window.innerHeight <= 800){
			bottomMargin = 5;
		}*/

		/*let _chairht: any = ((this.windowHt - scrollBottomMargin)/chairnum) - bottomMargin;*/

		let bottomMargin: any = 28;
		let _chairht: any = 70;


		this.chairsettings = {'chairHt': _chairht,  'bottomMargin': bottomMargin};

		if(this.chair_labelArr.length < 10 && this.selectedChairNum == 8){
			this.scroll_dn = false;
		} else {
			this.scroll_dn = true;
		}
	}

	createAppntPopup() {
		const createAppnt_dialogRef = this.overlaydialog.open(CreateAppointment, {
			panelClass: 'patientModal',
			backdropClass: 'whitebackdrop',
		  data: { showInitial_section: false, selectedLocation: this.selectedLocation}
		});
	}

	openMonthGlance(){
		this.notification_Available = false;
		this.showDayReminder = false;
		this.showMonthGlance = this.showMonthGlance == true ? false : true;
	}

	onClickedOutside(){

		this.showMonthGlance = false;
		/*console.log(section);

		if(section == 'patnnum'){
			this.showMonthGlance = false;
		} else if(section == 'notification'){
			this.notification_Available = false;
		} else if(section == 'reminder'){
			this.showDayReminder = false;
		}*/
	}

	onClickedOutside_reminder(evt){
		console.log("reminder", evt)
		if(this.showDayReminder == true){
			this.showDayReminder = false;
		}
	}

	showDayReminderPopup() {
		this.showMonthGlance = false;
		this.notification_Available = false;
		this.showDayReminder = this.showDayReminder==true ? false : true;
	}

	notificationAvailable(){
		this.showMonthGlance = false;
		this.showDayReminder = false;
		this.notification_Available = this.notification_Available == true ? false : true;
	}

	showAppntTypeBlock(indx) {

		let appntType: any;

		this.legend_arr.map((item, i) => {
			if(i == indx){
				//do nothing;
			} else {
				item.selected = false;
			}

		});

		this.legend_arr[indx].selected = this.legend_arr[indx].selected == true ? false : true;

		if(this.legend_arr[indx].selected){
			appntType = this.legend_arr[indx].appnttype;
		} else {
			appntType = 'all';
		}

		this.messageService.sendMessage('showappnttype', appntType);
	}

	addToCalender() {

		let _validateDayEvent = this.validateDayEvent();

		if(_validateDayEvent){
			this.dayEventMsg.msgavailable = true;
			this.messageService.sendMessage('addDayEventMsg', this.dayEventMsg);
			this.showDayReminder = false;
		}
	}

	dateMask() {
		const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy', {minYear: this.dayEventStartDt.getFullYear(), maxYear: this.dayEventStartDt.getFullYear() + 1});
		return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
	}

	timeMask() {
		const autoCorrectedDatePipe = createAutoCorrectedDatePipe('HH:MM');
		return {mask: [/\d/, /\d/, ':', /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
	}

	validateDayEvent(){

		let _validateDayEvent:boolean = false;

		if(this.dayEventMsg.title.length != 0){
			this.dayEventError[0].error = false;
			_validateDayEvent = true;
		} else {
			this.dayEventError[0].error = true;
			_validateDayEvent = false;
		}

		if(this.dayEventMsg.date.length != 0){
			this.dayEventError[1].error = false;
			_validateDayEvent = true;
		} else {
			this.dayEventError[1].error = true;
			_validateDayEvent = false;
		}

		if(this.dayEventMsg.notes.length != 0){
			this.dayEventError[2].error = false;
			_validateDayEvent = true;
		} else {
			this.dayEventError[2].error = true;
			_validateDayEvent = false;
		}

		return _validateDayEvent;
	}

	checkvaliddate() {

		if(this.dayEventMsg.date.length != 0){
			this.dayEventError[1].error = false;

			let validDate: any = new Date(this.dayEventMsg.date);

			if(validDate != 'Invalid Date'){

				let _vldDate: any = new Date(this.datePipe.transform(validDate, 'MM/dd/yyyy'));
				let _evtStartDt: any = new Date(this.datePipe.transform(this.dayEventStartDt, 'MM/dd/yyyy'));


				if(_vldDate.getTime() >= _evtStartDt.getTime()){
					this.dayEventError[1].error = false;
					this.dayEventMsg.datepicker = validDate;
				} else {
					this.dayEventError[1].error = true;
					this.dayEventMsg.datepicker = '';
				}

			} else {
				this.dayEventError[1].error = true;
				this.dayEventMsg.datepicker = '';
			}

		} else {
			this.dayEventError[1].error = true;
		}
	}

	checkerror(section){

		if(section == 'title'){
			if(this.dayEventMsg.title.length != 0){
				this.dayEventError[0].error = false;
			} else {
				this.dayEventError[0].error = true;
			}
		}

		if(section == 'date'){
			this.checkvaliddate();
		}

		if(section == 'notes'){
			if(this.dayEventMsg.notes.length != 0){
				this.dayEventError[2].error = false;
			} else {
				this.dayEventError[2].error = true;
			}
		}
	}

	addDateToField(event: MatDatepickerInputEvent<Date>) {
		this.dayEventMsg.datepicker = event.value;
		this.dayEventMsg.date = this.datePipe.transform(event.value, 'MM/dd/yyyy');
	}

	removeEvent(){
		this.dayEventMsg = {
			title: '',
			date: '',
			fromtime: '',
			totime: '',
			notes: '',
			msgavailable: false,
			datepicker: ''
		}

		this.messageService.sendMessage('remove_day_event', {remove_event: false});
	}


	toggleFiveMinGrid(){
		this.showFiveMinGrid = this.showFiveMinGrid == true ? false : true;
		this.messageService.sendMessage('showFiveMinGrid', this.showFiveMinGrid);
	}

	chairscroll(evt){
		let checkScrollability: any = this.scrollercomponent.directiveRef.geometry();
		this.timeline_scroll_y = checkScrollability.y;
	}

	mouseEvt(){
		this.messageService.sendMessage('scroll', this.timeline_scroll_y);
	}

	reachStart(evt){
		let checkScrollability: any = this.scrollercomponent.directiveRef.geometry();
		this.timeline_scroll_y = checkScrollability.y;
		this.messageService.sendMessage('scroll', this.timeline_scroll_y);

	}

	openMultiLogin(){
		this.router.navigate(['/multiLogin/mLog']);
	}


}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CalenderBox implements OnInit {
  private readonly _matDialogRef: MatDialogRef<CalenderBox>;
  private readonly triggerElementRef: ElementRef;

   @Output() selectedDate = new EventEmitter();

   userseldate: any;
   zoomviewport: any = 1;

  constructor(_matDialogRef: MatDialogRef<CalenderBox>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, dt: any}) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	this.userseldate = data.dt;

  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();

    matDialogConfig.width = '775px';
    matDialogConfig.height = '400px';

	if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
		this.zoomviewport = Number(window.localStorage.getItem('zoomview'))/100;
	}

	/*matDialogConfig.position = { left: `${((rect.left*this.zoomviewport) - (76*this.zoomviewport + 42))}px`, top: `${(rect.bottom*this.zoomviewport + 20)}px`};*/

	matDialogConfig.position = { left: `${(rect.left) - (67*this.zoomviewport + 42)}px`, top: `${(rect.bottom + 9*this.zoomviewport)}px`};

    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);

  }

  getSelectedDate($event){
	this.selectedDate.emit($event);
  }

  cancel(): void {
    this._matDialogRef.close(null);
  }
}

@Component({
  selector: 'create-appointment-component',
  templateUrl: './create-appointment-component.html',
  styleUrls: ['./create-appointment-component.css']
})
export class CreateAppointment implements OnInit {
  closeModal_subscription: Subscription;
  showInitial_section: any;
  selectedLocation: any;

  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<CreateAppointment>, @Inject(MAT_DIALOG_DATA) public data: any) {
	this.showInitial_section = data.showInitial_section;
	this.selectedLocation = data.selectedLocation;

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
