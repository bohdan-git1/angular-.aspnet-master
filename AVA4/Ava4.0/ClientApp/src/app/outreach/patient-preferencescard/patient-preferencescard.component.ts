import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-patient-preferencescard',
  templateUrl: './patient-preferencescard.component.html',
  styleUrls: ['./patient-preferencescard.component.css']
})
export class PatientPreferencescardComponent implements OnInit {
  locationArray: any[] = [{"option": "Location #2"},{"option": "Lehi"}, {"option": "Orem"}, {"option": "Provo"}, {"option": "Salt Lake City"}];
  locationPlaceholder= "Preferred Practice location";

  doctorArray: any[] = [{"option": "Dr. Smoot"}, {"option": "Dr. Tobler"}, {"option": "Dr. Wilson"}, {"option": "Dr. Thomson"}];
  doctorPlaceholder= "Preferred Doctors";

  location='';
  doctor='';

  @Output() goback = new EventEmitter();
  @Output() locationback = new EventEmitter();
  @Output() doctorback = new EventEmitter();

  @Input() locationInput: any;
  @Input() doctorInput: any;

  constructor() { }

  ngOnInit() {

    if(this.locationInput!='')
    {
      this.locationPlaceholder=this.locationInput;
    }

    if(this.doctorInput!='')
    {
      this.doctorPlaceholder=this.doctorInput;
    }

  }

  backtoMain() {
    this.goback.emit('back');
    this.locationback.emit(this.location);
    this.doctorback.emit(this.doctor);
  }

  saveLocationoptionvalue(evt)
  {
    this.location=evt;
  }

  saveDoctoroptionvalue(evt)
  {
    this.doctor=evt;
  }

}
