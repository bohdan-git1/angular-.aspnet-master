import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { MessageService } from '../../../../core/message.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  @Input() selectedTemplt:any;
  @Input() sel_temp_Indx:any;
  //maskTime = [/[0-1]/, /[0-9]/,':',/[0-5]/, /[0-9]/]
  chosenColor:any;
	editTemplateData: any[]= [
    { 'day_type': 'Normal Day', 
      'time_slot' : [
        { 'slot_name': 'Start', 'time': '', 'unit': 'am'},
        { 'slot_name': 'Lunch', 'time': '', 'unit': 'am'},
        { 'slot_name': 'End Lunch', 'time': '', 'unit': 'am'},
        { 'slot_name': 'End', 'time': '', 'unit': 'pm'}
      ],

      'selected_min': '5',
      'selected_min_vals': [
        {'min_val': '5'},
        {'min_val': '10'},
        {'min_val': '15'},
        {'min_val': '20'},
        {'min_val': '25'},
        {'min_val': '30'},
        {'min_val': '35'},
        {'min_val': '40'},
        {'min_val': '45'},
      ],

      'templete_color':[
        {'color': '#B48CF6', 'selected': true},
        {'color': '#FD7474', 'selected': false},
        {'color': '#74B3FD', 'selected': false},
        {'color': '#2EA8A8', 'selected': false},
        {'color': '#39D56E', 'selected': false},
        {'color': '#DE473E', 'selected': false},
        {'color': '#FF9549', 'selected': false},
        {'color': '#F6CC61', 'selected': false},
        {'color': '#8CF1E4', 'selected': false},
        {'color': '#FECACA', 'selected': false},
        {'color': '#37DBFF', 'selected': false},
        {'color': '#FF9DEA', 'selected': false},
        {'color': '#BF60A4', 'selected': false},
        {'color': '#696969', 'selected': false},

      ],
      'total_chair': '10',
   }
  ];

  boxHt: any;
  dropdownVar: boolean = false; 
  templateDropdownVal: boolean = false; 
  chairArray: any[]=[];
  selctd_Templt_Tm:any;
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.selctd_Templt_Tm={
      startTime:this.calculateStartEnd(this.selectedTemplt.starttime),
      startLunch:this.calculateStartEnd(this.selectedTemplt.startLunch),
      endLunch:this.calculateStartEnd(this.selectedTemplt.endLunch),
      endTime:this.calculateStartEnd(this.selectedTemplt.endtime)
    }
    console.log("selectedTemplt: ", this.selectedTemplt)
    this.generateEditTemp();
	this.initalizeFrame();
	this.calculateChair();
  }

  timeMask(value){
    //console.log(value)
    const chars = value.split('');
    const hours:any[]= [
      /[0-1]/,
      chars[0] == '1' ? /[0-2]/ : /[0-9]/
    ];

    const minutes:any[] = [/[0-5]/, /[0-9]/];

    return hours.concat(':').concat(minutes);
  }

  calculateStartEnd(time){
    if(time.substr(5,2)==="am"){
      if(+time.substr(0,2)===12){
        let testTm="00"+time.substr(2,3);
        return testTm;
      }
      else{
        return time.substr(0,5);
      }
      
    }
    else if(time.substr(5,2)==="pm"){
      if(+time.substr(0,2)!==12){
        let testTm=(+time.substr(0,2)+12).toString()+time.substr(2,3);
        return testTm;
      }
      else{
        return time.substr(0,5);
      }
    }
  }

  generateEditTemp(){
    
    this.editTemplateData[0].selected_min=this.selectedTemplt.timeslotIncrement.split(" ")[0];
    this.editTemplateData[0].time_slot.forEach(ele=>{
      if(ele.slot_name=='Start'){
        let stTm=this.selectedTemplt.starttime.substr(0,5);
        ele.time=stTm;
		ele.unit = this.selectedTemplt.starttime.substr(5,2);
      }
      else if(ele.slot_name=='End Lunch'){
        let stTm=this.selectedTemplt.endLunch.substr(0,5);
        ele.time=stTm;
		ele.unit = this.selectedTemplt.endLunch.substr(5,2);
      }
      else if(ele.slot_name=='Lunch'){
        let stTm=this.selectedTemplt.startLunch.substr(0,5);
        ele.time=stTm;
		ele.unit = this.selectedTemplt.startLunch.substr(5,2);
      }
      else if(ele.slot_name=='End'){
        let stTm=this.selectedTemplt.endtime.substr(0,5);
        ele.time=stTm;
		ele.unit = this.selectedTemplt.endtime.substr(5,2);
      }
    })
  }


  calculateChair()
  {
    this.chairArray =[];
    for(var i=1; i<=this.editTemplateData[0].total_chair; i++)
    {
        var s = i==1 ? 'Exam' : i;
        this.chairArray.push({'chair_no': s});
    }
  }

  initalizeFrame() {
    const topHt: any = 139;
    const bottomHt: any = 130;
    this.boxHt = window.innerHeight - (topHt + bottomHt);
  }

  openDropDownBox()
  {
    this.dropdownVar= this.dropdownVar== false ? true : false ;
  }

  selectedDropDownVal(selectedVal)
  {
    this.editTemplateData[0].selected_min= selectedVal;
    this.dropdownVar= false;
  }

  changeUnit(index)
  {
    this.editTemplateData[0].time_slot[index].unit=  this.editTemplateData[0].time_slot[index].unit=='am' ? 'pm' : 'am';
  }

  changeTempleteColor(index)
  {
    this.editTemplateData[0].templete_color.map((value, key)=>{
      if(key!=index)
      {
        value.selected= false;
      }
    });

    this.editTemplateData[0].templete_color[index].selected=  this.editTemplateData[0].templete_color[index].selected== false ? true : false ;
    if(this.editTemplateData[0].templete_color[index].selected){
      this.chosenColor=this.editTemplateData[0].templete_color[index].color;
    }
    else{
      this.chosenColor=null;
    }

  }

  openDropDownBoxForTem()
  {
    this.templateDropdownVal= this.templateDropdownVal== false ? true : false ;
  }

  changeChairVal(evt)
  {
  
    if(evt.target.value!='' && evt.target.value!='0' && evt.target.value<='99')
    {
      this.editTemplateData[0].total_chair=evt.target.value;
      this.calculateChair();
    }else {
      this.calculateChair();
    }

    this.messageService.sendMessage("total chairs",{total_Ch:this.editTemplateData[0].total_chair});
     
  }
  
  saveTemplate(){
    let col;
    let stTm;
    let endTm;
    let sTL;
    let endL;
    if(this.chosenColor!=null){
      col=this.chosenColor;
    }
    else{
      col=this.selectedTemplt.day_sel_color
    }
    this.editTemplateData[0].time_slot.forEach(ele=>{
      if(ele.slot_name=='Start'){
        stTm=ele.time+ele.unit;
      }
      else if(ele.slot_name=='End Lunch'){
        endL=ele.time+ele.unit;
      }
      else if(ele.slot_name=='Lunch'){
        sTL=ele.time+ele.unit;
      }
      else if(ele.slot_name=='End'){
        endTm=ele.time+ele.unit;
      }
    })
    let objTemp={
      title:this.selectedTemplt.title,
      border:col + " 1px solid",
      day_sel_color:col,
      endLunch:endL,
      endtime:endTm,
      fieldsEdit:this.selectedTemplt.fieldsEdit,
      showform:this.selectedTemplt.showform,
      startLunch:sTL,
      starttime:stTm,
      temp_sel:this.selectedTemplt.temp_sel,
      timeslotIncrement:this.editTemplateData[0].selected_min+" min",
      type:this.selectedTemplt.type,
      daysArr:[
        {val:'S', sel:false}, 
        {val:'M', sel:false}, 
        {val:'T', sel:false}, 
        {val:'W', sel:false}, 
        {val:'Th', sel:false}, 
        {val:'F', sel:false}, 
        {val:'S', sel:false}]
    }
    //console.log(objTemp)
  this.messageService.sendMessage('editTemplate', {ind:this.sel_temp_Indx, temp:objTemp});
  //console.log(this.selectedTemplt.title)
  }

}
