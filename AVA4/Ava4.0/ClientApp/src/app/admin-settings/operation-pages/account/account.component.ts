import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	
	rotateOnY: any = 0;
	checkprimaryToggle: boolean = true;
	
  constructor() { }

  ngOnInit() {
  }
  
  flipCard() {
	this.rotateOnY -= 180;
  }
  
  primaryToggle() {
	this.checkprimaryToggle = this.checkprimaryToggle == true ? false : true;
  }

}
