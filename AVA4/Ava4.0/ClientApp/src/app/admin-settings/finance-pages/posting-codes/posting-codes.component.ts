import { Component, ViewChild, OnInit, } from '@angular/core';

import { FormsModule, FormGroupDirective } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-posting-codes',
  templateUrl: './posting-codes.component.html',
  styleUrls: ['./posting-codes.component.css']
})
export class PostingCodesComponent implements OnInit {

	@ViewChild('postingcodesfield') postingcodesfield: FormGroupDirective; 

	typeArr: any[] = [{"option": "Charge"}, {"option": "Adjustment"}, {"option": "Payment"}];
	statusArr: any[] = [{"option": "Active"}, {"option": "Inactive"}];
	Type: any='Type';
	typeName: any='';
	statusName: any='';
	depositeName:any='';
	ix: any= 2;

	depositeBoolean: boolean= false;
	showAll:Boolean= false;
	showErrorMsg='';
	errorVariable: Boolean=false;



	depositArr: any[] = [{"option": "Cash"}, {"option": "Check"}, {"option": "InsCK"},
						 {"option": "Bank Transfer"}, {"option": "Visa"}, {"option": "Mastercard"},
						 {"option": "American Express"}, {"option": "Discover"}, {"option": "Credit card"},
						 {"option": "Elec Visa"}, {"option": "Elec MC"}, {"option": "Elec Amex"},
						 {"option": "Elec Discover"}, {"option": "Elec Credit card"}, {"option": "Care Credit"},
						 {"option": "Misc"}
						];

	 

	editmode:boolean = false;
	

	postingcodeData: any[] = [
		{"code": "Exam", "desc": "Initial Exam", "type": "Charge", "depositType": "", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "Records", "desc": "Orthodontic Records", "type": "Charge", "depositType": "", "defaultAmt": "250", "active": "Y" ,"selected": false, "edit_mode": false },
		{"code": "Cash", "desc": "Cash Payment", "type": "Payment", "depositType": "Cash", "defaultAmt": "0", "active": "N", "selected": false, "edit_mode": false },
		{"code": "Check", "desc": "Check Payment", "type": "Payment", "depositType": "Check", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "eCCAmx", "desc": "American Express Credit Card", "type": "Payment", "depositType": "Elec Amex", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "eCCDisc", "desc": "Discover Credit Card", "type": "Payment", "depositType": "Elec Discover", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "eCCMC", "desc": "Mastercard", "type": "Payment", "depositType": "Elec MC", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "eCCVisa", "desc": "Visa Credit Card", "type": "Payment", "depositType": "Elec Visa", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		{"code": "InsCk", "desc": "Insurance Check", "type": "Payment", "depositType": "InsCk", "defaultAmt": "0", "active": "Y", "selected": false, "edit_mode": false },
		
	];


	boxHt: any;
	boxScrollHt: any;
	temScrollHt: any;

	postingcodeCloneData: any []= this.postingcodeData;
	

	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};

  constructor() { }

  ngOnInit() {
	let topHt:any = 210;
	let bottomHt: any =140;
	this.boxHt = window.innerHeight - (topHt + bottomHt);
	this.temScrollHt= this.boxHt-30;

	this.showAllactivelist();
	this.boxScrollHt= this.postingcodeData.length * 33;
	if(this.boxScrollHt>=this.temScrollHt)
	{
		this.boxScrollHt=this.temScrollHt;
	}
  }

  showAllactivelist()
  {
	this.postingcodeData = this.postingcodeData.filter(item => {
		return (item.active.includes('Y'))
	});
  }


  addEditmode(form){

	this.checkErrormessage(form);
	console.log(this.errorVariable);
	if(this.errorVariable==false)
	{
	 if(form.value.code!='' && form.value.desc!='' && this.typeName!=''  && this.statusName!='' )
		{
			var myJSON1 = JSON.stringify(this.postingcodeCloneData);
			this.postingcodeData = JSON.parse((myJSON1));

			if(this.depositeBoolean)
			{
				if(this.depositeName!=''){
					
					this.postingcodeData.push(form.value);
				}
			}else {
				form.value.depositType='' ;
				this.postingcodeData.push(form.value);
			}

		
			
			this.postingcodeCloneData=this.postingcodeData;
			console.log(this.postingcodeCloneData);
			this.typeName='';
			this.statusName='';
			this.depositeName='';

			this.boxScrollHt= this.postingcodeData.length * 33;
			if(this.boxScrollHt>=this.temScrollHt)
			{
				this.boxScrollHt=this.temScrollHt;
			}

		}

		this.postingcodeData.map(function(element,key) {
				element.edit_mode= false;
				element.selected= false;
		   });

		this.editmode = false;
		}
		
	}

