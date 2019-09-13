import { Component, OnInit, Output, EventEmitter, Inject, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MessageService } from '../../core/message.service';


@Component({
  selector: 'app-relationshipcard',
  templateUrl: './relationshipcard.component.html',
  styleUrls: ['./relationshipcard.component.css']
})
export class RelationshipcardComponent implements OnInit {
	
	@Output() goback = new EventEmitter();
	@Output() currentRelationData = new EventEmitter();
	
	
	relnData:any[] = [
		{'relationtype': 'MO - Mother', 
		'fname': 'Clarissa Marcum', 
		'mname': 'Clarissa Marcum', 
		'lname': 'Clarissa Marcum', 
		'preferredName': 'Clarissa Marcum',
		 'uid': '1',
		'email': 'marcumclarissa@gmail.com', 
		'phone':'(555) 555-1363', 
		'streetAdd': 'Kirkland & Ellis law',
		'city': 'krrtr',
		 'state': 'wfg',
		 'zip': '65076',
		 'dateOfBirth': '09/56/1970',
		 'ssn': '9065',
		 'workPhone': '6558957',

		'employer': 'Kirkland & Ellis law', 

		'insurance': 'Aetna',
		'empid': 'er8',

		 'group': '787-54-3323', 
 		 'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		

		  {'relationtype': 'FA - Father', 
		  'fname': 'Peter K. Goslin', 
		  'mname': 'Peter K. Goslin', 
		  'lname': 'Peter K. Goslin', 
		  'preferredName': 'Clarissa Marcum',
		  'uid': '2',
		  'email': 'tymarcumclarissa@gmail.com', 
		  'phone':'(555) 555-1363', 
		  'streetAdd': 'Kirkland & Ellis law',
		  'city': 'krrtr',
		   'state': 'wfg',
		   'zip': '65076',
		   'dateOfBirth': '09/56/1970',
		   'ssn': '9065',
		   'workPhone': '6558957',
  
		  'employer': 'Kirkland & Ellis law', 
  
		  'insurance': 'Aetna',
		  'empid': 'er8',
  
		   'group': '787-54-3323', 
			'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		
			

			{'relationtype': 'SP - Spouse', 
			'fname': 'Spencer Marcum', 
			'mname': 'Spencer Marcum', 
			'lname': 'Spencer Marcum', 
			'preferredName': 'Clarissa Marcum',
			'uid': '3',
			'email': 'ewyiuhmarcumclarissa@gmail.com', 
			'phone':'(555) 555-1363', 
			'streetAdd': 'Kirkland & Ellis law',
			'city': 'krrtr',
			 'state': 'wfg',
			 'zip': '65076',
			 'dateOfBirth': '09/56/1970',
			 'ssn': '9065',
			 'workPhone': '6558957',
	
			'employer': 'Kirkland & Ellis law', 
	
			'insurance': 'Aetna',
			'empid': 'er8',
	
			 'group': '787-54-3323', 
			  'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		  
		
	];


	listarr:any[] = [
		{'option': 'MO - Mother'},
		{'option': 'FA - Father'},
		{'option': 'SP - Spouse'},
		{'option': 'SM - Stepmother'},
		{'option': 'SF - Stepfather'},
		{'option': 'GM - Grandmother'},
		{'option': 'GF - Grandfather'},
		{'option': 'FP - Foster Parent'},
		{'option': 'PT - Partner'},
		{'option': 'AN - Aunt'},
		{'option': 'UN - Uncle'},
		{'option': 'OT - Other'},
		]

		

		employerArray:any[] = [
			{'option': 'Kirkland & Ellis law'},
			{'option': 'Ellis law'},
			{'option': 'law'},
			]

	
	selectedItem: any = null;
	selectedRelationItem: any = 'Relationship to patient';
	selectedEmpItem: any= 'Employer...'; 

	relationShiformData:any = {};
	insertOrUpdate: boolean= false; 
	indexVal: any;
	refInsearch: boolean= false;
	filterInRelation: any[];
	selectedRePatient: any='';



	relationtype: any = null;
	posLeft: any = 0;
	
	phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	dobmask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
	
	/*
	dobmask = []
	*/
	
	
	showInputForm: boolean = false;
	searchBar : boolean= false;
	addNewRelation: boolean= true ;
	fname: any;
	checkrelationExist: boolean= false;
	checkrelationExistArray: any= [];
	Uid: any;



	
	constructor(public mat_dialog: MatDialog, private messageService: MessageService) { }

  ngOnInit() {

	//this.messageService.sendMessage('dropdownlebal', this.selectedRelationItem);
	//this.messageService.sendMessage('dropdownlebalforEMp', this.selectedEmpItem);
	

  }
  
  showSelectedDetails(item, index) {
	
	this.showInputForm = true;
	this.insertOrUpdate= true; 
	this.searchBar= false; 
	this.relationShiformData = item;
	this.selectedRelationItem= this.relationShiformData.relationtype;
	this.selectedEmpItem= this.relationShiformData.employer;
	this.fname= this.relationShiformData.fname;
	this.indexVal= index;
	this.Uid= this.relationShiformData.uid;
	this.addNewRelation= true;
	
	
	//this.messageService.sendMessage('dropdownlebal', this.selectedRelationItem); 
	//this.messageService.sendMessage('dropdownlebalforEMp', this.selectedEmpItem);

	

  }
  
  backtoMain() {
	
	this.showInputForm= false;
	this.refInsearch = false;
	this.insertOrUpdate= false; 
	this.addNewRelation= true;
	this.indexVal= '';
	this.selectedRePatient= '';
	this.relationShiformData={};

	this.selectedRelationItem='Relationship to patient';
	this.selectedEmpItem= 'Employer...';
	this.fname= '';
	this.checkrelationExist= false;
	this.goback.emit('back');
	//this.messageService.sendMessage('dropdownlebal', 'Relationship to patient');
	//this.messageService.sendMessage('dropdownlebalforEMp', 'Employer...');
  }
  
 
  
  gotoInput() {
	this.selectedRelationItem='Relationship to patient';
	this.selectedEmpItem= 'Employer...';
	this.fname= '';
	this.checkrelationExist= false;
	this.showInputForm = true;
	this.insertOrUpdate= false; 
	this.indexVal= '';
	this.selectedRePatient= '';
	this.relationShiformData={};
	this.searchBar= true;
	this.addNewRelation= false;
	//this.messageService.sendMessage('dropdownlebal', 'Relationship to patient');
	//this.messageService.sendMessage('dropdownlebalforEMp', 'Employer...');


  }

  hideForm() {
	
	this.showInputForm = false;
  }

  
  
  backtoPrevious() {
	this.posLeft = 0;
  }

  relationShipItemSet(evt, type)
  {
	
	if(type=='R')
	{

		//alert( this.indexVal );
		this.selectedRelationItem= evt;

		this.checkrelationExistArray = this.relnData.filter(item => { 
			
			return (item.relationtype.includes(this.selectedRelationItem))

		  });
		
		  if(this.checkrelationExistArray.length>0 && this.insertOrUpdate==false)
		  {
			  this.checkrelationExist= true; 
		  }else if(this.checkrelationExistArray.length>0 && this.insertOrUpdate==true && this.checkrelationExistArray[0].uid !=this.Uid)
		  {
			this.checkrelationExist= true;
		  }else {
			this.checkrelationExist= false;
		  }
		

	}else if(type=='E')
	{
		this.selectedEmpItem= evt;
	}
	console.log(this.relnData);
	
  }


  saveRelationFu()
  {
	  if(this.selectedRelationItem!='Relationship to patient'){
			this.relationShiformData.relationtype=this.selectedRelationItem;
	  }else {
		this.relationShiformData.relationtype='';
	  }

	  if(this.selectedEmpItem!='Employer...'){
		this.relationShiformData.employer=this.selectedEmpItem;
  	  }else {
		this.relationShiformData.employer='';
	  }

	  if(this.fname!='')
	  {
		this.relationShiformData.fname= this.fname;
	  }else {
		this.relationShiformData.fname= '';
	  }
	  
	 

		if(this.insertOrUpdate===true && this.checkrelationExist===false)
		{	
		
			this.relnData[this.indexVal]= this.relationShiformData;

		}else if(this.relationShiformData.employer!='' && this.relationShiformData.relationtype!='' && typeof this.relationShiformData.fname!= "undefined" && typeof this.relationShiformData.mname!= "undefined" && this.checkrelationExist===false) {
			this.relationShiformData.uid= Math.floor(Math.random() * 90 + 10);

			this.relnData.push(this.relationShiformData);
		}
		
		this.showInputForm = false;
		this.insertOrUpdate= false; 
		this.checkrelationExist = false;
		this.relationShiformData={};

		this.searchBar = false;
		this.addNewRelation = true ;

		this.selectedRelationItem='Relationship to patient';
		this.selectedEmpItem= 'Employer...';
		this.fname= '';
	
		this.currentRelationData.emit(this.relnData);
  }

  onKeyFastname(evt)
  {
	if(evt.target.value!=''){
		this.fname=evt.target.value;
	}
  }


  searchRelationList(_searchstr){
    this.refInsearch = false;
    let searchstr = _searchstr.toLowerCase();
   
    if(searchstr.length > 1){
      this.filterInRelation = this.relnData.filter(item => {
        return (item.fname.toLowerCase().includes(searchstr) || item.mname.toLowerCase().includes(searchstr) || item.lname.toLowerCase().includes(searchstr))
      });

      if(this.filterInRelation.length == 0){
       // this.filterInRelation.push({"name": "No list found!"});
      }
	  this.refInsearch = true;
	  
	}
  }

  selectNoRelation(){
	this.refInsearch = false;
	this.showSelectedDetails('', '');
	this.searchBar= true;
	this.addNewRelation= false;
	this.insertOrUpdate=false; 
  }


  selectRelation(dritem, index){
    this.refInsearch = false;
	this.selectedRePatient= dritem.fname;
	
	this.showSelectedDetails(dritem, index);

	
  }


}
