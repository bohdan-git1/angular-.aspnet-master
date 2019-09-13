import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
	
	boxHt: any;
	
	templateSubArr: any[] = [{"label": "Deband Phase 1 to dentist", "selected": false}, {"label": "Deband letter to dentist", "selected": false}, {"label": "Phosflur rinse (Poor OH) - to dentist", "selected": false}, {"label": "Recall visit to dentist", "selected": false}, {"label": "Oral Hygiene Poor to dentist", "selected": false}, {"label": "Extraction Letter", "selected": false}];
	
	selectedSub: any;
	
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}
	
  constructor() { }

  ngOnInit() {
	this.initalizeFrame();
	this.selectTemplateSub(1);
  }
  
  initalizeFrame(){
	let topHt:any = 210;
	let bottomHt: any = 110;
	
	this.boxHt = window.innerHeight - (topHt + bottomHt);
  }
  
  selectTemplateSub(indx){
	this.templateSubArr.map(item => {
		item.selected = false;
	});
	
	this.templateSubArr[indx].selected = true;
	this.selectedSub = this.templateSubArr[indx].label;
  }

}
