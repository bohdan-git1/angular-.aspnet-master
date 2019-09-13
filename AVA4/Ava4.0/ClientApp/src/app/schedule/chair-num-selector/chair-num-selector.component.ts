import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chair-num-selector',
  templateUrl: './chair-num-selector.component.html',
  styleUrls: ['./chair-num-selector.component.css']
})
export class ChairNumSelectorComponent implements OnInit {
	
	@Output()selectedNum = new EventEmitter();
	selectorLabel:any = [
		{label: 4, selected: false},
		{label: 5, selected: false},
		{label: 6, selected: false},
		{label: 7, selected: false},
		{label: 8, selected: true},
		/*{label: 9, selected: true},*/
		];
	showInteractionSection: boolean = false;
	
  constructor() { }

  ngOnInit() {
  }
  
  showSelector() {
	this.showInteractionSection = this.showInteractionSection == true ? false : true;
  }
  
  selectElement(indx) {
	this.selectorLabel.map(item => {
		item.selected = false;
	});
	
	this.selectorLabel[indx].selected = true;
	this.selectedNum.emit(this.selectorLabel[indx].label);
	this.showInteractionSection = false;
	
  }

}
