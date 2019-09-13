import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-patientmodaldd-profile',
  templateUrl: './patientmodaldd-profile.component.html',
  styleUrls: ['./patientmodaldd-profile.component.css']
})
export class PatientmodalddProfileComponent implements OnInit {

  showdd:boolean = false;
	@Input() ddplaceholder: any;
	@Input() ddoptionsArr: any[];
	@Input() multiple: boolean;
	
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
	if(this.multiple == true){
		this._ddoptionsArr[indx].selected = this._ddoptionsArr[indx].selected==true ? false : true;
		let _selectedMultiple = this._ddoptionsArr.filter(item => {return item.selected == true});
		
		if(_selectedMultiple.length == 0){
			this.ddplaceholder = this._ddplaceholder;
		} else if(_selectedMultiple.length == 1){
			this.ddplaceholder = _selectedMultiple[0].label;
		} else {
			this.ddplaceholder = `${_selectedMultiple.length} ${this._ddplaceholder}`;
		}
		
	} else {
		this._ddoptionsArr.map(item => {
			item.selected = false;
		});
		
		this.ddplaceholder = this.ddoptionsArr[indx].label;
		this._ddoptionsArr[indx].selected = true;
		this.showdd = false;
	}
  }
  
  onClickedOutside() {
	this.showdd = false;
  }

}
