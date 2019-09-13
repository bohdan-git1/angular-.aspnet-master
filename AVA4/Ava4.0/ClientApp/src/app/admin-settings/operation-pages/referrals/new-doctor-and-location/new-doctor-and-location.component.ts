import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { flatten } from '@angular/core/src/render3/util';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-new-doctor-and-location',
  templateUrl: './new-doctor-and-location.component.html',
  styleUrls: ['./new-doctor-and-location.component.css']
})
export class NewDoctorAndLocationComponent implements OnInit {
	public config: PerfectScrollbarConfigInterface = {wheelSpeed:0};
  @ViewChild('listboxscroll') listboxscroll: PerfectScrollbarComponent;

	professionalGroupArray: any[] = [
    {'name': 'Dentist', 'selected': false},
    {'name': 'Oral Surgeon', 'selected': false},
    {'name': 'Oral Surgeon', 'selected': false},
    {'name': 'Pedodontist', 'selected': false},
    {'name': 'Endodontist', 'selected': false},
    {'name': 'Prosthodontist', 'selected': false}
  ];

  locationArray: any[]=[
    {'locationname': '368 n 780 w'},
    {'locationname': '600 Hidden Point Dr'},
    {'locationname': '1080 Jewel St'},
    {'locationname': '1465 Grand Ave'},
    {'locationname': '1465 Grand Ave'},
    {'locationname': '1800 w Torrey Pines Dr'},
    {'locationname': '900 w Halsey Rd'}

  ];

  selectedCheckboxarray: any[]=[];

  searchBoxHg1St: any;
	searchBoxHg2Nd: any;
	searchBoxHg3Nd: any;
  remainingBoxHg: any;
  addlocation: any;


  doctorAndlocationFMdata: any={};


  locationdropDown: boolean= false;
  selectedDropdownval= 'New location or select a location';
  
  phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  doctorLocationformError: any[] = [
    {'error': false, 'erortxt': 'Enter display name'}, 
    {'error': false, 'erortxt': 'Enter first name'}, 
    {'error': false, 'erortxt': 'Enter last name'},
    {'error': false, 'erortxt': 'Enter degree'}, 
    {'error': false, 'erortxt': 'Enter nickname'}, 
    {'error': false, 'erortxt': 'Enter birthdate'},
    {'error': false, 'erortxt': 'Enter email address'}, 
    {'error': false, 'erortxt': 'Select atleast one professional group'}, 
    {'error': false, 'erortxt': 'Select location'},
    {'error': false, 'erortxt': 'Enter address'},
    {'error': false, 'erortxt': 'Enter phone number'},
    {'error': false, 'erortxt': 'Enter email address'}
    
];
@Output() formDataTnsf= new EventEmitter();


  constructor() { }

  ngOnInit() {

    this.searchHeight();
  }

  showHideDropdownFu(){
    this.locationdropDown= this.locationdropDown== false? true: false;
  }

  selectdropDownBox(index)
  {
    this.selectedDropdownval= this.locationArray[index].locationname;
    this.locationdropDown= this.locationdropDown== false? true: false;
    this.checkNewlocation();
  }

  checkCheckBoxFn (index)
  {
      this.professionalGroupArray[index].selected=  this.professionalGroupArray[index].selected== false? true: false;
      if(this.professionalGroupArray[index].selected===true)
      {
          this.selectedCheckboxarray.push(this.professionalGroupArray[index].name);
      }else {
        this.selectedCheckboxarray.splice( this.selectedCheckboxarray.indexOf(this.professionalGroupArray[index].name),1);
      }
      this.checkprofessionalGP();
  }

  addNewLocation()
  {
      if(typeof this.addlocation !='undefined'  &&  this.addlocation !='')
      {
        this.locationArray.push({'locationname': this.addlocation});
       
      }
      this.addlocation='';
    
      setTimeout(() =>{
        this.listboxscroll.directiveRef.scrollToBottom(0, 500);
      }, 100);

      this.searchHeight();

  }


  searchHeight(){
    this.searchBoxHg1St= (this.locationArray.length*30)+60;
    if(this.searchBoxHg1St>=230)
      {
        this.searchBoxHg1St=230;
      }
  
    console.log(this.searchBoxHg1St);

      if(this.locationArray.length==0)
      {
        this.searchBoxHg2Nd=0;
        this.searchBoxHg1St=60;
      }else {
        this.searchBoxHg2Nd=this.searchBoxHg1St-60;
      }
  
      this.remainingBoxHg= this.searchBoxHg1St- this.searchBoxHg2Nd; 
    }


    dateMask() {
      const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
      return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
    }

    checkDisplayName()
    {
        if( typeof (this.doctorAndlocationFMdata.displayname)!= 'undefined' && this.doctorAndlocationFMdata.displayname != ''){
          this.doctorLocationformError[0].error = false;
        }else {
          this.doctorLocationformError[0].error = true;
        }
    }

    checkfirstName()
    {
      if( typeof (this.doctorAndlocationFMdata.fname)!= 'undefined' && this.doctorAndlocationFMdata.fname != ''){
        this.doctorLocationformError[1].error = false;
      }else {
        this.doctorLocationformError[1].error = true;
      }
    }

