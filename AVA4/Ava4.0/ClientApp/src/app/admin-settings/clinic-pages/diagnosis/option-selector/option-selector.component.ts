import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent implements OnInit {
	
	@ViewChild('goalboxScroll') goalboxScroll: PerfectScrollbarComponent;
	
	@Input() compData:any[];
	@Input() dropdata: any;
	@Input() goalOptns: any;
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
	
	changeItem:boolean = false;
	editBtnClicked:boolean = false;
	
	showRemoveAlert:boolean = false;
	removeitem: any = {};
	
	showgoalDrpdnOptn:boolean = false;
	selectedGoalOptn: any = '';
	newGoalOptn: any = '';
	
  constructor() { }

  ngOnInit() {
	this.initializeData();
  }
  
  initializeData(){
	
	this.compData.map(dditem => {
		dditem['opendrpdn'] = false;
		dditem.ddoptions.map(suboptn => {
			suboptn['opensubdrpdn'] = false;
			suboptn['selectedOptn'] = '';
			
			suboptn.selected = false;
			
			suboptn.suboptn.map(subitem => {
				subitem.selected = false;
				subitem.goaladded = false;
			})
		})
	});
  }
  
  toogleDropdown(sel_indx) {
	
	this.compData.map((dditem, indx) => {
		if(indx != sel_indx){
			dditem['opendrpdn'] = false;
			dditem.ddoptions.map(suboptn => {
				suboptn['opensubdrpdn'] = false;
			})
		}
	});
	
	this.compData[sel_indx]['opendrpdn'] = this.compData[sel_indx]['opendrpdn'] == true ? false : true;
	
	/*if(this.dropdnExpanded && this.compData[sel_indx]['opendrpdn'] == true){
		this.expandDrpdn.emit(true);
	} else {
		this.expandDrpdn.emit(false);
	}*/
	
  }
  
  toggleSubdrpndn(sel_indx, subdrpdn) {
	this.compData[sel_indx].ddoptions.map((suboptn, suboptnindx) => {
		if(suboptn.suboptn.length > 0){
			if(suboptnindx != subdrpdn){
				suboptn['opensubdrpdn'] = false;
				suboptn.selected = false;
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
			item.editmode = false;
			this.showClinicLayman_block = false;
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
  
  removeItem(type, indx, subindx, optnindx) {
	this.removeitem = {type, indx, subindx, optnindx};
	this.showRemoveAlert = true;
	
  }
  
  removeItemConfirmation(){
	this.removefromlist.emit(this.removeitem);
	this.dropdnExpanded = false;
	this.expandDrpdn.emit(false);
	this.showRemoveAlert = false;
  }
  
  closeAlert() {
	this.showRemoveAlert = false;
  }
  
  addNew(type, _indx, _subindx) {
	let data: any;
	let indx: any = _indx;
	let subindx: any = _subindx;
	if(type == 'item'){
		data = this.newItem
	} else if(type == 'elem'){
		data = this.newElem
	} else {
		data = this.newCategory
	}
	
	this.addnewEvent.emit({type, data, indx, subindx});
  }
  
  preventDblClickSelection(event){
	 if (event.detail > 1) event.preventDefault();
  }
  
  
  updateItem(evnt, type, indx, subindx, optnindx){
	
	let data: any = evnt.target.value;
	
	if(data != ''){
		this.addnewEvent.emit({type, data, indx, subindx, optnindx});
	}
	
	this.changeItem = false;
	
	/*if(type == 'category') {
		this.changeItem = false;
		//this.compData[indx].editmode = false;
	} else if(type == 'elem') {
		this.changeItem = false;
		//this.compData[indx].ddoptions[subindx].editmode = false;
	} else if(type == 'item'){
		this.compData[indx].ddoptions[subindx].suboptn.map(item => {
			item.selected = false;
		});
		
		
		this.dropdnExpanded = false;
		this.expandDrpdn.emit(false);
		
		//this.changeItem = false;
	}*/
	
	
  }
  
  enableEditMode(type, indx, subindx, optnindx){
	if(type == 'category'){
		this.compData.map((ddoption, _indx) => {
			if(_indx != indx){
				ddoption.editmode = false;
			}
		});
		
		if(!this.changeItem){
			this.compData[indx].editmode = this.compData[indx].editmode == true ? false : true;
		} else {
			this.changeItem = false;
		}
	} else if(type == 'elem'){
		this.compData[indx].ddoptions.map((item, _subindx) => {
			if(_subindx != subindx){
				item.editmode = false;
			}
		});
		
		if(!this.changeItem){
			this.compData[indx].ddoptions[subindx].editmode = this.compData[indx].ddoptions[subindx].editmode == true ? false : true;
		} else {
			this.changeItem = false;
			this.compData[indx].ddoptions[subindx].editmode = false;
		}
		
		this.editBtnClicked = this.compData[indx].ddoptions[subindx].editmode;
		
	} else if(type == 'item'){
	
		this.compData[indx].ddoptions[subindx].suboptn.map((item, _optnindx) => {
			if(_optnindx != optnindx){
				item.editmode = false;
			}
		});
		
		this.compData[indx].ddoptions[subindx].suboptn[optnindx].editmode = this.compData[indx].ddoptions[subindx].suboptn[optnindx].editmode == true ? false : true;
		
		
		this.dropdnExpanded = this.compData[indx].ddoptions[subindx].suboptn[optnindx].editmode;
		this.expandDrpdn.emit(this.compData[indx].ddoptions[subindx].suboptn[optnindx].editmode);
		
		let getSuboptnSlct: any[] = this.compData[indx].ddoptions[subindx].suboptn.filter(item => {
			return item.editmode == true;
		});
		
		if(getSuboptnSlct.length > 0){
			this.showClinicLayman_block = true;
		} else {
			this.showClinicLayman_block = false;
		}
	}
  }
	
	setEditMode(){
		this.changeItem = true;
	}
	
	selectGoalOptn(indx){
		this.selectedGoalOptn = this.goalOptns[indx].label;
		
		this.goalOptns.map(item => {
			item.selected = false;
		})
		this.goalOptns[indx].selected = true;
		
		this.showgoalDrpdnOptn = false;
	}
	
	addNewGoal(){
		if(this.newGoalOptn){
			this.goalOptns.push({"label": this.newGoalOptn, 'selected': false, 'edit_mode': false});
			this.newGoalOptn = '';
			setTimeout(() => {
				this.goalboxScroll.directiveRef.scrollToBottom(0, 300);
			}, 500);
		}
		
	}
	
	addTerminology(indx, subindx, optnindx){
		
		let item: any = this.compData[indx].ddoptions[subindx].suboptn[optnindx];
		
		if(item.clinical && item.layman){
			item.editmode = false;
			item.selected = false;
			this.dropdnExpanded = false;
			this.expandDrpdn.emit(false);
		}
		
	}
	
	exitEditMode(){
		this.compData.map(frst =>{
			frst.editmode = false;
			frst.selected = false;
			frst.ddoptions.map(scnd => {
				scnd.editmode = false;
				scnd.selected = false;
				scnd.suboptn.map(thrd =>{
					thrd.editmode = false;
					thrd.selected = false;
				})
			})
		})
		this.showClinicLayman_block = false;
		this.dropdnExpanded = false;
		this.expandDrpdn.emit(false);
	}

}
