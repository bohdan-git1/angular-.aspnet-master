import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-medical-alertcard',
  templateUrl: './medical-alertcard.component.html',
  styleUrls: ['./medical-alertcard.component.css']
})
export class MedicalAlertcardComponent implements OnInit {
  @Output() goback = new EventEmitter();
  @Output() passTextareadata = new EventEmitter();
  medicalAlertform= {};
  @Input() medicalAlert; 



  constructor() {

   
   }

  ngOnInit() {
    this.medicalAlertform=this.medicalAlert; 
  }

  backtoMain() {
    this.passTextareadata.emit(this.medicalAlertform);
    this.goback.emit('back');
   //console.log(this.medicalAlertform);
  }


}
