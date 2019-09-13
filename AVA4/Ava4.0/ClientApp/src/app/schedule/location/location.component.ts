import { Component, OnInit, Inject, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { MultiLoginService } from 'src/app/multi-login-screen/multi-login.service';

import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
	
	selectedLocation: any;
	activeLocation: any = 2;
	locationArr:any[] = [{'label': 'Lehi Office', 'active': false}, {'label': 'Provo Office', 'active': false}, {'label': 'Salt Lake City Office', 'active': true}];
	
	@Output() selectedLocationData= new EventEmitter();
	
	showdrpdn: boolean = false;
	
  constructor(private userSer:MultiLoginService, private messageService:MessageService) {}

  ngOnInit() {
    this.selectLocation(2);
  }
  
  onShowDialog(evt: MouseEvent): void {
		this.showdrpdn = this.showdrpdn==true ? false : true;
    
	}
	
	selectLocation(indx){
		this.locationArr.map(item => {
			item.active = false;
		});
		
		this.locationArr[indx].active = true;
		this.selectedLocation = this.locationArr[indx];
		this.showdrpdn = false;
		this.selectedLocationData.emit(this.selectedLocation.label);
		this.userSer.selectLocation(this.selectedLocation.label);
		
		setTimeout(() => {
			this.messageService.sendMessage('location', this.selectedLocation.label);
		})
		
		
	}
	
	onClickedOutside(){
		this.showdrpdn = false;
	}

}
