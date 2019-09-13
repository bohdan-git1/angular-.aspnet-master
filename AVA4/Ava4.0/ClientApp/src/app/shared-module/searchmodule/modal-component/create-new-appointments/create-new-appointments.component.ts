import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../../core/message.service';

@Component({
  selector: 'app-create-new-appointments',
  templateUrl: './create-new-appointments.component.html',
  styleUrls: ['./create-new-appointments.component.css']
})
export class CreateNewAppointmentsComponent implements OnInit {
	
	@Output() showNewPatient = new EventEmitter();
	@Output() showNewEvent = new EventEmitter();
	@Input() selectedLocation: any;
	count_ProcedureCode: boolean= true;
	@Input() PatientInfo: any;

	
	procedureArr: any[] = [
		{"code": "101", "label": "Initial - Child", "time": "40", "type": "record"},
		{"code": "102", "label": "Initial - Adult", "time": "40", "type": "record"},
		{"code": "103", "label": "Initial - Transfer In", "time": "40", "type": "record"},
		{"code": "104", "label": "Initial - Transfer Retent", "time": "10", "type": "record"},
		{"code": "105", "label": "Initial - Second Opinion", "time": "40", "type": "record"},
		{"code": "201", "label": "Recall", "time": "15", "type": "record"},
		{"code": "202", "label": "Recall - Phase 1", "time": "15", "type": "exam"},
		{"code": "204", "label": "Recall with Pano", "time": "20", "type": "exam"},
		{"code": "301", "label": "Records - Child", "time": "60", "type": "exam"},
		{"code": "302", "label": "Records - Adult", "time": "60", "type": "exam"},
		{"code": "303", "label": "Records - Progress", "time": "60", "type": "exam"},
		{"code": "304", "label": "Records - Update", "time": "60", "type": "exam"},
		{"code": "305", "label": "Records - Update w/ our", "time": "60", "type": "exam"},
		{"code": "306", "label": "Kodas", "time": "20", "type": "exam"},
		{"code": "307", "label": "Pano", "time": "20", "type": "exam"},
		{"code": "308", "label": "Progress Pano", "time": "20", "type": "start"},
		{"code": "309", "label": "Surgical Models & Hook", "time": "60", "type": "start"},
		{"code": "310", "label": "Scan - Rescan", "time": "15", "type": "start"},
		{"code": "311", "label": "Records child w/ our Pano", "time": "60", "type": "start"},
		{"code": "312", "label": "Records child brought", "time": "40", "type": "start"},
		{"code": "313", "label": "Records adult w/ our Pano", "time": "40", "type": "start"},
		{"code": "401", "label": "Consult Child", "time": "35", "type": "appl"},
		{"code": "402", "label": "Consult Adult", "time": "35", "type": "appl"},
		{"code": "405", "label": "Consult - Progress", "time": "15", "type": "appl"},
		{"code": "406", "label": "Consult Extra", "time": "10", "type": "appl"},
		{"code": "450", "label": "SEPS", "time": "10", "type": "adj"},
		{"code": "530", "label": "Dentist referred", "time": "10", "type": "adj"},
		{"code": "531", "label": "Patient referred", "time": "10", "type": "adj"},
		{"code": "532", "label": "IA - Advertisement Referred", "time": "10", "type": "dband"},
		{"code": "533", "label": "IA - Website Referred", "time": "10", "type": "dband"},
		{"code": "534", "label": "IA - Friend Referred", "time": "10", "type": "dband"},
		{"code": "532", "label": "Meeting", "time": "15", "type": "event"},
		{"code": "533", "label": "Luncheon", "time": "30", "type": "event"},
		{"code": "534", "label": "Doctor Event", "time": "10", "type": "event"}
	];
	
