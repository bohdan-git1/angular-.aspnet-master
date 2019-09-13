
import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-stepsdrdn',
  templateUrl: './stepsdrdn.component.html',
  styleUrls: ['./stepsdrdn.component.css']
})
export class StepsdrdnComponent implements OnInit {

	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
	@ViewChild('listboxscroll') listboxscroll: PerfectScrollbarComponent;
	@ViewChild('listboxscroll1') listboxscroll1: PerfectScrollbarComponent;



	stepLibrary: any[] = [
		
			{'title': 'Aligners', 'duration': '2 mo', 'selected': false},
			{'title': 'Aligners + MidCourse Correction/Refinements', 'duration': '6 mo', 'selected': false},
			{'title': 'Band/bond Mand Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Band/bond Mand Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Band/bond Max Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Bionator', 'duration': '3 mo', 'selected': false},
			{'title': 'Bite Plate', 'duration': '1 mo', 'selected': false},
			{'title': 'Bond Mandibular Arch', 'duration': '1 mo', 'selected': false},
			{'title': 'Extract ', 'duration': '2 wk', 'selected': false},
			{'title': 'Extract third molars', 'duration': '2 wk', 'selected': false},
			

			{'title': 'Aligners', 'duration': '2 mo', 'selected': false},
			{'title': 'Band/bond Mand Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Band/bond Mand Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Band/bond Max Arch', 'duration': '2 mo', 'selected': false},
			{'title': 'Bionator', 'duration': '3 mo', 'selected': false},
			{'title': 'Bite Plate', 'duration': '1 mo', 'selected': false},
			{'title': 'Bond Mandibular Arch', 'duration': '1 mo', 'selected': false},
			{'title': 'Extract ', 'duration': '2 wk', 'selected': false},
			{'title': 'Extract third molars', 'duration': '2 wk', 'selected': false},

			{'title': 'Bionator', 'duration': '3 mo', 'selected': false},
			{'title': 'Bite Plate', 'duration': '1 mo', 'selected': false},
			{'title': 'Bond Mandibular Arch', 'duration': '1 mo', 'selected': false},
			{'title': 'Extract ', 'duration': '2 wk', 'selected': false},
			{'title': 'Extract third molars', 'duration': '2 wk', 'selected': false},
			{'title': 'VECS RPE', 'duration': '2 wk', 'selected': false},
			{'title': 'SDDA-Screw Driven Distalizing Appliance', 'duration': '2 wk', 'selected': false},
			{'title': 'RPE', 'duration': '3 wk', 'selected': false},
			{'title': 'Retention: Invisalign Retainers', 'duration': '5 mo', 'selected': false},
			
		
	];

	searchBar: boolean= false;
	addTolibrary: any;
	addTotime: any;
	filterstepLibrary: any[];
	searchBoxHg1St: any;
	searchBoxHg2Nd: any;
	searchBoxHg3Nd: any;
	remainingBoxHg: any;



	
 @Input() drpdndata: any;
 @Output() stepLibraryStep1= new EventEmitter();

	
  constructor() { }

  ngOnInit() {

	this.boxHeight();
	
  }

  showAllLibrary()
  {
	this.filterstepLibrary = this.stepLibrary;

	this.filterstepLibrary.map(item => {
		item.selected = false;
	});

	  this.searchBar= this.searchBar== false? true : false; 
	 
	  this.searchHeight();
	  

  }

  addNewLibrary()
  {

	this.filterstepLibrary.map(item => {
		item.selected = false;
	});

	console.log(this.addTolibrary);

	if(typeof this.addTolibrary !='undefined' && typeof this.addTotime !='undefined' &&  this.addTolibrary !='' &&  this.addTotime !='')
	{
		this.stepLibrary.push({'title': this.addTolibrary , 'duration': this.addTotime, 'selected': false});
		//this.filterstepLibrary.push({'title': this.addTolibrary , 'duration': this.addTotime, 'selected': false});
		this.filterstepLibrary= this.stepLibrary;
	}
	this.addTolibrary='';
	this.addTotime='';
	setTimeout(() =>{
		this.listboxscroll.directiveRef.scrollToBottom(0, 500);
	}, 100);

	this.searchHeight();

  }

