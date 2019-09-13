import { Component, OnInit, Input, HostListener } from '@angular/core';

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
		let window_wd: any = window.innerWidth;
		if(window_wd > 1440){
			this.animatebottom = this.blueboxHt + 40;
		} else {
			this.animatebottom = (this.blueboxHt + 40*0.6);
		}
		this.animatetop = -this.animatebottom;
	}
	
  constructor(private messageService: MessageService) {
	
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
	let window_wd: any = window.innerWidth;
	
	if(window_wd > 1440){
		this.animatebottom = this.blueboxHt + 40;
	} else {
		this.animatebottom = (this.blueboxHt + 40*0.6);
	}
	
	this.animatetop = -this.animatebottom;
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

}