    checklastName()
    {
      if( typeof (this.doctorAndlocationFMdata.lname)!= 'undefined' && this.doctorAndlocationFMdata.lname != ''){
        this.doctorLocationformError[2].error = false;
      }else {
        this.doctorLocationformError[2].error = true;
      }
    }

    checkDegree()
    {
      if( typeof (this.doctorAndlocationFMdata.degree)!= 'undefined' && this.doctorAndlocationFMdata.degree != ''){
        this.doctorLocationformError[3].error = false;
      }else {
        this.doctorLocationformError[3].error = true;
      }
    }

    checkNickname()
    {
      if( typeof (this.doctorAndlocationFMdata.nickname)!= 'undefined' && this.doctorAndlocationFMdata.nickname != ''){
        this.doctorLocationformError[4].error = false;
      }else {
        this.doctorLocationformError[4].error = true;
      }
    }

    checkDoB()
    {
      if( typeof (this.doctorAndlocationFMdata.bod)!= 'undefined' && this.doctorAndlocationFMdata.bod != ''){
        this.doctorLocationformError[5].error = false;
      }else {
        this.doctorLocationformError[5].error = true;
      }
    }

    checkdoctorEmail()
    {
      if( typeof (this.doctorAndlocationFMdata.doctorEmail)!= 'undefined' && this.doctorAndlocationFMdata.doctorEmail != ''){
        var emailchk= this.validateEmail(this.doctorAndlocationFMdata.doctorEmail);
        if(emailchk)
        {
          this.doctorLocationformError[6].error = false;
        }else {
          this.doctorLocationformError[6].error = true;
          this.doctorLocationformError[6].erortxt = 'Enter valid email address';
          
        }
      }else {
        this.doctorLocationformError[6].error = true;
        this.doctorLocationformError[6].erortxt = 'Enter email address';
      }
    }

    checkprofessionalGP()
    {
      if( this.selectedCheckboxarray.length!=0){
        this.doctorLocationformError[7].error = false;
      }else {
        this.doctorLocationformError[7].error = true;
      }
    }

    checkNewlocation()
    {
      if( this.selectedDropdownval!='New location or select a location'){
        this.doctorLocationformError[8].error = false;
      }else {
        this.doctorLocationformError[8].error = true;
      }
    }

    checkAddress()
    {
      if( typeof (this.doctorAndlocationFMdata.address)!= 'undefined' && this.doctorAndlocationFMdata.address != ''){
        this.doctorLocationformError[9].error = false;
      }else {
        this.doctorLocationformError[9].error = true;
      }
    }

    checkPhone()
    {
      if( typeof (this.doctorAndlocationFMdata.phone)!= 'undefined' && this.doctorAndlocationFMdata.phone != ''){
        this.doctorLocationformError[10].error = false;
      }else {
        this.doctorLocationformError[10].error = true;
      }
    }

    checklocationEmail()
    {
      if( typeof (this.doctorAndlocationFMdata.locationEmail)!= 'undefined' && this.doctorAndlocationFMdata.locationEmail != ''){

        var emailchk= this.validateEmail(this.doctorAndlocationFMdata.locationEmail);
          if(emailchk)
          {
            this.doctorLocationformError[11].error = false;
          }else {
            this.doctorLocationformError[11].error = true;
            this.doctorLocationformError[11].erortxt = 'Enter valid email address';
          }

      }else {
        this.doctorLocationformError[11].error = true;
        this.doctorLocationformError[11].erortxt = 'Enter email address';
      }
    }


    addDoctorAndlocationFN()
    {

     this.checkDisplayName();
     this.checkfirstName();
     this.checklastName();
     this.checkDegree();
     this.checkNickname();
     this.checkDoB();
     this.checkdoctorEmail();
     this.checkprofessionalGP();
     this.checkNewlocation();
     this.checkAddress();
     this.checkPhone();
     this.checklocationEmail();
      var errorChk=0;

      this.doctorLocationformError.map((element, key)=> {
            if(element.error==true)
            {
              errorChk=1;
            }
        }
      );

      if(errorChk==0)
      {
        this.doctorAndlocationFMdata.professionalGP=this.selectedCheckboxarray;
        this.doctorAndlocationFMdata.selectedDropdownval =this.selectedDropdownval;

        this.formDataTnsf.emit(this.doctorAndlocationFMdata);
        this.doctorAndlocationFMdata={};
        this.selectedCheckboxarray=[];
      }


    }


    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    checkerror(section){

      if(section == 'displayname'){
        this.checkDisplayName();
      }
      if(section == 'fname'){
        this.checkfirstName();
      }
      if(section == 'lname'){
        this.checklastName();
      }
      if(section == 'degree'){
        this.checkDegree();
      }
      if(section == 'nickname'){
        this.checkNickname();
      }
      if(section == 'dob'){
        this.checkDoB();
      }
      if(section == 'doctoremail'){
        this.checkdoctorEmail();
      }
      if(section == 'address'){
        this.checkAddress();
      }
      if(section == 'phone'){
        this.checkPhone();
      }
      if(section == 'locationemail'){
        this.checklocationEmail();
      }

    }



}
