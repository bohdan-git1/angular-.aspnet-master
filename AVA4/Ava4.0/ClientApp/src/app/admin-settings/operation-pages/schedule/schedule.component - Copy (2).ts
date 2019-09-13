import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/message.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

showDropdown:boolean=false;
dropdownoption:any;
monSel_showForm=false;
sel_monIndx:any;
selctMonError=false;
selctDayErr=false;
chosenTemplt:any;
templtIndx:any;
//chk_sel_dt=false;
locationArr=[
	{"label" : "Salt Lake City Office"},
	{"label" : "Lehi Office"},
	{"label" : "Provo Office"},
];
selMon:any;
daysSel:any[]=[];
daysArr=[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}];
sel_edit_dt:any;
	calendarMonths: any = [];
	
	calenderRule: any = [
		{	"month": 8,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [0]},
			  "specific": [{"date": "Thu Aug 15 2019 00:00:00 GMT+0530 (India Standard Time)"}]
			},
			
			"normaldays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [1, 2, 4, 5]},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [3]},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [4, 5], "days": [6]},
				"specific": []
			}
		},
		
		{	"month": 9,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			}
		},
		
		{	"month": 10,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			}
		},
		
		{	"month": 11,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [1, 2, 4, 5]},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			}
		},
		
		{	"month": 12,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [1, 2, 4, 5]},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			}
		},
		
		{	"month": 1,
			"year": 2020,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [1, 2, 4, 5]},
				"specific": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": []
			}
		}
	]

