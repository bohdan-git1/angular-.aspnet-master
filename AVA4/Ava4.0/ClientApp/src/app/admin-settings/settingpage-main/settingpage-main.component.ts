import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settingpage-main',
  templateUrl: './settingpage-main.component.html',
  styleUrls: ['./settingpage-main.component.css']
})
export class SettingpageMainComponent implements OnInit {
	
	@Input() selectMenuIndx: any;
	windowHt: any;
	search_settings: any = 'Search Settings...';
	
	optionsArr_settings: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Account'}, {optns: 'Auto Text'}, {optns: 'Avas Outreach', suboptns: [{optns: 'Sequences'}, {optns: 'Appointment Reminders'}, {optns: 'Custom'}, {optns: 'New Patient'}, {optns: 'No Show'}, {optns: 'Pending'}, {optns: 'Recall'}]}, {optns: 'Conversion', suboptns: [{optns: 'Data Mapping'}, {optns: 'Mass Code Changes'}, {optns: 'Posting'}]}, {optns: 'Information', suboptns: [{optns: 'Case Manager'}, {optns: 'Doctor'}, {optns: 'Office'}]}, {optns: 'Letter Codes'}, {optns: 'Referrals', suboptns: [{optns: 'Dentists'}, {optns: 'Specialists'}, {optns: 'Other'}]}, {optns: 'Schedule', suboptns: [{optns: 'Format'}, {optns: 'Rules'}]}, {optns: 'Users', suboptns: [{optns: 'Add'}, {optns: 'Delete'}, {optns: 'Logins'}, {optns: 'Permissions'}]}]},
		
		{grp_title: 'FINANCES', grp_options: [{optns: 'Case Presentation'}, {optns: 'Insurance', suboptns: [{optns: 'Companies'}, {optns: 'Forms'}]}, {optns: 'Payments', suboptns: [{optns: 'Auto-Pay'}, {optns: 'Billing Services'}, 
        {optns: 'Merchant Services'}]}]},
		
		{grp_title: 'CLINIC', grp_options: [{optns: 'Picture Gallery'}, {optns: 'Posting Codes'}, {optns: 'Procedures', suboptns: [{optns: 'Chair Setup'}, {optns: 'Codes'}, {optns: 'Details'}, {optns: 'Doctor Time'}]}, {optns: 'Treatment Card', suboptns: [{optns: 'Diagnosis'}, {optns: 'X-Ray'}, {optns: 'Tx Plan'}]}]}
	];
	
	settingsHoverAction: any[] = [{hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}, {hover: false, selected: false}];
	
	rotateOnY: any = 0;
	checkprimaryToggle: boolean = true;
	
  constructor() { }

  ngOnInit() {
	/*let borderWd = 1/window.devicePixelRatio;
	let zoomWd = 46/window.devicePixelRatio + 2*borderWd;
	this.windowHt = window.innerHeight - (zoomWd*3);
	
	this.settingsHoverAction[this.selectMenuIndx].selected = true;*/
  }
  
  activeMenu(action, indx){
	
	if(action == 'mouseover'){
		this.settingsHoverAction[indx].hover = true;
	} else {
		this.settingsHoverAction[indx].hover = false;
	}
  }
  
  flipCard() {
	this.rotateOnY -= 180;
  }
  
  primaryToggle() {
	this.checkprimaryToggle = this.checkprimaryToggle == true ? false : true;
  }
  
  selectMenu(indx){
	this.settingsHoverAction.map(item => {
		item.selected = false;
	})
	
	this.settingsHoverAction[indx].selected = true;
  }

}
