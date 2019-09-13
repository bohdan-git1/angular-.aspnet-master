import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-xray-scan',
  templateUrl: './xray-scan.component.html',
  styleUrls: ['./xray-scan.component.css']
})
export class XrayScanComponent implements OnInit {

	@Input() postTreatment: boolean;
	selectedImg: any;
	fadein: boolean = false;
	galimgclass: any = [];
	scrollContent: any = 0;
	
	showtileView:boolean = false;
	
	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
	@ViewChild('scrollercomponent') scrollercomponent: PerfectScrollbarComponent;
	
	patientExamArr: any = [
		{"type": "Pre-Exam", "date": "09/24/13", "age": "8y 7m"},
		{"type": "Initial", "date": "11/07/13", "age": "8y 8m"},
		{"type": "Final", "date": "05/17/15", "age": "10y 3m"},
		{"type": "Phase 2", "date": "08/08/17", "age": "12y 6m"},
		{"type": "Final Phase 2", "date": "03/15/18", "age": "13y 1m"},
	];
	
	galleryImgArr: any = [
		{"imgurl": "assets/gallery/gallery_0.jpg"},
		{"imgurl": "assets/gallery/gallery_1.jpg"},
		{"imgurl": "assets/gallery/gallery_2.jpg"},
		{"imgurl": "assets/gallery/gallery_3.jpg"},
		{"imgurl": "assets/gallery/gallery_4.jpg"},
		{"imgurl": "assets/gallery/gallery_5.jpg"},
		{"imgurl": "assets/gallery/gallery_6.jpg"},
		{"imgurl": "assets/gallery/gallery_7.jpg"},
		{"imgurl": "assets/gallery/gallery_8.jpg"},
	]
	
  constructor() { }

  ngOnInit() {
	
	/*let today:any = new Date();
	let visitDate: any = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
	
	if(window.localStorage.getItem('visitdate') != null || window.localStorage.getItem('visitdate') != undefined){
		let storagevisitDate = window.localStorage.getItem('visitdate');
		
		if(visitDate == storagevisitDate){
			this.consq_visit = true;
		} else {
			this.consq_visit = false;
		}
	}*/
	
	for(let i=0; i<this.galleryImgArr.length; i++){
		this.galimgclass.push({'galimg': true, 'showimage': false});
	}
		
	this.showSelectedImg(0);
  }
  
  showSelectedImg(indx) {
	if(this.selectedImg){
		this.selectedImg.showimage = false;
	}
	this.galimgclass[indx].showimage = true;
	this.selectedImg = this.galimgclass[indx];
  }
  
  scroll(dir) {
		
		let checkScrollability: any = this.scrollercomponent.directiveRef.position();
		
		if(dir == 'up'){
			if(checkScrollability.y != 'start'){
				this.scrollContent -= 100;
			}
			if(checkScrollability.y != 'end'){
				this.scrollContent += 100;
			}
		}
		
		this.scrollercomponent.directiveRef.scrollTo(0, this.scrollContent, 500);
	}
	
	toggleGalleryView(){
		this.showtileView = this.showtileView==true ? false : true;
	}
}
