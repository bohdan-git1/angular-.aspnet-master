import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	showDashboard:boolean = false;

	accordHt: any = window.innerHeight-4;
	acord_bottom_margin: any;
	acord_cont_ht: any;
	itemclicked = true;

	accrd_label_ht:any = 25;

	zoomWd: any;
	borderWd = 1;
	fontsize = 12;

	subscription: Subscription;

	panelArr: any[] = [
						{title: 'Analytics', checked: false, id: 0},
						{title: 'Practice Management', checked: false, id: 1},
						{title: 'Settings', checked: false, id: 2}
					  ];

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.itemclicked = false;

		this.accordHt = window.innerHeight-4;
		let borderWd = 1/window.devicePixelRatio;
		this.zoomWd = this.accrd_label_ht/window.devicePixelRatio + 2*borderWd;
		this.fontsize = 12/window.devicePixelRatio;
		this.acord_bottom_margin = window.innerHeight - (this.zoomWd*this.panelArr.length);
		this.acord_cont_ht = this.acord_bottom_margin;

	}

  constructor(private router: Router, private messageService: MessageService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
  this.accordHt = window.innerHeight-4;
	let borderWd = 1/window.devicePixelRatio;
	this.zoomWd = this.accrd_label_ht/window.devicePixelRatio;
	this.fontsize = 12/window.devicePixelRatio;
	this.acord_bottom_margin = window.innerHeight - (this.accrd_label_ht*this.panelArr.length);
	this.acord_cont_ht = this.acord_bottom_margin;

	this.navigateToSection();

	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'backtohome'){
			this.showDashboard = false;
		}
	});

  }

  navigateToSection(){
  let routerurl: any = this.router.url;
	if(routerurl.indexOf('analytics') != -1){
		this.showDashboard = true;
		this.activePanel(0);
	} else if(routerurl.indexOf('pmt') != -1){
		this.showDashboard = true;
		this.activePanel(1);
	} else if(routerurl.indexOf('settings') != -1) {
		this.showDashboard = true;
		this.activePanel(2);
	}
  }

  innerActivePanel(indx){
	this.itemclicked = true;
	this.panelArr.map(item => {
		item.checked = false;
	});

	this.panelArr[indx].checked = true;
  }

  activePanel(indx){

	this.itemclicked = true;

	this.panelArr.map(item => {
		item.checked = false;
	});

	this.panelArr[indx].checked = true;

	setTimeout(() => {
		if(this.panelArr[indx].id == 0){
			this.router.navigate(['/main/ava/admin/analytics'])
		} else if(this.panelArr[indx].id == 1){
			this.router.navigate(['/main/ava/admin/pmt'])
		} else if(this.panelArr[indx].id == 2){
      this.router.navigate(['/main/ava/admin/settings'])
		}
	}, 1000);
  }

  openPanelOption(evnt){
	this.showDashboard = true;
	this.activePanel(evnt.panel);

	//this.messageService.sendMessage('openOption', {panel: evnt.panel, indx: evnt.indx});
  }

}
