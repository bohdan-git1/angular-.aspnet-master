import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multileveldrpdn',
  templateUrl: './multileveldrpdn.component.html',
  styleUrls: ['./multileveldrpdn.component.css']
})
export class MultileveldrpdnComponent implements OnInit {
	
	@Input() multidrpdndata: any;
	_multidrpdndata:any;
	
  constructor() { }

  ngOnInit() {
	this.initializeData();
  }
  
  initializeData(){
	//this._multidrpdndata = JSON.parse(JSON.stringify(this.multidrpdndata));
	
	this.multidrpdndata.map(dditem => {
		dditem['opendrpdn'] = false;
		dditem.ddoptions.map(suboptn => {
			suboptn['opensubdrpdn'] = false;
			suboptn['selectedOptn'] = '';
			
			suboptn.selected = false;
			
			suboptn.suboptn.map(subitem => {
				subitem.selected = false;
			})
		})
	});
  }
  
  toogleDropdown(sel_indx) {
	
	this.multidrpdndata.map((dditem, indx) => {
		if(indx != sel_indx){
			dditem['opendrpdn'] = false;
			dditem.ddoptions.map(suboptn => {
				suboptn['opensubdrpdn'] = false;
			})
		}
	});
	
	this.multidrpdndata[sel_indx]['opendrpdn'] = this.multidrpdndata[sel_indx]['opendrpdn'] == true ? false : true;
  }
  
  toggleSubdrpndn(sel_indx, subdrpdn) {
	this.multidrpdndata[sel_indx].ddoptions.map((suboptn, suboptnindx) => {
		if(suboptn.suboptn.length > 0){
			if(suboptnindx != subdrpdn){
				suboptn['opensubdrpdn'] = false;
			}
		}
	});
	
	this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['opensubdrpdn'] = this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['opensubdrpdn'] == true ? false : true;
	
	let suboptn: any = this.multidrpdndata[sel_indx].ddoptions[subdrpdn].suboptn;
	
	if(suboptn.length > 0){
		//this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected'] = suboptnSelected;
	} else {
		this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected'] = this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected']==true ? false : true;
	}
	
	if(this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected']==true){
		this.multidrpdndata[sel_indx].selected = true;
	} else {
		this.multidrpdndata[sel_indx].selected = false;
	}

	
  }
  
  selectedOptn(sel_indx, subdrpdn, optnindx) {
	
	let suboptnSelected: any = false;
	let suboptn: any = this.multidrpdndata[sel_indx].ddoptions[subdrpdn].suboptn;
	
	this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selectedOptn'] = this.multidrpdndata[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].title;
	
	this.multidrpdndata[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected = this.multidrpdndata[sel_indx].ddoptions[subdrpdn].suboptn[optnindx].selected == true ? false : true;
	
	
	if(suboptn.length > 0){
		for(let i=0; i<suboptn.length; i++){
			if(suboptn[i].selected == true){
				suboptnSelected = true;
				break;
			}
		}
		
		this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected'] = suboptnSelected;
	}
	
	if(this.multidrpdndata[sel_indx].ddoptions[subdrpdn]['selected']==true){
		this.multidrpdndata[sel_indx].selected = true;
	} else {
		this.multidrpdndata[sel_indx].selected = false;
	}
  }

}
