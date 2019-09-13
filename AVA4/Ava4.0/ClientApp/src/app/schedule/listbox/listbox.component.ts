import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {
	
	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
	@ViewChild('listboxscroll') listboxscroll: PerfectScrollbarComponent;
	@ViewChild('scrollpanel') scrollpanel:ElementRef;
	
	scrollNum: any = 0;
	scrollUp: boolean = false;
	scrollDn: boolean = false;
	
	showSeat: any[] = [false, false, false, false];
	
	holdingBucketArr: any[] = [
		{id: 11, firstname:'Sheev', lastname: 'Palpatine', stratTime: '07:30', endTime: '08:30', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl', checkedin: false, procedurecode: '304', multipleAppnts:false},
		
		{id: 12, firstname:'Kylo', lastname: 'Ren', stratTime: '08:30', endTime: '09:15', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband', checkedin: false, procedurecode: '102', multipleAppnts:true},
		
		{id: 13, firstname:'Mace', lastname: 'Windu', stratTime: '09:15', endTime: '09:30', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam', checkedin: false, procedurecode: '405', multipleAppnts:false},
		
		{id: 14, firstname:'Leia', lastname: 'Organa', stratTime: '09:30', endTime: '09:45', accesscode: '000303', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam', checkedin: false, procedurecode: '533', multipleAppnts:true}
		
		];
		
	subscription: Subscription;
	
  constructor(public patientDialog: MatDialog, private messageService: MessageService) {
	
	this.subscription = this.messageService.getMessage().subscribe(res => {
		if(res.event == 'addtobucket'){
			//console.log(JSON.stringify(message.data));
			//console.log(res.data)
			this.holdingBucketArr.push(res.data);
			this.listboxscroll.directiveRef.scrollToBottom(0, 300);
			setTimeout(() =>{
				this.scrollList('dn');
			}, 400);
			
		}
	});
	
  }

  ngOnInit() {
	
	setTimeout(() => {
			
			let chckScrollPos: any = this.listboxscroll.directiveRef.position();
			
			//console.log(chckScrollPos);
			
			if(chckScrollPos.y == 'start'){
				this.scrollUp = false;
			}
			
			if(chckScrollPos.y == 'end'){
				this.scrollDn = false;
			}
			
		}, 500);
	
  }
  
  showBottom(indx){
	
	if(this.showSeat[indx] == true){
		this.showSeat[indx] = false;
	} else {
		this.showSeat[indx] = true;
	}
	
  }
  
  gotoTop() {
	
  }
  
  scrollList(dir ) {
	
	let checkScrollability: any = this.listboxscroll.directiveRef.position();
	
		if(dir == 'up'){
			if(checkScrollability.y != 'start'){
				this.scrollNum -= 25;
			}
		} else {
			if(checkScrollability.y != 'end'){
				this.scrollNum += 25;
			}
		}
		
		//console.log('checkScrollability: ', checkScrollability);
		
		this.listboxscroll.directiveRef.scrollTo(0, this.scrollNum, 500);
		
		setTimeout(() => {
			
			let chckScrollPos: any = this.listboxscroll.directiveRef.position();
			
			//console.log('chckScrollPos: ', chckScrollPos);
			
			if(chckScrollPos.y == 'start'){
				this.scrollUp = false;
			} else {
				this.scrollUp = true;
			}
			
			if(chckScrollPos.y == 'end'){
				this.scrollDn = false;
			} else {
				this.scrollDn = true;
			}
			
		}, 500);
	
  }
  
  openModal(indx) {
	const dialogRef = this.patientDialog.open(PatientCard, {
		  width: '933px',
		  height: '555px',
		  backdropClass: 'whitebackdrop',
		  panelClass: 'patient-card',

		  data: {patientdata: this.holdingBucketArr[indx]}
		});
  }

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class PatientCard implements OnInit {
  
  patientdata: any;
  appntType: any;
  timeline_scroll_y = 0;
  
  block_2_upscroll: boolean = false;
  block_2_dnscroll: boolean = true;
  
  block_3_upscroll: boolean = false;
  block_3_dnscroll: boolean = true;
  
  public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
  @ViewChild('block2component') block2component: PerfectScrollbarComponent;
  @ViewChild('block3component') block3component: PerfectScrollbarComponent;
  
    
  constructor(public _matDialogRef: MatDialogRef<PatientCard>, @Inject(MAT_DIALOG_DATA) public data: any) {
	
  }

  ngOnInit() {
	this.patientdata = this.data.patientdata;
  }
  
  onScroll(dir, element) {
	
	if(element == 'block_2'){
		
		let checkScrollability: any = this.block2component.directiveRef.position();
	
		if(dir == 'up'){
			if(checkScrollability.y != 'start'){
				this.timeline_scroll_y -= 20;
			}
		} else {
			if(checkScrollability.y != 'end'){
				this.timeline_scroll_y += 20;
			}
		}
		this.block2component.directiveRef.scrollTo(0, this.timeline_scroll_y, 500);
		
		setTimeout(() => {
			
			let chckScrollPos: any = this.block2component.directiveRef.position();
			
			if(chckScrollPos.y == 'start'){
				this.block_2_upscroll = false;
			} else {
				this.block_2_upscroll = true;
			}
			
			if(chckScrollPos.y == 'end'){
				this.block_2_dnscroll = false;
			} else {
				this.block_2_dnscroll = true;
			}
			
		}, 500);
		
	} else {
		
		let checkScrollability: any = this.block3component.directiveRef.position();
	
		if(dir == 'up'){
			if(checkScrollability.y != 'start'){
				this.timeline_scroll_y -= 20;
			}
		} else {
			if(checkScrollability.y != 'end'){
				this.timeline_scroll_y += 20;
			}
		}
		this.block3component.directiveRef.scrollTo(0, this.timeline_scroll_y, 500);
		
		setTimeout(() => {
			
			let chckScrollPos_block3: any = this.block3component.directiveRef.position();
			
			if(chckScrollPos_block3.y == 'start'){
				this.block_3_upscroll = false;
			} else {
				this.block_3_upscroll = true;
			}
			
			if(chckScrollPos_block3.y == 'end'){
				this.block_3_dnscroll = false;
			} else {
				this.block_3_dnscroll = true;
			}
			
		}, 500);
		
	}
	
	
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
  
}
