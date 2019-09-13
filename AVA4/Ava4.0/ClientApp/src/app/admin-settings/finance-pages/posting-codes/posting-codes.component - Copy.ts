import { Component, ViewChild, OnInit, } from '@angular/core';

import { FormsModule, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-posting-codes',
  templateUrl: './posting-codes.component.html',
  styleUrls: ['./posting-codes.component.css']
})
export class PostingCodesComponent implements OnInit {

	@ViewChild('postingcodesfield') postingcodesfield: FormGroupDirective; 


	editmode:boolean = false;
	postingcodeData: any[] = [
		{"code": "Exam", "desc": "Initial Exam", "type": "Charge", "depositType": "", "defaultAmt": "$0", "active": "Y", "changestatus": "Y"},
		{"code": "Records", "desc": "Orthodontic Records", "type": "Charge", "depositType": "", "defaultAmt": "$250", "active": "Y", "changestatus": "N"},
		{"code": "Cash", "desc": "Cash Payment", "type": "Payment", "depositType": "1", "defaultAmt": "$0", "active": "N", "changestatus": "N"},
		{"code": "Check", "desc": "Check Payment", "type": "Payment", "depositType": "2", "defaultAmt": "$0", "active": "Y", "changestatus": "N"},
		{"code": "eCCAmx", "desc": "American Express Credit Card", "type": "Payment", "depositType": "6", "defaultAmt": "$0", "active": "Y", "changestatus": "N"},
		{"code": "eCCDisc", "desc": "Discover Credit Card", "type": "Payment", "depositType": "7", "defaultAmt": "$0", "active": "Y", "changestatus": "Y"},
		{"code": "eCCMC", "desc": "Mastercard", "type": "Payment", "depositType": "8", "defaultAmt": "$0", "active": "Y", "changestatus": "Y"},
		{"code": "eCCVisa", "desc": "Visa Credit Card", "type": "Payment", "depositType": "9", "defaultAmt": "$0", "active": "Y", "changestatus": "Y"},
		{"code": "InsCk", "desc": "Insurance Check", "type": "Payment", "depositType": "3", "defaultAmt": "$0", "active": "Y", "changestatus": "Y"},
		
	];
	


  constructor() { }

  ngOnInit() {
  }
  
  addEditmode(form){
		if(form.value.code!='' && form.value.desc!='' && form.value.type!='' && form.value.depositType!='' && form.value.defaultAmt!='' && (form.value.active=='Y' || form.value.active=='N') && (form.value.changestatus=='Y' || form.value.changestatus=='N')  )
		{
			this.postingcodeData.push(form.value);
			
		}
		this.editmode = false;
	}
	

	forpostingcodeData(state){
		if(state == 'edit'){
			this.editmode = true;
		} else {
			this.editmode = false;
		}
		}

}
