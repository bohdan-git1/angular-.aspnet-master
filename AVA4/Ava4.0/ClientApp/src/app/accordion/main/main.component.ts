import { Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationExtras, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';

import { fadeAnimation } from '../../animations/fade.animation';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation]
})
export class MainComponent implements OnInit {

	@ViewChild('outreachoutlet') outreachoutlet: RouterOutlet;
	@ViewChild('paneltitle') paneltitle;

	@HostListener('window:keydown', ['$event'])
	keyEvent(event: KeyboardEvent) {
		var keyCodes = [61, 107, 173, 109, 187, 189];
		 if (event.ctrlKey==true && (keyCodes.indexOf(event.which) != -1)) {
			 return false;
		}
	}


	loadingRouteConfig: boolean;

	accordHt: any = window.innerHeight;
	accord_content_Ht: any = this.accordHt;

	acord_margin: any;
	acord_cont_wd: any;

	itemclicked = true;

	accordLabel: any = 25;

	zoomWd: any;
	borderWd = 1;
	fontsize = 15;

	panelArr: any[] = [
		{id: 0, title: 'Admin', checked: true},
		{id: 1, title: 'Schedule', checked: false},
		{id: 2, title: 'Profile', checked: false},
		/*{title: 'Treatment Card', checked: false},*/
	];

	tabIndx: any = this.panelArr.length-1;

	subscription: Subscription;

	patient_data: any = {}
	navigationExtras: NavigationExtras;

	navigated:boolean = false;
	closeBtnPos: any ;
	show_profileTab:boolean = false;

	initialroutePath:any = '/main/ava';

	@HostListener('window:resize', ['$event'])
	onResize(event) {

		this.itemclicked = false;
		this.accordHt = window.innerHeight-4;
		this.accord_content_Ht = this.accordHt;

		let borderWd = 1/window.devicePixelRatio;
		this.zoomWd = this.accordLabel/window.devicePixelRatio + 2*borderWd;
		this.fontsize = 15/window.devicePixelRatio;

		if(this.show_profileTab == false){
			this.acord_margin = window.innerWidth - (this.zoomWd*(this.panelArr.length-1)) + this.zoomWd;
		} else {
			this.acord_margin = window.innerWidth - (this.zoomWd*(this.panelArr.length)) + this.zoomWd;
		}


		this.acord_cont_wd = this.acord_margin;

	}

  constructor(private router: Router, private messageService: MessageService, private route:ActivatedRoute) {


	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'openpatienttab'){
			this.patient_data=null;
			this.tabIndx++;

			this.patient_data = message.data;

			let tabTitle: any = `${this.patient_data.patient.firstname} ${this.patient_data.patient.lastname}`;

			if(this.tabIndx < 3 && this.panelArr.length < 3){
				this.panelArr.push({id: this.tabIndx, title: tabTitle, checked: false});
			} else {
				if(this.tabIndx > 2){
					this.tabIndx = 2;
				}
				this.panelArr[this.tabIndx].title = tabTitle;
			}

			this.acord_margin = window.innerWidth - (this.zoomWd*(this.panelArr.length))  + this.zoomWd;
			this.acord_cont_wd = this.acord_margin;
			this.show_profileTab = true;

			this.messageService.sendMessage('newtabopen', this.panelArr.length);

			setTimeout(() => {
				this.closeBtnPos = (this.accordHt-20)/2 - (this.paneltitle.nativeElement.clientWidth)/2 - 30;
				this.activePanel(this.tabIndx);
			}, 800)

		}

	});

  }

  ngOnInit() {

	//console.log("main component");

	this.accordHt = window.innerHeight-4;
	this.accord_content_Ht = this.accordHt;

	let borderWd = 1/window.devicePixelRatio;
	this.zoomWd = this.accordLabel/window.devicePixelRatio + 2*borderWd;
	this.fontsize = 15/window.devicePixelRatio;

	this.acord_margin = window.innerWidth - (this.zoomWd*(this.panelArr.length-1)) + this.zoomWd;
	this.acord_cont_wd = this.acord_margin;
	this.show_profileTab = false;

	this.router.events.subscribe(event => {
		if(event instanceof NavigationStart) {
      this.loadingRouteConfig = true;
			this.navigated = this.router.navigated;
		} else if(event instanceof NavigationEnd) {
      this.loadingRouteConfig = false;
		}

	this.messageService.sendMessage('newtabopen', this.panelArr.length);

  });

	/* starting point of routing */

  if(this.router.url == this.initialroutePath){
	this.router.navigate([this.initialroutePath, { outlets: { adminoutlet: ['admin']}}]);
  }

	if(!this.navigated){

		if(this.router.url.indexOf('schedule') != -1){
			this.panelArr.map(item => {
				item.checked = false;
			});

			this.panelArr[1].checked = true;
			this.itemclicked = true;

		} else if(this.router.url.indexOf('outreach') != -1){
			this.activePanel(1);
		}
	}

  }

	getRouterOutletState(outlet) {
		return outlet.isActivated ? outlet.activatedRoute : '';
	}

	refreshSection(indx){
		if(indx == 0){
			let routerurl: any = this.router.url;
			if(routerurl.indexOf('analytics') != -1 || routerurl.indexOf('pmt') != -1 || routerurl.indexOf('settings') != -1){
				this.router.navigate([this.initialroutePath, { outlets: { adminoutlet: ['admin']}}]);
				this.messageService.sendMessage('backtohome', true);
			}
		}
	}

  activePanel(indx){
	this.panelArr.map(item => {
		item.checked = false;
	});

	this.panelArr[indx].checked = true;
	this.itemclicked = true;

  setTimeout(() => {
		if(this.panelArr[indx].id == 0){
      this.router.navigate([this.initialroutePath+'/admin']);

		} else if(this.panelArr[indx].id == 1){
      this.router.navigate([this.initialroutePath+'/schedule']);

		} else if(this.panelArr[indx].id == 2) {
      this.router.navigate([this.initialroutePath+'/outreach'])

		}/*else if(this.panelArr[indx].id == 2) {
			this.router.navigate([this.initialroutePath, { outlets: {outreachoutletx: ['outreach', this.navigationExtras]}}])
				.then(() => {this.router.navigate([this.initialroutePath, { outlets: {adminoutlet: null, scheduleoutlet: null, outreachoutlet: null}}])})
		}*/
  }, 500);

  }

  closeProfile() {
	//console.log("close profile");
	/*this.panelArr.splice(2, 1);
	this.tabIndx = this.panelArr.length-1;*/

	this.acord_margin = window.innerWidth - (this.zoomWd*(this.panelArr.length-1)) + this.zoomWd;
	this.acord_cont_wd = this.acord_margin;
	this.show_profileTab = false;
	this.messageService.sendMessage('newtabopen', this.panelArr.length);
	this.activePanel(1);
  }

}
