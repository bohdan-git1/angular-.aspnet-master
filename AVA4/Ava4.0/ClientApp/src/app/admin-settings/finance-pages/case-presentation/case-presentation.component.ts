import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-presentation',
  templateUrl: './case-presentation.component.html',
  styleUrls: ['./case-presentation.component.css']
})
export class CasePresentationComponent implements OnInit {
	
	treatmentArr: any[] = [{"label": "Child Braces", "remove": false}, {"label": "Adult Braces", "remove": false}, {"label": "Invisalign", "remove": false}, {"label": "Recision Aligners - Silver", "remove": false}, {"label": "Recision Aligners - Gold", "remove": false}];
	
	paymentoptions: any[] = [{"label": "Pay in Full", "remove": false}, {"label": "Family Members", "remove": false}, {"label": "Payment Plans", "remove": false}, {"label": "Recision Aligners", "remove": false}];
	
  constructor() { }

  ngOnInit() {
  }
  
  openRremovePopup(indx, section) {
	if(section == 'payment'){
		this.paymentoptions.map(item => {
			item.remove = false;
		});
		
		this.paymentoptions[indx].remove = true;
	} else {
		this.treatmentArr.map(item => {
			item.remove = false;
		});
		
		this.treatmentArr[indx].remove = true;
	}
	
	
  }
  
  removeItem(indx, section){
	if(section == 'payment'){
		this.paymentoptions.map(item => {
			item.remove = false;
		});
	} else {
		this.treatmentArr.map(item => {
			item.remove = false;
		});
	}
  }

}
