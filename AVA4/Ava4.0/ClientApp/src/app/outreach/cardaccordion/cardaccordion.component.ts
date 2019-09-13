import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardaccordion',
  templateUrl: './cardaccordion.component.html',
  styleUrls: ['./cardaccordion.component.css']
})
export class CardaccordionComponent implements OnInit {
	
	toggleclass: any = [
		{'card-elem': true, 'flipcard1': true, 'accordclose': false}, 
		{'card-elem': true, 'flipcard1': true, 'accordclose': true},
		{'card-elem': true, 'flipcard1': true, 'accordclose': true},
		{'card-elem': true, 'flipcard1': true, 'accordclose': true},
	];
	
	toggleclassBack: any = [
		{'card-elem': true, 'flipcard2': true}, 
		{'card-elem': true, 'flipcard2': true},
		{'card-elem': true, 'flipcard2': true},
		{'card-elem': true, 'flipcard2': true},
	];
	
	contentClass: any = [
		{'card-accord-content': true, 'showcontent': true},
		{'card-accord-content': true, 'showcontent': false},
		{'card-accord-content': true, 'showcontent': false},
		{'card-accord-content': true, 'showcontent': false},
	];

	goalArr: any[]=[
		{'title': 'Alleviate crowding', 'selected': false}, 
		{'title': 'Alleviate spacing', 'selected': false},
		{'title': 'Correct and align midlines', 'selected': false},
		{'title': 'Class I canines and molars', 'selected': false},
		{'title': 'Alleviate curve of spee', 'selected': false},
		{'title': 'Improve incisor position', 'selected': false},


		{'title': 'Maintain or improve profile', 'selected': false},
		{'title': 'Reduce open bite', 'selected': false},
		{'title': 'Reduce overjet', 'selected': false},
		{'title': 'Correct crossbite', 'selected': false},
		{'title': 'Reduce over bite', 'selected': false},
		{'title': 'Refer patient for general dental care', 'selected': false},
		{'title': 'Send out for perio evalution', 'selected': false}
	];


	
	txPlanArr: any[] = [
		{'title': 'Next Step', 'selected': false, 'ddoptions': []}, 
		{'title': 'Type of Treatment', 'selected': false, 'ddoptions': [
				{'title': 'Facemask', 'selected': false},
				{'title': 'Palatal Expander', 'selected': false},
				{'title': 'RPE', 'selected': false}]},
		{'title': 'Surgery', 'selected': false, 'ddoptions': []},
		{'title': 'Appliances', 'selected': false, 'ddoptions': [
				{'title': 'Upper braces', 'selected': false},
				{'title': 'Lower braces', 'selected': false},
				{'title': 'Facemask', 'selected': false},
				{'title': 'Palatal Expander', 'selected': false},
				{'title': 'RPE', 'selected': false},
				{'title': 'Bihelix', 'selected': false},
				{'title': 'Tongue crib', 'selected': false},
				{'title': 'NTI', 'selected': false},
				{'title': 'Forsus', 'selected': false},
				{'title': 'MARPE', 'selected': false},
				{'title': 'Anterior Bite Plate', 'selected': false},
				{'title': 'Elastics', 'selected': false},
				{'title': 'Niteguard', 'selected': false},
				{'title': 'MIA', 'selected': false},
				{'title': 'Functional Appliance', 'selected': false},
				{'title': 'Headgear', 'selected': false},
				{'title': 'Reserve headgear', 'selected': false},
				{'title': 'Upper TMJ splint', 'selected': false},
				{'title': 'Upper retainer', 'selected': false},
				{'title': 'Lower retainer', 'selected': false},
				{'title': 'Orthotic', 'selected': false},
				{'title': 'Carriere', 'selected': false},
				{'title': 'Upper 2x4', 'selected': false},
				{'title': 'Lower 2x4', 'selected': false},
				{'title': 'Fan Expanders', 'selected': false},
				{'title': 'TADs', 'selected': false},
				{'title': 'Occulusals', 'selected': false},
				{'title': 'Splint', 'selected': false},
				{'title': 'Upper Schwartz', 'selected': false},
				{'title': 'Lower Schwartz', 'selected': false},
				{'title': 'Upper Sagital', 'selected': false},
				{'title': 'Lower Sagital', 'selected': false},
				{'title': 'Bionator', 'selected': false},
				{'title': 'Frankel ll', 'selected': false},
				{'title': 'Nance Holding Arch', 'selected': false},
			]
		},
		{'title': 'Elastic Wear', 'selected': false, 'ddoptions': []},
		{'title': 'Invisalign', 'selected': false, 'ddoptions': []},
		{'title': 'Treatment Time Estimate', 'selected': false, 'ddoptions': []},
		{'title': 'Retainer Period', 'selected': false, 'ddoptions': []},
	];
	