templates:any[]=[
	{title: 'Normal Day', type:'normal', showform:false, border:'#B48CF6 1px solid', day_sel_color:'#B48CF6', starttime:'07:00am', endtime:'04:00pm',startLunch:'12:00pm',endLunch:'01:00pm', timeslotIncrement:'5 min', fieldsEdit:false, temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	{title: 'Short Day', type:'short', showform:false, border:'#8CF1E4 1px solid', day_sel_color:'#8CF1E4', starttime:'07:00am', endtime:'04:00pm',startLunch:'12:00pm',endLunch:'01:00pm', timeslotIncrement:'5 min',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	
	{title: 'Long Day', type:'long', showform:false, border:'#F6CC61 1px solid', day_sel_color:'#F6CC61', starttime:'07:00am', endtime:'04:00pm',startLunch:'12:00pm',endLunch:'01:00pm', timeslotIncrement:'5 min',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	
	{title: 'Office Closed', type:'holiday', showform:false, border:'#C4C4C4 1px solid', day_sel_color:'#C4C4C4', starttime:'', endtime:'',startLunch:'',endLunch:'', timeslotIncrement:'',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]}
]
public config: PerfectScrollbarConfigInterface = {suppressScrollX: true};
	
	templateEditMode:boolean = false;
	subscription: Subscription;
	
  constructor(private service:MessageService) { 
	
	this.subscription = this.service.getMessage().subscribe(message => {
		if(message.event == 'editTemplate'){
			this.editSelTempl(message.data)
			this.templateEditMode = false;
		}
	})
	
  }

  ngOnInit() {
	this.initalizeCalenderRule();
	this.createMonths();
	this.optionSelection(0);
	
  }
  
	initalizeCalenderRule(){
		for(let i=0; i<this.templates.length; i++){
			for(let j=0; j<this.calenderRule.length; j++){
				if(this.templates[i].type == 'normal'){
					this.calenderRule[j].normaldays.color = this.templates[i].day_sel_color;
				} else if(this.templates[i].type == 'short'){
					this.calenderRule[j].shorterdays.color = this.templates[i].day_sel_color;
				} else if(this.templates[i].type == 'long'){
					this.calenderRule[j].longerdays.color = this.templates[i].day_sel_color;
				} else if(this.templates[i].type == 'holiday'){
					this.calenderRule[j].closed.color = this.templates[i].day_sel_color;
				}
			}
			
		}
		
	}
	
	
  
  createMonths() {
	for(let i=0; i<6; i++){
		let today = new Date();
		let currentMonth = new Date(today.getFullYear(), today.getMonth()+i, 1);
		this.calendarMonths.push({id:i,currMon:currentMonth,sel:false});
	}
  }
  
  editSelTempl(data){
	  this.templates[data.ind]=data.temp;
	  this.initalizeCalenderRule();
  }


  dropdownToggle(){
    if(this.showDropdown==true){
	   this.showDropdown=false;
	 }else{
	   this.showDropdown=true;
	  }
  }
  
  optionSelection(indx){ 
	this.dropdownoption=this.locationArr[indx].label;
	this.showDropdown=false;
	
}


mon_selctd(event,indx){
	this.daysSel=[];
	this.daysArr.forEach(ele=>{
		ele.sel=false;
	});
  this.calendarMonths.forEach(mon => {
	  if(mon.id==indx){
		  mon.sel=event;
	  }
	  else{
		  mon.sel=false;
	  }
  });

  let flag=0;
  this.calendarMonths.forEach(mon => {
	  if(mon.sel){
		  //mon.sel=event;
		  this.selMon=mon.id;
		  this.service.sendMessage('new month selected',{monIndx:this.selMon});
		  flag=1
	  }
  });

  if(flag!=1){
	  //this.monSel_showForm=false;
	  this.templates.forEach(ele=>{
		  ele.showform=false;
		  ele.fieldsEdit=false;
	  });
	  this.service.dayType=null;
	  this.service.sendMessage('new month selected',{monIndx:this.selMon});
  }
  else{
	  this.templates.forEach(ele=>{
		  //ele.showform=false;
		  ele.fieldsEdit=false;
	  });
  }
  
  
  
  
}

openScheduleForm(type){
  let flag=false;
  this.daysSel=[];
  this.daysArr.forEach(ele=>{
	  ele.sel=false;
  });
  this.calendarMonths.forEach(ele=>{
	  if(ele.sel==true){
		  //console.log('found one')
		  flag=true;
	  }
  })
  if(flag){
	  this.selctMonError=false;
	  this.templates.forEach(templt=>{
		  if(templt.type==type){
			  templt.showform=!templt.showform;
			  templt.fieldsEdit=false;
			  if(templt.showform){
				  templt.temp_sel=true
			  }
			  else{
				  templt.temp_sel=false;
			  }
		  }
		  else{
			  templt.showform=false;
			  templt.temp_sel=false;
		  }
	  })
	  let tempSel_flag=0
	  this.templates.forEach(ele=>{
		  if(ele.temp_sel)
		  {
			  this.service.dayType=ele.type;	
			  tempSel_flag=1
			  this.service.sendMessage('new month selected',{monIndx:this.selMon});
		  }
		  else{
			  
			  this.service.sendMessage('new month selected',{monIndx:this.selMon});
		  }
	  })

	  if(tempSel_flag!=1){
		  this.service.dayType=null;
	  }
  //this.showForm=true;
  
  }
  else{
	  //window.alert('Please select a month')
	  this.selctMonError=true;
  }
  //this.showForm=!this.showForm;

}

	generateSelDays(temp){
		this.chosenTemplt=temp;
		
		console.log('sel_edit_dt: ', this.sel_edit_dt);
		
		if(!this.sel_edit_dt){
			
			if(this.chosenTemplt.type == 'normal'){
				this.calenderRule[this.selMon].normaldays.repeat.weeknum = [];
				this.calenderRule[this.selMon].normaldays.repeat.days = [];
			}
			
			if(this.chosenTemplt.type == 'long'){
				this.calenderRule[this.selMon].longerdays.repeat.weeknum = [];
				this.calenderRule[this.selMon].longerdays.repeat.days = [];
			}
			
			if(this.chosenTemplt.type == 'short'){
				this.calenderRule[this.selMon].shorterdays.repeat.weeknum = [];
				this.calenderRule[this.selMon].shorterdays.repeat.days = [];
			}
			
			if(this.chosenTemplt.type == 'holiday'){
				this.calenderRule[this.selMon].closed.repeat.weeknum = [];
				this.calenderRule[this.selMon].closed.repeat.days = [];
			}
			
			for(let m=0; m<6; m++){
				
				if(this.chosenTemplt.type == 'normal'){
					this.calenderRule[this.selMon].normaldays.repeat.weeknum.push(m+1);
				}
				
				if(this.chosenTemplt.type == 'long'){
					this.calenderRule[this.selMon].longerdays.repeat.weeknum.push(m+1);
				}
				
				if(this.chosenTemplt.type == 'short'){
					this.calenderRule[this.selMon].shorterdays.repeat.weeknum.push(m+1);
				}
				
				if(this.chosenTemplt.type == 'holiday'){
					this.calenderRule[this.selMon].closed.repeat.weeknum.push(m+1);
				}
			}
			
			for(let i=0; i<this.daysSel.length; i++){
				if(this.daysSel[i].type == 'normal'){
					this.calenderRule[this.selMon].normaldays.repeat.days.push(this.daysSel[i].dayIndex);
				}
				
				if(this.daysSel[i].type == 'long'){
					this.calenderRule[this.selMon].longerdays.repeat.days.push(this.daysSel[i].dayIndex);
				}
				
				if(this.daysSel[i].type == 'short'){
					this.calenderRule[this.selMon].shorterdays.repeat.days.push(this.daysSel[i].dayIndex);
				}
				
				if(this.daysSel[i].type == 'holiday'){
					this.calenderRule[this.selMon].closed.repeat.days.push(this.daysSel[i].dayIndex);
				}
			}
		
		} else {
			
			
			let specifcdayObj: any = {"date": this.sel_edit_dt.weekdate};
			
			console.log('type: ', this.sel_edit_dt.type);
			
			if(this.sel_edit_dt.type == 'normal'){
				this.calenderRule[this.selMon].normaldays.specific.push(specifcdayObj);
			}
			
			if(this.sel_edit_dt.type == 'long'){
				this.calenderRule[this.selMon].longerdays.specific.push(specifcdayObj);
			}
			
			if(this.sel_edit_dt.type == 'short'){
				this.calenderRule[this.selMon].shorterdays.specific.push(specifcdayObj);
			}
			
			if(this.sel_edit_dt.type == 'holiday'){
				this.calenderRule[this.selMon].closed.specific.push(specifcdayObj);
			}
			
		}
		
		console.log(this.calenderRule[this.selMon]);
		
		
		this.daysSel=[];
		this.daysArr.forEach(ele=>{
			ele.sel=false;
		});
		
		this.sel_edit_dt = null;
		
		this.service.sendMessage('generate selected days',{});
		
		
		
	}

selectDayRange(dayType,dyIndx){
	
  this.templates.forEach(templt=>{
		templt.fieldsEdit=false;
	});
  //console.log(dayType)

	let flag=0;
	let ind;
  if(this.daysSel.length!=0){
	  for(var i=0;i<this.daysSel.length;i++){
		  if(this.daysSel[i].type==dayType && this.daysSel[i].dayIndex==dyIndx){
			  flag=1;
			  ind=i;
		  }
	  }
	  if(flag==1){
		  this.daysSel.splice(ind,1)
	  }
	  else{
		  let tempObj={
			  //mon:this.selMon,
			  type:dayType,
			  dayIndex:dyIndx
		  }
		  this.daysSel.push(tempObj);
	  }
  }
  else{
	  let temp={
		  //mon:this.selMon,
		  type:dayType,
		  dayIndex:dyIndx
	  }
	  this.daysSel.push(temp);
  }

  //console.log(this.daysSel);
  this.service.sendMessage('select Days To Schedule',{daySel:this.daysSel});
}


editDelFun(data){
	//console.log('emitted data', data)
	this.sel_edit_dt=data.day;
	
	if(data.sel_type=='scheduledDay'){
	  let dayType=data.day.type;
	  this.templates.forEach(template=>{
		  if(template.type==dayType){
			  template.showform=true;
			  template.temp_sel=true;
			  template.fieldsEdit=true;
			  this.service.dayType=dayType;
		  }
		  else{
			  template.showform=false;
			  template.fieldsEdit=false;
			  template.temp_sel=false;
		  }
	  })
	}
	else if(data.sel_type=='Non-scheduledDay'){
		
		
		
		//console.log('specifcdayObj', specifcdayObj);
		
	  let dytype=this.service.dayType;
	  this.templates.forEach(ele=>{
		  if(ele.type==dytype){
			  ele.showform=true;
			  ele.temp_sel=true;
			  ele.fieldsEdit=false;
		  }
		  else{
			  ele.showform=false;
			  ele.fieldsEdit=false;
			  ele.temp_sel=false;
		  }
	  })
	}
}

deleteSpecificDt(){
	this.service.sendMessage('delete specific date', this.sel_edit_dt);
	setTimeout(()=>{
	  this.templates.forEach(ele=>{
		  ele.showform=false;
		  ele.fieldsEdit=false;
	  });
	  this.service.dayType=null;
	})
}

checkSelectDay(event,indx){
	//console.log('selected mon indx', this.selMon);
	//console.log('coming index',indx)
	if(this.selMon==indx){
		if(event==true) {
		  this.selctDayErr=true;
		  this.templates.forEach(temp=>{
			  if(temp.type==this.chosenTemplt.type){
				  temp.showform=true;
				  temp.fieldsEdit=false;
			  }
		  })
		}
		else{
			this.selctDayErr=false;
			this.service.dayType=null;
			this.templates.forEach(temp=>{
			  if(temp.type==this.chosenTemplt.type){
				  temp.showform=false;
				  temp.fieldsEdit=false;
			  }
		  })
		}
	}
}
  
	gotoEditMode(indx, data){
		this.templtIndx=indx;
		this.chosenTemplt=data;
		this.templateEditMode = true;
	}

}
