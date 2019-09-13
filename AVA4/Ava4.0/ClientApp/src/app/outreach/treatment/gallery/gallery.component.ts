import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MessageService} from '../../../core/message.service';

import domtoimage from 'dom-to-image';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imageGalleryArray: any[];

  @Output() imageName = new EventEmitter();
	
	selectMultiple:boolean = false;
	showComparePanel:boolean = false;
	
	compareArrPanelArr: any[] = [];
	selectRowArr: any[] = [];
	selectRowCount: any = 0;
  
  constructor(private dataService:MessageService) {

    this.imageGalleryArray =[
      { gallerysection: 'Final Phase 2 - 03/15/18 13y 1m',
        imgsection: [
          { img: 'assets/gallery/gallery_1.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_2.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_3.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_4.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_5.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_6.jpg', img_name: '', selected: false}
        ]
      },

      { gallerysection: 'Phase 2 - 08/08/17 12y 6m',
        imgsection: [
          { img: 'assets/gallery/gallery_6.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_7.jpg', img_name: '', selected: false},
          { img: 'assets/gallery/gallery_1.jpg', img_name: 'Anterior Occlusal(1)', selected: false},
          { img: 'assets/gallery/gallery_2.jpg', img_name: 'Lateral (6)', selected: false},
          { img: 'assets/gallery/gallery_3.jpg', img_name: 'Upper Occlusal (7)', selected: false},
          { img: 'assets/gallery/gallery_5.jpg', img_name: 'Lateral (7)', selected: false}
        ]
      },


      { gallerysection: 'Final - 05/17/15 10y 3m',
      imgsection: [
        { img: 'assets/gallery/gallery_3.jpg', img_name: 'Right Occlusal (2)', selected: false},
        { img: 'assets/gallery/gallery_6.jpg', img_name: 'Upper Occlusal (7)', selected: false},
        { img: 'assets/gallery/gallery_1.jpg', img_name: 'Right Occlusal (2)', selected: false},
        { img: 'assets/gallery/gallery_2.jpg', img_name: 'Lateral (6)', selected: false},
        { img: 'assets/gallery/gallery_5.jpg', img_name: 'Upper Occlusal (7)', selected: false},
        { img: 'assets/gallery/gallery_7.jpg', img_name: '', selected: false}
      ]
     }
    ]

   }

	ngOnInit() {

	}

	selectImage(secIndx, indx) {
		
		if(this.selectMultiple) {
		
			let selectedSection: any[] = this.imageGalleryArray[secIndx].imgsection.filter(item => {
				return item.selected;
			});
			
			if(selectedSection.length < 3){
				this.imageGalleryArray[secIndx].imgsection[indx].selected = this.imageGalleryArray[secIndx].imgsection[indx].selected == true ? false : true;
				
				for(let j=0; j<this.imageGalleryArray[secIndx].imgsection.length; j++){
					if(this.imageGalleryArray[secIndx].imgsection[j].selected == true){
						this.imageGalleryArray[secIndx].rowSelected = true;
						break;
					} else {
						this.imageGalleryArray[secIndx].rowSelected = false;
					}
				}
				
				let selectedRowArr:any[] = this.imageGalleryArray.filter(item => {
					return item.rowSelected == true;
				});
				
				if(selectedRowArr.length > 2){
					this.imageGalleryArray[secIndx].imgsection[indx].selected = false;
					this.imageGalleryArray[secIndx].rowSelected = false;
				}
				
			} else {
				this.imageGalleryArray[secIndx].imgsection[indx].selected = false;
			}
		} else {
			this.imageName.emit(this.imageGalleryArray[secIndx].imgsection[indx].img);
		}
	}

	cancelModal() {
		this.dataService.sendMessage('closemodal', {'event': 'close'});
	}
  
	showUploadModal() {
		this.dataService.sendMessage('closemodal', {'event': 'opengallery'});
	}
	
	showSelectMultiple(){
		this.selectMultiple = this.selectMultiple == true ? false : true;
	}
	
	cancelCampere() {
		
		this.imageGalleryArray.map(item => {
			item.imgsection.map(img => {
				img.selected = false;
			})
		});
		
		this.selectMultiple = false;
	}
	
	getCompareData() {
		this.showComparePanel=true;
		this.compareArrPanelArr = this.imageGalleryArray.filter(item => {
			return item.rowSelected;
		})
	}
	
	saveasJPG() {
		domtoimage.toJpeg(document.getElementById('compard'), { quality: 0.95 })
			.then(dataUrl => {
				let filename: any  = +new Date() + '.jpg';
				FileSaver.saveAs(dataUrl, filename);
		});
		
		
	}
	
	
  

}
