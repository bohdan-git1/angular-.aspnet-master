import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from '../../../../core/message.service';


@Component({
  selector: 'app-create-procedure-event',
  templateUrl: './create-procedure-event.component.html',
  styleUrls: ['./create-procedure-event.component.css']
})
export class CreateProcedureEventComponent implements OnInit {

  @Input() selectedLocation: any;
  @Input() appntTime: any;
  @Input() procedurecode: any;

  @Output() showNewPatient = new EventEmitter();
  @Output() patientPopUpOpenForm = new EventEmitter();
  filterPatient: any[] = [];
  pateientSrch:boolean = false;
  pateient_selc_done: boolean = false;
  showThreeSection: boolean = false ;

	patient_data: any = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "SP", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "FA", "is_patient": true}, {"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "MO", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "SP", "is_patient": true}, {"id": 3, "firstname": "Lydia", "lastname": "Adams", "relation_type": "MO", "is_patient": true}], "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true}
		
  ];

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
	
  selectallchairchk: boolean = false;

  filterProcedure: any[] = [];
  selectedPatient: any = '';
  procedure_searchStr: any = '';
  procedure_selc_done: boolean = false;
  procedureSrch:boolean = false;
  selectedProcedure: any = {};
  count_ProcedureCode: boolean= true;
  selectedTime: any='09:00';
  timeUnit: any='am';
  alert ='If alert it will appear here.'

  
  appointmentNotificationsArray : any[]=  [
    { name: '(MO) Clarissa Marcum', phone: '360-606-4385', email: 'Clarrissa@earthlink.net', selected: false},
    { name: '(PA) Janer Marcum', phone: '360-606-4385', email: 'Clarrissa@earthlink.net' , selected: false},
    { name: '(FA) Peter Goslin', phone: '360-606-4385', email: 'PeterG@yahoo.com',  selected: false},
   
  ];
  constructor(private dataService:MessageService) { }

  ngOnInit() {
    this.getFormattedTime(this.appntTime);
	this.getProcedureCode();
  }

  checkNameRadioButton(index)
  {
    //alert(index);
      this.appointmentNotificationsArray[index].selected=true;
  }
  getFormattedTime(_time) {
		let hr: any = _time.split(':')[0];
		let min: any = _time.split(':')[1];
		
	
		
		if(hr >= 12 && min > 0){
			this.timeUnit = 'pm';
		} else {
			this.timeUnit = 'am';
		}
		
		if(hr > 12){
			this.selectedTime = `0${hr - 12}:${min}`;
		} else {
			this.selectedTime = `${_time}`;
		}
	
	
  }
  

  changeTimeUnit()
  {
    this.timeUnit= this.timeUnit=='am' ? 'pm' : 'am';
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
      this.showThreeSection= false;
      //console.log(this.filterPatient.length );
    }
    
    }

    SelectAllPatient()
    {
      this.filterPatient=this.patient_data;
      this.pateientSrch = true;
    }

    selectPatient(patientitem){
      this.pateientSrch = false;
      this.pateient_selc_done = true;
      this.selectedPatient = `${patientitem.firstname} ${patientitem.lastname}`;
      this.showThreeSection= true;
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

      showAllEventProcedure()
      {
        this.procedureSrch = true;
        this.filterProcedure = this.procedureArr.filter(item => {
           if (item.type=='event')
          {
            return true;
          }
        });
        //console.log(this.filterProcedure);
      }

      showAllProcedureWithNoevent()
      {
        this.procedureSrch = true;
        this.filterProcedure = this.procedureArr.filter(item => {
           if (item.type!='event')
          {
            return true;
          }
        });
        //console.log(this.filterProcedure);
      }


      selectProcedureCode(procedureitem){
        this.procedureSrch = false;
        this.count_ProcedureCode= true;
        this.procedure_searchStr = procedureitem.code+'- '+ procedureitem.label;
        this.selectedProcedure = procedureitem;
        this.procedure_selc_done = true;
        }

    showNewPatientSection() {
      //alert();
      this.showNewPatient.emit('showNewPatientsection');
      this.patientPopUpOpenForm.emit('emptyCell');
      }


    selectchair(selectchairval){
        this.chairArray[selectchairval].selected = this.chairArray[selectchairval].selected==true ? false : true;
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

  cancelModal() {
		this.dataService.sendMessage('closemodal', {'modalname': 'createnewappnt'});
	}
	
	getProcedureCode(){
		if(this.procedurecode != '' && this.procedurecode != undefined){
			let indx: any = this.procedureArr.findIndex(item => {
				return item.code == this.procedurecode
			})
			
			this.procedure_searchStr = this.procedureArr[indx].code+'- '+ this.procedureArr[indx].label;
			this.selectedProcedure = this.procedureArr[indx];
			
			console.log(this.procedure_searchStr);
		}
	}

}
