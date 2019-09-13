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
nextPrev_counter=0;
//chk_sel_dt=false;
locationArr=[
	{"label" : "Salt Lake City Office"},
	{"label" : "Lehi Office"},
	{"label" : "Provo Office"},
];
present_max_index:any;
selMon:any;
todayYr:any;
daysSel:any[]=[];
daysArr=[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}];
sel_edit_dt:any;
	calendarMonths: any = [];
	
	calenderRule: any = [
		{	"month": 8,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [0]},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [1, 2, 5]},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [3, 4]},
				"specific": [],
				"exclude": [{"date": "Thu Aug 15 2019 00:00:00 GMT+0530 (India Standard Time)"}]
			},
			"shorterdays": {
				"repeat": {"weeknum": [1, 2, 3, 4, 5, 6], "days": [6]},
				"specific": [{"date": "Thu Aug 15 2019 00:00:00 GMT+0530 (India Standard Time)"}],
				"exclude": []
			}
		},
		
		{	"month": 9,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			}
		},
		
		{	"month": 10,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			}
		},
		
		{	"month": 11,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			}
		},
		
		{	"month": 12,
			"year": 2019,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			}
		},
		
		{	"month": 1,
			"year": 2020,
			"closed": {
			  "repeat": {"weeknum": [], "days": []},
			  "specific": [],
			  "exclude": []
			},
			
			"normaldays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			
			"longerdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			},
			"shorterdays": {
				"repeat": {"weeknum": [], "days": []},
				"specific": [],
				"exclude": []
			}
		}
	]

