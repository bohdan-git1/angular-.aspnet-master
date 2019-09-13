import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.css']
})
export class ToggleBtnComponent implements OnInit {
	
	@Input() label: any;
	@Input() toggleChecked: boolean = false;
	
  constructor() { }

  ngOnInit() {
  }
  
  checkedToogle() {
	this.toggleChecked = this.toggleChecked == true ? false : true;
  }

}
