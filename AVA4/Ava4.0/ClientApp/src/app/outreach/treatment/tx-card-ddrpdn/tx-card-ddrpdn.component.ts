import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-tx-card-ddrpdn',
  templateUrl: './tx-card-ddrpdn.component.html',
  styleUrls: ['./tx-card-ddrpdn.component.css']
})
export class TxCardDdrpdnComponent implements OnInit {
	
	@Input() drpdnData: any;
	@Input() ratingIcon:boolean;
	@Input() height: any;
	@Output() selectedOptn = new EventEmitter();
	@Input() showdropdownIcon: any;
	
	
	_drpdnData: any;
	_ratingIcon: boolean = false;
	_height: any;
	
	showOption: boolean = false;
	selectedOption: any = 'List';
	
	dd_id: any;
	subscription:Subscription;
	
  constructor(private dataService:MessageService) { }

  ngOnInit() {

	if(this.showdropdownIcon==1)
	{
		this.selectedOption='';
	}
	this.initializeDrpdn();
	this.subscription = this.dataService.getMessage().subscribe(message => {
		if(message.event == 'dropdownstate'){
			if(this.dd_id != message.data.dd_id){
				this.showOption = false;
			}
		}
	});
  }
  
  initializeDrpdn(){
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
	this._drpdnData = JSON.parse(JSON.stringify(this.drpdnData));
	if(this.ratingIcon){
		this._ratingIcon = this.ratingIcon;
		//this.selectDrpDnOption(0);
	}
	
	if(this.height) {
		this._height = this.height + 'px';
	} else {
		this._height = 'auto';
	}
	this._drpdnData.map(item => {
		item.selected = false;
	});
  }
  
  openDrpDn(){
	this.showOption = this.showOption == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showOption});
  }
  
  selectDrpDnOption(indx){
	this._drpdnData.map(item => {
		item.selected = false;
	});
	
	this._drpdnData[indx].selected=true;
	this.selectedOption = this._drpdnData[indx].label;
	//alert(this.selectedOption);
	this.showOption = false;
	
	this.selectedOptn.emit(this.selectedOption);
  }
  
  onClickedOutside(){
	this.showOption = false;
  }

}
