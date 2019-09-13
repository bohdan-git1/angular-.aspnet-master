import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  optionArray: any[] = [
	{"option": "Pre-Exam"}, 
	{"option": "Initial"}, 
	{"option": "Phase I"}, 
	{"option": "Progress"}, 
	{"option": "Final"},
	{"option": "Retreat"},
	{"option": "Retreat Final"}
	];


  imagelistArray: any[] = [
  ];
  
  /*imagelistArray: any[] = [
		{"img": "gallery_4.jpg", "name": "Anterior Occlusal (1)"},
    {"img": "gallery_3.jpg", "name": "Right Occlusal (2)"},
    {"img": "gallery_5.jpg", "name": "Left Occlusal (3)"},
    {"img": "gallery_0.jpg", "name": "Frontal (4)"},
    {"img": "gallery_2.jpg", "name": "Frontal Side (5)"},
    {"img": "gallery_1.jpg", "name": "Lateral (6)"},
    {"img": "gallery_6.jpg", "name": "Upper Occlusal (7)"},
    {"img": "gallery_7.jpg", "name": "Lower Occlusal (8)"},
    {"img": "gallery_8.jpg", "name": "Ceph"},
    {"img": "", "name": ""},
    {"img": "", "name": ""},
    {"img": "", "name": ""},
    {"img": "", "name": ""},
    {"img": "", "name": ""}
	];*/


  imgURL: any='';
  imageDetails: any=[];
  files: NgxFileDropEntry[] = [];

  constructor(private dataService:MessageService) { }

  ngOnInit() {

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
           var obj = {};
            //console.log(file.type) ;

             var onlyName= droppedFile.relativePath.split('.');
             obj['name'] = onlyName[0];
  
             var reader = new FileReader();
             reader.readAsDataURL(file); 
             reader.onload = (_event) => { 
              this.imgURL = reader.result; 
              obj['img'] = this.imgURL;
              
            }

            if (file.type.match(/image\/*/) == null) {
              return;
            }else {
              this.imagelistArray.push(obj);
            }
          });
         
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          //console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
   
    public fileOver(event){
    }
   
    public fileLeave(event){
    }
  
  
    preview(files) {
      if (files.length === 0)
        return;
   
      var mimeType = files[0].type;
      var obj1 = {};
      if (mimeType.match(/image\/*/) == null) {
        return;
      }else {
        var onlyName= files[0].name.split('.');
        obj1['name'] = onlyName[0];

        var reader = new FileReader();
     
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
          obj1['img'] = this.imgURL;
        }
        
        this.imagelistArray.push(obj1);
        console.log(this.imagelistArray);
      }
   
    }

    cancelModal() {
		
		
		
      this.dataService.sendMessage('closemodal', {'event': 'close'});
    }

    saveImagename(Namevar, index)
    {
      if(Namevar.target.value!='')
      {
        this.imagelistArray[index]['name']=Namevar.target.value;
      }
    }

    saveAndCloseModal()
    {
      this.dataService.sendMessage('closemodal', {'event': 'close'});

    }

}
