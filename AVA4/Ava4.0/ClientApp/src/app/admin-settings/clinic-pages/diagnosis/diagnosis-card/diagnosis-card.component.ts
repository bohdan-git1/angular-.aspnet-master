import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagnosis-card',
  templateUrl: './diagnosis-card.component.html',
  styleUrls: ['./diagnosis-card.component.css']
})
export class DiagnosisCardComponent implements OnInit {
	
	@Input() boxHt: any;
	
	diagnosisArr: any [] = [
		{'title': 'Chief Concerns', 'selected': false, 'ddoptions': [
			{'title': 'Concerns', 'suboptn': [
				{'title': 'Crowding', 'clinical': 'Crowding', 'layman': 'Crowding'},
				{'title': 'Crookedness', 'clinical': 'Crookedness', 'layman': 'Crookedness'},
				{'title': 'Overbite', 'clinical': 'Overbite', 'layman': 'Overbite'},
				{'title': 'Overjet', 'clinical': 'Overjet', 'layman': 'Overjet'},
				{'title': 'Teeth Stick Out', 'clinical': 'Teeth Stick Out', 'layman': 'Teeth Stick Out'},
				{'title': 'TMJ Symptoms', 'clinical': 'TMJ Symptoms', 'layman': 'TMJ Symptoms'},
				{'title': 'Crossbite', 'clinical': 'Crossbite', 'layman': 'Crossbite'},
				{'title': 'Bite Off'},
				{'title': 'Openbite'},
				{'title': 'Thumb/Finger Habit'},
				{'title': 'Missing Teeth'},
				{'title': 'Extra Teeth'},
				{'title': 'Wear on teeth'},
				{'title': '2nd Opinion'},
				{'title': 'Impacted'},
				{'title': 'Spaces'},
				{'title': 'Clenching & Grinding'},
				{'title': 'Underbite'},
				{'title': 'Speech'}
			]}
		]},
		
		{'title': 'Profile', 'selected': false, 'ddoptions': [
			{'title': 'Straight Profile', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Full Profile', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Recessive Lower Jaw', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Prognathic Lower Jaw', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Convex', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Concave', 'suboptn': [{'title': 'Option'}]},
		]},
		
		{'title': 'Frontal', 'selected': false, 'ddoptions': [
			{'title': 'Option', 'suboptn': [{'title': 'Option'}]},
		]},
		{'title': 'Vertical', 'selected': false, 'ddoptions': [
			{'title': 'Option', 'suboptn': [{'title': 'Option'}]},
		]},
		{'title': 'Dental', 'selected': false, 'ddoptions': [
			{'title': 'Ankylosed Teeth', 'suboptn': [
				{'title': 'Ankylosed'}
			]},
			{'title': 'Constricted Arches', 'suboptn': [
				{'title': 'Constricted Upper & Lower Arches'},
				{'title': 'Constricted Upper Arch'},
				{'title': 'Constricted Lower Arch'},
				{'title': 'Anterior 1 tooth'},
				{'title': 'Posterior Right'},
				{'title': 'Posterior Left'},
				{'title': 'Anterior Partial'}
			]},
			{'title': 'Crossbite', 'suboptn': [
				{'title': 'Posterior Bilateral'},
				{'title': 'Posterior R'},
				{'title': 'Posterior L'},
				{'title': 'Anterior Complete'},
				{'title': 'Anterior 1 Tooth'},
				{'title': 'Anterior Partial'},
				{'title': 'Lateral R'},
				{'title': 'Lateral L'},
				{'title': 'Scissors Bilateral'},
				{'title': 'Scissors R'},
				{'title': 'Scissors L'}
			]},
			{'title': 'Crowding', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'}
			]},
			{'title': 'Dental Class', 'suboptn': [
				{'title': 'Class I'},
				{'title': 'Class II'},
				{'title': 'Class III'},
				{'title': 'Supra Cl I'},
				{'title': 'Class II right'},
				{'title': 'Class II left'},
				{'title': 'Class III right'},
				{'title': 'End to end cuspid'},
				{'title': 'ETE Molar/Cuspid'},
				{'title': 'Supra Cl I Right'},
				{'title': 'Supra Cl I Left'}
			]},
			{'title': 'Impacted Teeth', 'suboptn': [
				{'title': 'Impacted'}
			]},
			{'title': 'Midlines', 'suboptn': [
				{'title': 'Upper Midline To The Right'},
				{'title': 'Upper Midline To The Left'},
				{'title': 'Lower Midline To The Right'},
				{'title': 'Lower Midline To The Left'},
				{'title': 'Midlines are Okay'},
				{'title': 'Overbite'}
			]},
			{'title': 'Missing Teeth', 'suboptn': [
				{'title': 'Missing Permanent'},
			]},
			{'title': 'Openbite', 'suboptn': [
				{'title': 'Anterior'},
				{'title': 'Posterior R'},
				{'title': 'Posterior L'},
				{'title': 'Posterior Bilateral'},
				{'title': 'Lateral R'},
				{'title': 'Lateral L'}
			]},
			{'title': 'Overjet', 'suboptn': [
				{'title': 'Mild'},
				{'title': 'Moderate'},
				{'title': 'Severe'},
				{'title': 'ETE'},
				{'title': 'ETE w/ shift'},
				{'title': 'Minimal'},
				{'title': 'Dental Protrusion'}
			]},
			{'title': 'Rotations', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'}
			]},
			{'title': 'Wear on teeth', 'suboptn': [
				{'title': 'Slight & Localized'},
				{'title': 'Moderate & Localized'},
				{'title': 'Severe & Localized'},
				{'title': 'Slight & Generalized'},
				{'title': 'Moderate & Generalized'},
				{'title': 'Severe & Generalized'}
			]},
			{'title': 'Small U Laterals', 'suboptn': [
				{'title': 'U Right & Left'},
				{'title': 'U Right'},
				{'title': 'U Left'},
				{'title': 'Bond Peg Laterals'},
				{'title': 'Small Maxillary Incisors'},
				{'title': 'Small sized Mandibular Incisors'},
				{'title': 'Post Tx Resto'}
			]},
			{'title': 'Spacing', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'},
				{'title': 'Diastema'},
				{'title': 'Diastema with Freunum Involvement'}
			]},
		]},
		{'title': 'Perio', 'selected': false,  'ddoptions': [
			{'title': 'Amount of Gum Showing', 'suboptn': [
				{'title': 'Deficient'},
				{'title': 'Excessive'},
				{'title': 'Moderate'}
			]},
			{'title': 'Gingiva', 'suboptn': [
				{'title': 'Recession - #’s'},
				{'title': 'Inflamed'},
				{'title': 'Swollen'},
				{'title': 'Generalized Recession'}
			]}
		]},
		{'title': 'Intra Oral', 'selected': false, 'ddoptions': [
			{'title': 'Straight Profile', 'suboptn': [{'title': 'Option'}]},
		]},
		{'title': 'TMJ', 'selected': false, 'ddoptions': [
			{'title': 'Clicking', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Noisy', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Painful', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Locking', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Sore Muscles', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Deviated Path of Opening', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Headaches', 'suboptn': [{'title': 'Option'}]},
			{'title': 'Popping', 'suboptn': [{'title': 'Option'}]}
		]},
		{'title': 'Other', 'selected': false, 'ddoptions': [
			{'title': 'Breathing', 'suboptn': [
				{'title': 'Mouth'}
			]},
			{'title': 'Clenching', 'suboptn': [
				{'title': 'Clenching'},
				{'title': 'No Clenching'}
			]},
			{'title': 'Grinding', 'suboptn': [
				{'title': 'Night Time Grinding'},
				{'title': 'No Grinding'}
			]},
			{'title': 'Habits', 'suboptn': [
				{'title': 'Thumb'},
				{'title': 'Finger'},
				{'title': 'Tongue Thrust Swallow'},
				{'title': 'Poor Tongue Posture'},
			]},
			{'title': 'Supernumerary Teeth', 'suboptn': [
				{'title': 'Supernumerary'}
			]},
		]},
	];
	
	goalsPlanArr=[
	  {"label" : "Expansion", "selected": false, "edit_mode": false  },
	  {"label" : "Jaw Growth" , "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Asymmetry", "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Crowding" , "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Rotations", "selected": false, "edit_mode": false},
	  {"label" : "Tooth Extractions", "selected": false, "edit_mode": false},
	  {"label" : "Close Space", "selected": false, "edit_mode": false},
	  {"label" : "Stabilize Bite", "selected": false, "edit_mode": false},
	  {"label" : "Correct Following", "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Habit" , "selected": false, "edit_mode": false},
	  {"label" : "Addn’l Tx Goals", "selected": false, "edit_mode": false},
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
  
  /*addToList(type){
	
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
	
  }*/
    
  expandDrpdn(evnt){
	if(evnt == true){
		this.expandDropdown_value = '750px';
	} else {
		this.expandDropdown_value = '315px';
	}
	
	this.expandDropdown = evnt;
  }
  
  updateList(evnt){
	
	let indx:any = evnt.indx;
	let subindx:any =  evnt.subindx;
	let optnindx:any = evnt.optnindx;
	let type: any = evnt.sectiontype;
	
	console.log(evnt, this.dropdata.elementType);
	
	if(type=="item" && this.dropdata.elementType == "item"){
		
		this.diagnosisArr[indx].ddoptions[subindx].suboptn.splice(optnindx, 0, {'title': this.dropdata.label, 'clinical': this.dropdata.clinic, 'layman': this.dropdata.layman});
		
		this.availableForDrop = false;
		
	} else if(type == "elem"){
		if(this.dropdata.elementType == "elem"){
			this.diagnosisArr[indx].ddoptions.splice(subindx, 0, {'title': this.dropdata.label, 'suboptn': []});
			this.availableForDrop = false;
		} else if(this.dropdata.elementType == "item"){
			if(this.diagnosisArr[indx].ddoptions[subindx].suboptn.length == 0){
				this.diagnosisArr[indx].ddoptions[subindx].suboptn.push({'title': this.dropdata.label, 'clinical': this.dropdata.clinic, 'layman': this.dropdata.layman})
			}
		}
		
	} else if(type == "category"){
		if(this.dropdata.elementType == "category"){
			this.diagnosisArr.splice(indx, 0, {'title': this.dropdata.label, 'selected': false, 'ddoptions': []});
			this.availableForDrop = false;
		} else if(this.dropdata.elementType == "elem"){
			if(this.diagnosisArr[indx].ddoptions.length == 0){
				this.diagnosisArr[indx].ddoptions.push({'title': this.dropdata.label, 'suboptn': []});
				this.availableForDrop = false;
			}
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
	let type:any = evnt.type;
	let indx:any = evnt.indx;
	let subindx:any =  evnt.subindx;
	let optnindx:any = evnt.optnindx;
	
	
	
	if(evnt.type == 'category'){
		this.diagnosisArr.splice(indx, 1);
	} else if(evnt.type == 'elem'){
		this.diagnosisArr[indx].ddoptions.splice(subindx, 1);
	} else {
		this.diagnosisArr[indx].ddoptions[subindx].suboptn.splice(optnindx, 1);
	}
  }
  
  addnewEvent(evnt){
	if(evnt.type == 'category'){
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
	}
	
  }

}
