import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'app-searchpanel',
  templateUrl: './searchpanel.component.html',
  styleUrls: ['./searchpanel.component.css']
})
export class SearchpanelComponent implements OnInit {
	
	@ViewChild('errornotification') errornotification: ElementRef;
	@ViewChild('searchresult') searchresult: ElementRef;
	
	patient_data: any = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "SP", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "FA", "is_patient": true}, {"id": 4, "firstname": "Samantha", "lastname": "Adams", "relation_type": "MO", "is_patient": false}], "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Draper", "relation": [{"id": 2, "firstname": "Derrick", "lastname": "Adams", "relation_type": "SP", "is_patient": true}, {"id": 3, "firstname": "Lydia", "lastname": "Adams", "relation_type": "MO", "is_patient": true}], "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "location": "Stonehaven Orthodontics Lehi", "relation": [], "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true}
	];
	
	
	patientDetails:any[] = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true, "profileimg": "../assets/profile_4.png", "appntType": "appl"},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true, "profileimg": "assets/495827904.png", "appntType": "dband"},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true, "profileimg": "assets/492730210.png", "appntType": "exam"},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false, "profileimg": "", appntType: ""},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true, "profileimg": "assets/profile_4.png", "appntType": "exam"}
	]
	
	/*lastlistArr: any[] = [{name: 'Obi- Wan Kenobi', dob: '06/19/1996'}, {name: 'Sheeve Palpatine', dob: '06/19/1996'}, {name: 'Jar Jar Binks', dob: '06/19/1996'}, {name: 'Darth Maul', dob: '06/19/1996'}, {name: 'Qui - Gonn Jinn', dob: '06/19/1996'}, {name: 'Padme Amidala', dob: '06/19/1996'}, {name: 'Sio Bibble', dob: '06/19/1996'}, {name: 'Poe Dameron', dob: '06/19/1996'}, {name: 'Aayla Secura', dob: '06/19/1996'}, {name: 'Jessika Pava', dob: '06/19/1996'}];*/
	
	searchResult: any[] = [];
	searchCriteria: any = '';
	searchContHt:any = 0;
	showSearchOptions: boolean = false;
	searchtype: any;
	
	showlastList: boolean = false;
	searchinput: any;
	hover: any = -1;
	respHover: any = -1;
	selectedPatient: any;
	allSearch: boolean = false;
	
	lastlistArr: any[] =[];
	last10listArr:any[]=[];
	lastlistArrlength: any= 0;
	
  constructor(public patientDialog: MatDialog, private messageService: MessageService) { }

  ngOnInit() {
  }
  
  createSearchList(_searchstr){
	
	this.showlastList = false;
	let searchstr = _searchstr.toLowerCase();
	let hiddenSrch:boolean = searchstr.indexOf('/') == 0 ? true : false;
	
	//console.log('hiddenSrch: ', hiddenSrch, searchstr.indexOf('/'));
	
	let formatedSchStr: any;
	
	if(hiddenSrch == true){
		formatedSchStr = searchstr.substring(1, searchstr.length);
		this.searchinput = _searchstr.substring(1, _searchstr.length);
		this.allSearch = true;
	} else {
		formatedSchStr = searchstr;
		this.searchtype = '';
		this.searchinput = _searchstr;
		this.allSearch = false;
	}
	
	this.searchCriteria = formatedSchStr;
	
	let searchStrSplit = formatedSchStr.split(' ');
	let filterSearchArr = searchStrSplit.filter(item => {return item});
	
	this.searchResult = [];
	
	if(formatedSchStr.length >= 2){
		
		if(filterSearchArr.length==1){
			let not_a_Number: any = isNaN(filterSearchArr[0]);
			
			if(hiddenSrch == true){
				if(not_a_Number == true){
					this.searchtype = 'name';
				} else {
					this.searchtype = 'phone';
				}
			}
			
			if(hiddenSrch == true){
				this.searchResult = this.patient_data.filter(item => {
					return filterSearchArr.some(srch => {
						return (item.firstname.toLowerCase().includes(srch) || item.lastname.toLowerCase().includes(srch) || item.phone.includes(srch) || item.address.toLowerCase().includes(srch) || item.email.toLowerCase().includes(srch))
					})
				});
			} else {
				this.searchResult = this.patient_data.filter(item => {
					return filterSearchArr.some(srch => {
						return (item.firstname.toLowerCase().includes(srch) || item.lastname.toLowerCase().includes(srch) || item.phone.includes(srch) || item.address.toLowerCase().includes(srch) || item.email.toLowerCase().includes(srch)) && item.is_patient
					})
				});
			}
			
			/*let respPatyArr: any[] = [];
			
			respPatyArr = this.patient_data.filter(item => {
				return item.relation.some(resp => {
					return filterSearchArr.some(srch => {
						return (resp.firstname.toLowerCase().includes(srch) || resp.lastname.toLowerCase().includes(srch))
					})
					
				})
			})
			
			if(respPatyArr.length > 0){
				this.searchResult.push(...respPatyArr);
			}*/
			
		} else {
			
			let _search_name: boolean = false;
			let _search_phone: boolean = false;
			
			for(let i=0; i<filterSearchArr.length; i++){
				let not_a_Number_multi: any = isNaN(filterSearchArr[i]);
				if(hiddenSrch == true){
					if(not_a_Number_multi == true){
						_search_name = true;
					} else {
						_search_phone = true;
					}
				}
			}
			
			if(hiddenSrch == true){
				
				if(_search_name == true && _search_phone == false){
					this.searchtype = 'name';
					
					let nameArr: any = {fname: filterSearchArr[0], lname: filterSearchArr[1]};
					this.searchResult = this.patient_data.filter(item => {
						return (item.firstname.toLowerCase().includes(nameArr.fname) && item.lastname.toLowerCase().includes(nameArr.lname));
					});
					
					console.log('searchResult_length: ', this.searchResult.length);
					
					/*if(this.searchResult.length == 0){
						this.searchtype = 'address';
						let addrsStr_2: any = filterSearchArr.join(" ");
						this.searchResult = this.patient_data.filter(item => {
							return (item.address.toLowerCase().includes(addrsStr_2))
						});
					}*/
					
				} else if(_search_name == false && _search_phone == true){
					this.searchtype = 'phone';
					
					this.searchResult = this.patient_data.filter(item => {
						return filterSearchArr.some(srch => {
							return (item.phone.includes(srch));
						})
					});
					
				} else if(_search_name == true && _search_phone == true){
					this.searchtype = 'address';
					let addrsStr: any = filterSearchArr.join(" ");
					this.searchResult = this.patient_data.filter(item => {
						return (item.address.toLowerCase().includes(addrsStr))
					});
					
				} else {
					//do nothing;
				}
				
				//console.log('searchtype: ', this.searchtype);
				
			} else {
				
				let nameArr: any = {fname: filterSearchArr[0], lname: filterSearchArr[1]};
				
				
				/*this.searchResult = this.patient_data.filter(item => {
					return filterSearchArr.some(srch => {
						return (item.firstname.toLowerCase().includes(srch) || item.lastname.toLowerCase().includes(srch) || item.phone.includes(srch) || item.address.toLowerCase().includes(srch))
					})
				});*/
				
				this.searchResult = this.patient_data.filter(item => {
					return item.firstname.toLowerCase().includes(nameArr.fname) && item.lastname.toLowerCase().includes(nameArr.lname) && item.is_patient;
				});
			}

		}
		
		this.showSearchOptions = true;
		
		if(this.searchResult.length > 0){
			if(this.searchresult){
				setTimeout(() => {
					this.searchContHt = this.searchresult.nativeElement.offsetHeight + 40;
				});
			}
		} else {
			if(this.errornotification){
				
				setTimeout(() => {
					this.searchContHt = this.errornotification.nativeElement.offsetHeight + 40;
				});
			}
		}
	} else {
		this.searchtype = '';
		this.showSearchOptions = false;
	}
  }
  
  changeSearchtype(type){
	this.searchtype = type;
  }
  
  showLast() {
	this.showSearchOptions = false;
	this.showlastList = this.showlastList == true ? false : true;
  }
  
  openpatientModal(_serchItem){
	this.showSearchOptions = false;
	let patientId: any = _serchItem.id;
	
	this.selectsearch(_serchItem);
	
	let patient_det: any[] = this.patientDetails.filter(item => {
		return patientId == item.id;
	});
	
	this.selectedPatient = `${patient_det[0].firstname} ${patient_det[0].lastname}`;
	
	const dialogRef = this.patientDialog.open(SearchPatientBox, {
		panelClass: 'patientModal',
		backdropClass: 'whitebackdrop',
	  data: {patientdata: patient_det[0]}
	});
  }
  
  openPatientProfile(_serchItem) {
	if(_serchItem.is_patient){
		this.showSearchOptions = false;
		this.selectedPatient = `${_serchItem.firstname} ${_serchItem.lastname}`;
		this.messageService.sendMessage('openpatienttab', {"patient": _serchItem, "posttreatment": false, "section": "treatment"});
	}
  }
  
  selectsearch(indexdat) {
		if(this.lastlistArr.indexOf(indexdat)==-1) {
			this.lastlistArr.unshift(indexdat);
			this.lastlistArrlength= this.lastlistArr.length;
			this.last10listArr = this.lastlistArr.slice(0, 10);
		} 
  }

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class SearchPatientBox implements OnInit {
  
  patientdata: any;
 
  constructor(public _matDialogRef: MatDialogRef<SearchPatientBox>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	this.patientdata = this.data.patientdata;
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 
}


