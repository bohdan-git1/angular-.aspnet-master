import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  constructor() { }
  
  showNewPatient_section: boolean = false;
  showNewEvent_section: boolean = false;
  @Input() showInitial_section: any;
  @Input() selectedLocation: any;
  @Input() appntTime: any;
  @Input() procedurecode: any;
  patientPopUpOpen: any;
  PatientInfo: any='';

  
  ngOnInit() {
    //alert( this.showInitial_section);
    //alert( this.selectedLocation);
  }
  
  showNewPatient(evt) {
  
  this.showNewPatient_section = true;
  this.showInitial_section= false;
  }

  patientPopUpOpenForm(evt)
  {
    this.patientPopUpOpen=evt;
  }

  showProcedureEvent(evt)
  {
    this.showInitial_section= true;
  }
  
  showCreateAppnt(evt){
  this.showNewPatient_section = false;
  this.showInitial_section= false;
  }
  
  showNewEvent(evt) {
    this.showNewEvent_section = true;
    this.showInitial_section= false;
  }
  
  backtoparent(evt) {
  this.showNewEvent_section = false;
  this.showInitial_section= false;
  }

  passPatientInfo(evt)
  {
    this.PatientInfo=evt;
  }

}
