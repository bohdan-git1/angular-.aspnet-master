import { Component, OnInit, HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
	
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	boxHt: any;	
	
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}

  constructor() { }

  ngOnInit() {
	this.initalizeFrame();
  }
  
  initalizeFrame(){
	let topHt:any = 139;
	let bottomHt: any = 110;
	this.boxHt = window.innerHeight - (topHt + bottomHt);
  }
}
