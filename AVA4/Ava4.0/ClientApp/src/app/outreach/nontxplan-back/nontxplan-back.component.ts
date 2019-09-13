import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nontxplan-back',
  templateUrl: './nontxplan-back.component.html',
  styleUrls: ['./nontxplan-back.component.css']
})
export class NontxplanBackComponent implements OnInit {
	
	@Input() drpdndata: any;
	
  constructor() {
	
  }

  ngOnInit() {
	
	this.drpdndata.map((dditem, indx) => {
		if(indx == 0){
			dditem['opendrpdn_back'] = true;
		} else {
			dditem['opendrpdn_back'] = false;
		}
		
	});
  }
  
  toogleDropdown(sel_indx) {
	this.drpdndata.map((dditem, indx) => {
		if(indx != sel_indx){
			dditem['opendrpdn_back'] = false;
		}
	});
	
	this.drpdndata[sel_indx]['opendrpdn_back'] = this.drpdndata[sel_indx]['opendrpdn_back'] == true ? false : true;
	
  }

}
