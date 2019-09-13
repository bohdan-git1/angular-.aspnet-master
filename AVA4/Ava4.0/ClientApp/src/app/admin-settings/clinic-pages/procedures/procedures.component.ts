import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FormsModule, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  @ViewChild('addoneProcedure') addoneProcedure: FormGroupDirective; 
  @ViewChild('addtenProcedure') addtenProcedure: FormGroupDirective; 
	
	procedureArr: any[] = [
		{"type": "record", "label": "Record", "color": "#FCFF7C", "time": "40", "selected": false, "editmode": false, "subprocedure": [
		  {"code": "101", "label": "Initial - Child", "count": "40", "openup_doctor_assistant": "No"},
		  {"code": "102", "label": "Initial - Adult", "count": "40", "openup_doctor_assistant": "No"},
		  {"code": "103", "label": "Initial - Transfer In", "count": "40", "openup_doctor_assistant": "No"},
		  {"code": "104", "label": "Initial - Transfer Retent", "count": "40", "openup_doctor_assistant": "No"},
		  {"code": "105", "label": "Initial - Second Opinion", "count": "40", "openup_doctor_assistant": "No"},
		  {"code": "106", "label": "Recall", "count": "40", "openup_doctor_assistant": "No"}
		]},
		{"type": "exam", "label": "Exam", "color": "#FD7474", "time": "60", "selected": false, "editmode": false, "subprocedure" : [
		  { "code": "201", "label": "Recall - Phase 1", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "202", "label": "Recall with Pano", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "203", "label": "Records - Child", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "204", "label": "Records - Adult", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "205", "label": "Records - Progress", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "206", "label": "Records - Update", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "207", "label": "Records - Update w/ our", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "208", "label": "Kodas", "count": "60", "openup_doctor_assistant": "No"},
		  { "code": "209", "label": "Pano", "count": "60", "openup_doctor_assistant": "No"}
		]},
		{"type": "start", "label": "Start", "color": "#74B3FD", "time": "40", "selected": false, "editmode": false, "subprocedure" : [
			{ "code": "301", "label": "Progress Pano", "count": "40", "openup_doctor_assistant": "No"},
			{ "code": "302", "label": "Surgical Models & Hook", "count": "40", "openup_doctor_assistant": "No"},
			{ "code": "303", "label": "Scan - Rescan", "count": "40", "openup_doctor_assistant": "No"},
			{ "code": "304", "label": "Records child w/ our Pano", "count": "40", "openup_doctor_assistant": "No"},
			{ "code": "305", "label": "Records child brought", "count": "40", "openup_doctor_assistant": "No"},
			{ "code": "306", "label": "Records adult w/ our Pano", "count": "40", "openup_doctor_assistant": "No"}]},
		
		{"type": "appl", "label": "Appl", "color": "#F6CC61", "time": "70", "selected": false, "editmode": false, "subprocedure" : [{ "code": "401", "label": "401 - Consult Child", "count": "70", "openup_doctor_assistant": "No"},
      { "code": "402", "label": "402 - Consult Adult", "count": "70", "openup_doctor_assistant": "No"},
      { "code": "405", "label": "405 - Consult - Progress", "count": "70", "openup_doctor_assistant": "No"},
      { "code": "406", "label": "406 - Consult Extra", "count": "70", "openup_doctor_assistant": "No"}]},
		{"type": "adj", "label": "ADJ", "color": "#8CF1E4", "time": "10", "selected": false, "editmode": false, "subprocedure" : [
      { "code": "450", "label": "450 - SEPS", "count": "10", "openup_doctor_assistant": "No"},
      { "code": "530", "label": "530 - IA - Dentist referred", "count": "10", "openup_doctor_assistant": "No"},
      { "code": "531", "label": "531 - IA - Patient referred ", "count": "10", "openup_doctor_assistant": "No"}
    ]},
		{"type": "dband", "label": "D - Band", "color": "#B48CF6", "time": "60", "selected": false, "editmode": false, "subprocedure" : [{ "code": "532", "label": "532 IA - Advertisement Referred", "count": "60", "openup_doctor_assistant": "No"},
      { "code": "533", "label": "532 IA - Website Referred", "count": "60", "openup_doctor_assistant": "No"},
      { "code": "534", "label": "532 IA - Friend Referred", "count": "60", "openup_doctor_assistant": "No"}]},
		{"type": "events", "label": "Events", "color": "#C4C4C4", "time": "", "selected": false, "editmode": false, "subprocedure" : [{ "code": "532", "label": "532 IA -Meeting", "count": "15", "openup_doctor_assistant": "No"},
      { "code": "533", "label": "532 IA - Luncheon", "count": "30", "openup_doctor_assistant": "No"},
      { "code": "534", "label": "532 IA - Friend Referred", "count": "10", "openup_doctor_assistant": "No"}]}
	];
	
	selectedProcedureList: any[] = [];
	selectedProcedureSection: any;
	seletcedProcedureIndx: any;
	shownewTabEditor:boolean = false;
	
  formopenArray: any[];

  tentimeShowprocedureField = Array; 
  num:number = 10;
  code: any='';
  
  numbersArray: any[];
  numberof_box: any='';
  width_set: any='407';
  
  selectorColorArr: any[] = [
	{"row": [{"color": "#FCFF7C", "selected": false}, {"color": "#FD7474", "selected": false}, {"color": "#74B3FD", "selected": false}]},
	{"row": [{"color": "#F6CC61", "selected": false}, {"color": "#8CF1E4", "selected": false}, {"color": "#B48CF6", "selected": false}]},
	{"row": [{"color": "#2EA8A8", "selected": false}, {"color": "#FECACA", "selected": false}, {"color": "#DE473E", "selected": false}]},
	{"row": [{"color": "#37DBFF", "selected": false}, {"color": "#39D56E", "selected": false}, {"color": "#BF60A4", "selected": false}]},
	{"row": [{"color": "#BDBE8B", "selected": false}, {"color": "#FF9DEA", "selected": false}, {"color": "#FF9549", "selected": true}]}
  ];
  
  opencolorSwatch: boolean = false;
  selectedColor: any;
  newTabGrp: any;
  newTabGrpDuration: any;
 
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	boxHt: any;
	
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}

  constructor() {

    this.formopenArray =[
      {"section": "record", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "exam", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "start", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "appl", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "adj", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "dband", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false},
      {"section": "events", "procedure_field_one": false, "procedure_field_ten": false, "countval":"1", "showaction": false}]
    
   }

  ngOnInit() {
	this.initalizeFrame();
	this.initializeColorPanel();
  }
  
  initalizeFrame(){
	let topHt:any = 139;
	let bottomHt: any = 110;
	
	this.boxHt = window.innerHeight - (topHt + bottomHt);
	
	this.calculateBoxes();
  }
  
  initializeColorPanel(){
	let rowIndx: any = this.selectorColorArr.length-1;
	let colIndx: any = this.selectorColorArr[rowIndx].row.length-1;
	
	this.selectColor(rowIndx, colIndx);
  }
  
  calculateBoxes(){
	
	this.procedureArr.map(elems => {
		elems.subprocedure.map(item => {
			let numOfBox: any = item.count/5;
			let boxWd: any = 317/numOfBox;
			item.boxWd = boxWd;
			item.boxLabelArr = [];
			for(let i=0; i<numOfBox; i++){
				let labelNum: any = (i+1)*5;
				item.boxLabelArr.push(labelNum);
			}
		})
	})

  }


	openup_doctor_assistant_section(index){
	  
		this.procedureArr[this.seletcedProcedureIndx].subprocedure.forEach((element,key) => {
			if(element.openup_doctor_assistant=='Yes' && key!=index){
				element.openup_doctor_assistant= 'No';
			}
		});
		
		this.procedureArr[this.seletcedProcedureIndx].subprocedure[index].openup_doctor_assistant = this.procedureArr[this.seletcedProcedureIndx].subprocedure[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';	  
	  
	}


	hide_doctor_assistant_section(index){
		this.procedureArr[this.seletcedProcedureIndx].subprocedure.splice(index, 1);
		this.selectedProcedureList = this.procedureArr[this.seletcedProcedureIndx].subprocedure.map(item => {return item});
	}

  Upadte_promocode_name(name, index) {
	  this.procedureArr[this.seletcedProcedureIndx].subprocedure[index].label =  name.target.value;
	  this.selectedProcedureList = this.procedureArr[this.seletcedProcedureIndx].subprocedure.map(item => {return item});
  }

  Upadte_promocode_time(time, index) {
  
    let checkmultiple = this.checkMultipleoffive(time.target.value);
	
	if(checkmultiple){
		this.procedureArr[this.seletcedProcedureIndx].subprocedure[index].count =  time.target.value ;
		this.calculateBoxes();
	}

  }

  checkMultipleoffive(number) {
      let checkmultiple  = number%5==0 ? true : false;
      return checkmultiple; 
  }

  add_procedure_field(block_type, indx){
        this.formopenArray.map(item => {
          if(item.section==block_type) {
            item.procedure_field_one = true;
            item.procedure_field_ten = false;
            item.countval = 10;
          }
        });

		this.formopenArray[indx].showaction = true;

  }

  change_procedure_field_form(block_type){
   
    this.formopenArray.map(item => {
      if(item.section==block_type) {
        item.procedure_field_one = item.procedure_field_one== true ? false : true ;
        item.procedure_field_ten = item.procedure_field_ten== true ? false : true ;
        if(item.procedure_field_one )
        {
          item.countval = 10;
        }else {
          item.countval = 1;
        }
      }
  });
  }

  add_one_procedure_code_fn(form, indx) {
	
	if(form.value.code!='' && form.value.label!='' && form.value.count!=''){
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple){
		  let subprocedureItem: any = { code: form.value.code, label: form.value.label, count:form.value.count, openup_doctor_assistant:'No'};
		  
		  this.procedureArr[this.seletcedProcedureIndx].subprocedure.push(subprocedureItem);
		  this.selectedProcedureList = this.procedureArr[this.seletcedProcedureIndx].subprocedure.map(item => {return item});
        }
        this.calculateBoxes();
	}
	
	this.formopenArray.map(item => {
		item.procedure_field_one =  false;
		item.procedure_field_ten = false;
		item.showaction = false;
    });
	
  }

  add_ten_procedure_code_fn(form, indx) {
	
	for( var i=0; i<10; i++){
       
        if(form[i].code!='' && form[i].label!='' && form[i].count!=''){
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple){
            //this.recordArraylist.push(form[i]);
			
			let subprocedureItem: any = { code: form[i].code, label: form[i].label, count: form[i].count, openup_doctor_assistant:'No'};
		  
			this.procedureArr[this.seletcedProcedureIndx].subprocedure.push(subprocedureItem);
			this.selectedProcedureList = this.procedureArr[this.seletcedProcedureIndx].subprocedure.map(item => {return item});
          }
		}
	}
	
	this.calculateBoxes();
	this.formopenArray.map(item => {
		item.procedure_field_one = false;
		item.procedure_field_ten = false;
		item.showaction = false;
	});
	
	this.formopenArray[indx].showaction = false;
  }
  
	selectProcedureTab(indx){
		this.procedureArr.map((item, _indx) => {
			if(_indx != indx){
				item.selected = false;
				item.editmode = false;
			}
		});
		
		this.formopenArray.map(item => {
			item.showaction = false;
			item.procedure_field_one = false;
			item.procedure_field_ten = false;
		});
		
		this.procedureArr[indx].selected = this.procedureArr[indx].selected == true ? false : true;
		
		if(this.procedureArr[indx].selected == true){
			this.selectedProcedureSection = this.procedureArr[indx];
			this.seletcedProcedureIndx = indx;
			this.selectedProcedureList = this.procedureArr[indx].subprocedure.map(item => {return item});
			
		} else {
			this.selectedProcedureSection = null;
		}
		
		this.shownewTabEditor = false;
		
	}
	
	addnewTab(){
		this.procedureArr.map((item, _indx) => {
			item.selected = false;
			item.editmode = false;
		});
		this.selectedProcedureSection = null;
		this.newTabGrp = '';
		this.newTabGrpDuration = '';
		this.initializeColorPanel();
		
		this.shownewTabEditor = this.shownewTabEditor == true ? false : true;
	}
	
	openColorSelector(){
		this.opencolorSwatch = this.opencolorSwatch == true ? false : true;
	}
	
	selectColor(rowindx, colindx){
		this.selectorColorArr.map(elems => {
			elems.row.map(item => {
				item.selected = false;
			})
		})
		
		this.selectorColorArr[rowindx].row[colindx].selected = true;
		this.selectedColor = this.selectorColorArr[rowindx].row[colindx].color;
		this.opencolorSwatch = false;
	}
	
	addnewTabItem() {
		if(this.newTabGrp != '' && this.newTabGrpDuration != ''){
			let _type: any = this.newTabGrp.replace(/\s/g, "").toLowerCase();
			this.procedureArr.unshift({"type": _type, "label": this.newTabGrp, "color": this.selectedColor, "time": this.newTabGrpDuration, "selected": false, "editmode": false, "subprocedure": []});
			
			this.formopenArray.unshift({"section": _type, "procedure_field_one": false, "procedure_field_ten": false,  "countval":'1', "showaction": false});
			
			this.selectProcedureTab(0);
			
			this.shownewTabEditor = false;
			this.newTabGrp = '';
			this.newTabGrpDuration = '';
		}
	}
	
	editTabItem(indx) {
		this.procedureArr[indx].editmode = true;
		this.newTabGrp = this.procedureArr[indx].label;
		
		let rowIndx:any;
		let colIndx: any;
		
		for(let i=0; i<this.selectorColorArr.length; i++){
			for(let j=0; j<this.selectorColorArr[i].row.length; j++){
				if(this.selectorColorArr[i].row[j].color == this.procedureArr[indx].color){
					rowIndx = i;
					colIndx = j;
					break;
				}
			}
		}
		
		this.selectColor(rowIndx, colIndx);
		
		this.newTabGrpDuration = this.procedureArr[indx].time;
	}
	
	saveEditedTabItem(indx){
		if(this.newTabGrp != '' && this.newTabGrpDuration != ''){
			this.procedureArr[indx].label = this.newTabGrp;
			this.procedureArr[indx].color = this.selectedColor;
			this.procedureArr[indx].time = this.newTabGrpDuration;
			
			this.newTabGrp = '';
			this.newTabGrpDuration = '';
		}
		
		this.procedureArr[indx].editmode = false;
		
		
	}
}
