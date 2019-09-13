import { Component, OnInit, Input, Inject, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import {MessageService} from '../../core/message.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

	@Input() placeholder: any;
	@Input() optionsArr: any[] = [];
	@Input() zoomable: boolean = false;
	@Output() selectedSection = new EventEmitter();
	
	showList:boolean = false;
	dd_id: any;
	subscription:Subscription;
	selectedOption: any;
	listData:any[] = [];

  constructor(public searchboxDD: MatDialog, private dataService:MessageService) { }

  ngOnInit() {
	
	this.initializeDropdown();
	
	this.subscription = this.dataService.getMessage().subscribe(message => {
		if(message.event == 'dropdownstate'){
			if(this.dd_id != message.data.dd_id){
				this.showList = false;
			}
		}
	});
	
  }
  
  initializeDropdown() {
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
  }
  
  showddoptions(){
	this.listData = JSON.parse(JSON.stringify(this.optionsArr));
	this.showList = this.showList == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showList});
  }
  
  selectDDOption(grpindx, itemindx){
	this.selectedSection.emit({grpindx:grpindx, itemindx:itemindx});
	this.showList = false;
	
  }
  
  searchFromList(evt){
	let searchCriteria: any = evt.target.value;
	
	if(searchCriteria.length > 1){
	
		this.listData = this.optionsArr.filter(grp => {
			return grp.grp_options.some(item => {
				return item.optns.toLowerCase().includes(searchCriteria)
				
			})
		});
		
		this.showList = true;
	} else {
		this.showList = false;
	}
	
	
  }
  
  openDropdown(evt: MouseEvent) {
		const target = new ElementRef(evt.currentTarget);
			let dialog_config: any = {data: { trigger: target, dataArr: this.optionsArr, zoomable: this.zoomable}, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'searchboxClass'};

			const dialogRef = this.searchboxDD.open(SearchboxDD, dialog_config);
			
			dialogRef.afterClosed().subscribe( _res => {
				if(_res != undefined){
					//console.log(_res)
					
				}
			});
	}

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class SearchboxDD implements OnInit {
  private readonly _matDialogRef: MatDialogRef<SearchboxDD>;
  private readonly triggerElementRef: ElementRef;
  
  optionsArr:any[];
  zoomviewport: any = 1;
  zoomable:boolean;
  
  constructor(_matDialogRef: MatDialogRef<SearchboxDD>, @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, dataArr: any, zoomable: boolean}) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	this.zoomable = data.zoomable;
	
	this.optionsArr = data.dataArr;
	
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
	
	if(this.zoomable == true){
		if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
			this.zoomviewport = Number(window.localStorage.getItem('zoomview'))/100;
		}
	} else {
		this.zoomviewport = 1;
	}
			
	matDialogConfig.position = { left: `${(rect.left) + (rect.width - 360)}px`, top: `${rect.bottom + 10*this.zoomviewport}px` };
    
    matDialogConfig.width = '360px';
    matDialogConfig.height = '500px';
	
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
}
