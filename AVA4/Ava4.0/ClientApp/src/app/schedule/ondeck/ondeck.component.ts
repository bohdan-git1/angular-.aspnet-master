import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-ondeck',
  templateUrl: './ondeck.component.html',
  styleUrls: ['./ondeck.component.css']
})
export class OndeckComponent implements OnInit {
	
	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0, suppressScrollX: false, suppressScrollY: true};
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	
	scrol_x = 0;
	
	showSeat: any[] = [false, false, false, false];
	onDeck_arr:any[]=[
		{id: 184,patientFullName:"Kylo Ren", startTime:"07:45 am", checkInTime:"07:50 am", timeGap:"13m",appntType: 'appl'},
		{id: 185,patientFullName:"Obi - Wan Kenobi", startTime:"08:00 am", checkInTime:"07:58 am", timeGap:"5m",appntType: 'dband'},
		{id: 186,patientFullName:"Boba Fett", startTime:"08:00 am", checkInTime:"08:00 am", timeGap:"0m",appntType: 'exam'},
		{id: 187,patientFullName:"Poe Dameron", startTime:"08:03 am", checkInTime:"08:00 am", timeGap:"3m",appntType: 'appl'}
	]
	update_onDeck:any[]=[]
	
  constructor(private msgSer:MessageService) { }

  ngOnInit() {
	//console.log(this.onDeck_arr);
	this.msgSer.getMessage().subscribe(res=>{
		
		if(res.event=='addToOnDeck'){
			this.onDeck_arr.push(res.data);
			console.log(this.onDeck_arr);
		}
		else if(res.event=='remove from deck'){
			let id=res.data;
			for(var i=0;i<this.onDeck_arr.length;i++){
				if(this.onDeck_arr[i].id==id){
					this.onDeck_arr.splice(i,1);
				}
			}
		}
		this.update_onDeck=this.onDeck_arr;
	})
  }
  
	moveHorizontally(dir){
		if(dir == 'right'){
			this.scrol_x += 100;
		} else {
			this.scrol_x = 0;
		}
		
		this.componentRef.directiveRef.scrollTo(this.scrol_x, 0, 500);
	}

}
