import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
	
	@Output() getPanelSelected = new EventEmitter();
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	
	analyticsArr: any[] = [
						   {card_type: "leads", label: "Leads", data: {today: "5", lastday: "3", last_7: "14", last_30: "32"}},
						   {card_type: "exams", label: "Exams", data: {today: "2", lastday: "3", last_7: "6", last_30: "22"}},
						   {card_type: "starts", label: "Starts", data: {today: "1", lastday: "2", last_7: "6", last_30: "18"}},
						   {card_type: "dband", label: "D-Bands", data: {today: "2", lastday: "0", last_7: "5", last_30: "15"}},
						   {card_type: "revenue", label: "Revenue", data: {today: "12043", lastday: "17137", last_7: "45630", last_30: "105355"}}
						  ]
						  
	card_type_colArr: any[] = [{card_type: "leads", color: '#8CF1E4'},
								{card_type: "exams", color: '#F6CC61'},
								{card_type: "starts", color: '#B48CF6'},
								{card_type: "dband", color: '#74B3FD'},
								{card_type: "revenue", color: '#FD7474'},
							  ];
	
	search_settings: any = 'Search Settings...';
	search_pms: any = 'Search Practice Management...';
	zoomable_settings: boolean = true;
	zoomable_pms: boolean = true;
	
	optionsArr_settings: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Account'}, {optns: 'Auto Text'}, {optns: 'Ava’s Outreach', suboptns: [{optns: 'Sequences'}, {optns: 'Appointment Reminders'}, {optns: 'Custom'}, {optns: 'New Patient'}, {optns: 'No Show'}, {optns: 'Pending'}, {optns: 'Recall'}]}, {optns: 'Conversion', suboptns: [{optns: 'Data Mapping'}, {optns: 'Mass Code Changes'}, {optns: 'Posting'}]}, {optns: 'Information', suboptns: [{optns: 'Case Manager'}, {optns: 'Doctor'}, {optns: 'Office'}]}, {optns: 'Letter Codes'}, {optns: 'Referrals', suboptns: [{optns: 'Dentists'}, {optns: 'Specialists'}, {optns: 'Other'}]}, {optns: 'Schedule', suboptns: [{optns: 'Format'}, {optns: 'Rules'}]}, {optns: 'Users', suboptns: [{optns: 'Add'}, {optns: 'Delete'}, {optns: 'Logins'}, {optns: 'Permissions'}]}]},
		
		{grp_title: 'FINANCES', grp_options: [{optns: 'Case Presentation'}, {optns: 'Insurance', suboptns: [{optns: 'Companies'}, {optns: 'Forms'}]}, {optns: 'Payments', suboptns: [{optns: 'Auto-Pay'}, {optns: 'Billing Services'}, 
        {optns: 'Merchant Services'}]}]},
		
		{grp_title: 'CLINIC', grp_options: [{optns: 'Picture Gallery'}, {optns: 'Posting Codes'}, {optns: 'Procedures', suboptns: [{optns: 'Chair Setup'}, {optns: 'Codes'}, {optns: 'Details'}, {optns: 'Doctor Time'}]}, {optns: 'Treatment Card', suboptns: [{optns: 'Diagnosis'}, {optns: 'X-Ray'}, {optns: 'Tx Plan'}]}]}
	];
	
	
	optionsArr_pms: any[] = [
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Human Resources'}, {optns: 'Inventory'}, {optns: 'Marketing'}, {optns: 'Phone System'}, {optns: 'Time Clock'}, {optns: 'Training'}]},
		
		{grp_title: 'FINANCES', grp_options: [{optns: 'Accounting'}, {optns: 'Accounts Payable'}, {optns: 'Accounts Receivable'}, {optns: 'Benefits'}, {optns: 'Payroll'}, {optns: 'Purchasing'}]},
		
		{grp_title: 'OWNER / DOCTOR', grp_options: [{optns: 'Building'}, {optns: 'Continuing Education (CE)'}, {optns: 'Consultant'}, {optns: 'Contracts'}, {optns: 'Equipment'}, {optns: 'HIPAA'}, {optns: 'Insurances'}]}
	];
	
	docWd = 1728;
	_scale = 1;
	
	 zoomviewport: any = 100;
	 
	 windowWd: any = window.innerWidth;
	
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if(window.devicePixelRatio < 1){
			this._scale = 1/window.devicePixelRatio;
			this.docWd = 1728/window.devicePixelRatio;
		} else {
			this._scale = 1/window.devicePixelRatio;
			this.docWd = 1728;
		}
		
		this.windowWd = window.innerWidth;
		
	}

  constructor() { }

  ngOnInit() {
	
	this.windowWd = window.innerWidth;
	
	if(window.devicePixelRatio < 1){
		this._scale = 1;
		this.docWd = 1728/window.devicePixelRatio;
	} else {
		this._scale = 1/window.devicePixelRatio;
		this.docWd = 1728;
	}
	
	if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
		this.zoomviewport = Number(window.localStorage.getItem('zoomview'));
	}
  }
  
  selectedPanelOption(panel, indx){
	this.getPanelSelected.emit({'panel': panel, 'indx': indx})
  }
  
  zoomView(dir) {
		if(dir == 'in'){
			this.zoomviewport -= 5;
		} else {
			this.zoomviewport += 5;
		}
		if(this.zoomviewport < 25){
			this.zoomviewport = 25;
		}
		
		if(this.zoomviewport > 200){
			this.zoomviewport = 200;
		}
		
		window.localStorage.setItem('zoomview', this.zoomviewport);
	}

}
