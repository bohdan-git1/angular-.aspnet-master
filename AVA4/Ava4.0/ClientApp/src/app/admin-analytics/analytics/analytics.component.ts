import { Component, OnInit, Output, EventEmitter, HostListener, Inject, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { timer } from 'rxjs';

import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
	
	@ViewChild('rotationlabel') rotationlabel;
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

	clock_in_for: boolean= false;
	start_break_for: boolean= false;
	end_break_for: boolean= false;
	clock_out_for: boolean= false;
	duration_for: boolean= false;
	title_for: any= 'Clocked out';
	weekbar_for : any;
	currentcheckin_time_for: any;
	currentcheckin_milliseconds_time_for: any;

	current_time_for: any;
	current_milliseconds_time_for: any;
	duration_time_for_second: any;
	duration_time_for_minutes: any;
	duration_time_for_hours: any;

	break_title: any='Start Break'

	currentlunch_time_for: any;
	currentlunch_milliseconds_time_for: any;
	currentlunch_milliseconds_time_forArray=[];

   time_comment_box = false;

	currentlunchend_time_for: any;
	currentlunchend_milliseconds_time_for: any;
	currentlunchend_milliseconds_time_forArray=[];

	currentcheckout_time_for: any;
	currentcheckout_milliseconds_time_for: any;
	

	title_color: any='#8B8B8B';
	differ_time: any;
	break_time:any;

	instant_time_for: any;
	instant_milliseconds_time_for: any;
	middle_war_time: any;
	
	todoToday: any;
	toppos: any = 0;
	highlight_duration_for=false;
	Breaktimein_Array: any=[];
	Breaktimeout_Array: any=[];
	Breaktimeclone_outArray = [];

	common: any=[];




	
	durationCountIntv: any;

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
	 
	locationsDdArr: any[] = [{"label": "Salt Lake City Office", "selected": false}, {"label": "Lehi Office", "selected": false}, {"label": "Provo Office", "selected": false}];
	
	showlocDdrnOption:boolean = false;
	selectedLoc: any = '';
	currMonths: any;
	calenderRule: any = {
    "closed": {
      "repeat": ["0", "1"],
      "specific": [{"date": "Fri Oct 17 2018 00:00:00 GMT+0530 (India Standard Time)"}, {"date" : "Fri Oct 31 2018 00:00:00 GMT+0530 (India Standard Time)"}]
    },
    "longerdays": {
		"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["6", "4"]},
		"specific": []
	},
	"shorterdays": {
		"repeat": {"weeknum": ["2", "4"], "days": ["2"]},
		"specific": []
	},
	
	"otherofficeopen": {
		"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["1", "6"]},
		specific: []
	}
}
	
	analyticsData: any[] = [
		{"section": "New Leads", "patients": [{"name": "Kate Hudson"}, {"name": "Elizabeth Thomas"}, {"name": "Jaron King"}, {"name": "Richard Sivan"}, {"name": "Lindy Loughlin"}], "today": "5", "lastday": "3", "last7day": "14", "last30day": "32"},
		
		{"section": "No Show", "patients": [{"name": "Kate Hudson"}, {"name": "Elizabeth Thomas"}], "today": "2", "lastday": "3", "last7day": "10", "last30day": "22"},
		
		{"section": "NP Recall", "patients": [{"name": "Kate Hudson"}, {"name": "Elizabeth Thomas"}, {"name": "Jaron King"}, {"name": "Richard Sivan"}, {"name": "Lindy Loughlin"}, {"name": "Adams Carter"}], "today": "6", "lastday": "9", "last7day": "25", "last30day": "56"},
		
		{"section": "Virtual Consultant", "patients": [{"name": "Adams Carter"}, {"name": "Elizabeth Thomas"}], "today": "2", "lastday": "5", "last7day": "33", "last30day": "44"},
		
		{"section": "Needs Appointment", "patients": [{"name": "Adams Carter"}, {"name": "Elizabeth Thomas"}], "today": "2", "lastday": "5", "last7day": "33", "last30day": "44"},
		
		{"section": "IN TX - Recall", "patients": [{"name": "Richard Sivan"}, {"name": "Lindy Loughlin"}], "today": "2", "lastday": "3", "last7day": "56", "last30day": "78"}
	];
	
	showClockInfo:boolean = false;
	
	
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

  constructor(public comDialog: MatDialog) { 
		this.weekbar_for = new Date();
	}

  ngOnInit() {

	let today: any = new Date();
	this.todoToday = new Date();
	
	this.currMonths = new Date(today.getFullYear(), today.getMonth(), 1);
	
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
	
	this.selectLocation(0);
	this.initalizeAnalyticsData();
	this.calculateLabelPos();
	
	}
	
	
  selectedPanelOption(panel, indx){
	this.getPanelSelected.emit({'panel': panel, 'indx': indx})
  }
  
  initalizeAnalyticsData() {
	this.analyticsData.map((item, index) => {
		if(index == 0){
			item.openaccordion = true;
		} else {
			item.openaccordion = false;
		}
		
		item.patients.map(ptnItem => {
			ptnItem.openmenu = false;
		})
		
	})
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
	
	
	showLocationDrpdn(){
		this.showlocDdrnOption = this.showlocDdrnOption == true ? false : true;
	}
	
	selectLocation(indx){
		this.locationsDdArr.map(item => {
			item.selected = false;
		})
		
		
		this.selectedLoc = this.locationsDdArr[indx].label;
		this.locationsDdArr[indx].selected = true;
		this.showlocDdrnOption = false;
	}
	
	setSectionBg(section){
		let bgCol: any;
		let _section: any = section.toLowerCase();
		
		if(_section == 'new leads'){
			bgCol = '#8CF1E4';
		} else if(_section == 'no show'){
			bgCol = '#F6CC61';
		} else if(_section == 'np recall'){
			bgCol = '#B48CF6';
		} else if(_section == 'virtual consultant'){
			bgCol = '#74B3FD';
		} else if(_section == 'in tx - recall'){
			bgCol = '#FECACA';
		} else if(_section == 'needs appointment'){
			bgCol = '#FD7474';
		}
		
		return bgCol;
	}
	
	openAnalyticsAccordion(indx){
		this.analyticsData.map(item => {
			item.openaccordion = false;
		});
		
		this.analyticsData[indx].openaccordion = true;
		
		this.calculateLabelPos();
	}
	
	calculateLabelPos() {
		setTimeout(() => {
			this.toppos = this.rotationlabel.nativeElement.offsetWidth + 10;
		})
	}
	
	showactionMenu(indx) {
		this.analyticsData.map(item => {
		
			item.patients.map((ptnItem, index) => {
				if(index != indx){
					ptnItem.openmenu = false;
				}
				
			});
			
			item.patients[indx].openmenu = item.patients[indx].openmenu==true ? false : true;
			
		});
	}
	
	selectAction(){
		this.analyticsData.map(item => {
			item.patients.map((ptnItem) => {
					ptnItem.openmenu = false;
			});
			
			
			
		});
	}
	
	

	clock_in() {
	
		if(this.clock_in_for==false) {
			this.duration_for=true;
			this.start_break_for=false;
			this.end_break_for=false;
			this.clock_out_for= false;
			this.highlight_duration_for=false;
			this.break_title='Start Break';


			this.currentcheckin_time_for = new Date();
			this.currentcheckin_time_for.setSeconds(0);
			this.currentcheckin_milliseconds_time_for = this.currentcheckin_time_for.getTime();
			this.title_for= 'Clocked in';
			this.title_color= '#4EC8F0';
			this.clock_in_for= true;
			this.time_comment_box=true;

			this.duration_calculation(this.currentcheckin_milliseconds_time_for,'', '', '');
			
			this.durationCountIntv = setInterval(() => {
				this.duration_calculation(this.currentcheckin_milliseconds_time_for, this.currentlunch_milliseconds_time_forArray,this.currentlunchend_milliseconds_time_forArray, this.currentcheckout_milliseconds_time_for);
				
				//console.log("clock in");
				
			}, 1000);

		}
	}





	break_fu() {
	
			if(this.break_title=='Start Break' && this.clock_in_for== true)
			{
			
				clearInterval(this.durationCountIntv);
				this.break_title=='Start Break'
				
				if(this.clock_out_for== false)
				{

					this.currentlunch_time_for = new Date();
				
					this.Breaktimein_Array.push(this.currentlunch_time_for);
				
					this.create_array_pair_fu(this.Breaktimein_Array,this.Breaktimeout_Array);
					
					this.currentlunch_time_for = new Date();
					this.currentlunch_time_for.setSeconds(0);

					this.currentlunch_milliseconds_time_for = this.currentlunch_time_for.getTime();
					this.currentlunch_milliseconds_time_forArray.push(this.currentlunch_milliseconds_time_for);

				

					this.title_for= 'On break';
					this.title_color= '#F6CC61';
					this.start_break_for=true;
					this.break_title='End Break';

					this.duration_calculation(this.currentcheckin_milliseconds_time_for, this.currentlunch_milliseconds_time_forArray,this.currentlunchend_milliseconds_time_forArray, '');

				}
				

			}else {

				if(this.clock_in_for== true && this.clock_out_for== false) 
				{
					
		
					this.currentlunchend_time_for = new Date();
				
					this.title_for= 'Clocked in';
					this.title_color= '#4EC8F0';
					this.end_break_for=true;
				
					this.Breaktimeout_Array.push(this.currentlunchend_time_for);
				
				
				
					this.create_array_pair_fu(this.Breaktimein_Array,this.Breaktimeout_Array);
					this.currentlunchend_time_for = new Date();
					this.currentlunchend_time_for.setSeconds(0);
					this.currentlunchend_milliseconds_time_for = this.currentlunchend_time_for.getTime();
					this.currentlunchend_milliseconds_time_forArray.push(this.currentlunchend_milliseconds_time_for);
				
					this.break_title='Start Break';

					this.duration_calculation(this.currentcheckin_milliseconds_time_for, this.currentlunch_milliseconds_time_forArray,this.currentlunchend_milliseconds_time_forArray, '');
					
					this.durationCountIntv = setInterval(() => {
						this.duration_calculation(this.currentcheckin_milliseconds_time_for, this.currentlunch_milliseconds_time_forArray,this.currentlunchend_milliseconds_time_forArray, this.currentcheckout_milliseconds_time_for);
						
						//console.log("clock in");
						
					}, 1000);

				
				}
			}
			
			
	}

	create_array_pair_fu(Breaktimein_Array,Breaktimeout_Array)
	{
		this.Breaktimeclone_outArray= [];
		for (var i = 0; i < this.Breaktimein_Array.length; i++) {
			this.Breaktimeclone_outArray[this.Breaktimein_Array[i]] = this.Breaktimeout_Array[i]  ;
		}
	}
	
	


	check_out()
	{
			if(this.clock_out_for==false && this.clock_in_for== true )
			{
				this.currentcheckout_time_for = new Date();
				this.currentcheckout_time_for.setSeconds(0);
				this.currentcheckout_milliseconds_time_for = this.currentcheckout_time_for.getTime();
				this.title_for= 'Clocked out';
				this.title_color= '#FD7474';
				this.clock_out_for= true;
				this.duration_for=false;
				this.highlight_duration_for=true;
				this.duration_calculation(this.currentcheckin_milliseconds_time_for, this.currentlunch_milliseconds_time_forArray,this.currentlunchend_milliseconds_time_forArray, this.currentcheckout_milliseconds_time_for);
				
				clearInterval(this.durationCountIntv);
				this.break_title='Start Break';
				this.clock_in_for=true;
				
				this.currentcheckin_milliseconds_time_for='';
				this.currentlunch_milliseconds_time_for='';
				this.currentlunchend_milliseconds_time_for='';
				this.currentcheckout_milliseconds_time_for='';

			}
	}

	duration_calculation(currentcheckin_milliseconds_time_for, currentlunch_milliseconds_time_forArray, currentlunchend_milliseconds_time_forArray,currentcheckout_milliseconds_time_for) {

		this.instant_time_for = new Date();
		this.instant_time_for.setSeconds(0);
		this.instant_milliseconds_time_for = this.instant_time_for.getTime();

		if(currentcheckout_milliseconds_time_for) {
			this.differ_time= currentlunch_milliseconds_time_forArray[0] - currentcheckin_milliseconds_time_for;
			this.break_time= 0;

			if (Array.isArray(currentlunch_milliseconds_time_forArray) && currentlunch_milliseconds_time_forArray.length && Array.isArray(currentlunchend_milliseconds_time_forArray) && currentlunchend_milliseconds_time_forArray.length )
			{
				for (var i = 0; i < currentlunch_milliseconds_time_forArray.length-1; i++) {
					if(currentlunchend_milliseconds_time_forArray[i]!='' && currentlunch_milliseconds_time_forArray[i+1]!='')
					{
					
						this.differ_time   =this.differ_time  +	(currentlunch_milliseconds_time_forArray[i+1]-currentlunchend_milliseconds_time_forArray[i]);
						
					}else {
						this.differ_time   =this.differ_time  + (currentcheckout_milliseconds_time_for-this.instant_milliseconds_time_for);
	
					}
				}

			}else if (currentlunch_milliseconds_time_forArray.length==0 && currentlunchend_milliseconds_time_forArray.length==0 )
 			{
				this.differ_time   = currentcheckout_milliseconds_time_for-this.currentcheckin_milliseconds_time_for;


			}
			


			

		} else {
			
			
			if (Array.isArray(currentlunch_milliseconds_time_forArray) && currentlunch_milliseconds_time_forArray.length && Array.isArray(currentlunchend_milliseconds_time_forArray) && currentlunchend_milliseconds_time_forArray.length ) {
				
				this.differ_time= currentlunch_milliseconds_time_forArray[0] - currentcheckin_milliseconds_time_for;
				this.break_time= 0;

			
				if(this.currentlunch_milliseconds_time_forArray.length==1)
				{
				
					if(currentlunchend_milliseconds_time_forArray[0]!='')
					{
						this.differ_time  = this.differ_time +	this.instant_milliseconds_time_for- currentlunchend_milliseconds_time_forArray[0];
					}
				}

				else {
				
					for (var i = 0; i < currentlunch_milliseconds_time_forArray.length-1; i++) {
							if(currentlunchend_milliseconds_time_forArray[i]!='' && currentlunch_milliseconds_time_forArray[i+1]!='')
							{
							
								this.differ_time   = this.differ_time +	(currentlunch_milliseconds_time_forArray[i+1]-currentlunchend_milliseconds_time_forArray[i]);
								
							}
						}

				}

			}else if (Array.isArray(currentlunch_milliseconds_time_forArray) && currentlunch_milliseconds_time_forArray.length)
			{
			
				this.differ_time= currentlunch_milliseconds_time_forArray[0] - currentcheckin_milliseconds_time_for;
				this.break_time= 0;


			}else {

				this.differ_time= this.instant_milliseconds_time_for - currentcheckin_milliseconds_time_for;
				this.break_time= 0;
			}

			
		}

			var diff_as_date = this.differ_time - this.break_time;

			this.duration_time_for_second = diff_as_date / 1000; //in s
			this.duration_time_for_second= Math.round(this.duration_time_for_second);


			//this.duration_time_for_minutes = diff_as_date / 60 / 1000; //in minutes
			this.duration_time_for_minutes= Math.round(diff_as_date / 60 / 1000);
			this.duration_time_for_minutes= this.duration_time_for_minutes==''? '0': this.duration_time_for_minutes;

		

			this.duration_time_for_hours = diff_as_date / 3600 / 1000; //in hours 
			this.duration_time_for_hours= Math.round(this.duration_time_for_hours);

	}
	
	openVendorModal(){
		const dialogRef = this.comDialog.open(VendorModal, {
			panelClass: 'vendormodal',
			backdropClass: 'whitebackdrop',
		  data: {}
		});
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
