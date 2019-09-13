import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-patientmodaldd',
  templateUrl: './patientmodaldd.component.html',
  styleUrls: ['./patientmodaldd.component.css']
})
export class PatientmodalddComponent implements OnInit {

	showdd:boolean = false;
	@Input() ddplaceholder: any;
	@Input() ddoptionsArr: any[];
	@Input() multiple: boolean;
	@Input() sel_type:any;

	@Output() location_filterArray = new EventEmitter();
	@Output() doctor_filterArray = new EventEmitter();
	

	
	_ddoptionsArr:any[];
	_ddplaceholder: any;
	dd_id: any;
	subscription:Subscription;
	
  constructor(private dataService:MessageService) { }

  ngOnInit() {
	//this.selectOption(0);
	
	this.initializeDropdown();
	
	this.subscription = this.dataService.getMessage().subscribe(message => {
		if(message.event == 'dropdownstate'){
			if(this.dd_id != message.data.dd_id){
				this.showdd = false;
			}
		}
	});


	// if(this.sel_type=="locDoc"){
	// 	if(this.ddplaceholder!="all" && this.multiple==false){
	// 		this.doctor_filterArray.emit(this.ddplaceholder);
	// 	}
	// 	else if(this.ddplaceholder!="all" && this.multiple==true){
	// 		this.location_filterArray.emit(this.ddplaceholder)
	// 	}
	// }
	
  }
  
  initializeDropdown() {
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
	this._ddoptionsArr = JSON.parse(JSON.stringify(this.ddoptionsArr));
	this._ddplaceholder = this.ddplaceholder;
  }
  
  showddoptions(){
	this.showdd = this.showdd == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showdd});
  }
  
  selectOption(indx){
	let filterdata = [];
	if(this.multiple == true){
		this._ddoptionsArr[indx].selected = this._ddoptionsArr[indx].selected==true ? false : true;
		let _selectedMultiple = this._ddoptionsArr.filter(item => {return item.selected == true});
		
		if(_selectedMultiple.length == 0){
			this.ddplaceholder = this._ddplaceholder;
		} else if(_selectedMultiple.length == 1){
			this.ddplaceholder = _selectedMultiple[0].label;
		} else {
			if(_selectedMultiple.length==this.ddoptionsArr.length){
				this.ddplaceholder='all';
			}
			else{
				this.ddplaceholder = `${_selectedMultiple.length}`;
			}
		}
			if(_selectedMultiple.length > 0){
				for(var i=0; i<_selectedMultiple.length ; i++)
				{
					filterdata.push( _selectedMultiple[i].label);
				}
			}
			this.location_filterArray.emit(filterdata);
	} else {
		this._ddoptionsArr.map(item => {
			item.selected = false;
		});
		
		this.ddplaceholder = this.ddoptionsArr[indx].label;
		this.doctor_filterArray.emit(this.ddplaceholder);
		this._ddoptionsArr[indx].selected = true;
		this.showdd = false;
	}
  }
  
  onClickedOutside() {
	this.showdd = false;
  }

}
