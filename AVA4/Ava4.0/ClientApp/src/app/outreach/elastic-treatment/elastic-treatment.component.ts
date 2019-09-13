import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elastic-treatment',
  templateUrl: './elastic-treatment.component.html',
  styleUrls: ['./elastic-treatment.component.css']
})
export class ElasticTreatmentComponent implements OnInit {

	actnbtnArr: any[] = [{"label": "Primary", "color": "#bfbfbf", "selected": false}, {"label": "Extracted", "color": "#fd7474", "selected": false}, {"label": "Impacted", "color": "#8cf1e4", "selected": false}, {"label": "Implant", "color": "#f6cc61", "selected": false}, {"label": "Perio", "color": "#fcff7c", "selected": false}, {"label": "Bond", "color": "#e4e4e4", "selected": false}, {"label": "Permanent", "color": "#FFFFFF", "selected": false}, {"label": "Missing", "color": "#fd7474", "selected": false}, {"label": "Peg", "color": "#e8fcfa", "selected": false}, {"label": "Crown", "color": "#bdbe8b", "selected": false}, {"label": "Short Roots", "color": "#0ed251", "selected": false}, {"label": "Brackets", "color": "#c4c4c4", "selected": false}];
	
	actnbtn_rightArr: any[] = [{"label": "Power chain", "color": "#c4c4c4", "selected": false}, {"label": "TAD", "color": "#f11212", "selected": false}, {"label": "Wire", "color": "#c4c4c4", "selected": false}, {"label": "Chain to TAD", "color": "#c4c4c4", "selected": false}];
	
	
	permanentPrimaryArr_upper: any[] = [
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false}
	];
	
	permanentPrimaryArr_lower: any[] = [
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": true, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false},
		{"permanent": true, "primaryavailable": false, "primary": false}
	];
	
	elasticedataArraylist: any[]= [
            {"selected": false, "type": "BOX", "description": "Reduce ob", "teeth": "UR2,UL2,LL2,LR2" },
			{"selected": false, "type": "MDUR", "description": "Midline left", "teeth": "UL2,LR2"}, 
            {"selected": false, "type": "MDUL", "description": "Midline right", "teeth": "UR2,LL2"},
			{"selected": false, "type": "Vert - RIGHT", "description": "W with tail- right", "teeth": "UR3,LR4,UR4,LR5,UR5,LR6"}, 			
			{"selected": false, "type": "Tri-Stand - RIGHT", "description": "Triangle -right", "teeth": "UR3,LR3,LR4"},
			{"selected": false, "type": "C2 CM - RIGHT", "description": "Class II ck mark-Right", "teeth": "LR6,UR3,LR4"},
			{"selected": false, "type": "CB7-6 - RIGHT", "description": "Crossbite -in/out 7-6-R", "teeth": "UR7,LR6"}, 
            {"selected": false, "type": "C2 CM - LEFT", "description": "Class II ck mark-Left", "teeth": "LL6,UL3,LL4"}, 
			{"selected": false, "type": "Vert - LEFT", "description": "W with tail-left", "teeth": "UL3,LL4,UL4,LL5,UL5,LL6"},
            {"selected": false, "type": "Tri-Stand - LEFT", "description": "Triangle -left", "teeth": "UL3,LL3,LL4"}, 
			{"selected": false, "type": "C3 CM - RIGHT", "description": "Class III ck mark-Right", "teeth": "UR6,LR3,UR3"}, 
			{"selected": false, "type": "CB7-7 - RIGHT", "description": "Crossbite -in/out 7-7-R", "teeth": "UR7,LR7"}, 
			{"selected": false, "type": "C3 CM - LEFT", "description": "Class III ck mark-Left", "teeth": "UL6,LL3,UL3"}, 
			{"selected": false, "type": "CB7-6 - LEFT", "description": "Crossbite -in/out 7-6-L", "teeth": "UL7,LL6"}, 
			{"selected": false, "type": "TriUpside - RIGHT", "description": "Triangle upside down R", "teeth": "LR3,UR3,UR4"}, 
			{"selected": false, "type": "C2S - RIGHT", "description": "Class II standard-Right", "teeth": "LR6,UR3"},
            {"selected": false, "type": "C2S - LEFT", "description": "Class II standard-Left", "teeth": "LL6,UL3"}, 
            {"selected": false, "type": "CB7-7 - LEFT", "description": "Crossbite -in/out 7-7-L", "teeth": "UL7,LL7"},
            {"selected": false, "type": "TriUpside - LEFT", "description": "Triangle upside down L", "teeth": "LL3,UL3,UL4"}, 
            {"selected": false, "type": "C3S - RIGHT", "description": "Class III standard-Right", "teeth": "UR6,LR3"}, 
            {"selected": false, "type": "C3S - LEFT", "description": "Class III standard-Left", "teeth": "UL6,LL3 "}, 
            {"selected": false, "type": "CB6-6 - RIGHT", "description": "Crossbite -in/out 6-6-R", "teeth": "UR6,LR6"}, 
            {"selected": false, "type": "CB6-6 - LEFT", "description": "Crossbite -in/out 6-6-L", "teeth": "UL6,LL6"}, 
            {"selected": false, "type": "CB6-7 - RIGHT", "description": "Crossbite -in/out 6-7-R", "teeth": "UR6,LR7"}, 
            {"selected": false, "type": "CB6-7 - LEFT", "description": "Crossbite -in/out 6-7-L", "teeth": "UL6,LL7"}
          ];
	
	showPrimaryTooth: boolean = false;
	elasticMenu: boolean = false;
	

  constructor() { }

  ngOnInit() {
	
	this.activeBtnAction(6);
	
  }
  
  togglePrimaryTooth(section, indx){
	
	if(section == 'upper'){
		if(this.permanentPrimaryArr_upper[indx].primaryavailable){
			this.permanentPrimaryArr_upper[indx].primary = this.permanentPrimaryArr_upper[indx].primary==true ? false : true;
			
			this.permanentPrimaryArr_upper[indx].permanent = !this.permanentPrimaryArr_upper[indx].primary;
		} else {
			
			this.permanentPrimaryArr_upper[indx].permanent = this.permanentPrimaryArr_upper[indx].permanent == true ? false : true;
			
		}
	} else if(section == 'lower'){
		if(this.permanentPrimaryArr_lower[indx].primaryavailable){
			this.permanentPrimaryArr_lower[indx].primary = this.permanentPrimaryArr_lower[indx].primary==true ? false : true;
			
			this.permanentPrimaryArr_lower[indx].permanent = !this.permanentPrimaryArr_lower[indx].primary;
		} else {
			this.permanentPrimaryArr_lower[indx].permanent = this.permanentPrimaryArr_lower[indx].permanent == true ? false : true;
		}
	}
  }
  
  activeBtnAction(indx){
	
	let currntBtn: any = this.actnbtnArr[indx];
	
	if(currntBtn.label == 'Primary'){
		//this.showPrimaryTooth = true;
		
		this.permanentPrimaryArr_upper.map(item => {
			item.permanent = false;
			if(item.primaryavailable == true){
				item.primary = true;
			}
		});
		
		this.permanentPrimaryArr_lower.map(item => {
			item.permanent = false;
			if(item.primaryavailable == true){
				item.primary = true;
			}
		});
		
	} else if(currntBtn.label == 'Permanent') {
		//this.showPrimaryTooth = false;
		this.permanentPrimaryArr_upper.map(item => {
			item.permanent = true;
			item.primary = false;
		});
		
		this.permanentPrimaryArr_lower.map(item => {
			item.permanent = true;
			item.primary = false;
		});
	}
  }
  
  showElasticMenu() {
	this.elasticMenu = this.elasticMenu == true ? false : true;
	this.activeBtnAction(6);
  }
  
  selectElasticOptn(indx) {
	/*this.elasticedataArraylist.map((item, _indx) => {
		if(indx != _indx){
			item.selected = false;
		}
	});*/
	
	this.elasticedataArraylist[indx].selected = this.elasticedataArraylist[indx].selected == true ? false : true;
  }

}
