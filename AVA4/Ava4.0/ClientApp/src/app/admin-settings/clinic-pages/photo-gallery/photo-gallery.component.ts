import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
	
	photogalArr: any[] = [{"section": "A", "selected": false}, {"section": "B", "selected": false}, {"section": "C", "selected": false}, {"section": "D", "selected": false}, {"section": "E", "selected": false}]
	
  constructor() { }

  ngOnInit() {
	
	this.selectGalSection(0);
  }
  
  selectGalSection (index){
	this.photogalArr.map(item => {
		item.selected = false;
	});
	
	this.photogalArr[index].selected = true;
  }

}