  selectForstepBox(indx)
  {
	 
	this.filterstepLibrary[indx].selected = this.filterstepLibrary[indx].selected==true ? false : true ;
	
  }

  saveTomoveStepLibrary(indx)
  {
	this.filterstepLibrary.map(item => {
		
		if(item.selected === true)
		{
			this.drpdndata[indx].ddoptions.push({'title': item.title , 'duration': item.duration, 'selected': false,  'edit': false});
		}
	});
	this.searchBar= false; 
	this.boxHeight();
	this.stepLibraryStep1.emit(this.drpdndata);
	setTimeout(() =>{
		this.listboxscroll1.directiveRef.scrollToBottom(0, 200);
	}, 300);
  }


  selectedEditOptn(sel_indx, optn_indx)
  {
	this.drpdndata[sel_indx].ddoptions.map( function(value, key){

		if(key!=optn_indx && value.selected==true)
		{
			value.selected= false;
		}

	});

	this.drpdndata[sel_indx].ddoptions[optn_indx].selected = this.drpdndata[sel_indx].ddoptions[optn_indx].selected == false ? true : false;
  }


selectedOptn(sel_indx, optn_indx)
  {

	this.drpdndata[sel_indx].ddoptions.map( function(value, key){

		if(key!=optn_indx && value.edit==true)
		{
			value.edit= false;
			value.selected= false;
		}

	});

	this.drpdndata[sel_indx].ddoptions[optn_indx].edit = this.drpdndata[sel_indx].ddoptions[optn_indx].edit == false ? true : false;

	//this.selectedEditOptn(sel_indx, optn_indx);
  }




  saveTitle(val, sel_indx, optn_indx)
  {
	  
	if(val!='')
	{
		this.drpdndata[sel_indx].ddoptions[optn_indx].title = val;
		this.drpdndata[sel_indx].ddoptions[optn_indx].selected = this.drpdndata[sel_indx].ddoptions[optn_indx].selected == false ? true : false;

	}
	this.stepLibraryStep1.emit(this.drpdndata);
  }

  saveTime(val, sel_indx, optn_indx)
  {
	if(val!='')
	{
		this.drpdndata[sel_indx].ddoptions[optn_indx].duration = val;
		this.drpdndata[sel_indx].ddoptions[optn_indx].selected = this.drpdndata[sel_indx].ddoptions[optn_indx].selected == false ? true : false;

	}
	this.stepLibraryStep1.emit(this.drpdndata);
  }


  deleteOption(sel_indx, optn_indx)
  {
	this.drpdndata[sel_indx].ddoptions.splice(optn_indx, 1);
	this.stepLibraryStep1.emit(this.drpdndata);
  }


  searchStepLibraryList(_searchstr){
    this.searchBar = false;
    let searchstr = _searchstr.toLowerCase();

    if(searchstr.length > 1){
      this.filterstepLibrary = this.stepLibrary.filter(item => {
		 
       return (item.title.toLowerCase().includes(searchstr) || item.duration.toLowerCase().includes(searchstr))
      });

      if(this.filterstepLibrary.length == 0){
       // this.filterInRelation.push({"name": "No list found!"});
      }
	  this.searchBar = true;

	  console.log(this.filterstepLibrary);
	  this.searchHeight();
	  
	}
  }


  searchHeight(){
	this.searchBoxHg1St= (this.filterstepLibrary.length*30)+110;
	if(this.searchBoxHg1St>=250)
		{
			this.searchBoxHg1St=250;
		}

	
		if(this.filterstepLibrary.length==0)
		{
			this.searchBoxHg2Nd=36;
			this.searchBoxHg1St=100;
		}else {
			this.searchBoxHg2Nd=this.searchBoxHg1St-100;
		}

		this.remainingBoxHg= this.searchBoxHg1St- this.searchBoxHg2Nd; 
  }

  boxHeight(){

		var lengthCount= 0;
		this.drpdndata.map(item => {
			lengthCount = item.ddoptions.length;
		});
		this.searchBoxHg3Nd=lengthCount*21 + 26; 
		if(this.searchBoxHg3Nd>=265)
		{
			this.searchBoxHg3Nd =265;
		}
  }

}
