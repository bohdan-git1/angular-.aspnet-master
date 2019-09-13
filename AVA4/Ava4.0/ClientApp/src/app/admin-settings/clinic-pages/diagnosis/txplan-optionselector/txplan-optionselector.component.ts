import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-txplan-optionselector',
  templateUrl: './txplan-optionselector.component.html',
  styleUrls: ['./txplan-optionselector.component.css']
})
export class TxplanOptionselectorComponent implements OnInit {
	
	@Input() compData:any[];
	@Input() dropdata: any;
	@Output() expandDrpdn = new EventEmitter();
	@Output() dropon = new EventEmitter();
	@Output() removefromlist = new EventEmitter();
	@Output() addnewEvent = new EventEmitter();
	
	showClinicLayman_block: boolean = false;
	charLimit: any = 25;
	
	dropdnExpanded: boolean = false;
	
	newCategory: any="";
	newElem: any="";
	newItem: any="";
	newClinical: any="";
	newLayman: any="";
	
	editedCategory: any = {};
	
	changeItem:boolean = false;
	editBtnClicked:boolean = false;
	
  constructor() { }
  
  ngOnInit() {
	this.initializeData();
  }

  initializeData(){
	
	this.compData.map(dditem => {
		dditem['opendrpdn'] = false;
		dditem['editmode'] = false;
	});
  }
  
  toogleDropdown(sel_indx) {
	
	this.compData.map((dditem, indx) => {
		if(indx != sel_indx){
			dditem.opendrpdn = false;
			dditem.editmode = false;
		}
	});
	
	this.compData[sel_indx]['opendrpdn'] = this.compData[sel_indx]['opendrpdn'] == true ? false : true;
  }
  
  enableEditMode(indx){
	this.compData.map((ddoption, _indx) => {
		if(_indx != indx){
			ddoption.editmode = false;
			ddoption.opendrpdn = false;
		}
	});
	
	this.compData[indx].editmode = this.compData[indx].editmode == true ? false : true;
	
	if(this.changeItem){
		this.changeItem = false;
		this.addnewEvent.emit(this.editedCategory);
	}
	
	this.expandDrpdn.emit(this.compData[indx].editmode);
  }
  
  addNew() {
	if(this.newCategory){
		let data: any = this.newCategory;
		this.addnewEvent.emit({data});
	}
  }
  
  
  removeItem(indx) {
	let removeitem: any = {indx}
	this.removefromlist.emit(removeitem);
	this.dropdnExpanded = false;
	this.expandDrpdn.emit(false);
  }
  
  updateItem(evnt, indx){
	let data: any = evnt.target.value;
	this.editedCategory = {data, indx};
	this.changeItem = true;
  }
  
  addTerminology(dataItem){
	if(dataItem.clinical && dataItem.layman){
		dataItem.editmode = false;
		dataItem.opendrpdn = false;
		this.dropdnExpanded = false;
		this.expandDrpdn.emit(false);
	}
  }
  
  
  
  /* ------------ need to remove later --------- */
  
  toggleSubdrpndn(sel_indx, subdrpdn) {
	this.compData[sel_indx].ddoptions.map((suboptn, suboptnindx) => {
		if(suboptn.suboptn.length > 0){
			if(suboptnindx != subdrpdn){
				suboptn['opensubdrpdn'] = false;
			}
		}
	});
	
	this.compData[sel_indx].ddoptions[subdrpdn]['opensubdrpdn'] = this.compData[sel_indx].ddoptions[subdrpdn]['opensubdrpdn'] == true ? false : true;
	
	let suboptn: any = this.compData[sel_indx].ddoptions[subdrpdn].suboptn;
	
	if(suboptn.length > 0){
		//this.compData[sel_indx].ddoptions[subdrpdn]['selected'] = suboptnSelected;
	} else {
		this.compData[sel_indx].ddoptions[subdrpdn]['selected'] = this.compData[sel_indx].ddoptions[subdrpdn]['selected']==true ? false : true;
	}
	
	/*this.dropdnExpanded = this.compData[sel_indx].ddoptions[subdrpdn]['opensubdrpdn'];
	this.expandDrpdn.emit(this.compData[sel_indx].ddoptions[subdrpdn]['opensubdrpdn']);*/
	
  }
  
  selectedOptn(sel_indx, subdrpdn, optnindx) {
	this.compData[sel_indx].ddoptions[subdrpdn].suboptn.map((item, indx) => {
		if(indx != optnindx && item.selected){
			item.selected = false;
		}
	})
	
	let suboptnSelected: any = false;
	let suboptn: any = this.compData[sel_indx].ddoptions[subdrpdn].suboptn;
	
	this.compData[sel_indx].ddoptions[subdrpdn]['selectedOptn'] = this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].title;
	
	this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected = this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected == true ? false : true;
	
	
	if(suboptn.length > 0){
		for(let i=0; i<suboptn.length; i++){
			if(suboptn[i].selected == true){
				suboptnSelected = true;
				break;
			}
		}
		
		this.compData[sel_indx].ddoptions[subdrpdn]['selected'] = suboptnSelected;
	}
	
	this.dropdnExpanded = this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected;
	this.expandDrpdn.emit(this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected);
	
	let getSuboptnSlct: any[] = this.compData[sel_indx].ddoptions[subdrpdn].suboptn.filter(item => {
		return item.selected == true;
	});
	
	if(getSuboptnSlct.length > 0){
		this.showClinicLayman_block = true;
		
		
	} else {
		this.showClinicLayman_block = false;
	}
  }
  
  goalSelected(sel_indx, subdrpdn, optnindx) {
	this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].goaladded = this.compData[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].goaladded == true ? false : true;
  }
  
  dropevent(evt, indx, subindx, optnindx, sectiontype){
	console.log("item", indx, subindx, optnindx, sectiontype);
	let itempos: any = {indx, subindx, optnindx, sectiontype};
	this.dropon.emit(itempos);
  }
  
  dropToElement(evt,  indx, subindx, sectiontype){
	let itempos: any = {indx, subindx, sectiontype};
	this.dropon.emit(itempos);
  }
  
  dropToCategory(evt, indx, sectiontype) {
	console.log("category", indx);
	let itempos: any = {indx, sectiontype};
	this.dropon.emit(itempos);
  }
  

  preventDblClickSelection(event){
	 if (event.detail > 1) event.preventDefault();
  }
	
	setEditMode(){
		this.changeItem = true;
	}
	
	exitEditMode(){
		this.compData.map(frst =>{
			frst.editmode = false;
			frst.selected = false;
			frst.opendrpdn = false;
		})
		this.showClinicLayman_block = false;
		this.dropdnExpanded = false;
		this.expandDrpdn.emit(false);
	}
}
