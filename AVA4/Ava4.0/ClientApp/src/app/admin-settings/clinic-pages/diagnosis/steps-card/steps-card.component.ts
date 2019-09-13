import { Component, OnInit, Input } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-steps-card',
  templateUrl: './steps-card.component.html',
  styleUrls: ['./steps-card.component.css']
})
export class StepsCardComponent implements OnInit {
	
	@Input() boxHt: any;
	
  public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};

  stepsArr=[
    {"label" : "Aligners", "time" : "2", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false },
    {"label" : "Aligners + MidCourse Correction/Refinements", "time" : "6",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false} ,
    {"label" : "Band / Bond both arches", "time" : "2",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Band / Bond Mand Arch", "time" : "2",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Band / Bond Max Arch", "time" : "3",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Bionator", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Bite Plate", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Bond Mandibular Arch", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Bond Maxillary Arch", "time" : "2", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Cast retainer(s) by general dentist", "time" : "6", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Cervical Headgear", "time" : "9", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Details & Elastics", "time" : "5", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Elastics", "time" : ".5",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Evaluate TMJ-referral/treatment as needed", "time" : ".5", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Evaluate third molars", "time" : "3",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Extract", "time" : "3", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Extract third molars", "time" : "16",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Hayes nance Habit Appliance", "time" : "6",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Hyrax", "time" : "1", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "IG-Interim Guiding Retainer", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Invisalign", "time" : "18", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Level & Align", "time" : "1",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Lingual mandibular 3-3", "time" : "1",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false} ,
    {"label" : "Lingual maxillary 1-1", "time" : "1",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Lip Bumper", "time" : "8",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Mandibular 2x4", "time" : "6",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Mandibular hard acrylic splint", "time" : ".5", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Mandibular Swarz", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Maxillary 2x4", "time" : "3", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Maxillary hard acrylic splint", "time" : "6",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Maxillary Swarz", "time" : "1", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Observe", "time" : ".5", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Orthognathic Consult", "time" : "3",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Orthognathic Surgery", "time" : "8", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Refer for prosthetics/restorative", "time" : "2",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Retainers: Standard Hawley", "time" : "1", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Retainers: Standard Hawley & Tru-Tain", "time" : "3",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Retainers: Tru-Tain", "time" : "5",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "Retention: Invisalign Retainers", "time" : "2",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "RPE", "time" : "2", 'timeunit': 'm',"selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "SDDA-Screw Driven Distalizing Appliance", "time" : "2",'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
    {"label" : "VECS RPE", "time" : "2", 'timeunit': 'm', "selected": false, "edit_mode": false ,"edit_time_mode": false},
  ];

  TimebarArray: any[] = [
    {"code": "d", "label": "Days"},
    {"code": "w", "label": "Weeks"},
    {"code": "m", "label": "Months"}
  ];


  

StepsPlanArra: any[]=[
  { "label": 'Non-Extraction Plan (18)', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm','edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Non-Extraction Plan (24)', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm','edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Non-Extraction Plan (36)', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  
  { "label": 'Non-Extraction Plan', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Extraction Plan', 'time': 18, 'unit': 'm', "selected": false, 'edit_mode': false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Serial Extraction Plan', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm','edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Invisalign Plan', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]},
  
  { "label": 'Clear Correct Plan', 'time': 18, 'unit': 'm', "selected": false, "edit_mode": false,
  "category": [
    {'id': 1, 'category_name': 'Hyrax', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 2, 'category_name': 'Maxillary 2x4', 'time': 6, 'unit': 'm', 'edit_mode': false },
    {'id': 3, 'category_name': 'Maxillary Schwarz', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 4, 'category_name': 'Band / Bond both arches', 'time': 2, 'unit': 'm', 'edit_mode': false },
    {'id': 5, 'category_name': 'Level & Align', 'time': 3, 'unit': 'm', 'edit_mode': false },
    {'id': 6, 'category_name': 'Details & Elastics', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 7, 'category_name': 'Retainers: Standard Hawley & Tru-Tain', 'time': 1, 'unit': 'm', 'edit_mode': false },
    {'id': 8, 'category_name': 'Evaluate third molars', 'time': 1, 'unit': 'm', 'edit_mode': false }
  ]}
  ];

  add_step_items: boolean=false;
  search_time_var: boolean= false;
  search_time_edit_var: boolean=false;
  addGoal:any = {};
  addStep:any ={};
  Timecode_val: any ='';
  Timecode_left_style= 158;
  height_stepplan_style= 25;
  search_time_edit_plan: boolean=false;

  addStepplan:any={};
  addInnerStep:any = {};
  search_time_var_inner:boolean = false;
  Timecode_val_inner: any ='';

  
  constructor() { }

  ngOnInit() {
  }

  step_label_edit_mode_on(index)
  {
      this.stepsArr.forEach(function(element,key) {
        element.edit_time_mode=false;
        if(element.selected==true && key!=index)
          {
            element.selected= false;
            element.edit_mode= false;
           
          }
       });
      this.stepsArr[index].selected = this.stepsArr[index].selected==false ? true : false;
  }

  

  step_label_edit(index)
  {
    
    this.stepsArr.forEach(function(element,key) {
      if(element.edit_mode==true && key!=index)
        {
          element.edit_mode= false;
          element.selected= false;
        }
     });
    this.stepsArr[index].edit_mode = this.stepsArr[index].edit_mode==false ? true : false;
  }

  
  delete_step_from_list(index)
  {
    this.stepsArr.splice(index, 1);
  }

  Upadte_step_name(name, index)
  {
        if(name.target.value!='')
        {
          this.stepsArr[index].label =  name.target.value ;
        }
        this.step_label_edit(index);
  }

  

  step_time_edit_mode_on(index)
  {
  
      this.stepsArr.forEach(function(element,key) {
        if(element.edit_time_mode==true && key!=index)
          {
            element.selected= false;
            element.edit_time_mode= false;
          }
       });
      this.stepsArr[index].edit_time_mode = this.stepsArr[index].edit_time_mode==false ? true : false;
  }


  Upadte_step_time(time, index)
  {
        if(time.target.value!='')
        {
          this.stepsArr[index].time =  time.target.value ;
          this.search_time_edit_var= true;
        }
       
  }

  selecteditTime(code, indxx)
  {
    if(this.stepsArr[indxx].time)
    {
      this.stepsArr[indxx].timeunit =  code;
      this.search_time_edit_var= false;
    }
  }

  add_step_item_field_on()
  {
    this.add_step_items = this.add_step_items==false ? true : false;
  }

  add_step_plan_item()
  {
    
    if(this.addStepplan.add_step_item)
    {
      this.StepsPlanArra.push({'label' :this.addStepplan.add_step_item, 'time': '', 'unit': '',  "selected": false, "edit_mode": false, "category":[]});

    }
   
  }



  add_step_item()
  {
    let digit_count_no= this.digits_count(this.addStep.add_step_time);

    if(this.addStep.add_step_item && this.addStep.add_step_time && digit_count_no>=1) {
      this.stepsArr.push({'label' :this.addStep.add_step_item, 'time': this.addStep.add_step_time, 'timeunit': this.Timecode_val,  "selected": false, "edit_mode": false,"edit_time_mode": false});
	  
	  this.addStep.add_step_item = null;
	  this.addStep.add_step_time = null;
	  this.Timecode_val = null;

    }
    this.add_step_items = false;
  }

  addStepInStepPlan(indx:number){
	
	if(this.addInnerStep.add_step_item && this.addInnerStep.add_step_time){
		var temp={
		  'id': this.StepsPlanArra[indx].category.length+1, 
		  'category_name': this.addInnerStep.add_step_item, 
		  'time': this.addInnerStep.add_step_time, 
		  'unit': 'm',
		  'edit_mode': false 
		}
		
		this.StepsPlanArra[indx].category.push(temp);
		this.addInnerStep.add_step_item=null;
		this.addInnerStep.add_step_time=null;
		this.Timecode_val_inner=null;
	}
  }

  showAllbar(index)
  {
    this.search_time_edit_var = this.search_time_edit_var==false ? true : false;
  }

  showAllbar_step_plan(index)
  {
    this.search_time_edit_plan = this.search_time_edit_plan==false ? true : false;
  }

  showAllbar_foradd()
  {
    this.search_time_var = this.search_time_var==false ? true : false;
  }
  
  showAllbar_foradd_inner()
  {
    this.search_time_var_inner = this.search_time_var_inner==false ? true : false;
  }

  searchTime(){
   
   let digit_count_no= this.digits_count(this.addStep.add_step_time);
    if(digit_count_no>=1){
      this.search_time_var = true ;
      this.Timecode_left_style=12;
      this.Timecode_left_style =  this.Timecode_left_style + ((digit_count_no-1)*6);
      if(digit_count_no>=4){
        this.Timecode_left_style =  32;
      }

    }else {
      this.search_time_var = false ;
      this.Timecode_left_style=12;
    }
    this.Timecode_val='';
  }
  
  searchTimeInnerSteps(){
   
   let digit_count_no= this.digits_count(this.addInnerStep.add_step_time);
    if(digit_count_no>=1){
      this.search_time_var_inner = true ;
      this.Timecode_left_style=12;
      this.Timecode_left_style =  this.Timecode_left_style + ((digit_count_no-1)*6);
      if(digit_count_no>=4){
        this.Timecode_left_style =  32;
      }

    }else {
      this.search_time_var_inner = false ;
      this.Timecode_left_style=12;
    }
    this.Timecode_val='';
  }


   digits_count(n) {
    var count = 0;
    if (n >= 1) ++count;
  
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
    return count;
  }



    selectTime(Timecode)
    {
        this.Timecode_val=Timecode;
        this.search_time_var = false ;
    }
	
	selectTimeInner(Timecode)
    {
        this.Timecode_val_inner=Timecode;
        this.search_time_var_inner = false ;
    }

    stepPlan_edit_mode(index) {
      this.StepsPlanArra.map((element,key) => {
        if(element.selected==true && key!=index) {
            element.selected= false;
            element.edit_mode= false;
          }
       });
	   
      this.StepsPlanArra[index].selected = this.StepsPlanArra[index].selected==false ? true : false;
    }


    
  delete_step_plan(index)
  {
    this.StepsPlanArra.splice(index, 1);
  }
  delete_Cat_Step(indx,indx1){
    this.StepsPlanArra[indx].category.splice(indx1, 1);
  }

  

  edit_step_plan(index)
  {
    this.StepsPlanArra.forEach(function(element,key) {
      if(element.edit_mode==true && key!=index)
        {
          element.edit_mode= false;
          element.selected= false;
        }
     });
    this.StepsPlanArra[index].edit_mode = this.StepsPlanArra[index].edit_mode==false ? true : false;
  }

  
  Upadte_step_plan(name, index)
  {
        if(name.target.value!='')
        {
          this.StepsPlanArra[index].label =  name.target.value ;
        }
        this.edit_step_plan(index)
  }
  
  Upadte_stepCat_plan(name, index,index1)
  {
        if(name.target.value!='')
        {
          this.StepsPlanArra[index].category[index1].category_name =  name.target.value ;
        }
        //this.edit_step_plan(index);
        this.StepsPlanArra[index].category[index1].edit_mode=false;
  }

  

  Upadte_stepplan_time(time, index)
  {
        if(time.target.value!='')
        {
          this.StepsPlanArra[index].time =  time.target.value ;
          this.search_time_edit_plan= true;
        }
  }

  Update_stepplan_cat_time(time, index,index1)
  {
        if(time.target.value!='')
        {
          this.StepsPlanArra[index].category[index1].time =  time.target.value ;
          //this.StepsPlanArra[index].time =  time.target.value ;
          this.search_time_edit_plan= true;
        }
  }



  selecteditTime_plan(code, indxx)
  {
   
    if(this.StepsPlanArra[indxx].time)
    {
      this.StepsPlanArra[indxx].unit =  code;
      this.search_time_edit_plan= false;
    }
    this.edit_step_plan(indxx)
   
  }
  selecteditTime_Catplan(code, indxx,indx1)
  {
   
    if(this.StepsPlanArra[indxx].category[indx1].time)
    {
      this.StepsPlanArra[indxx].category[indx1].unit =  code;
      this.search_time_edit_plan= false;
    }
    //this.edit_step_plan(indxx);
    this.StepsPlanArra[indxx].category[indx1].edit_mode=false;
   
  }
  
  stepsPlanCategorySelected(indx, subindx){
	
	this.StepsPlanArra[indx].category.map((item, key) => {
				
		if(subindx != key && item.selected == true){
			item.selected=false;
			item.edit_mode=false;
		}
		
		
	});
	
	this.StepsPlanArra[indx].category[subindx].selected = this.StepsPlanArra[indx].category[subindx].selected==true ? false : true;
	
	
  }



}
