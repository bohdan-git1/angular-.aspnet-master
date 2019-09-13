import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MessageService} from '../../../../core/message.service';


@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.css']
})
export class CreateNewEventComponent implements OnInit {
	
  @Output() backtoparent = new EventEmitter();
  count_EventList: boolean = true;

	
  timeslot_variable: boolean = false;
  showSearchOptions: boolean = false;
  searchResult: any[] = [];
  searchContHt:any = 40;
  _searchstr: any='';
  eventtime: any ='';
  code : any ='';
  selectallchairchk: boolean = false;


  today:any;
	currentWeek: any;
	startdt:any;
	enddt:any;
	dateCounter: any = 0;
	
	showPrevWeekBtn: boolean = false;
	showNextWeekBtn: boolean = true;
	month: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  timeslot_text: any = 'am';
  eventcodeArray: any[] = [
    {"code": "532", "label": "Meeting", "time": "15", "type": "event"},
	{"code": "533", "label": "Luncheon", "time": "30", "type": "event"},
	{"code": "534", "label": "Doctor Event", "time": "10", "type": "event"}
    
    ];

    chairArray: any []=[
        { chair_id: '1', chair_name: 'Exam', selected: false},
        { chair_id: '2', chair_name: '2', selected: false},
        { chair_id: '3', chair_name: '3', selected: false},
        { chair_id: '4', chair_name: '4', selected: false},
        { chair_id: '5', chair_name: '5', selected: false},
        { chair_id: '6', chair_name: '6', selected: false},
        { chair_id: '7', chair_name: '7', selected: false},
        { chair_id: '8', chair_name: '8', selected: false},
        { chair_id: '9', chair_name: '9', selected: false}

    ];

    officeArr: any[] = [{"office": "All Offices"}, {"office": "Salt lake city"}, {"office": "Lehi"}, {"office": "Provo"}];
    selectedOffice: any;
    showOfficeDd: boolean = false;
    filterOfficeArr: any[] = [];


    appntslot: any[] = [
		
      {location: 'Salt Lake City', slots: [
        {date:'3/17/2019', day: 'Sunday', timeslot: []},
        {date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}]},
        {date:'3/19/2019', day: 'Tuesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}, {time: '9:00am'}, {time: '2:30pm'}, {time: '4:00pm'}]},
        {date:'3/20/2019', day: 'Wednesday', timeslot: [{time: '12:30am'}, {time: '1:45pm'}]},
        {date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
        {date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}]},
        {date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'}]}
      ]},
      
      {location: 'Lehi', slots: [
        {date:'3/17/2019', day: 'Sunday', timeslot: []},
        {date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}, {time: '3:00pm'}]},
        {date:'3/20/2019', day: 'Tuesday', timeslot: [{time: '12:30am'}, {time: '1:45pm'}]},
        {date:'3/19/2019', day: 'Wednesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}, {time: '9:00am'}, {time: '2:30pm'}, {time: '4:00pm'}]},
        {date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
        {date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}, {time: '2:00pm'}]},
        {date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'},{time: '12:30am'}, {time: '1:45pm'}]}
      ]},
      
      {location: 'Provo', slots: [
        {date:'3/17/2019', day: 'Sunday', timeslot: []},
        {date:'3/18/2019', day: 'Monday', timeslot: [{time: '8:15am'}, {time: '4:00pm'}]},
        {date:'3/19/2019', day: 'Tuesday', timeslot: [{time: '7:30am'}, {time: '8:15am'}, {time: '8:45am'}]},
        {date:'3/20/2019', day: 'Wednesday', timeslot: [{time: '9:00am'}, {time: '12:30am'}, {time: '1:45pm'}, {time: '2:30pm'}, {time: '4:00pm'}]},
        {date:'3/21/2019', day: 'Thursday', timeslot: [{time: '9:00am'}, {time: '1:45pm'}, {time: '2:00pm'}]},
        {date:'3/22/2019', day: 'Friday', timeslot: [{time: '9:00am'}, {time: '2:30pm'}]},
        {date:'3/23/2019', day: 'Saturday', timeslot: [{time: '9:00am'}, {time: '12:30am'}, {time: '2:30pm'}]}
      ]}
    ];
    

    constructor(private dataService:MessageService) { }

  ngOnInit() {
    this.getCurrentWeek();
    this.selectedOffice = this.officeArr[0].office;
	  this.filterOffice();
  }

  changetimeslot(){
      if(this.timeslot_variable== false)
      {
        this.timeslot_text= 'pm';
        this.timeslot_variable = true;
      } else {
        this.timeslot_text= 'am';
        this.timeslot_variable = false
      }
  }

  createeventSearchList(_searchstr)
  {
    this._searchstr= _searchstr;
    this.eventtime='';
   
    if(_searchstr.length >= 1){
      this.searchResult = this.eventcodeArray.filter(item => {
          return item.code.toLowerCase().includes(_searchstr);
			});
      
      this.showSearchOptions = true;
      
      if(this.searchResult.length == 0){
        this.searchResult.push({"code": "", "label": "No event code found!"});
      }
    }else {

      this.showSearchOptions = false;
    }
    console.log(this.searchResult);

  }

  showallEventList(count_EventList)
  {
    if(count_EventList == true)
		{
			this.showSearchOptions = true;
			this.count_EventList= false;
		}else {
			this.showSearchOptions = false;
			this.count_EventList= true;
		}
	
		this.searchResult = this.eventcodeArray;
  }


  selecteventtime(eventtime,code)
  {
   this.eventtime= eventtime;
   this.count_EventList= true;
   this.showSearchOptions = false;
   this.code= code; 
  }

  selectchair(selectchairval){

     
      this.chairArray[selectchairval].selected = this.chairArray[selectchairval].selected==true ? false : true;

     // let _selectedMultiple = this.chairArray.filter(item => {return item.selected == true});
      //console.log( _selectedMultiple);

  }

  selectchairAll(selectchairalldataArray, selectallchairchk){
    this.chairArray= selectchairalldataArray;

    if(selectallchairchk==false)
    {
      this.chairArray.forEach(function(element) {
        element.selected= true;
      });
      this.selectallchairchk= true;
    }else {
      this.chairArray.forEach(function(element) {
        element.selected= false;
      });
      this.selectallchairchk= false;
    }
   
  }

  scheduled() {
		this.dataService.sendMessage('closemodal', {'modalname': 'createnewappnt'});
  }
  

  nextPrevWeek(dir){
		
		let strtdayString: any;
		let enddayString: any;
		
		if(dir == 'next'){
			this.dateCounter++;
			this.showPrevWeekBtn = true;
			this.startdt = new Date(this.enddt.getFullYear(), this.enddt.getMonth(), this.enddt.getDate() + 1)
			this.enddt.setDate(this.startdt.getDate() + 6);
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
  

  getCurrentWeek(){
    this.today = new Date();
    let dayNum: any = this.today.getDay();
    
    this.startdt = new Date();
    this.startdt.setDate(this.today.getDate() - dayNum);
    
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
    
    this.currentWeek = strtdayString + enddayString;
    }





    selectOffice() {
      this.showOfficeDd = this.showOfficeDd == true ? false : true;
    }
    
    selectOfficeOption(option){
      this.selectedOffice = option.office;
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
    }
	
	cancelModal() {
		this.backtoparent.emit('backtoparent');
	}

}
