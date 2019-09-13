import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	
	@Input() blueboxHt: any;
	@Input() optionsArr: any;
	
	search_settings: any = 'Search Settings...';
	
	optionsArr_settings: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Account'}, {optns: 'Auto Text'}, {optns: 'Avas Outreach', suboptns: [{optns: 'Sequences'}, {optns: 'Appointment Reminders'}, {optns: 'Custom'}, {optns: 'New Patient'}, {optns: 'No Show'}, {optns: 'Pending'}, {optns: 'Recall'}]}, {optns: 'Conversion', suboptns: [{optns: 'Data Mapping'}, {optns: 'Mass Code Changes'}, {optns: 'Posting'}]}, {optns: 'Information', suboptns: [{optns: 'Case Manager'}, {optns: 'Doctor'}, {optns: 'Office'}]}, {optns: 'Letter Codes'}, {optns: 'Referrals', suboptns: [{optns: 'Dentists'}, {optns: 'Specialists'}, {optns: 'Other'}]}, {optns: 'Schedule', suboptns: [{optns: 'Format'}, {optns: 'Rules'}]}, {optns: 'Users', suboptns: [{optns: 'Add'}, {optns: 'Delete'}, {optns: 'Logins'}, {optns: 'Permissions'}]}]},
		
		{grp_title: 'FINANCES', grp_options: [{optns: 'Case Presentation'}, {optns: 'Insurance', suboptns: [{optns: 'Companies'}, {optns: 'Forms'}]}, {optns: 'Payments', suboptns: [{optns: 'Auto-Pay'}, {optns: 'Billing Services'}, 
        {optns: 'Merchant Services'}]}]},
		
		{grp_title: 'CLINIC', grp_options: [{optns: 'Picture Gallery'}, {optns: 'Posting Codes'}, {optns: 'Procedures', suboptns: [{optns: 'Chair Setup'}, {optns: 'Codes'}, {optns: 'Details'}, {optns: 'Doctor Time'}]}, {optns: 'Treatment Card', suboptns: [{optns: 'Diagnosis'}, {optns: 'X-Ray'}, {optns: 'Tx Plan'}]}]}
	];
	
	activeOperation: boolean = false;
	activeClinic: boolean = false;
	activeFinances: boolean = false;
	
	subscription: Subscription;
	
	animatebottom: any;
	animatetop: any;
	
	openMenu = false;
	sectionOpen: any;
	
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
	
  constructor(private messageService: MessageService, private router: Router) {
	
	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'openOption' && message.data.panel == '1'){
			
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
  
  loadPage() {
	this.router.navigate(['../settings']);
  }
  
  

}