	nonExtractionPlanArr: any[] = [
		{'title': 'Non-Extraction Plan (24)', 'ddoptions': [
			{'title': 'Hyrax', 'duration': '3 wks', 'selected': false, 'edit': false},
			{'title': 'OBS/monitor primary exfoliation', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Maxillary 2x4 prn', 'duration': '2 wks', 'selected': false, 'edit': false},
			{'title': 'Maxillary TT prn', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Band/bond both arches', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Level & align', 'duration': '3 mo', 'selected': false, 'edit': false},
			{'title': 'Details and elastics', 'duration': '3 wks', 'selected': false, 'edit': false},
			{'title': 'Ret: Standard Hawley & Tru-Tain', 'duration': '2 wks', 'selected': false, 'edit': false},
			{'title': 'Evaluation 3rd molars', 'duration': '2 wks', 'selected': false, 'edit': false}
		]},
	];
	
	txPlanArrSelected: any[] = [
		{'title': 'Next Step', 'ddoptions': []}, 
		{'title': 'Type of Treatment', 'ddoptions': [
				{'title': 'Facemask', 'selected': false},
				{'title': 'Palatal Expander', 'selected': false},
				{'title': 'RPE', 'selected': false}]},
		{'title': 'Surgery', 'ddoptions': []},
		{'title': 'Appliances', 'ddoptions': [
				{'title': 'Upper braces', 'selected': false},
				{'title': 'Lower braces', 'selected': false},
				{'title': 'Facemask', 'selected': false},
				{'title': 'Palatal Expander', 'selected': false},
				{'title': 'RPE', 'selected': false},
				{'title': 'Bihelix', 'selected': false},
				{'title': 'Tongue crib', 'selected': false},
				{'title': 'NTI', 'selected': false},
				{'title': 'Forsus', 'selected': false},
				{'title': 'MARPE', 'selected': false},
				{'title': 'Anterior Bite Plate', 'selected': false},
				{'title': 'Elastics', 'selected': false},
				{'title': 'Niteguard', 'selected': false},
				{'title': 'MIA', 'selected': false},
				{'title': 'Functional Appliance', 'selected': false},
				{'title': 'Headgear', 'selected': false},
				{'title': 'Reserve headgear', 'selected': false},
				{'title': 'Upper TMJ splint', 'selected': false},
				{'title': 'Upper retainer', 'selected': false},
				{'title': 'Lower retainer', 'selected': false},
				{'title': 'Orthotic', 'selected': false},
				{'title': 'Carriere', 'selected': false},
				{'title': 'Upper 2x4', 'selected': false},
				{'title': 'Lower 2x4', 'selected': false},
				{'title': 'Fan Expanders', 'selected': false},
				{'title': 'TADs', 'selected': false},
				{'title': 'Occulusals', 'selected': false},
				{'title': 'Splint', 'selected': false},
				{'title': 'Upper Schwartz', 'selected': false},
				{'title': 'Lower Schwartz', 'selected': false},
				{'title': 'Upper Sagital', 'selected': false},
				{'title': 'Lower Sagital', 'selected': false},
				{'title': 'Bionator', 'selected': false},
				{'title': 'Frankel ll', 'selected': false},
				{'title': 'Nance Holding Arch', 'selected': false},
			]
		},
		{'title': 'Elastic Wear', 'ddoptions': []},
		{'title': 'Invisalign', 'ddoptions': []},
		{'title': 'Treatment Time Estimate', 'ddoptions': []},
		{'title': 'Retainer Period', 'ddoptions': []},
	];
	
	nonExtractionPlanArrSelected: any[] = [
		{'title': 'Non-Extraction Plan (24)', 'ddoptions': [
			{'title': 'Hyrax', 'duration': '3 wks', 'selected': false, 'edit': false},
			{'title': 'OBS/monitor primary exfoliation', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Maxillary 2x4 prn', 'duration': '2 wks', 'selected': false, 'edit': false},
			{'title': 'Maxillary TT prn', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Band/bond both arches', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Level & align', 'duration': '3 mo', 'selected': false, 'edit': false},
			{'title': 'Details and elastics', 'duration': '3 wks', 'selected': false, 'edit': false},
			{'title': 'Ret: Standard Hawley & Tru-Tain', 'duration': '2 wks', 'selected': false, 'edit': false},
			{'title': 'Evaluation 3rd molars', 'duration': '2 wks', 'selected': false, 'edit': false}
		]},
	];

	selectedStep: any[] = [
		{'title': 'Non-Extraction Plan (24)', 'ddoptions': [
			{'title': 'Hyrax', 'duration': '3 wks', 'selected': false, 'edit': false},
			{'title': 'OBS/monitor primary exfoliation', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Maxillary 2x4 prn', 'duration': '2 wks', 'selected': false, 'edit': false},
			{'title': 'Maxillary TT prn', 'duration': '1 mo', 'selected': false, 'edit': false},
			{'title': 'Band/bond both arches', 'duration': '1 mo', 'selected': false, 'edit': false}
		]},
	];

	
	stepsPlan: any[] = [
		{'title': 'Aligners', 'duration': '2 mo', 'selected': false},
		{'title': 'Aligners + MidCourse Correction/Refinements', 'duration': '6 mo', 'selected': false},
		{'title': 'Band/bond Mand Arch', 'duration': '2 mo', 'selected': false},
		{'title': 'Band/bond Max Arch', 'duration': '2 mo', 'selected': false},
		{'title': 'Bionator', 'duration': '3 mo', 'selected': false},
		{'title': 'Bite Plate', 'duration': '1 mo', 'selected': false},
		{'title': 'Bond Mandibular Arch', 'duration': '1 mo', 'selected': false},
		{'title': 'Bond Maxillary Arch', 'duration': '1 mo', 'selected': false},
		{'title': 'Cast retainer(s) by general dentist', 'duration': '2 mo', 'selected': false},
		{'title': 'Cervical Headgear', 'duration': '6 mo', 'selected': false},
		{'title': 'Elastics', 'duration': '9 mo', 'selected': false},
		{'title': 'Evaluate TMJ-referral/treatment as needed', 'duration': '5 mo', 'selected': false},
		{'title': 'Extract', 'duration': '2 wk', 'selected': false},
		{'title': 'Extract third molars', 'duration': '2 wk', 'selected': false},
		{'title': 'Hayes nance Habit Appliance', 'duration': '3 mo', 'selected': false},
		{'title': 'IG-Interim Guiding Retainer', 'duration': '3 mo', 'selected': false},
		{'title': 'Invisalign', 'duration': '16 mo', 'selected': false},
		{'title': 'Level & align', 'duration': '6 mo', 'selected': false},
		{'title': 'Lingual mandibular 3-3', 'duration': '1 mo', 'selected': false},
		{'title': 'Lingual maxillary 1-1', 'duration': '1 mo', 'selected': false},
		{'title': 'Lip Bumper', 'duration': '3 mo', 'selected': false},
		{'title': 'Mandibular 2x4', 'duration': '3 mo', 'selected': false},
		{'title': 'Mandibular hard acrylic splint', 'duration': '3 mo', 'selected': false},
		{'title': 'Mandibular Swarz', 'duration': '1 mo', 'selected': false},
		{'title': 'Mandibular hard acrylic splint', 'duration': '8 mo', 'selected': false},
		{'title': 'Observe', 'duration': '6 mo', 'selected': false},
		{'title': 'Orthognathic Consult', 'duration': '2 wk', 'selected': false},
		{'title': 'Orthognathic Surgery', 'duration': '1 mo', 'selected': false},
		{'title': 'Refer for prosthetics/restorative', 'duration': '3 mo', 'selected': false},
		{'title': 'Retainers: Standard Hawley', 'duration': '1 mo', 'selected': false},
		{'title': 'Retainers: Standard Hawley & Tru-Tain', 'duration': '2 mo', 'selected': false},
		{'title': 'Retainers: Tru-Tain', 'duration': '1 mo', 'selected': false},
		{'title': 'Retention: Invisalign Retainers', 'duration': '5 mo', 'selected': false},
		{'title': 'RPE', 'duration': '3 wk', 'selected': false},
		{'title': 'SDDA-Screw Driven Distalizing Appliance', 'duration': '2 wk', 'selected': false},
		{'title': 'VECS RPE', 'duration': '2 wk', 'selected': false}
	]
	
	
	
	stepsRotateY: any = 0;
	txPlanRotateY: any = 0;
	goalRotateY: any = 0;
	bracketRotateY: any = 0;
	
	goalText: any = '';
	
	stepsEditMode: boolean = false;
	txPlanEditMode: boolean = false;
	goalEditMode: boolean = false;
	
	@Input() postTreatment: boolean;
	noteBoolean: boolean= false;
	
	selectedBracktColr: any[] = [];
	selectedTemStep: any[]=[];

  constructor() { }

  ngOnInit() {
	
	if(this.postTreatment == true){
		this.stepsRotateY = -180;
		this.txPlanRotateY = -180;
		this.goalRotateY = -180;
		
		//this.txPlanArr = this.txPlanArrSelected;
		this.nonExtractionPlanArr = this.nonExtractionPlanArrSelected;
		
		this.goalText = "Alleviate crowding\nAlleviate spacing\nCorrect and align midlines\nClass I canines and molars\nAlleviate curve of spee\nImprove incisor position\nMaintain or improve profile\nReduce open bite\nReduce overjet\nCorrect crossbite\nReduce over bite\nRefer patient for general dental care\nSend out for perio evalution";

	}
	
	
  }
  
  ngAfterViewInit(){
	setTimeout(() => {
		if(this.postTreatment == true){
			this.stepsRotateY = -180;
			this.txPlanRotateY = -180;
			this.goalRotateY = -180;
			this.bracketRotateY = -180;
			
			//this.txPlanArr = this.txPlanArrSelected;
			this.nonExtractionPlanArr = this.nonExtractionPlanArrSelected;
			
			this.goalText = "Alleviate crowding\nAlleviate spacing\nCorrect and align midlines\nClass I canines and molars\nAlleviate curve of spee\nImprove incisor position\nMaintain or improve profile\nReduce open bite\nReduce overjet\nCorrect crossbite\nReduce over bite\nRefer patient for general dental care\nSend out for perio evalution";

		}
	})
  }
  
  toggleAccordion(indx) {

	
	this.noteBoolean=this.txPlanArr.every( (val, i, arr) => val['selected'] === false );


	this.toggleclass.map(panel => {
		panel['accordclose'] = true;
	});
	
	this.toggleclass[indx]['accordclose'] = false;
	
	this.contentClass.map(cont => {
		cont['showcontent'] = false;
	});
	
	this.contentClass[indx]['showcontent'] = true;
	
	if(this.stepsEditMode){
		this.stepsEditMode = false;
		this.stepsRotateY -= 180;
	}
	
	if(this.txPlanEditMode){
		this.txPlanEditMode = false;
		this.txPlanRotateY -= 180;
	}
	
	if(this.goalEditMode){
		this.goalEditMode = false;
		this.goalRotateY -= 180;
	}
	
  }
  
  flipStepsSection(editmode) {
	this.stepsRotateY -= 180;
	this.stepsEditMode = editmode;
	if(this.stepsEditMode === false)
	{
		this.selectedStep=this.selectedTemStep;
		console.log(this.selectedStep);
	}
	
  }
  
  txPlanSectionFlip(editmode) {
	this.txPlanRotateY -= 180;
	this.txPlanEditMode = editmode;
  }
  
  goalSectionFlip(editmode) {
	this.goalRotateY -= 180;
	this.goalEditMode = editmode;
  }
  
  
  addGoaltext(event){
	this.goalText = event.target.value;
  }
  
  getSelectedBrcktColr(evnt){
	console.log(evnt);
	this.selectedBracktColr = evnt;
  }

  stepLibraryStep1(evt)
  {
	 this.selectedTemStep= evt;
	 //selectedStep
  }

}
