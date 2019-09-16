import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.css']
})
export class PmsComponent implements OnInit {

	@Input() blueboxHt: any;
	search_settings: any = 'Search Practice Management ...';

	selectMenuIndx: any;
	showPages: boolean = false;

	activeOperation: boolean = false;
	activeClinic: boolean = false;
	activeFinances: boolean = false;

	animatebottom: any;
	animatetop: any;
	openMenu = false;
	sectionOpen: any;

	optionsArr_pms: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Human Resources'}, {optns: 'Inventory'}, {optns: 'Marketing'}, {optns: 'Phone System'}, {optns: 'Time Clock'}, {optns: 'Training'}]},

		{grp_title: 'FINANCES', grp_options: [{optns: 'Accounting'}, {optns: 'Accounts Payable'}, {optns: 'Accounts Receivable'}, {optns: 'Benefits'}, {optns: 'Payroll'}, {optns: 'Purchasing'}]},

		{grp_title: 'OWNER / DOCTOR', grp_options: [{optns: 'Building'}, {optns: 'Continuing Education (CE)'}, {optns: 'Consultant'}, {optns: 'Contracts'}, {optns: 'Equipment'}, {optns: 'HIPAA'}, {optns: 'Insurances'}]}
	];

	subscription: Subscription;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		let borderWd = 1/window.devicePixelRatio;
		let zoomWd = 25/window.devicePixelRatio + 2*borderWd;
		this.blueboxHt = window.innerHeight - (zoomWd*3);

		let window_wd: any = window.innerWidth;
		if(window_wd > 1440){
			this.animatebottom = this.blueboxHt + 40;
		} else {
			this.animatebottom = (this.blueboxHt + 40*0.6);
		}
		this.animatetop = -this.animatebottom;
	}

  constructor(private messageService: MessageService, private router: Router, private activatedRoute:ActivatedRoute) {
	console.log('PMS');
	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'openOption' && message.data.panel == '2'){

			let section;

			if(message.data.indx == 0){
				section = 'clinic';
			} else if(message.data.indx == 1){
				section = 'operations';
			} else {
				section = 'finances';
			}

			this.openMenu = false;
			this.animateElements(section);
		}

	});

  }

  ngOnInit() {
    console.log('OnInit PMS');

	let borderWd = 1/window.devicePixelRatio;
	let zoomWd = 25/window.devicePixelRatio + 2*borderWd;
	this.blueboxHt = window.innerHeight - (zoomWd*3);

	let window_wd: any = window.innerWidth;

	if(window_wd > 1440){
		this.animatebottom = this.blueboxHt + 40;
	} else {
		this.animatebottom = (this.blueboxHt + 40*0.6);
	}

	this.animatetop = -this.animatebottom;

	if(localStorage.getItem('openOption') != undefined && localStorage.getItem('openOption') != null){
		let section;
		let message: any = JSON.parse(localStorage.getItem('openOption'));

			if(message.indx == 0){
				section = 'clinic';
			} else if(message.indx == 1){
				section = 'operations';
			} else {
				section = 'finances';
			}

			setTimeout(() => {
				this.openMenu = false;
				this.animateElements(section);
			}, 500);

		localStorage.removeItem('openOption');
	}
  }

  animateElements(section) {
	if(this.openMenu == false){
		if(section == 'operations'){
			this.activeOperation = true;
			this.activeClinic = false;
			this.activeFinances = false;
		} else if(section == 'clinic'){
			this.activeOperation = false;
			this.activeClinic = true;
			this.activeFinances = false;
		} else if(section == 'finances'){
			this.activeOperation = false;
			this.activeClinic = false;
			this.activeFinances = true;
		}
		this.openMenu = true;

	} else {

		if(this.sectionOpen != section){

			if(section == 'operations'){
				this.activeOperation = true;
				this.activeClinic = false;
				this.activeFinances = false;
			} else if(section == 'clinic'){
				this.activeOperation = false;
				this.activeClinic = true;
				this.activeFinances = false;
			} else if(section == 'finances'){
				this.activeOperation = false;
				this.activeClinic = false;
				this.activeFinances = true;
			}
			this.openMenu = true;

		} else {

			this.openMenu = false;
			this.activeOperation = false;
			this.activeClinic = false;
			this.activeFinances = false;
		}
	}

	this.sectionOpen = section;
  }

  closeOptions() {
	this.activeOperation = false;
	this.activeClinic = false;
	this.activeFinances = false;
  }

  loadPage(section, indx) {
	this.selectMenuIndx = indx;
	this.showPages = true;
	if(section == 'operations'){
		this.router.navigate(['operations', {mnid: indx}], {relativeTo: this.activatedRoute});
	} else if(section == 'clinic') {
		this.router.navigate(['clinic', {mnid: indx}], {relativeTo: this.activatedRoute});
	} else if(section == 'finances') {
		this.router.navigate(['finances', {mnid: indx}], {relativeTo: this.activatedRoute});
	}
  }

}
