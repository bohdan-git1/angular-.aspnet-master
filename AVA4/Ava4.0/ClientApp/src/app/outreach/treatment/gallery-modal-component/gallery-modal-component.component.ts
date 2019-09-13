import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-modal-component',
  templateUrl: './gallery-modal-component.component.html',
  styleUrls: ['./gallery-modal-component.component.css']
})
export class GalleryModalComponentComponent implements OnInit {


  constructor() { }

  imageName_receive: any = '';

  ngOnInit() {
  }


  imageName(evt) {
    this.imageName_receive = evt;
    }

  

    backtoparent(evt) {
      this.imageName_receive = '';
      }

}
