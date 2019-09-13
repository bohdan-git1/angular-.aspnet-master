import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

	calendarMonths: any = [];
	calenderRule: any = {
    "closed": {
      "repeat": ["0", "1"],
      "specific": [{"date": "Fri Oct 17 2018 00:00:00 GMT+0530 (India Standard Time)"}, {"date" : "Fri Oct 31 2018 00:00:00 GMT+0530 (India Standard Time)"}]
    },
    "longerdays": {
		"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["6", "4"]},
		"specific": []
	},
	"shorterdays": {
		"repeat": {"weeknum": ["2", "4"], "days": ["2"]},
		"specific": []
	},
	
	"otherofficeopen": {
		"repeat": {"weeknum": ["1", "2", "3", "4", "5", "6"], "days": ["1", "6"]},
		specific: []
	}
}
	
  constructor() { }

  ngOnInit() {
	this.createMonths();
  }
  
  createMonths() {
	for(let i=0; i<6; i++){
		let today = new Date();
		let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		this.calendarMonths.push(currentMonth);
	}
  }
}