templates:any[]=[
	{title: 'Normal Day', type:'normal', showform:false, border:'#B48CF6 1px solid', day_sel_color:'#B48CF6', starttime:'07:00am', endtime:'04:00pm',startLunch:'11:00am',endLunch:'11:30am', timeslotIncrement:'5 min', fieldsEdit:false, temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	{title: 'Short Day', type:'short', showform:false, border:'#8CF1E4 1px solid', day_sel_color:'#8CF1E4', starttime:'07:00am', endtime:'04:00pm',startLunch:'11:00am',endLunch:'11:30am', timeslotIncrement:'5 min',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	
	{title: 'Long Day', type:'long', showform:false, border:'#F6CC61 1px solid', day_sel_color:'#F6CC61', starttime:'07:00am', endtime:'04:00pm',startLunch:'11:00am',endLunch:'11:30am', timeslotIncrement:'5 min',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]},
	
	
	{title: 'Office Closed', type:'holiday', showform:false, border:'#C4C4C4 1px solid', day_sel_color:'#C4C4C4', starttime:'', endtime:'',startLunch:'',endLunch:'', timeslotIncrement:'',fieldsEdit:false,temp_sel:false, daysArr:[{val:'S', sel:false}, {val:'M', sel:false}, {val:'T', sel:false}, {val:'W', sel:false}, {val:'Th', sel:false}, {val:'F', sel:false}, {val:'S', sel:false}]}
]
public config: PerfectScrollbarConfigInterface = {suppressScrollX: true};
	
	templateEditMode:boolean = false;
	subscription: Subscription;
	selAllMonths:boolean = false;
	
  constructor(private service:MessageService) { 
	
	this.subscription = this.service.getMessage().subscribe(message => {
		if(message.event == 'editTemplate'){
			this.editSelTempl(message.data)
			this.templateEditMode = false;
		}
	})
	
  }

  ngOnInit() {
	  this.todayYr=new Date();
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
		this.present_max_index=i+1;
	}
  }

  nextSixMonths(){
	  this.calendarMonths=[];
	  this.selAllMonths=false;
	  this.selMon=null;
	  this.templates.forEach(templt=>{
		  templt.showform=false;
		  templt.temp_sel=false;
		  templt.fieldsEdit=false;
	  });
	  //this.service.dayType=null;
	  this.selMon=null;
	  let today = new Date();
	  let loopCounter=0;
	  while(loopCounter<6){
		let startDt=new Date(today.getFullYear(), today.getMonth()+this.present_max_index, 1);
		this.calendarMonths.push({id:loopCounter,currMon:startDt,sel:false});
		this.present_max_index++;
		loopCounter++;
	  }
	  this.nextPrev_counter++;
  }

  prevSixMonths(){
	  this.selMon=null;
	  this.selAllMonths=false;
	  this.present_max_index=this.present_max_index-12;
	  this.calendarMonths=[];
	  this.templates.forEach(templt=>{
		templt.showform=false;
		templt.temp_sel=false;
		templt.fieldsEdit=false;
	});
	//this.service.dayType=null;
	  let today=new Date();
	  let loopCounter=0;
	  while(loopCounter<6){
		let startDt=new Date(today.getFullYear(), today.getMonth()+this.present_max_index, 1);
		this.calendarMonths.push({id:loopCounter,currMon:startDt,sel:false});
		this.present_max_index++;
		loopCounter++;
	  }
	  this.nextPrev_counter--;
  }
  
  editSelTempl(data){
	  this.templates[data.ind]=data.temp;
	  this.daysSel=[];
	  //this.service.sendMessage('new month selected',{monIndx:this.selMon});
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
	this.selAllMonths=false;
	this.daysSel=[];
	this.daysArr.forEach(ele=>{
		ele.sel=false;
	});
	this.templates.forEach(ele=>{
		if(this.chosenTemplt){
			if(ele.type===this.chosenTemplt.type){
				ele.daysArr.forEach(dayEle=>{
					dayEle.sel=false;
				})
			}
		}
		else{
			ele.daysArr.forEach(dayEle=>{
				dayEle.sel=false;
			})
		}
	})
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
  this.templates.forEach(ele=>{
	
		ele.daysArr.forEach(dayEle=>{
			dayEle.sel=false;
		})
	
})
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
			
		if(!this.selAllMonths){
		
			if(!this.sel_edit_dt){
				
				if(this.chosenTemplt.type == 'normal'){
					this.calenderRule[this.selMon].normaldays.repeat.weeknum = [];
				}
				
				if(this.chosenTemplt.type == 'long'){
					this.calenderRule[this.selMon].longerdays.repeat.weeknum = [];
				}
				
				if(this.chosenTemplt.type == 'short'){
					this.calenderRule[this.selMon].shorterdays.repeat.weeknum = [];
				}
				
				if(this.chosenTemplt.type == 'holiday'){
					this.calenderRule[this.selMon].closed.repeat.weeknum = [];
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
				
				if(this.chosenTemplt.type == 'normal'){
					this.calenderRule[this.selMon].normaldays.specific.push(specifcdayObj);
				}
				
				if(this.chosenTemplt.type == 'long'){
					this.calenderRule[this.selMon].longerdays.specific.push(specifcdayObj);
				}
				
				if(this.chosenTemplt.type == 'short'){
					this.calenderRule[this.selMon].shorterdays.specific.push(specifcdayObj);
				}
				
				if(this.chosenTemplt.type == 'holiday'){
					this.calenderRule[this.selMon].closed.specific.push(specifcdayObj);
				}
			}
		} else {
			
			for(let i=0; i<this.calenderRule.length; i++){
				if(this.chosenTemplt.type == 'normal'){
					this.calenderRule[i].normaldays.repeat.weeknum = [];
					for(let m=0; m<6; m++){
						this.calenderRule[i].normaldays.repeat.weeknum.push(m+1);
					}
					
					for(let n=0; n<this.daysSel.length; n++){
						this.calenderRule[i].normaldays.repeat.days.push(this.daysSel[n].dayIndex);
					}
					
				} else if(this.chosenTemplt.type == 'long'){
					this.calenderRule[i].longerdays.repeat.weeknum = [];
					for(let m=0; m<6; m++){
						this.calenderRule[i].longerdays.repeat.weeknum.push(m+1);
					}
					
					for(let n=0; n<this.daysSel.length; n++){
						this.calenderRule[i].longerdays.repeat.days.push(this.daysSel[n].dayIndex);
					}
					
				} else if(this.chosenTemplt.type == 'short'){
					this.calenderRule[i].shorterdays.repeat.weeknum = [];
					for(let m=0; m<6; m++){
						this.calenderRule[i].shorterdays.repeat.weeknum.push(m+1);
					}
					
					for(let n=0; n<this.daysSel.length; n++){
						this.calenderRule[i].shorterdays.repeat.days.push(this.daysSel[n].dayIndex);
					}
					
				} else if(this.chosenTemplt.type == 'holiday'){
					this.calenderRule[i].closed.repeat.weeknum = [];
					for(let m=0; m<6; m++){
						this.calenderRule[i].closed.repeat.weeknum.push(m+1);
					}
					
					for(let n=0; n<this.daysSel.length; n++){
						this.calenderRule[i].closed.repeat.days.push(this.daysSel[n].dayIndex);
					}
				}
			}
			
			
		}
				
		
		this.daysSel=[];
		this.daysArr.forEach(ele=>{
			ele.sel=false;
		});
		this.templates.forEach(ele=>{
			if(ele.type===this.chosenTemplt.type){
				ele.daysArr.forEach(dayEle=>{
					dayEle.sel=false;
				})
			}
		})
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
	
	if(this.sel_edit_dt.type == 'normal'){
		if(this.calenderRule[this.selMon].normaldays.specific.length > 0){
			let arrIndx: any = this.calenderRule[this.selMon].normaldays.specific.findIndex(item => {
				let spefcDt: any = new Date(item.date);
				let selEditDt: any = new Date(this.sel_edit_dt.weekdate);
				
				return spefcDt.getDate() === selEditDt.getDate();
			});
			this.calenderRule[this.selMon].normaldays.specific.splice(arrIndx, 1);
		} else {
			this.calenderRule[this.selMon].normaldays.exclude.push({"date": this.sel_edit_dt.weekdate})
		}
	} else if(this.sel_edit_dt.type == 'long'){
		if(this.calenderRule[this.selMon].longerdays.specific.length > 0){
			let arrIndx: any = this.calenderRule[this.selMon].longerdays.specific.findIndex(item => {
				let spefcDt: any = new Date(item.date);
				let selEditDt: any = new Date(this.sel_edit_dt.weekdate);
				
				return spefcDt.getDate() === selEditDt.getDate();
			});
			this.calenderRule[this.selMon].longerdays.specific.splice(arrIndx, 1);
		} else {
			this.calenderRule[this.selMon].longerdays.exclude.push({"date": this.sel_edit_dt.weekdate})
		}
	} else if(this.sel_edit_dt.type == 'short'){
		if(this.calenderRule[this.selMon].shorterdays.specific.length > 0){
			let arrIndx: any = this.calenderRule[this.selMon].shorterdays.specific.findIndex(item => {
				let spefcDt: any = new Date(item.date);
				let selEditDt: any = new Date(this.sel_edit_dt.weekdate);
				
				return spefcDt.getDate() === selEditDt.getDate();
			});
			this.calenderRule[this.selMon].shorterdays.specific.splice(arrIndx, 1);
		} else {
			this.calenderRule[this.selMon].shorterdays.exclude.push({"date": this.sel_edit_dt.weekdate})
		}
	}  else if(this.sel_edit_dt.type == 'holiday'){
		if(this.calenderRule[this.selMon].closed.specific.length > 0){
			let arrIndx: any = this.calenderRule[this.selMon].closed.specific.findIndex(item => {
				let spefcDt: any = new Date(item.date);
				let selEditDt: any = new Date(this.sel_edit_dt.weekdate);
				
				return spefcDt.getDate() === selEditDt.getDate();
			});
			this.calenderRule[this.selMon].closed.specific.splice(arrIndx, 1);
		} else {
			this.calenderRule[this.selMon].closed.exclude.push({"date": this.sel_edit_dt.weekdate})
		}
	}
	
	//console.log("rule: ", this.calenderRule[this.selMon]);
	
	//this.calenderRule[this.selMon]
	
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
	
	allMonths(){
		this.selAllMonths=!this.selAllMonths;
		console.log('PARENT', this.selAllMonths)
		this.selMon=null;
		if(this.selAllMonths){
			this.calendarMonths.forEach(month=>{
				month.sel=true;
			})
		} else{
			this.calendarMonths.forEach(month=>{
				month.sel=false;
			});
			this.service.dayType=null;
			this.templates.forEach(ele=>{
				ele.temp_sel=false;
				ele.showform=false;
				ele.fieldsEdit=false;
			})
		}
	}

}
