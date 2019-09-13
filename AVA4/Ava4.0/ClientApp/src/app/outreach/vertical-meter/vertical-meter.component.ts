import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-meter',
  templateUrl: './vertical-meter.component.html',
  styleUrls: ['./vertical-meter.component.css']
})
export class VerticalMeterComponent implements OnInit {
	
	/*markerlblArr: any[] = [{'label': '$200'}, {'label': '$200'}, {'label': '$200'}, {'label': '$200'}, {'label': '$200'}];*/
	
	@Input() markerlblArr: any[];
	@Input() meterdata: any;
	

  constructor() { }

  ngOnInit() {
  }

}
