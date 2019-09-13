import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../core/message.service';


@Component({
  selector: 'app-doctor-referral-out',
  templateUrl: './doctor-referral-out.component.html',
  styleUrls: ['./doctor-referral-out.component.css']
})
export class DoctorReferralOutComponent implements OnInit {
  @Input() subscriptionArray;
  @Input() doctordetailsArrForOut;
  @Input() subscriptionDoctorArray;

  public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
  doctordetailsArr: any=[];
  
  @Output() saveDoctorOutArray = new EventEmitter();
  @Output() saveDoctorArrayForCLK = new EventEmitter();
  doctorAlocationFilter: boolean= false;

	defaultDoctor:boolean = false;
	searchPlaceholderTxt: any;
	searchDoctorArr:any[] = [];
	searchLocationArr:any[] = [];

  constructor( private messageService: MessageService) { }

  ngOnInit() {
    
    this.doctordetailsArr= this.doctordetailsArrForOut;

    this.subscriptionArray.map(function(element,key) {
      var count=0;
      element.doctoroptions.forEach(function(element1, key1){
        if(element1.selected==true)
        {
          count=1;
        }
      });  
      if(count==1)
      {
        element.selected=true;
      }else {
        element.selected=false;
      }
     });

     if( this.subscriptionArray.length>0)
     {
       this.doctordetailsArr=this.subscriptionArray;
     }
	 
	 this.doctorAlocationFilterFn();


  }

  showDoctorDetail(id)
  {
    this.doctordetailsArr.map((element,key) => {
      if(element.selected==true && element.id != id)
        {
          element.selected= false;
        }
     });
	 
    //this.doctordetailsArr[index].selected = this.doctordetailsArr[index].selected==false ? true : false;
	
	let index: any = this.doctordetailsArr.findIndex(elem => {
		return elem.id == id;
	});
	
	this.doctordetailsArr[index].selected = this.doctordetailsArr[index].selected==false ? true : false;

  }

  showDoctorFilterDetail(id)
  {
    this.subscriptionDoctorArray.map((element,key) => {
		if(element.selected==true && element.id != id) {
			element.selected= false;
		}
     });
	 
	 let index: any = this.subscriptionDoctorArray.findIndex(elem => {
		return elem.id == id;
	});
	 
    this.subscriptionDoctorArray[index].selected = this.subscriptionDoctorArray[index].selected==false ? true : false;
   
  }

  selecteDoctor(id, index) {
	
	let inxd: any = this.doctordetailsArr.findIndex(elem => {
		return elem.id == id;
	});
	
    this.doctordetailsArr[inxd]['doctoroptions'][index].selected = this.doctordetailsArr[inxd]['doctoroptions'][index].selected==false ? true : false;
  }

  selecteFilterDoctor(id, index){
   let inxd: any = this.subscriptionDoctorArray.findIndex(elem => {
		return elem.id == id;
	});
    this.subscriptionDoctorArray[inxd]['clinicnames'][index].selected = this.subscriptionDoctorArray[inxd]['clinicnames'][index].selected==false ? true : false;
    
  }

  saveDetails()
  {
    this.messageService.sendMessage('savedoctorFilterforoutCls', this.subscriptionDoctorArray);
    this.messageService.sendMessage('savedoctorforOut', this.doctordetailsArr);

    this.saveDoctorOutArray.emit(this.doctordetailsArr);
  }
  
  doctorAlocationFilterFn() {
    if(this.defaultDoctor == true) {
		this.doctorAlocationFilter= true;
		this.defaultDoctor = false;
		this.searchPlaceholderTxt = 'Find by location';
		this.searchLocationArr = this.doctordetailsArr;
    } else {
		this.doctorAlocationFilter= false;
		this.defaultDoctor = true;
		this.searchPlaceholderTxt = 'Find doctor...';
		this.searchDoctorArr = this.subscriptionDoctorArray;
    }
  }
  
  search(evt){
	
	let searchTxt: any = evt.target.value;
	let searchItem: any = searchTxt.toLowerCase();
	
	if(this.defaultDoctor){
		if(searchItem.length > 1){
		
			this.searchDoctorArr = this.subscriptionDoctorArray.filter(item => {
				return (item.doctorname.toLowerCase().includes(searchItem));
			})
		} else {
			this.searchDoctorArr = this.subscriptionDoctorArray;
		} 
	} else {
		if(searchItem.length > 1){
			this.searchLocationArr = this.doctordetailsArr.filter(item => {
				return (item.title.toLowerCase().includes(searchItem));
			})
		} else {
			this.searchLocationArr = this.doctordetailsArr;
		}
	}
	
	
  }


}
