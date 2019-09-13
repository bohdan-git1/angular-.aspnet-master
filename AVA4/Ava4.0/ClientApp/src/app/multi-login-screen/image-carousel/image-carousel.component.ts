import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {
	
	@ViewChild('container') container:ElementRef;
	
	img_wrapperWd: any;
	img_containerWd: any;
	imagecontWd_percent: any = 0.6;
	leftpos: any;
	
	firstimgPos: any;
	slideInterval:any;
	sliderCount: any = 0;
	animationPos: any = 0;
	
	imageUrlArray:any[]=["/assets/slide-img2.jpg", "/assets/slide-img3.jpg", "/assets/slide-img4.jpg","/assets/slide-img5.jpg"];
	
	
  constructor() { }

  ngOnInit() {
	this.initalizeSlider();
  }
  
  initalizeSlider(){
	this.img_containerWd = this.container.nativeElement.clientWidth*this.imagecontWd_percent;
	this.img_wrapperWd = this.img_containerWd*this.imageUrlArray.length;
	this.firstimgPos = (this.container.nativeElement.clientWidth - this.img_containerWd)/2;
	this.leftpos = this.container.nativeElement.clientWidth - 100;
	
	this.playSlider();
  }
  
  getPostion(indx){
	let leftpos: any;
	// if(indx > 1){
	// 	leftpos = indx*(this.container.nativeElement.clientWidth) -  100 - (this.img_containerWd)/2;
	// } else {
	// 	leftpos = indx*(this.container.nativeElement.clientWidth) -  100;
	// }
	leftpos = indx*(this.container.nativeElement.clientWidth) -  100 - (indx-1)*(this.img_containerWd)/2;
	
	return leftpos;
  }
  
  playSlider(){
	this.slideInterval=setInterval(() => {
		this.sliderCount++;
		if(this.sliderCount > this.imageUrlArray.length-1){
			this.sliderCount = 0;
		}
		
		this.animationPos = -this.sliderCount*(this.container.nativeElement.clientWidth - (this.img_containerWd)/2);
		
		//console.log(this.animationPos)
		
	}, 15000)
  }

  clickOnDot(indx){
	clearInterval(this.slideInterval);
	this.sliderCount=indx;
	console.log(this.sliderCount);
	if(this.sliderCount > this.imageUrlArray.length-1){
		this.sliderCount = 0;
	}
	this.animationPos = -this.sliderCount*(this.container.nativeElement.clientWidth - (this.img_containerWd)/2);
	this.playSlider();
  }

}