	patient_data: any = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "SP", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "FA", "is_patient": true}, {"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "MO", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "SP", "is_patient": true}, {"id": 3, "firstname": "Lydia", "lastname": "Adams", "relation_type": "MO", "is_patient": true}], "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true}
		
	];
		
	weeklabel: any[] = [{label: 'Sunday', offday: true}, {label: 'Monday', offday: false}, {label: 'Tuesday', offday: false}, {label: 'Wednesday', offday: false}, {label: 'Thursday', offday: false},  {label: 'Friday', offday: false}, {label: 'Saturday', offday: false}];
	
	appntslot: any[] = [
		
		{location: 'Salt Lake City ', slots: [
			{date:'3/17/2019', day: 'Sunday', timeslot: []},
			{date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}]},
			{date:'3/19/2019', day: 'Tuesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}, {time: '9:00am'}, {time: '2:30pm'}, {time: '4:00pm'}]},
			{date:'3/20/2019', day: 'Wednesday', timeslot: [{time: '12:30am'}, {time: '1:45pm'}]},
			{date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
			{date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}]},
			{date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'}]}
		]},
		
		{location: 'Lehi ', slots: [
			{date:'3/17/2019', day: 'Sunday', timeslot: []},
			{date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}, {time: '3:00pm'}]},
			{date:'3/20/2019', day: 'Tuesday', timeslot: [{time: '12:30am'}, {time: '1:45pm'}]},
			{date:'3/19/2019', day: 'Wednesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}, {time: '9:00am'}, {time: '2:30pm'}, {time: '4:00pm'}]},
			{date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
			{date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}, {time: '2:00pm'}]},
			{date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'},{time: '12:30am'}, {time: '1:45pm'}]}
		]},
		
		{location: 'Provo ', slots: [
			{date:'3/17/2019', day: 'Sunday', timeslot: []},
			{date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}, {time: '4:00pm'}]},
			{date:'3/19/2019', day: 'Tuesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}]},
			{date:'3/20/2019', day: 'Wednesday', timeslot: [{time: '9:00am'}, {time: '12:30am'}, {time: '1:45pm'}, {time: '2:30pm'}, {time: '4:00pm'}]},
			{date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
			{date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}, {time: '2:30pm'}]},
			{date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'}, {time: '12:30am'}, {time: '2:30pm'}]}
		]}
	];
	
	filterProcedure: any[] = [];
	filterPatient: any[] = [];
	procedureSrch:boolean = false;
	procedure_searchStr: any = '';
	selectedProcedure: any = {};
	selectedPatient: any = '';
	pateientSrch:boolean = false;
	
	procedure_selc_done: boolean = false;
	pateient_selc_done: boolean = false;
	
	today:any;
	currentWeek: any;
	startdt:any;
	enddt:any;
	dateCounter: any = 0;
	
	showPrevWeekBtn: boolean = false;
	showNextWeekBtn: boolean = true;
	month: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	selectedLocIndx: any;
	selectedSoltIndx: any;
	seledtedDateIndx: any;
	innerModal: boolean = false;
	
	officeArr: any[] = [{"office": "All Offices"}, {"office": "Salt lake city"}, {"office": "Lehi"}, {"office": "Provo"}];
	selectedOffice: any;
	showOfficeDd: boolean = false;
	filterOfficeArr: any[] = [];
	
	checkPatientName: boolean= false;
	newStartdt: any;
	clickCount: any = 0; 
	
  constructor(private dataService:MessageService) { }

  ngOnInit() {
	this.selectedOffice = this.selectedLocation;
	let str = this.selectedOffice;
	this.selectedOffice = str.replace('Office', '');

	this.filterOffice();
	this.getCurrentWeek();
	if((typeof (this.PatientInfo.patientFirstName)!= 'undefined') || (typeof (this.PatientInfo.patientLastName) !='undefined'))
	{
		
		this.selectedPatient = `${this.PatientInfo.patientFirstName} ${this.PatientInfo.patientLastName}`;
		if(this.selectedPatient!='')
		{
			this.checkPatientName= this.selectedPatient ==''? false : true;
			this.pateient_selc_done = true;
		}
		
	}
	
  }
  
  searchProcedureCode(evt){
	let _searchStr: any = this.procedure_searchStr;
	let searchStr: any = _searchStr.toLowerCase();
	this.procedure_selc_done = false;
	
	this.filterProcedure = [];
	this.procedureSrch = false;
	this.selectedProcedure = {};
	
	if(searchStr.length > 0){
		this.filterProcedure = this.procedureArr.filter(item => {
			return (item.code.includes(searchStr))
		});
		
		if(this.filterProcedure.length == 0){
			this.filterProcedure.push({"code": "", "label": "No procedure code found!"});
		}
		
		if(this.filterProcedure.length > 0){
			this.procedureSrch = true;
		}
	}
  }

  showallProcedureCode(count_ProcedureCode){
		if(count_ProcedureCode ==true)
		{
			this.procedureSrch = true;
			this.count_ProcedureCode= false;
		}else {
			this.procedureSrch = false;
			this.count_ProcedureCode= true;
		}
	
		this.filterProcedure = this.procedureArr;
  	}
  
  selectProcedureCode(procedureitem){
	this.procedureSrch = false;
	this.count_ProcedureCode= true;
	this.procedure_searchStr = procedureitem.code;
	this.selectedProcedure = procedureitem;
	if(this.procedure_searchStr)
	{
		this.procedure_selc_done = true;
	}

	
  }
  
  searchPatient(_searchstr){
	
	this.filterPatient = [];
	this.pateientSrch = false;
	this.pateient_selc_done = false;
	let searchstr = _searchstr.toLowerCase();
	let searchStrSplit = searchstr.split(' ');
	let filterSearchArr = searchStrSplit.filter(item => {return item});
	
	if(searchstr.length > 1){
		this.filterPatient = this.patient_data.filter(item => {
			return filterSearchArr.some(srch => {
				return (item.firstname.toLowerCase().includes(srch) || item.lastname.toLowerCase().includes(srch) || item.phone.includes(srch) || item.address.toLowerCase().includes(srch) || item.email.toLowerCase().includes(srch))
			})
		});
		
		if(this.filterPatient.length == 0){
			this.filterProcedure.push({"firstname": "No patient found!"});
		}
		
		this.pateientSrch = true;
	}
	
  }
  
  selectPatient(patientitem){
	  
	this.pateientSrch = false;
	this.pateient_selc_done = true;
	this.selectedPatient = `${patientitem.firstname} ${patientitem.lastname}`;
  }
  
  showNewPatientSection() {
	this.showNewPatient.emit('showNewPatientsection');
  }
  
  getCurrentWeek(){
	this.today = new Date();
	let dayNum: any = this.today.getDay();
	
	this.startdt = new Date();
	this.startdt.setDate(this.today.getDate() - dayNum);
	this.weeklabelArraySet(this.startdt);

	this.enddt = new Date();
	this.enddt.setDate(this.startdt.getDay() + 6);
	
	let strtdayString: any;
	let enddayString: any;
	
	if(this.startdt.getFullYear() == this.enddt.getFullYear()){
		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
		
		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
	} else {
		strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
		
		enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
	}
	
	//alert(enddayString);
	this.currentWeek = strtdayString + enddayString;
  }

  
  nextPrevWeekDate(dir){
	if(dir == 'next'){
		this.dateCounter++;
		this.showPrevWeekBtn = true;
		this.newStartdt.setDate(this.newStartdt.getDate() + 1);
		this.weeklabelArraySet(this.newStartdt);
		this.modifyWeekBar('next');
	

	} else {
		this.dateCounter--;
		if(this.dateCounter <= 0){
			this.dateCounter = 0;
			this.showPrevWeekBtn = false;
			this.modifyWeekBar('previous');
		}else {
			this.modifyWeekBar('next');
		}
		this.newStartdt.setDate(this.newStartdt.getDate() - 13);
		this.weeklabelArraySet(this.newStartdt);
	}
  }


  weeklabelArraySet(startWeekdate)
  {
		for(var i=0; i<=6 ; i++)
		{
			
			var newStartdt1 = new Date(startWeekdate);
			newStartdt1.setDate(startWeekdate.getDate() + i);
			this.weeklabel.map((val, key)=>{
					if(key==i)
					{
						
						var getMonthData = newStartdt1.getMonth()+1 < 10 ? `0${newStartdt1.getMonth()+1}` : newStartdt1.getMonth()+1;
						var getDateData = newStartdt1.getDate() < 10 ? `0${newStartdt1.getDate()}` : newStartdt1.getDate();
						
						this.weeklabel[key].month= getMonthData;
						this.weeklabel[key].day= getDateData;
					}
					
			})

			if(i==6)
			{
				this.newStartdt= newStartdt1;
			}
			//console.log(newStartdt1);
		}

	
  }
  
	dateSuffix(value) {

		let suffix = 'th';
		let day = value;

		if (day == '1' || day == '21' || day == '31') {
			suffix = 'st'
		} else if (day == '2' || day == '22') {
			suffix = 'nd';
		} else if (day == '3' || day == '23') {
		   suffix = 'rd';
		}

		return suffix;
	}
	
	nextPrevWeek(dir){
		
		let strtdayString: any;
		let enddayString: any;
		
		if(dir == 'next'){
			this.dateCounter++;
			this.showPrevWeekBtn = true;
			this.startdt = new Date(this.enddt.getFullYear(), this.enddt.getMonth(), this.enddt.getDate() + 1)

		} else {
			this.dateCounter--;
			if(this.dateCounter <= 0){
				this.dateCounter = 0;
				this.showPrevWeekBtn = false;
			}
			this.startdt = new Date(this.startdt.getFullYear(), this.startdt.getMonth(), this.startdt.getDate() - 7);
			this.enddt = new Date(this.startdt);
			this.enddt.setDate(this.startdt.getDate() + 6);
		}
		
		if(this.startdt.getFullYear() == this.enddt.getFullYear()){
			strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} - `;
			
			enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		} else {
			strtdayString = `${this.month[this.startdt.getMonth()]} ${this.startdt.getDate()}${this.dateSuffix(this.startdt.getDate())} ${this.startdt.getFullYear()} - `;
			
			enddayString = `${this.month[this.enddt.getMonth()]} ${this.enddt.getDate()}${this.dateSuffix(this.enddt.getDate())} ${this.enddt.getFullYear()}`;
		}
		
		this.currentWeek = strtdayString + enddayString;
	}
	
	openInnerModal(locindx, dayindx, slotindx) {
		

		this.filterOfficeArr[locindx].slots[dayindx].timeslot[slotindx].selected= this.filterOfficeArr[locindx].slots[dayindx].timeslot[slotindx].selected == true ? '': true ;
		this.filterOfficeArr[locindx].slots[dayindx].appointment= this.filterOfficeArr[locindx].slots[dayindx].appointment== true ? '' : true;
		if(this.filterOfficeArr[locindx].slots[dayindx].timeslot[slotindx].selected==true)
		{
			this.clickCount= 1 ;

		}else if(this.filterOfficeArr[locindx].slots[dayindx].timeslot[slotindx].selected==false )
		{
			this.clickCount= 0 ;
		}
		

		this.selectedLocIndx = locindx;
		this.selectedSoltIndx = slotindx;
		this.seledtedDateIndx = dayindx;
		
		/*let appntDt: any = new Date(this.appntslot[locindx][dayindx].date);
		
		this.appnt_timeslot = `${this.weeklabel[appntDt.getDay()].label}, ${this.month[appntDt.getMonth()]} ${appntDt.getDate()}${this.dateSuffix(appntDt.getDate())} at ${this.appntslot[dayindx].timeslot[slotindx].time}?`;*/
		
		this.innerModal = true;
		console.log(this.filterOfficeArr);
	}
	
	selectOffice() {
		this.showOfficeDd = this.showOfficeDd == true ? false : true;
	}
	
	selectOfficeOption(option){
		//this.selectedOffice = option.office;
		this.selectedOffice = option;
		this.filterOffice();
		this.showOfficeDd = false;
	}
	
	filterOffice() {
		let officeSelected: any = this.selectedOffice.toLowerCase();
		
		this.filterOfficeArr = [];
		
		if(this.selectedOffice == 'All Offices'){
			this.filterOfficeArr = JSON.parse(JSON.stringify(this.appntslot));
		} else {
			this.filterOfficeArr = this.appntslot.filter(item => {
				return item.location.toLowerCase().includes(officeSelected)
			});
		}
        console.log(officeSelected)
	    this.modifyWeekBar('previous');
		
	}

	modifyWeekBar(type)
	{
		if(type=='previous')
		{
			let today = new Date();
			let dayNum: any = today.getDay();
			let startdt = new Date();
			var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday",
			"Friday","Saturday")

			for( var i=dayNum; i>=1; i--)
			{
				startdt.setDate(today.getDate() - i);
				//console.log(weekday[startdt.getDay()]);
				this.filterOfficeArr.map((value, key)=>{

					value.slots.map((value1, key1)=>{

							if(value1.day==weekday[startdt.getDay()])
							{
								value1.selected= false;
							}
					})
				})
			}
			
		}else {

			this.filterOfficeArr.map((value, key)=>{

				value.slots.map((value1, key1)=>{

							value1.selected= true;

				})
			})
		}
		
		
	}
	
	scheduled() {
		this.dataService.sendMessage('closemodal', {'modalname': 'createnewappnt'});
	}
	
	cancelModal() {
		this.dataService.sendMessage('closemodal', {'modalname': 'createnewappnt'});
	}
	
	showNewEventSection() {
		
		console.log("showNewEventSection")
		
		this.showNewEvent.emit('showNewEventSection');
	}

}
