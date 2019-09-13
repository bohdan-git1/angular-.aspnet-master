import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-elastic-dropdown',
  templateUrl: './elastic-dropdown.component.html',
  styleUrls: ['./elastic-dropdown.component.css']
})
export class ElasticDropdownComponent implements OnInit {
	
	ddLabel: any = "Elastics List";
	showOptions: boolean = false;
	
	elasticedataArraylist: any[]= [
            {type: "BOX", description: 'Reduce ob', 'teeth': 'UR2,UL2,LL2,LR2' }, 
            {type: "C2 CM - RIGHT", description: 'Class II ck mark-Right', 'teeth': 'LR6,UR3,LR4' }, 
            {type: "C2 CM - LEFT", description: 'Class II ck mark-Left', 'teeth': 'LL6,UL3,LL4' }, 
            {type: "C2S - RIGHT", description: 'Class II standard-Right', 'teeth': 'LR6,UR3' }, 
            {type: "C2S - LEFT", description: 'Class II standard-Left', 'teeth': 'LL6,UL3' }, 
            {type: "C3 CM - RIGHT", description: 'Class III ck mark-Right', 'teeth': 'UR6,LR3,UR3' }, 
            {type: "C3 CM - LEFT", description: 'Class III ck mark-Left', 'teeth': 'UL6,LL3,UL3' }, 
            {type: "C3S - RIGHT", description: 'Class III standard-Right', 'teeth': 'UR6,LR3' }, 
            {type: "C3S - LEFT", description: 'Class III standard-Left', 'teeth': 'UL6,LL3 ' }, 
            {type: "CB6-6 - RIGHT", description: 'Crossbite -in/out 6-6-R', 'teeth': 'UR6,LR6' }, 
            {type: "CB6-6 - LEFT", description: 'Crossbite -in/out 6-6-L', 'teeth': 'UL6,LL6' }, 
            {type: "CB6-7 - RIGHT", description: 'Crossbite -in/out 6-7-R', 'teeth': 'UR6,LR7' }, 
            {type: "CB6-7 - LEFT", description: 'Crossbite -in/out 6-7-L', 'teeth': 'UL6,LL7' }, 
            {type: "CB7-6 - RIGHT", description: 'Crossbite -in/out 7-6-R', 'teeth': 'UR7,LR6' }, 
            {type: "CB7-6 - LEFT", description: 'Crossbite -in/out 7-6-L', 'teeth': 'UL7,LL6' }, 
            {type: "CB7-7 - RIGHT", description: 'Crossbite -in/out 7-7-R', 'teeth': 'UR7,LR7' }, 
            {type: "CB7-7 - LEFT", description: 'Crossbite -in/out 7-7-L', 'teeth': 'UL7,LL7' }, 
            {type: "MDUR", description: 'Midline left', 'teeth': 'UL2,LR2' }, 
            {type: "MDUL", description: 'Midline right', 'teeth': 'UR2,LL2' }, 
            {type: "Tri-Stand - RIGHT", description: 'Triangle -right', 'teeth': 'UR3,LR3,LR4' }, 
            {type: "Tri-Stand - LEFT", description: 'Triangle -left', 'teeth': 'UL3,LL3,LL4' }, 
            {type: "TriUpside - RIGHT", description: 'Triangle upside down R', 'teeth': 'LR3,UR3,UR4' }, 
            {type: "TriUpside - LEFT", description: 'Triangle upside down L', 'teeth': 'LL3,UL3,UL4' }, 
            {type: "Vert - RIGHT", description: 'W with tail- right', 'teeth': 'UR3,LR4,UR4,LR5,UR5,LR6' }, 
            {type: "Vert - LEFT", description: 'W with tail-left', 'teeth': 'UL3,LL4,UL4,LL5,UL5,LL6' }
           
          ];
	
  constructor() { }

  ngOnInit() {
	
  }
  
  selectDDOptions(indx) {
	this.ddLabel = this.elasticedataArraylist[indx].type;
	this.showOptions = false;
  }

}
