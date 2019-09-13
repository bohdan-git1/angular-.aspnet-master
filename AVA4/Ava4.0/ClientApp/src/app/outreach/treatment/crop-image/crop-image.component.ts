import { Component, OnInit, Input, Inject, Output, EventEmitter,ViewChild  } from '@angular/core';
import { ImageCroppedEvent,ImageCropperComponent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {
  @Input() public image_name;
  @Output() backtoparent = new EventEmitter();
  imageBase64: string = '';
  croppedImage: any = '';
  cropperready = false;
  base64Image: any;
  cropImg=false;
  private router:Router;
  changesMade:any[]=[];
  undoRedoCount:number=0;
  changeState:string;
  flipX:boolean=false;
  flipY:boolean=false;;
  rotateCount=0;
  cropped:any={};
  croposn:any={};
  cropOutPosn:any={};
  undoRedoFlag=false;
  initialCropperPosition:any={
    x1: 0,
    x2: 330,
    y1: 0,
    y2: 383
  }

  constructor(@Inject(Router)router:Router) {
    this.router=router;
   }
   @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  ngOnInit() {
    this.getBase64ImageFromURL(this.image_name).subscribe(base64data => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
      this.croppedImage=this.base64Image;
      this.image_name=this.base64Image;
      this.fileChangeEvent();
      //this.changesMade.push({imageUrl:this.base64Image,count:'change number'+'0'});
      this.changesMade.push({flipX:false,flipY:false,rotate:0,state:'No Change',posn:{}});
    });
   
  }


  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }


  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  fileChangeEvent(){
    this.cropImg=!this.cropImg;
    if(this.cropImg){
      this.imageBase64 = this.base64Image;
    }
  }

  onCropout(){
    //this.imageBase64=this.croppedImage;
    //this.tempSave();
    this.cropOutPosn=this.croposn;
    var state='Crop';
    this.tempSave(state);
  }

  imageCropped(event: ImageCroppedEvent) {
    if(this.cropImg){
      this.croppedImage = event.base64;
    }
    else{
      this.croppedImage=this.base64Image;
    }
    this.croposn=event.cropperPosition;
    console.log(this.croposn);
  }

  imageLoaded() {
    this.cropperready = true;
  }

  loadImageFailed () {
    console.log('Load failed');
  }

  onSave(){
    var temp={
        imageUrl:this.croppedImage,
      }
     console.log(temp);
    // this.service.editImage(temp);
    // this.router.navigate(['/home'])
    this.backtoparent.emit('backtoparent');
  }

  tempSave(data:string){
    var temp={
      flipX:this.flipX,
      flipY:this.flipY,
      rotate:this.rotateCount,
      state:data,
      posn:this.cropOutPosn

    }
    if(this.undoRedoFlag)
    {
      this.changesMade.splice(this.undoRedoCount+1,((this.changesMade.length)-this.undoRedoCount)-1,temp)
    }
    else
    {
      this.changesMade.push(temp);
    }
    this.undoRedoCount=(this.changesMade.length)-1;
    console.log('changesMade on save',this.changesMade);
  }

  onFlipX(){
    this.flipX=!this.flipX;
    var state='flipX'
    console.log(this.flipX);
    this.imageCropper.flipVertical();
    this.tempSave(state);
  }

  onFlipY(){
    this.flipY=!this.flipY;
    var state='flipY'
    console.log(this.flipY);
    this.imageCropper.flipHorizontal();
    this.tempSave(state);
  }

  onRotate(){
    this.imageCropper.rotateRight();
    var state='rotate Right'
    this.rotateCount+=1;
    this.tempSave(state);
  }

  rotateLeft(){
    this.imageCropper.rotateLeft();
  }

  onUndo(){
    this.undoRedoFlag=true;
    console.log(this.changesMade);
    console.log(this.undoRedoCount);
    if(this.undoRedoCount==0){
      //this.rotateCount=0;
      console.log(this.undoRedoCount);
      window.alert("Cannot undo changes")
      return;
    }else{
      var temp=this.changesMade[this.undoRedoCount]
      this.undoRedoCount-=1;
      if(temp.state=="flipX" && temp.flipX){
        console.log('1st If')
        this.imageCropper.flipVertical();
      }
      else if(temp.state=="flipY" && temp.flipY){
        console.log('2nd If')
        this.imageCropper.flipHorizontal();
      }
      else if(temp.state=="rotate Right" && this.rotateCount>0){
        console.log('3rd If')
        this.rotateLeft();
      }
      else if(temp.state=="Crop"){
        console.log('4th If');
        this.croposn=this.initialCropperPosition;
        this.cropped=this.croposn;
        
      }
    }
  }


  onRedo(){
    if(this.changesMade.length-1==this.undoRedoCount){
      console.log(this.undoRedoCount);
      window.alert("Cannot redo changes")
      return;
    }
    this.undoRedoCount+=1;
    var temp=this.changesMade[this.undoRedoCount];
    if(temp.state=="flipX" && temp.flipX){
      console.log('1st If')
      this.imageCropper.flipVertical();
    }
    else if(temp.state=="flipY" && temp.flipY){
      console.log('2nd If')
      this.imageCropper.flipHorizontal();
    }
    else if(temp.state=="rotate Right" && this.rotateCount>0){
      console.log('3rd If')
      this.imageCropper.rotateRight();
    }
    else if(temp.state=="Crop"){
      console.log('4th If');
      this.croposn=temp.posn;
      this.cropped=this.croposn;
      
    }
   
  }

  cropperReady(){
    this.cropped=this.croposn;
  }

  cancelModal() {
		this.backtoparent.emit('backtoparent');
  }
  

}
