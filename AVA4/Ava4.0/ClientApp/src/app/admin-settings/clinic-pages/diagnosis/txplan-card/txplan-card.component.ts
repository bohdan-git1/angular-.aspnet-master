import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-txplan-card',
  templateUrl: './txplan-card.component.html',
  styleUrls: ['./txplan-card.component.css']
})
export class TxplanCardComponent implements OnInit {
	
	@Input() boxHt:any;
	
	txPlanArr=[
	  {"title" : "Full Tx", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Paritial Tx", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Phase I Tx", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Appl Needed", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Appts Needed", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Est. Tx Time", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Recall", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Refer to TMJ", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Phase II Tx", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Addn’l Notes", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Extract Needed", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Empose Impacted Tooth", "selected": false, "clinical": "", "layman": ""},
	  {"title" : "Retention", "selected": false, "clinical": "", "layman": ""}
	];
	
	availableForDrop: boolean = false;
	dropdata: any = {};
	newCategory: any="";
	newElem: any="";
	newItem: any="";
	newClinical: any="";
	newLayman: any="";
	expandDropdown:boolean = false;
	expandDropdown_value: any = '315px';
	
  constructor() { }

  ngOnInit() {
  }
  
  addToList(type){
	
	if(type == 'item'){
		this.dropdata = {'elementType': type, 'label': this.newItem, 'clinic': this.newClinical, 'layman': this.newLayman};
	} else if(type == 'elem'){
		this.dropdata = {'elementType': type, 'label': this.newElem};
	} else {
		this.dropdata = {'elementType': type, 'label': this.newCategory};
	}
	
	if(this.newItem || this.newElem || this.newCategory){
		this.availableForDrop = true;
	}
	
  }
    
  expandDrpdn(evnt){
	if(evnt == true){
		this.expandDropdown_value = '750px';
	} else {
		this.expandDropdown_value = '315px';
	}
	
	this.expandDropdown = evnt;
  }
  
  exitEditMode(){
	//this.expandDrpdn(false);
  }
  
  updateList(evnt){
	
	let indx:any = evnt.indx;
	let subindx:any =  evnt.subindx;
	let optnindx:any = evnt.optnindx;
	let type: any = evnt.sectiontype;
	
	console.log(evnt, this.dropdata.elementType);
	
	if(type == "elem"){
		if(this.dropdata.elementType == "elem"){
			//this.txPlanArr[indx].ddoptions.splice(subindx, 0, {'title': this.dropdata.label, 'selected': false});
			this.availableForDrop = false;
		}
		
	} else if(type == "category"){
		if(this.dropdata.elementType == "category"){
			//this.txPlanArr.splice(indx, 0, {'title': this.dropdata.label, 'selected': false, 'ddoptions': []});
			this.availableForDrop = false;
		} else if(this.dropdata.elementType == "elem"){
			/*if(this.txPlanArr[indx].ddoptions.length == 0){
				this.txPlanArr[indx].ddoptions.push({'title': this.dropdata.label, 'selected': false});
				this.availableForDrop = false;
			}*/
		}
	}
	
  }
  
  addOptionItems() {
	if(this.dropdata.elementType == 'item'){
		this.dropdata.clinic = this.newClinical;
		this.dropdata.layman = this.newLayman;
	}
  }
  
  removefromlist(evnt){
	let indx:any = evnt.indx;
	this.txPlanArr.splice(indx, 1);
  }
  
  addnewEvent(evnt){
	
	if(evnt.indx != null && evnt.indx != undefined){
		this.txPlanArr[evnt.indx].title = evnt.data;
	} else {
		this.txPlanArr.push({'title': evnt.data, 'selected': false, 'clinical': '', 'layman': ''});
	}
  
	/*if(evnt.type == 'category'){
		if(evnt.indx != null && evnt.indx != undefined){
			this.diagnosisArr[evnt.indx].title = evnt.data;
		} else {
			this.diagnosisArr.push({'title': evnt.data, 'selected': false, 'ddoptions': []});
		}
	} else if(evnt.type == 'elem'){
		if(evnt.subindx != null && evnt.subindx != undefined){
			this.diagnosisArr[evnt.indx].ddoptions[evnt.subindx].title = evnt.data;
		} else {
			this.diagnosisArr[evnt.indx].ddoptions.push({'title': evnt.data, 'suboptn': []});
		}
	} else if(evnt.type == 'item'){
		if(evnt.optnindx != null && evnt.optnindx != undefined){
			this.diagnosisArr[evnt.indx].ddoptions[evnt.subindx].suboptn[evnt.optnindx].title = evnt.data;
		} else {
			this.diagnosisArr[evnt.indx].ddoptions[evnt.subindx].suboptn.push({'title': evnt.data, 'clinical': '', 'layman': ''});
		}
	}*/
	
  }

}
