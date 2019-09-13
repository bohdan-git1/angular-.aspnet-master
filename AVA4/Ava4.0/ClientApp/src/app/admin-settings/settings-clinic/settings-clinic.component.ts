import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-settings-clinic',
  templateUrl: './settings-clinic.component.html',
  styleUrls: ['./settings-clinic.component.css']
})
export class SettingsClinicComponent implements OnInit {
	
	windowHt: any;
	search_settings: any = 'Search Settings...';
	
	optionsArr_settings: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Account'}, {optns: 'Auto Text'}, {optns: 'Avas Outreach', suboptns: [{optns: 'Sequences'}, {optns: 'Appointment Reminders'}, {optns: 'Custom'}, {optns: 'New Patient'}, {optns: 'No Show'}, {optns: 'Pending'}, {optns: 'Recall'}]}, {optns: 'Conversion', suboptns: [{optns: 'Data Mapping'}, {optns: 'Mass Code Changes'}, {optns: 'Posting'}]}, {optns: 'Information', suboptns: [{optns: 'Case Manager'}, {optns: 'Doctor'}, {optns: 'Office'}]}, {optns: 'Letter Codes'}, {optns: 'Referrals', suboptns: [{optns: 'Dentists'}, {optns: 'Specialists'}, {optns: 'Other'}]}, {optns: 'Schedule', suboptns: [{optns: 'Format'}, {optns: 'Rules'}]}, {optns: 'Users', suboptns: [{optns: 'Add'}, {optns: 'Delete'}, {optns: 'Logins'}, {optns: 'Permissions'}]}]},
		
		{grp_title: 'FINANCES', grp_options: [{optns: 'Case Presentation'}, {optns: 'Insurance', suboptns: [{optns: 'Companies'}, {optns: 'Forms'}]}, {optns: 'Payments', suboptns: [{optns: 'Auto-Pay'}, {optns: 'Billing Services'}, 
        {optns: 'Merchant Services'}]}]},
		
		{grp_title: 'CLINIC', grp_options: [{optns: 'Picture Gallery'}, {optns: 'Posting Codes'}, {optns: 'Procedures', suboptns: [{optns: 'Chair Setup'}, {optns: 'Codes'}, {optns: 'Details'}, {optns: 'Doctor Time'}]}, {optns: 'Treatment Card', suboptns: [{optns: 'Diagnosis'}, {optns: 'X-Ray'}, {optns: 'Tx Plan'}]}]}
	];
	
	settingsHoverAction: any[] = [{hover: false, selected: false, route: 'diagnosis'}, {hover: false, selected: false, route: 'photogallery'}, {hover: false, selected: false, route: 'procedures'}, {hover: false, selected: false, route: 'treatmentplan'}];

  constructor(private messageService: MessageService, private router: Router, private activatedRoute:ActivatedRoute) {
	this.activatedRoute.params.subscribe(data => {
	  let selectMenuIndx = data.mnid;
	  
	  setTimeout(() => {this.selectMenu(selectMenuIndx)})
    })
  }

  ngOnInit() {
	let borderWd = 1/window.devicePixelRatio;
	let zoomWd = 25/window.devicePixelRatio + 2*borderWd;
	this.windowHt = window.innerHeight - (zoomWd*3);
  }
  
  activeMenu(action, indx){
	
	if(action == 'mouseover'){
		this.settingsHoverAction[indx].hover = true;
	} else {
		this.settingsHoverAction[indx].hover = false;
	}
  }
  
  
  selectMenu(indx){
	this.settingsHoverAction.map(item => {
		item.selected = false;
	})
	
	this.settingsHoverAction[indx].selected = true;
	
	this.router.navigate(['../clinic', {mnid: indx}], {relativeTo: this.activatedRoute}).then(() => {
		this.router.navigate([this.settingsHoverAction[indx].route], {relativeTo: this.activatedRoute});
	})
	
  }
  
  openTab(tab){
	if(tab == 'clinic'){
		this.messageService.sendMessage('backtoparent', {section: tab});
		this.router.navigate(['../../settings'], {relativeTo: this.activatedRoute});
	} else if(tab == 'operations'){
		this.router.navigate(['../operations', {mnid: 0}], {relativeTo: this.activatedRoute});
	} else if(tab == 'finance'){
		this.router.navigate(['../finances', {mnid: 0}], {relativeTo: this.activatedRoute});
	}
  }

}
