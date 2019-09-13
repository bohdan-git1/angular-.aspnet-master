import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-txplan-back',
  templateUrl: './txplan-back.component.html',
  styleUrls: ['./txplan-back.component.css']
})
export class TxplanBackComponent implements OnInit {

	@Input() drpdndata: any;
	@Input() note: any;
	@Input() noteBoolean: any;
	
  constructor() {
	
  }

  ngOnInit() {
	
	this.drpdndata.map(dditem => {
		dditem['opendrpdn_back'] = false;
		
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
