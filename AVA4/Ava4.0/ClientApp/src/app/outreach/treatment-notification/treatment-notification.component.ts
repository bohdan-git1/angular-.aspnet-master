import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-treatment-notification',
  templateUrl: './treatment-notification.component.html',
  styleUrls: ['./treatment-notification.component.css']
})
export class TreatmentNotificationComponent implements OnInit {
	
	openTodo: boolean = false;
	checkedIcon: any[] = [];
	allChecked: boolean = false;
	showAddtodo = false;
	
	addbtnClicked:boolean = false;
	
	@ViewChild('descptn') descptn: ElementRef;
	@ViewChild('dt') dt: ElementRef;
	
	tolistArr: any[] = [
	{'desc': 'Update Pano', 'date': 'Nov 5.', 'checked': true, 'pastdate': false},
	{'desc': '(MO) Clarissa Marcum needs to sign Hippa release form.', 'date': 'Nov 7', 'checked': false, 'pastdate': true},
	{'desc': 'Send extraction letter to Dr. Smith', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Refer patient to periodontist', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Thank patient for Jackie Mendoza refferal', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Update Pano', 'date': 'April 7, 2019', 'checked': false, 'pastdate': false},
	];
	
  constructor() { }

  ngOnInit() {
	this.tolistArr.map(() => {
		this.checkedIcon.push({'checked-icon': true, showcheckicon: false});
	});
  }
  
  openTodoList() {
	this.openTodo = this.openTodo == false ? true : false;
	this.showAddtodo = false;
  }
  
  mouseOver(indx, dir){
	if(dir == 'over'){
		this.checkedIcon[indx]['showcheckicon'] = true;
	} else {
		this.checkedIcon[indx]['showcheckicon'] = false;
	}
  }
  
  checkedTodoItem(indx){
	this.tolistArr[indx].checked = true;
	
	for(let i=0; i<this.tolistArr.length; i++){
		if(this.tolistArr[i].checked == true){
			this.allChecked = true;
		} else {
			this.allChecked = false;
			break;
		}
	}
  }
  
  showAddtodoInput(){
	this.showAddtodo = true;
	this.addbtnClicked = true;
  }
  
  addTodoItem(evt){
	
	if(this.descptn.nativeElement.value != '' && this.dt.nativeElement.value != '' && evt.which == 13){
		this.tolistArr.push({'desc': this.descptn.nativeElement.value, 'date': this.dt.nativeElement.value, 'checked': false, 'pastdate': false});
		this.checkedIcon.push({'checked-icon': true, showcheckicon: false});
		this.allChecked = false;
		
		this.descptn.nativeElement.value = '';
		this.dt.nativeElement.value = '';
		
		this.descptn.nativeElement.blur();
		this.dt.nativeElement.blur();
	}
	
  }
  
  closeNotification() {
	if(this.addbtnClicked == true){
		this.addbtnClicked = false;
	} else {
		this.openTodo = false;
	}
	
  }

}
