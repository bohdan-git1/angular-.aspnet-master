import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-patient-referral-card',
  templateUrl: './patient-referral-card.component.html',
  styleUrls: ['./patient-referral-card.component.css']
})
export class PatientReferralCardComponent implements OnInit {
  refInsearchBox: boolean= false;
  refOutsearchBox: boolean= false;

  refInsearch: boolean= false;
  refOutsearch: boolean= false;
  @Input() refInArray; 

 
  filterInPatient: any[];
  removeCommonInArray: any =[];
  selectedInPatient: any;

  refOutArray : any[] = this.refInArray
  selectedOutPatient: any;
  filterOutPatient: any[];
  removeCommonOutArray: any =[];

  patientArray: any[] = [{patientname: 'Brooke Young'}, {patientname: 'Erica Delware'}, {patientname:'Brent Delware'},
  {patientname: 'John Smith'}, {patientname: 'Paula Jones'},

  ];


  @Output() goback = new EventEmitter();
  @Output() refInArrayEmit = new EventEmitter();

  

  constructor() {
  }

  ngOnInit() {
    
    this.refOutArray  = this.refInArray;
  }

  backtoMain() {
    this.refInsearch= false;
    this.refOutsearch= false;
    this.refInsearchBox= false;
    this.refOutsearchBox= false;

    this.goback.emit('back');
  }

  showRefinBox()
  {
    this.refInsearchBox= this.refInsearchBox==true? false: true;
    this.refOutsearchBox= false;
    this.refOutsearch= false;
  }

  showRefoutBox()
  {
    this.refOutsearchBox= this.refOutsearchBox==true? false: true;
    this.refInsearch= false;
    this.refInsearchBox= false;

  }

  searchInPatient(_searchstr){
    this.refInsearch = false;
    let searchstr = _searchstr.toLowerCase();
    this.removeCommonInArray =[];
    if( this.patientArray.length > 0 ) {
      this.patientArray.forEach((obj)=>{
         var existNotification = this.refInArray.find(({patientname}) => obj.patientname === patientname);
         if(!existNotification){
           this.removeCommonInArray.push(obj);
         }
       });
    }
   
    if(searchstr.length > 1){
      this.filterInPatient = this.removeCommonInArray.filter(item => {
        return (item.patientname.toLowerCase().includes(searchstr))
      });

      if(this.filterInPatient.length == 0){
        this.filterInPatient.push({"patientname": "No patient found!"});
      }
      this.refInsearch = true;
    }
  }

  showInPrasent()
  {
    this.refInsearch = this.refInsearch ==true ? false : true;
    this.removeCommonInArray =[];
    if( this.patientArray.length > 0 ) {
      this.patientArray.forEach((obj)=>{
         var existNotification = this.refInArray.find(({patientname}) => obj.patientname === patientname);
         if(!existNotification){
           this.removeCommonInArray.push(obj);
         }
       });
    }
    this.filterInPatient = this.removeCommonInArray;
  }

  selectInPatient(patientitem){
    this.refInsearch = false;
    this.refInArray.push({"patientname": patientitem, "thanks": false ,"date": new Date()});
    console.log(this.refInArray);
    this.selectedInPatient = patientitem;

    this.refInArrayEmit.emit(this.refInArray);
    }



    searchOutPatient(_searchstr){
      this.refOutsearch = false;
      let searchstr = _searchstr.toLowerCase();
      this.removeCommonOutArray =[];
     
     
      if(searchstr.length > 1){
        this.filterOutPatient = this.refInArray.filter(item => {
          return (item.patientname.toLowerCase().includes(searchstr))
        });
  
        if(this.filterOutPatient.length == 0){
          this.filterOutPatient.push({"patientname": "No patient found!"});
        }
        this.refOutsearch = true;
      }
    }
  
    selectOutPatient(patientitem){
      this.refOutsearch = false;
      this.refInArray = this.refInArray.filter(function(item) { 
        return item.patientname !== patientitem;  
      });
      this.selectedOutPatient = patientitem;
      this.refOutArray = this.refInArray

      this.refInArrayEmit.emit(this.refInArray);
      }

      showOutPrasent()
      {
        this.refOutsearch = this.refOutsearch==true? false : true ;
        this.filterOutPatient = this.refInArray;

      }

      setAsThanked(index)
      {
        this.refInArray[index]['thanks']=  this.refInArray[index]['thanks']==true? false: true;
        this.refOutArray = this.refInArray
        this.refInArrayEmit.emit(this.refInArray);
      }

      delete(name)
      {
        this.selectOutPatient(name);
      }




}
