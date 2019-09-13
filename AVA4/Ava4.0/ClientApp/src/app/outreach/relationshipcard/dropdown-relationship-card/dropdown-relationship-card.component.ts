import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../core/message.service';


@Component({
  selector: 'app-dropdown-relationship-card',
  templateUrl: './dropdown-relationship-card.component.html',
  styleUrls: ['./dropdown-relationship-card.component.css']
})
export class DropdownRelationshipCardComponent implements OnInit {

	@Input() options: any;
	@Input() labal: any;
	@Output() relationShipItem = new EventEmitter();


	showdd:boolean = false;
	dd_id: any;
	subscription:Subscription;

	_ddoptionsArr:any[] = [];
	@Input() ddplaceholder: any;
	
  constructor(private dataService:MessageService) { }

  ngOnInit() {
	this.initializeDropdown();

  }
  initializeDropdown() {
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
	this._ddoptionsArr = JSON.parse(JSON.stringify(this.options));
	
	this._ddoptionsArr.map(item => {
		item.selected = false;
	})
	
	
  }


  
  
  showddoptions(){
	this.showdd = this.showdd == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showdd});
  }
  
 
  
  selectDdOption(indx){
	this._ddoptionsArr.map(item => {
		item.selected = false;
	});
	
	this.ddplaceholder = this._ddoptionsArr[indx].option;
	this._ddoptionsArr[indx].selected = true;
	this.showdd = false;

	this.relationShipItem.emit(this.ddplaceholder);
  }
  
  onClickedOutside() {
	this.showdd = false;
  }

}
