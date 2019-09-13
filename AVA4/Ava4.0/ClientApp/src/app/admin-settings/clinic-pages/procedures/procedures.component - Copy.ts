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

  @ViewChild('examaddoneProcedure') examaddoneProcedure: FormGroupDirective; 
  @ViewChild('examaddtenProcedure') examaddtenProcedure: FormGroupDirective; 

  @ViewChild('startaddoneProcedure') startaddoneProcedure: FormGroupDirective; 
  @ViewChild('startaddtenProcedure') startaddtenProcedure: FormGroupDirective; 

  @ViewChild('appladdoneProcedure') appladdoneProcedure: FormGroupDirective; 
  @ViewChild('appladdtenProcedure') appladdtenProcedure: FormGroupDirective; 

  @ViewChild('adjaddoneProcedure') adjaddoneProcedure: FormGroupDirective; 
  @ViewChild('adjaddtenProcedure') adjaddtenProcedure: FormGroupDirective; 

  @ViewChild('dbandaddoneProcedure') dbandaddoneProcedure: FormGroupDirective; 
  @ViewChild('dbandaddtenProcedure') dbandaddtenProcedure: FormGroupDirective; 

  @ViewChild('eventaddoneProcedure') eventaddoneProcedure: FormGroupDirective; 
  @ViewChild('eventaddtenProcedure') eventaddtenProcedure: FormGroupDirective; 


  recordArraylist: any[];
  examArraylist: any[];
  startArraylist: any[];
  applArraylist: any[];

  adjArraylist: any[];
  d_bandArraylist: any[];
  eventArraylist: any[];

  formopenArray: any[];

  tentimeShowprocedureField = Array; 
  num:number = 10;


  code: any='';


  numbersArray: any[];
  numberof_box: any='';
  width_set: any='407';
  setion_doctor_assistant_width_set: any ;
 
  procedure_field_first_for_record: boolean= false;

  procedure_field_first_for_exam: boolean= false;

  procedure_field_first_for_start: boolean= false;

  procedure_field_first_for_appl: boolean= false;

  procedure_field_first_for_adj: boolean= false;

  procedure_field_first_for_dband: boolean= false;

  procedure_field_first_for_events: boolean= false;




  
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	boxHt: any;
	
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}


  constructor() {


    this.recordArraylist =[
      { recod_slno: '101', record_name: 'Initial - Child', count:'40', openup_doctor_assistant:'No'},
      { recod_slno: '102', record_name: 'Initial - Adult', count:'40', openup_doctor_assistant:'No'},
      { recod_slno: '103', record_name: 'Initial - Transfer In', count:'40', openup_doctor_assistant:'No'},
      { recod_slno: '104', record_name: 'Initial - Transfer Retent', count:'40', openup_doctor_assistant:'No'},
      { recod_slno: '105', record_name: 'Initial - Second Opinion', count:'40', openup_doctor_assistant:'No'},
      { recod_slno: '106', record_name: 'Recall', count:'40', openup_doctor_assistant:'No'},
    ]


    this.examArraylist =[
      { exam_slno: '201', exam_name: 'Recall - Phase 1', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '202', exam_name: 'Recall with Pano', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '203', exam_name: 'Records - Child', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '204', exam_name: 'Records - Adult', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '205', exam_name: 'Records - Progress', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '206', exam_name: 'Records - Update', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '207', exam_name: 'Records - Update w/ our', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '208', exam_name: 'Kodas', count:'60', openup_doctor_assistant:'No'},
      { exam_slno: '209', exam_name: 'Pano', count:'60', openup_doctor_assistant:'No'},
    ]

    this.startArraylist =[
      { start_slno: '301', start_name: 'Progress Pano', count:'40', openup_doctor_assistant:'No'},
      { start_slno: '302', start_name: 'Surgical Models & Hook', count:'40', openup_doctor_assistant:'No'},
      { start_slno: '303', start_name: 'Scan - Rescan', count:'40', openup_doctor_assistant:'No'},
      { start_slno: '304', start_name: 'Records child w/ our Pano', count:'40', openup_doctor_assistant:'No'},
      { start_slno: '305', start_name: 'Records child brought', count:'40', openup_doctor_assistant:'No'},
      { start_slno: '306', start_name: 'Records adult w/ our Pano', count:'40', openup_doctor_assistant:'No'},
    ]


    this.applArraylist =[
      { appl_slno: '401', appl_name: '401 - Consult Child', count:'70', openup_doctor_assistant:'No'},
      { appl_slno: '402', appl_name: '402 - Consult Adult', count:'70', openup_doctor_assistant:'No'},
      { appl_slno: '405', appl_name: '405 - Consult - Progress', count:'70', openup_doctor_assistant:'No'},
      { appl_slno: '406', appl_name: '406 - Consult Extra', count:'70', openup_doctor_assistant:'No'},
    ]


    this.adjArraylist =[
      { appl_slno: '450', appl_name: '450 - SEPS', count:'10', openup_doctor_assistant:'No'},
      { appl_slno: '530', appl_name: '530 - IA - Dentist referred', count:'10', openup_doctor_assistant:'No'},
      { appl_slno: '531', appl_name: '531 - IA - Patient referred ', count:'10', openup_doctor_assistant:'No'}
    ]


    this.d_bandArraylist =[
      { appl_slno: '532', appl_name: '532 IA - Advertisement Referred', count: '10', openup_doctor_assistant:'No'},
      { appl_slno: '533', appl_name: '532 IA - Website Referred', count:'10', openup_doctor_assistant:'No'},
      { appl_slno: '534', appl_name: '532 IA - Friend Referred', count:'10', openup_doctor_assistant:'No'}
    ]

    this.eventArraylist =[
      { appl_slno: '532', appl_name: '532 IA -Meeting', count: '15',  openup_doctor_assistant:'No'},
      { appl_slno: '533', appl_name: '532 IA - Luncheon', count:'30', openup_doctor_assistant:'No'},
      { appl_slno: '534', appl_name: '532 IA - Friend Referred', count:'10', openup_doctor_assistant:'No'}
    ]

    this.formopenArray =[
      { section: 'record', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'exam', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'start', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'appl', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'adj', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'd_band', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'},
      { section: 'evants', procedure_field_one: false , procedure_field_ten: false ,  countval:'1'}

    ]

  

    
   }

  ngOnInit() {
	this.initalizeFrame();
  }
  
  initalizeFrame(){
	let topHt:any = 139;
	let bottomHt: any = 110;
	
	this.boxHt = window.innerHeight - (topHt + bottomHt);
	
	this.calculateBoxes(this.recordArraylist);
	this.calculateBoxes(this.examArraylist);
	this.calculateBoxes(this.startArraylist);
	this.calculateBoxes(this.applArraylist);
	this.calculateBoxes(this.adjArraylist);
	this.calculateBoxes(this.d_bandArraylist);
	this.calculateBoxes(this.eventArraylist);
  
  }
  
  calculateBoxes(sectionArr){
   
	sectionArr.map(item => {
		let numOfBox: any = item.count/5;
    let boxWd: any = 317/numOfBox;
    let display: boolean= true;
		
		item.numOfBox = numOfBox;
    item.boxWd = boxWd;
    item.display = display;

  

		item.boxLabelArr = [];
		for(let i=0; i<item.numOfBox; i++){
			let labelNum: any = (i+1)*5;
			item.boxLabelArr.push(labelNum);
		}
		
  });

  
  }


  openup_doctor_assistant_section(block_type, index, total_time)
  {
    
      if(block_type=='record')
      {
       

        this.recordArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.recordArraylist[index].openup_doctor_assistant = this.recordArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }


      if(block_type=='exam')
      {
        this.examArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.examArraylist[index].openup_doctor_assistant = this.examArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }


      if(block_type=='start')
      {
        this.startArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
         this.startArraylist[index].openup_doctor_assistant = this.startArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }

      if(block_type=='appl')
      {
        this.applArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.applArraylist[index].openup_doctor_assistant = this.applArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }


      if(block_type=='adj')
      {
        this.adjArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.adjArraylist[index].openup_doctor_assistant = this.adjArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }

      if(block_type=='dband')
      {
        this.d_bandArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.d_bandArraylist[index].openup_doctor_assistant = this.d_bandArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }

      if(block_type=='events')
      {
        this.eventArraylist.forEach(function(element,key) {
          if(element.openup_doctor_assistant=='Yes' && key!=index)
          {
            element.openup_doctor_assistant= 'No';

          }
        });
        this.eventArraylist[index].openup_doctor_assistant = this.eventArraylist[index].openup_doctor_assistant=='Yes' ? 'No' : 'Yes';
      }
     
  }


  hide_doctor_assistant_section(block_type, index)
  {

    if(block_type=='record')
    {
      this.recordArraylist.splice(index, 1);
    }

    if(block_type=='exam')
    {
      this.examArraylist.splice(index, 1);
    }

    if(block_type=='start')
    {
      this.startArraylist.splice(index, 1);
    }

    if(block_type=='appl')
    {
      this.applArraylist.splice(index, 1);
    }

    if(block_type=='adj')
    {
      this.adjArraylist.splice(index, 1);
    }

    if(block_type=='dband')
    {
      this.d_bandArraylist.splice(index, 1);
    }

    if(block_type=='events')
    {
      this.eventArraylist.splice(index, 1);
    }



  }

  Upadte_promocode_name(name,block_type, index)
  {
      if(block_type=='record')
      {
        
        this.recordArraylist[index].record_name =  name.target.value ;
      }

      if(block_type=='exam')
      {
        
        this.examArraylist[index].exam_name =  name.target.value ;
      }
  
      if(block_type=='start')
      {
        
        this.startArraylist[index].start_name =  name.target.value ;
      }
  
      if(block_type=='appl')
      {
        
        this.applArraylist[index].appl_name =  name.target.value ;
      }
  
      if(block_type=='adj')
      {
        
        this.adjArraylist[index].appl_name =  name.target.value ;
      }
  
      if(block_type=='dband')
      {
        
        this.d_bandArraylist[index].appl_name =  name.target.value ;
      }
  
      if(block_type=='events')
      {
        this.eventArraylist[index].appl_name =  name.target.value ;
      }

  }

  Upadte_promocode_time(time,block_type, index)
  {
    let checkmultiple = this.checkMultipleoffive(time.target.value);

    if(block_type=='record')
    {
     
      if(checkmultiple)
      {
         this.recordArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.recordArraylist);
      }
    }


    if(block_type=='exam')
    {
      if(checkmultiple)
      {
         this.examArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.examArraylist);
      }

    }

    if(block_type=='start')
    {
      
      if(checkmultiple)
      {
         this.startArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.startArraylist);
      }
    }

    if(block_type=='appl')
    {

      if(checkmultiple)
      {
         this.applArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.applArraylist);
      }
    }

    if(block_type=='adj')
    {
      
      if(checkmultiple)
      {
         this.adjArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.adjArraylist);
      }
    }

    if(block_type=='dband')
    {
      
      if(checkmultiple)
      {
         this.d_bandArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.d_bandArraylist);
      }
    }

    if(block_type=='events')
    {
      
      if(checkmultiple)
      {
         this.eventArraylist[index].count =  time.target.value ;
         this.calculateBoxes(this.eventArraylist);
      }
    }




  }

  checkMultipleoffive(number)
  {
      let checkmultiple  = number%5==0 ? true : false;
      return checkmultiple; 
  }


  add_procedure_field(block_type)
  {
    
        this.formopenArray.map(item => {

          if(item.section==block_type) 
          {
            item.procedure_field_one = true;
            item.procedure_field_ten = false;
            item.countval = 10;
          
          }
        });


        if(block_type=='record') 
        {
          
          this.procedure_field_first_for_record=true;
        }

        if(block_type=='exam') 
        {
          
          this.procedure_field_first_for_exam=true;
         
        }

        if(block_type=='start') 
        {
         
          this.procedure_field_first_for_start=true;

        }

        if(block_type=='appl') 
        {
          
          this.procedure_field_first_for_appl=true;
        }

        if(block_type=='adj') 
        {
         
          this.procedure_field_first_for_adj=true;
        }

        if(block_type=='d_band') 
        {
         
          this.procedure_field_first_for_dband=true;
        }

        if(block_type=='evants') 
        {
         
          this.procedure_field_first_for_events=true;
        }
      
  }

  change_procedure_field_form(block_type)
  {
   
    this.formopenArray.map(item => {
      if(item.section==block_type) 
      {
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

  


  add_one_procedure_code_fn(form,block_type) {

    if(block_type=='record')
    {
      if(form.value.recod_slno!='' && form.value.record_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.recordArraylist.push(form.value);
        }
        this.calculateBoxes(this.recordArraylist);
      }
      this.formopenArray.map(item => {
        if(item.section=='record') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        
       });
      this.procedure_field_first_for_record= false;
    }



    if(block_type=='exam')
    {
      if(form.value.exam_slno!='' && form.value.exam_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.examArraylist.push(form.value);
        }
        this.calculateBoxes(this.examArraylist);
       
      }

      this.formopenArray.map(item => {
        if(item.section=='exam') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_exam= false;
       });

     
    }


    if(block_type=='start')
    {
      if(form.value.start_slno!='' && form.value.start_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.startArraylist.push(form.value);
        }
        this.calculateBoxes(this.startArraylist);
      }

      this.formopenArray.map(item => {
        if(item.section=='start') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_start= false;
       });
     
    }


    if(block_type=='appl')
    {
      if(form.value.appl_slno!='' && form.value.appl_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.applArraylist.push(form.value);
        }
        this.calculateBoxes(this.applArraylist);
      }

      this.formopenArray.map(item => {
        if(item.section=='appl') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_appl= false;
       });
     
    }


    if(block_type=='adj')
    {
      if(form.value.appl_slno!='' && form.value.appl_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.adjArraylist.push(form.value);
        }
        this.calculateBoxes(this.adjArraylist);

      }

      this.formopenArray.map(item => {
        if(item.section=='adj') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_adj= false;
       });
     
    }


    if(block_type=='d_band')
    {
      if(form.value.appl_slno!='' && form.value.appl_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.d_bandArraylist.push(form.value);
        }
        this.calculateBoxes(this.d_bandArraylist);
      }

      this.formopenArray.map(item => {
        if(item.section=='d_band') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_dband= false;
       });
     
    }


    if(block_type=='evants')
    {
      if(form.value.appl_slno!='' && form.value.appl_name!='' && form.value.count!='')
      {
        let checkmultiple = this.checkMultipleoffive(form.value.count);
        if(checkmultiple)
        {
          this.eventArraylist.push(form.value);
        }
        this.calculateBoxes(this.eventArraylist);
      }
      this.formopenArray.map(item => {
        if(item.section=='evants') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_events= false;
       });
     
    }


   
  }






  add_ten_procedure_code_fn(form,block_type) {
    if(block_type=='record')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].recod_slno!='' && form[i].record_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.recordArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.recordArraylist);
      this.formopenArray.map(item => {
        if(item.section=='record') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_record= false;
       });
      
    }


    if(block_type=='exam')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].exam_slno!='' && form[i].exam_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.examArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.examArraylist);
      this.formopenArray.map(item => {
        if(item.section=='exam') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_exam= false;
       });
      
    }


    if(block_type=='start')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].start_slno!='' && form[i].start_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.startArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.startArraylist);
      this.formopenArray.map(item => {
        if(item.section=='start') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_start= false;
       });
      
    }


    if(block_type=='appl')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].appl_slno!='' && form[i].appl_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.applArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.applArraylist);
      this.formopenArray.map(item => {
        if(item.section=='appl') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_appl= false;
       });
      
    }


    if(block_type=='adj')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].appl_slno!='' && form[i].appl_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.adjArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.adjArraylist);
      this.formopenArray.map(item => {
        if(item.section=='adj') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_adj= false;
       });
      
    }


    if(block_type=='d_band')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].appl_slno!='' && form[i].appl_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.d_bandArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.d_bandArraylist);
      this.formopenArray.map(item => {
        if(item.section=='d_band') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_dband= false;
       });
      
    }


    if(block_type=='evants')
    {
      for( var i=0; i<10; i++)
      {
       
        if(form[i].appl_slno!='' && form[i].appl_name!='' && form[i].count!='')
        {
          let checkmultiple = this.checkMultipleoffive(form[i].count);
          if(checkmultiple)
          {
            this.eventArraylist.push(form[i]);
          }
         
        }
       
      }
      this.calculateBoxes(this.eventArraylist);
      this.formopenArray.map(item => {
        if(item.section=='evants') 
        {
          item.procedure_field_one =  false  ;
          item.procedure_field_ten = false  ;
        }
        this.procedure_field_first_for_events= false;
       });
      
    }




   
  }


}
