import { Component, OnInit, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

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
		{grp_title: 'OPERATIONS', grp_options: [{optns: 'Account'}, {optns: 'Ava’s Outreach'}, {optns: 'Conversion'}, {optns: 'Information'}, {optns: 'Templates'}, {optns: 'Referrals'}, {optns: 'Schedule'}, {optns: 'Users'}]},

		{grp_title: 'FINANCES', grp_options: [{optns: 'Case Presentation'}, {optns: 'Insurance'}, {optns: 'Posting codes'}, {optns: 'Merchant account'}, {optns: 'Vendors'}]},

		{grp_title: 'CLINIC', grp_options: [{optns: 'Diagnosis'}, {optns: 'Picture Gallery'}, {optns: 'Procedures'}, {optns: 'Treatment plan'}]}
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

  constructor(public patientDialog: MatDialog) { }

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

	this.initializeTitlePos();
  }

  initializeTitlePos(){
	this.analyticsArr.map(item => {
		let charlen: any = item.label.length * 12;
		item.topPos = charlen + 10;
	});

	//console.log(this.analyticsArr);
  }

  selectedPanelOption(panel, indx, subindx){
	this.getPanelSelected.emit({'panel': panel, 'indx': indx});
	if(panel != 0){
		localStorage.setItem('openOption', JSON.stringify({'panel': panel, 'indx': indx, 'subindx': subindx}));
	}
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

		if(this.zoomviewport > 100){
			this.zoomviewport = 100;
		}

		window.localStorage.setItem('zoomview', this.zoomviewport);
	}

	openInnerSection(){

	}

	openVendorModal(){
		const dialogRef = this.patientDialog.open(VendorModal, {
			panelClass: 'vendormodal',
			backdropClass: 'whitebackdrop',
		  data: {}
		});
	}

	gotoSection(evt, section){

		console.log('evt', evt);

		if(section == 'settings'){
			this.selectedPanelOption(2, evt.grpindx, evt.itemindx);
		}
	}

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class VendorModal implements OnInit {

  constructor(public _matDialogRef: MatDialogRef<VendorModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {}

  cancel(): void {
    this._matDialogRef.close(null);
  }
}
