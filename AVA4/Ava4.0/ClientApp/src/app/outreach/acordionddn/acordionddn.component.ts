import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acordionddn',
  templateUrl: './acordionddn.component.html',
  styleUrls: ['./acordionddn.component.css']
})
export class AcordionddnComponent implements OnInit {
	
	@Input() drpdndata: any;
	
	
  constructor() { }

  ngOnInit() {
	
	this.drpdndata.map(dditem => {
		dditem['inputval'] ="";
		
	});

	console.log(this.drpdndata);
	
  }
  

  
  selectedoption(indx) {
	
	this.drpdndata[indx].selected = this.drpdndata[indx].selected == false ? true : false;
	
	let selectedOptnsArr: any[] = this.drpdndata.filter(item => {
		return item.selected == true;
	});
	
  }

  insertUpdateData(inputData, index)
  {
	this.drpdndata[index]['inputval']=inputData.target.value;
  }

}

