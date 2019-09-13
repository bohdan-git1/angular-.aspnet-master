import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goals-acordionddn',
  templateUrl: './goals-acordionddn.component.html',
  styleUrls: ['./goals-acordionddn.component.css']
})
export class GoalsAcordionddnComponent implements OnInit {

 	
	@Input() drpdndata: any;
	
	
  constructor() { }

  ngOnInit() {
	
	this.drpdndata.map(dditem => {
		dditem['opendrpdn'] = false;
	});
  }
  
  toogleDropdown(sel_indx) {
	this.drpdndata.map((dditem, indx) => {
		if(indx != sel_indx){
			dditem['opendrpdn'] = false;
		}
	});
	
	this.drpdndata[sel_indx]['opendrpdn'] = this.drpdndata[sel_indx]['opendrpdn'] == true ? false : true;
	
  }
  
  selectedGoalsoption(indx) {
	if(this.drpdndata[indx].selected==true)
	{
		this.drpdndata[indx].selected=false;
	}else {
		this.drpdndata[indx].selected=true;
	}
	
  }


}
