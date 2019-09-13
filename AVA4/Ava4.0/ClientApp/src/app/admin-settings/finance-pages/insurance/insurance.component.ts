import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
	
	rotateOnY = 0;
	selectorHeight: any;
	selectorTop: any;
	
	detailsAcrd: any = [{accordOpen: false}, {accordOpen: false}, {accordOpen: false}, {accordOpen: false}, {accordOpen: false}, {accordOpen: false}, {accordOpen: false}, {accordOpen: false}];
	
	adaCodes: any = [
		{'code': 'D8670', 'desc': 'Periodic ortho treatment visit (as part of contract)', 'amnt': '250'},
		{'code': 'D8660', 'desc': 'Pre-orthodontic treatment visit', 'amnt': '400'},
		{'code': 'D8080', 'desc': 'Comprehensive ortho treatment of the transitional dention', 'amnt': '100'},
		{'code': 'D8090', 'desc': 'Comprehensive ortho treatment of the adult dentition', 'amnt': '165'},
		{'code': 'D8050', 'desc': 'Interceptive ortho treatment of the primary dention', 'amnt': '250'},
		{'code': 'D8051', 'desc': 'Post-orthodontic treatment visit', 'amnt': '175'},
		{'code': 'D8052', 'desc': 'Comprehensive ortho treatment', 'amnt': '400'},
		{'code': 'D8053', 'desc': 'Comprehensive ortho treatment - child', 'amnt': '350'},
		{'code': 'D8670', 'desc': 'Periodic ortho treatment visit (as part of contract)', 'amnt': '300'},
		{'code': 'D8660', 'desc': 'Pre-orthodontic treatment visit', 'amnt': '400'},
		{'code': 'D8080', 'desc': 'Comprehensive ortho treatment of the transitional dention', 'amnt': '1050'},
		{'code': 'D8090', 'desc': 'Comprehensive ortho treatment of the adult dentition', 'amnt': '165'},
		{'code': 'D8050', 'desc': 'Interceptive ortho treatment of the primary dention', 'amnt': '250'},
		{'code': 'D8051', 'desc': 'Post-orthodontic treatment visit', 'amnt': '2000'},
		{'code': 'D8052', 'desc': 'Comprehensive ortho treatment', 'amnt': '400'},
		{'code': 'D8670', 'desc': 'Periodic ortho treatment visit (as part of contract)', 'amnt': '515'},
		{'code': 'D8660', 'desc': 'Pre-orthodontic treatment visit', 'amnt': '400'},
		{'code': 'D8080', 'desc': 'Comprehensive ortho treatment of the transitional dention', 'amnt': '590'},
		{'code': 'D8670', 'desc': 'Periodic ortho treatment visit (as part of contract)', 'amnt': '300'},
		{'code': 'D8660', 'desc': 'Pre-orthodontic treatment visit', 'amnt': '400'},
		{'code': 'D8080', 'desc': 'Comprehensive ortho treatment of the transitional dention', 'amnt': '1050'},
		{'code': 'D8090', 'desc': 'Comprehensive ortho treatment of the adult dentition', 'amnt': '165'},
		{'code': 'D8050', 'desc': 'Interceptive ortho treatment of the primary dention', 'amnt': '250'},
		{'code': 'D8052', 'desc': 'Comprehensive ortho treatment', 'amnt': '400'},
		{'code': 'D8053', 'desc': 'Comprehensive ortho treatment - child', 'amnt': '350'},
		{'code': 'D8670', 'desc': 'Periodic ortho treatment visit (as part of contract)', 'amnt': '515'},
	];
	
  constructor() { }

  ngOnInit() {
  }
  
  flipCard() {
	this.rotateOnY -= 180;
  }
  
  showDetails(evt, indx) {
	this.detailsAcrd.map((item, _indx) => {
		
		if(indx != _indx){
			item.accordOpen = false;
		}
	});
	
	this.detailsAcrd[indx].accordOpen = this.detailsAcrd[indx].accordOpen == true ? false : true;
	
	
	setTimeout(() => {
		this.selectorTop = evt.target.parentElement.offsetTop-1;
		this.selectorHeight = evt.target.parentElement.offsetHeight;
	});
  }

}
