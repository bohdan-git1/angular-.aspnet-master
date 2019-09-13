import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-selected-ddoptions',
  templateUrl: './selected-ddoptions.component.html',
  styleUrls: ['./selected-ddoptions.component.css']
})
export class SelectedDDOptionsComponent implements OnInit {
	
	@Input() drpdndata: any;

	constructor(private messageService: MessageService) { 
		
		this.messageService.getMessage().subscribe(message => {
			if(message.event == 'updatedata'){
				this.initializeDrpDn();
			}
		});
		
	}

	ngOnInit() {
		this.initializeDrpDn();
	}
	
	initializeDrpDn(){
				
		this.drpdndata.map(dditem => {
			
			if(dditem.selected == true){
				dditem['opendrpdn_edit'] = true;
			} else {
				dditem['opendrpdn_edit'] = false;
			}
		});
		
	}
	
	toogleDropdown(sel_indx) {
		
		/*this.drpdndata.map((dditem, indx) => {
			if(indx != sel_indx){
				dditem['opendrpdn_edit'] = false;
			}
		});*/

		this.drpdndata[sel_indx]['opendrpdn_edit'] = this.drpdndata[sel_indx]['opendrpdn_edit'] == true ? false : true;
	}

}