	checkErrormessage(form)
	{
		var x = form.value.defaultAmt;

		console.log( x.toString().length);

		if(form.value.code=='')
		{
			this.showErrorMsg='CODE is mandatory';
			this.errorVariable= true;

		}else if(form.value.desc=='')
		{
			this.showErrorMsg='Description is mandatory';
			this.errorVariable= true;
		}else if(form.value.type=='')
		{
			this.showErrorMsg='Type is mandatory';
			this.errorVariable= true;
		}else if(form.value.type=='Payment' && form.value.depositType=='')
		{
			this.showErrorMsg='Deposit type is mandatory';
			this.errorVariable= true;
		}else if(form.value.active=='')
		{
			this.showErrorMsg='Status is mandatory';
			this.errorVariable= true;
		}else {
			this.showErrorMsg='';
			this.errorVariable= false;
		}
	}

	checkerror(name, type)
	{
		
		if(type=='code' && name.target.value=='')
		{
			this.showErrorMsg='CODE is mandatory';
			this.errorVariable= true;
			
		}else {
			this.showErrorMsg='';
			this.errorVariable= false;
			
		}

		if(type=='des' && name.target.value=='')
		{
			this.showErrorMsg='Description is mandatory';
			this.errorVariable= true;
			
		}else {
			this.showErrorMsg='';
			this.errorVariable= false;
			
		}


	}

	
	

	forpostingcodeData(state){
		if(state == 'edit'){
			this.editmode = true;
		} else {
			this.editmode = false;
		}
		}

		selectTypename(typeName)
		{
			this.typeName=typeName;
			if(typeName=='')
			{
				this.showErrorMsg='Type is mandatory';
				this.errorVariable= true;
				
			}else {
				this.showErrorMsg='';
				this.errorVariable= false;
				
			}

			if(typeName=='Payment')
			{
				this.depositeBoolean=true;
			}else {
				this.depositeBoolean=false;
			}
		}

		selectStatusname(typeName)
		{
			this.statusName=typeName;

			if(typeName=='')
			{
				this.showErrorMsg='Status is mandatory';
				this.errorVariable= true;
				
			}else {
				this.showErrorMsg='';
				this.errorVariable= false;
				
			}
			
			if(this.statusName=='Active')
			{
				this.statusName='Y';
			}else {
				this.statusName='N';
			}
			
		}

		selectDepositename(typeName)
		{
			this.depositeName=typeName;
			if(typeName=='')
			{
				this.showErrorMsg='Deposit type is mandatory';
				this.errorVariable= true;
				
			}else {
				this.showErrorMsg='';
				this.errorVariable= false;
				
			}

			
		}

		showAllpostingCode()
		{
			var myJSON1 = JSON.stringify(this.postingcodeCloneData);
			this.postingcodeData = JSON.parse((myJSON1));

			if(this.showAll==false)
			{
				this.showAll=true; 
			}else {

				this.postingcodeData = this.postingcodeData.filter(item => {
					return (item.active.includes('Y'))
				});
				this.showAll=false; 
			}

			this.postingcodeData.map(function(element,key) {
				element.edit_mode= false;
				element.selected= false;
			   });
			   
			   this.boxScrollHt= this.postingcodeData.length * 33;
				if(this.boxScrollHt>=this.temScrollHt)
				{
					this.boxScrollHt=this.temScrollHt;
				}

			this.editmode = false;

		}

		editModeactive(index)
		{
			
			this.postingcodeData.map(function(element,key) {
				element.edit_time_mode=false;
				if(element.selected==true && key!=index)
				  {
					element.selected= false;
					element.edit_mode= false;
				   
				  }
			   });
			  this.postingcodeData[index].selected = this.postingcodeData[index].selected==false ? true : false;
			  this.postingcodeData[index].edit_mode = false ;
		}

		

		editPostingmode(index)
		{
		  
		  this.postingcodeData.map(function(element,key) {
			if(element.edit_mode==true && key!=index)
			  {
				element.edit_mode= false;
				element.selected= false;
			  }
		   });
		  this.postingcodeData[index].edit_mode = this.postingcodeData[index].edit_mode==false ? true : false;
		}

		upadtePostingdata(data, index, type)
		{
			var myJSON1 = JSON.stringify(this.postingcodeCloneData);
			this.postingcodeData = JSON.parse((myJSON1));

			if(type=='desc' && data.target.value!='')
			{
				this.postingcodeData[index].desc =  data.target.value ;
			}

			if(type=='amount' && data.target.value!='')
			{
				this.postingcodeData[index].defaultAmt =  data.target.value ;
			}
			 this.postingcodeCloneData=this.postingcodeData;
		}

		deletePostingData(index)
		{
			var myJSON1 = JSON.stringify(this.postingcodeCloneData);
			this.postingcodeData = JSON.parse((myJSON1));

			this.postingcodeData.splice(index, 1);
			this.postingcodeCloneData=this.postingcodeData;
		}


		appendPostingcodeData(postingcodeData){
			this.postingcodeCloneData=postingcodeData;
			this.postingcodeData=this.postingcodeCloneData;
		}
	
		closePostingcodeform()
		{
			this.editmode = false;
		}

}
