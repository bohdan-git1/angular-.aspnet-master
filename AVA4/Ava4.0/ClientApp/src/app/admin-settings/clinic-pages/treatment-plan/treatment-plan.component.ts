import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-treatment-plan',
  templateUrl: './treatment-plan.component.html',
  styleUrls: ['./treatment-plan.component.css']
})
export class TreatmentPlanComponent implements OnInit {

	config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
  boxHt: any;
  
  bracketsSection: boolean = false; 
  bracketList: any[]= [
    {'name': 'GAC SL', 'color': '#FD7474'},
    {'name': 'GAC SL U Clear', 'color': '#00AEEF'},
    {'name': 'In-Ovation X', 'color': '#F6CC61'},
    {'name': 'L Lingual', 'color': '#8CF1E4'},
    {'name': 'U Lingual', 'color': '#B48CF6'},
  ];

  bracketColor: any []= [
    {'color': '#FCFF7C', 'selected': false},
    {'color': '#FD7474', 'selected': false},
    {'color': '#74B3FD', 'selected': false},
    {'color': '#F6CC61', 'selected': false},
    {'color': '#8CF1E4', 'selected': false},
    {'color': '#B48CF6', 'selected': false},
    {'color': '#2EA8A8', 'selected': false},
    {'color': '#FECACA', 'selected': false},
    {'color': '#DE473E', 'selected': false},
    {'color': '#37DBFF', 'selected': false},
    {'color': '#39D56E', 'selected': false},
    {'color': '#BF60A4', 'selected': false},
    {'color': '#BDBE8B', 'selected': false},
    {'color': '#FF9DEA', 'selected': false},
    {'color': '#FF9549', 'selected': false}

  ];
  addBracketItem: boolean = false;
  dropDown: boolean = false ;
  colorCode: any= 'Choose color';
  bracketName: any='';
  @ViewChild('listboxscroll') listboxscroll: PerfectScrollbarComponent;
  bracketHeight: any;


  uwList: any []=[
    {'name': '012 SS', 'color': '#FF9DEA', 'edit_mode': false },
    {'name': '014 NT', 'color': '#74B3FD' , 'edit_mode': false },
    {'name': '014 SS', 'color': '#74B3FD' , 'edit_mode': false },
    {'name': '016 N', 'color': '#FCFF7C' , 'edit_mode': false },
    {'name': '016 SS', 'color': '#FCFF7C' , 'edit_mode': false },
    {'name': '018 N', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '018 SS', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '16x22 NT', 'color': '#FECACA' , 'edit_mode': false },
    {'name': '16x22 SS', 'color': '#FECACA' , 'edit_mode': false },
    {'name': '17x25 SS', 'color': '#B48CF6' , 'edit_mode': false },
    {'name': '17x25TMA', 'color': '#B48CF6' , 'edit_mode': false },
    {'name': '18', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '18x25 N', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '18x25 SS', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '19x25 SS', 'color': '#2EA8A8' , 'edit_mode': false },
    {'name': '19x25TMA', 'color': ' #2EA8A8' , 'edit_mode': false },
    {'name': '21x25 SS', 'color': '#F6CC61' , 'edit_mode': false },
    {'name': '21x25Brd', 'color': '#F6CC61' , 'edit_mode': false },
    {'name': 'NONE', 'color': '#FF5858' , 'edit_mode': false },
    {'name': 'U18/24SS', 'color': '#FF9549' , 'edit_mode': false },
    {'name': 'U18/24SS', 'color': '#FF9549' , 'edit_mode': false }
  ];

  lwList: any []=[
    {'name': '012 SS', 'color': '#FF9DEA', 'edit_mode': false },
    {'name': '014 NT', 'color': '#74B3FD' , 'edit_mode': false },
    {'name': '014 SS', 'color': '#74B3FD' , 'edit_mode': false },
    {'name': '016 N', 'color': '#FCFF7C' , 'edit_mode': false },
    {'name': '016 SS', 'color': '#FCFF7C' , 'edit_mode': false },
    {'name': '018 N', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '018 SS', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '16x22 NT', 'color': '#FECACA' , 'edit_mode': false },
    {'name': '16x22 SS', 'color': '#FECACA' , 'edit_mode': false },
    {'name': '17x25 SS', 'color': '#B48CF6' , 'edit_mode': false },
    {'name': '17x25TMA', 'color': '#B48CF6' , 'edit_mode': false },
    {'name': '18', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '18x25 N', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '18x25 SS', 'color': '#8CF1E4' , 'edit_mode': false },
    {'name': '19x25 SS', 'color': '#2EA8A8' , 'edit_mode': false },
    {'name': '19x25TMA', 'color': ' #2EA8A8' , 'edit_mode': false },
    {'name': '21x25 SS', 'color': '#F6CC61' , 'edit_mode': false },
    {'name': '21x25Brd', 'color': '#F6CC61' , 'edit_mode': false },
    {'name': 'NONE', 'color': '#FF5858' , 'edit_mode': false },
    {'name': 'U18/24SS', 'color': '#FF9549' , 'edit_mode': false },
    {'name': 'U18/24SS', 'color': '#FF9549' , 'edit_mode': false }
  ];


  lowerSectionVar: boolean = false; 
  lwAndUwVar: boolean = false ;
  type: any;
  uwListDropDown: boolean = true ;
  lwListDropDown: boolean = true ;

  addNewLwUw : boolean = false ;
  chooseNewColor: boolean = false ;
  choodeNewGroup: boolean = false ;
  groupType: any =  'Choose group';
  
  duplicateUWtoLWVar: boolean = false ;
  duplicateLWtoUWVar: boolean = false ;

  createNewWireFormData: any[]=[
    {
      'wireName': '', 
      'colorCode': '',
      'groupNumber': ''
    }
  ];

  saveDataByEditMode: boolean = false ;
  storeEditWireId: any;
  editWireType: any; 

  @ViewChild('listboxscroll1') listboxscroll1: PerfectScrollbarComponent;
  @ViewChild('listboxscroll2') listboxscroll2: PerfectScrollbarComponent;
  hideEditPencil: boolean= false;

  lebelTypeArrayData: any []= [
    {'lebelType': 'Date Time', selected: false },
    {'lebelType': 'UW' , selected: false},
    {'lebelType': 'LW' , selected: false},
    {'lebelType': 'Hyg' , selected: false},
    {'lebelType': 'Elas' , selected: false},
    {'lebelType': 'Appl' , selected: false},
    {'lebelType': 'Staff' , selected: false},
    {'lebelType': 'Dr' , selected: false},
    {'lebelType': 'Notes' , selected: false},
    {'lebelType': 'Next notes' , selected: false}
  ];
  applVar: boolean= false ;

  applList: any[]= [
    {'name': 'Amer', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'B.P.', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'Amer', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'Band RPE', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'Bond RPE', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'FcBow HG', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'FORCES', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'GAC', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'Haw/pont', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'Hawley', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'Hyrax', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'J HookHG', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'L Hawley', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'L Schwtz', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'L SpAlgn', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'Ling 3-3', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'Pont 1/2', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'Rev. HG', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'TPB', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'U Hawley', 'appl': true, 'img': '2.png', 'edit_mode': false },
    {'name': 'L Schwtz', 'appl': true, 'img': '3.png', 'edit_mode': false },
    {'name': 'L SpAlgn', 'appl': true, 'img': '1.png', 'edit_mode': false },
    {'name': 'U/LFeaGa', 'appl': true, 'img': '2.png', 'edit_mode': false },

  ];
  
  hygSection: boolean = false;
  notessection: boolean = false;
  addNotes:boolean = false;
  editNotes:boolean = false;
  shortDesc: any;
  longDesc: any;
  deleteNotes: boolean = false;
  selectedNotesIndx: any;
  
  hygSystemArr:any[] = [
	{"type": "number", "selected": false, "ratingelements": [
		{"value": 5, "label": "Excellent"}, 
		{"value": 4, "label": "Good"}, 
		{"value": 3, "label": "Needs Improvement"}, 
		{"value": 2, "label": "Poor"}, 
		{"value": 1, "label": "Unacceptable"}
		]
	}, 
	
	{"type": "emoji", "selected": true, "ratingelements": [
		{"value": 5, "label": "Excellent"}, 
		{"value": 4, "label": "Good"}, 
		{"value": 3, "label": "Needs Improvement"}, 
		{"value": 2, "label": "Poor"}, 
		{"value": 1, "label": "Unacceptable"}
		]
	}];
	
	notesList: any[] = [
		{"short": "FB", "description": "", "selected": false},
		{"short": "ck ret", "description": "", "selected": false},
		{"short": "ck appl", "description": "", "selected": false},
		{"short": "Full records", "description": "", "selected": false},
		{"short": "pano", "description": "", "selected": false},
		{"short": "con MO", "description": "", "selected": false},
		{"short": "con FA", "description": "", "selected": false},
		{"short": "Exam", "description": "", "selected": false},
		{"short": "BB upper", "description": "", "selected": false},
		{"short": "BB lower", "description": "", "selected": false},
		{"short": "BB both", "description": "", "selected": false},
		{"short": "OBS", "description": "", "selected": false},
		{"short": "seps", "description": "", "selected": false},
		{"short": "emergency", "description": "", "selected": false},
		{"short": "imp Hyrax", "description": "", "selected": false},
		{"short": "imp RPE", "description": "", "selected": false},
		{"short": "imp U/L SCH", "description": "", "selected": false},
		{"short": "insert Hyrax", "description": "", "selected": false},
		{"short": "insert RPE", "description": "", "selected": false},
		{"short": "insert U/L SCH", "description": "", "selected": false}
		
	]
  
  addNewAppl: boolean= false;

  files: NgxFileDropEntry[] = [];
  showImgName: any='';
  imgURL: any='';
  applIndex='';

  applFormListData: any[]= [
    {'name': '', 'appl': true, 'img': '', 'edit_mode': false }
  ];

  showNotesType: any;
  
  constructor() { }

  ngOnInit() {
  this.initalizeFrame();
  this.bracketListLength();
  }

  initalizeFrame(){
	let topHt:any = 210;
	let bottomHt: any = 110;
	this.boxHt = window.innerHeight - (topHt + bottomHt);
  }

  checkBracketSection()
  {
    this.bracketsSection= this.bracketsSection== true ? false : true ;
    this.lowerSectionVar=  false ;
    this.type= '';
    this.showNotesType='';
    this.bracketColor.map((value, key)=>{
      value.selected= false;
    });
    this.colorCode='Choose color'; 
  }

  checkBracketItemOpen()
  {
    
    if(this.addBracketItem && this.bracketName!='' && this.colorCode!='Choose color')
    {
      this.bracketList.push({'name': this.bracketName, 'color': this.colorCode});
      setTimeout(() =>{
        this.listboxscroll.directiveRef.scrollToBottom(0, 500);
      }, 100);

      this.bracketListLength();

    }
    this.addBracketItem= this.addBracketItem== true ? false : true;
    if(this.addBracketItem==false)
    {
        this.bracketColor.map((value, key)=>{
            value.selected= false;
      });
      this.colorCode='Choose color';
      this.bracketName='';
    }
   
  }
  openDropDown()
  {
    this.dropDown= this.dropDown== true ? false : true ;
  }


  changeTempleteColor(index)
  {
    this.bracketColor.map((value, key)=>{
        if(key!=index)
        {
          value.selected= false;
        }
    });

    this.bracketColor[index].selected=  this.bracketColor[index].selected== false ? true : false ;
      if(this.bracketColor[index].selected)
      {
        this.colorCode=this.bracketColor[index].color;
      }else {
        this.colorCode='Choose color';
      }
      this.dropDown= false ;
  }


  deleteBracketItem(index)
  {
    this.bracketList.splice(index, 1);
    this.bracketListLength();
  }

  bracketListLength()
  {
    if(this.bracketList.length*30>=200)
    {
        this.bracketHeight=200;
    }else {
      this.bracketHeight= this.bracketList.length*30;
    }
  }

  openBothLwAndUw(type, index)
  {
    this.applVar= false;
    this.hygSection= false;
    this.notessection= false; 
   if(this.lebelTypeArrayData[index].selected==false)
   {
    
      if(this.type=='')
      {
        this.lowerSectionVar= true;
        this.lwAndUwVar= true ;
      }else {
          if (this.type==type)
          {
            this.lowerSectionVar=  this.lowerSectionVar == true ? false : true  ;
            this.lwAndUwVar=  this.lwAndUwVar == true ? false : true ;
          }else {
            this.lowerSectionVar= true;
            this.lwAndUwVar= true ;
          }
      }
      this.type= type;
      this.bracketsSection = false ;
      this.bracketColor.map((value, key)=>{
        value.selected= false;
      });
      this.colorCode='Choose color'; 
  
   }

  }

  hideEditIcon(index)
  {
   
    this.lebelTypeArrayData[index].selected= this.lebelTypeArrayData[index].selected== false ? true : false ;
    this.hideEditPencil= this.hideEditPencil == true ? false : true;
    this.lowerSectionVar= false;
    this.lwAndUwVar= false ;
    this.applVar= false;
    this.hygSection=   false ;
    this.notessection= false;
    this.type='';
    this.showNotesType= '';
  }

  openUWDropDownList(){
    this.uwListDropDown = this.uwListDropDown == true ? false :  true ;
  }

  openLWDropDownList(){
    this.lwListDropDown = this.lwListDropDown == true ? false :  true ;
  }

  openUwAndLwForm()
  {
    this.addNewLwUw=  this.addNewLwUw == true ? false : true; 
    this.duplicateLWtoUWVar = false;
    this.duplicateUWtoLWVar = false ;
    this.createNewWireFormData=[
      {
        'wireName': '', 
        'colorCode': '',
        'groupNumber': ''
      }
    ];
    this.colorCode='Choose color'; 
    this.groupType =  'Choose group';
  }

  chooseNewColorOption()
  {
    this.chooseNewColor= this.chooseNewColor== false ? true : false;
  }

  chooseNewGroupOption()
  {
    this.choodeNewGroup= this.choodeNewGroup== false ? true : false;
  }

  changeTempleteNewColor(index)
  {
    this.bracketColor.map((value, key)=>{
        if(key!=index)
        {
          value.selected= false;
        }
    });

    this.bracketColor[index].selected=  this.bracketColor[index].selected== false ? true : false ;
      if(this.bracketColor[index].selected)
      {
        this.colorCode=this.bracketColor[index].color;
        this.createNewWireFormData[0].colorCode=  this.colorCode;
      }else {
        this.colorCode='Choose color';
        this.createNewWireFormData[0].colorCode=  '';
      }
      this.chooseNewColor = false ;
  }

  chooseGroup(groupType)
  {
    this.groupType = groupType; 
    this.choodeNewGroup = false;
    this.createNewWireFormData[0].groupNumber=groupType;
  }
  
  OnUweditMode(index)
  {
    if(this.saveDataByEditMode==false)
    {
      this.uwList.map((val, key)=>{

        if(key!=index)
        {
          val.edit_mode= false ;
        }
      })
      this.uwList[index].edit_mode= this.uwList[index].edit_mode== false ? true : false ;
    }
  }


  OnLweditMode(index)
  {
    if(this.saveDataByEditMode==false)
    {
        this.lwList.map((val, key)=>{

          if(key!=index)
          {
            val.edit_mode= false ;
          }
        })
        this.lwList[index].edit_mode= this.lwList[index].edit_mode== false ? true : false ;
      }
      
  }

  editUW(index)
  {
   
    this.saveDataByEditMode=  this.saveDataByEditMode== true ? false : true ;
    if(this.saveDataByEditMode)
    {
      this.createNewWireFormData[0].wireName= this.uwList[index].name;
      this.colorCode=this.uwList[index].color; 
      this.createNewWireFormData[0].colorCode=  this.colorCode;
      this.addNewLwUw= true ;
      this.storeEditWireId=index;
      this.editWireType='UW';
    }else {
      this.createNewWireFormData[0].wireName= '';
      this.colorCode=''; 
      this.createNewWireFormData[0].colorCode=  this.colorCode;
      this.addNewLwUw= false ;
      this.storeEditWireId='';
      this.editWireType='';
    }
   
  }

  deleteUW(index)
  {
    this.uwList.splice(index, 1);
    this.addNewLwUw= false ;
    this.duplicateUWtoLWVar = false;
    this.duplicateLWtoUWVar = false;
    this.saveDataByEditMode= false;
    this.storeEditWireId= '';
    this.editWireType='';

  }

  editLW(index)
  {
   
    this.saveDataByEditMode=  this.saveDataByEditMode== true ? false : true ;
    if(this.saveDataByEditMode)
    {
      this.createNewWireFormData[0].wireName= this.uwList[index].name;
      this.colorCode=this.uwList[index].color; 
      this.createNewWireFormData[0].colorCode=  this.colorCode;
      this.addNewLwUw= true ;
      this.storeEditWireId=index;
      this.editWireType='LW';
    }else {
      this.createNewWireFormData[0].wireName= '';
      this.colorCode=''; 
      this.createNewWireFormData[0].colorCode=  this.colorCode;
      this.addNewLwUw= false ;
      this.storeEditWireId='';
      this.editWireType='';
    }


  }

  deleteLW(index)
  {
    this.lwList.splice(index, 1);
    this.addNewLwUw= false ;
    this.duplicateUWtoLWVar = false;
    this.duplicateLWtoUWVar = false;
    this.saveDataByEditMode= false;
    this.storeEditWireId= '';
    this.editWireType='';
  }

  deleteUwOrLwData()
  {
    if(this.saveDataByEditMode== true && (this.storeEditWireId!='' || this.storeEditWireId==0 ) && this.editWireType!='')
    {
        if(this.editWireType=='UW')
        {
          this.uwList.splice(this.storeEditWireId, 1);
        }else {
          this.lwList.splice(this.storeEditWireId, 1);       
        }
        this.addNewLwUw= false ;
        this.duplicateUWtoLWVar = false;
        this.duplicateLWtoUWVar = false;
        this.saveDataByEditMode= false;
        this.storeEditWireId= '';
        this.editWireType='';

    }
  }

  duplicateUWtoLW()
  {
    this.duplicateUWtoLWVar= this.duplicateUWtoLWVar == false ? true : false;
    if(this.duplicateUWtoLWVar)
    {
      this.duplicateLWtoUWVar = false;
    }
   
  }

  duplicateLWtoUW()
  {
    this.duplicateLWtoUWVar= this.duplicateLWtoUWVar == false ? true : false;
    if(this.duplicateLWtoUWVar)
    {
      this.duplicateUWtoLWVar = false;
    }
  }

  saveNewWireData()
  {
    
    if(this.saveDataByEditMode== true && (this.storeEditWireId!='' || this.storeEditWireId==0 ) && this.editWireType!='')
    {
     
        if(this.editWireType=='UW')
        {
          this.uwList[this.storeEditWireId]={ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false};
        }else {
          this.lwList[this.storeEditWireId]={ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false};
        }

        this.addNewLwUw= false ;
        this.duplicateUWtoLWVar = false;
        this.duplicateLWtoUWVar = false;
        this.saveDataByEditMode= false;
        this.storeEditWireId= '';
        this.editWireType='';

    }else {
      if((this.createNewWireFormData[0].groupNumber!='' || this.duplicateUWtoLWVar==true ||  this.duplicateLWtoUWVar== true) && this.createNewWireFormData[0].wireName!='' &&  this.createNewWireFormData[0].colorCode!='Choose color')
      {
          if(this.createNewWireFormData[0].groupNumber!='')
          {
              if(this.createNewWireFormData[0].groupNumber=='UW')
              {
                this.uwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
               
                setTimeout(() =>{
                  this.listboxscroll1.directiveRef.scrollToBottom(0, 200);
                }, 300);

              }else  if(this.createNewWireFormData[0].groupNumber=='LW')
              {
                this.lwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
                
                setTimeout(() =>{
                  this.listboxscroll2.directiveRef.scrollToBottom(0, 200);
                }, 300);

              }else {
                this.uwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
                this.lwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
              
                setTimeout(() =>{
                  this.listboxscroll1.directiveRef.scrollToBottom(0, 200);
                }, 300);

                setTimeout(() =>{
                  this.listboxscroll2.directiveRef.scrollToBottom(0, 200);
                }, 300);
              
              
              }
          }else {
            this.uwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
            this.lwList.push({ 'name': this.createNewWireFormData[0].wireName, 'color' : this.createNewWireFormData[0].colorCode, 'edit_mode': false});
          
            setTimeout(() =>{
              this.listboxscroll1.directiveRef.scrollToBottom(0, 200);
            }, 300);

            setTimeout(() =>{
              this.listboxscroll2.directiveRef.scrollToBottom(0, 200);
            }, 300);
          
          }
          this.addNewLwUw= false ;
          this.duplicateUWtoLWVar = false;
          this.duplicateLWtoUWVar = false;
  
      }
    }
   
  }

  openAppl(type)
  {
    if(this.lebelTypeArrayData[5].selected==false)
    {
        this.type='';
        this.showNotesType='';
        this.lwAndUwVar= false; 
        this.hygSection= false;
        this.notessection= false; 
        this.applVar=  this.applVar == true ? false : true ;
        if(this.applVar)
        {
          this.lowerSectionVar = true ;
        }else {
          this.lowerSectionVar = false ;
        }
        this.showImgName= '';
        this.addNewAppl= false;
        this.applIndex='';
        this.applList.map((val, key)=>
        {
              val.edit_mode= false;
        });
    
        this.applFormListData = [
          {'name': '', 'appl': true, 'img': '', 'edit_mode': false }
        ];
  
    }
   

    
  }
  
  showHygSection(){
   
   
    if(this.lebelTypeArrayData[3].selected==false)
    {
        this.type='';
        this.showNotesType='';
        this.lwAndUwVar= false; 
        this.applVar= false; 
        this.hygSection=  this.hygSection == true ? false : true ;
        this.lowerSectionVar= true;
        this.notessection= false; 
        
    }


	}
  
	selectHygSystem(indx){
		this.hygSystemArr.map(item => {
			item.selected = false;
		});
		
		this.hygSystemArr[indx].selected = true;
	}
	

  showNotes(type, index)
  {
    this.applVar= false;
    this.hygSection= false;
    this.lwAndUwVar= false;
   if(this.lebelTypeArrayData[index].selected==false)
   {
    
      if(this.showNotesType=='')
      {
        this.lowerSectionVar= true;
        this.notessection= true ;
      }else {
          if (this.showNotesType==type)
          {
            this.lowerSectionVar=  this.lowerSectionVar == true ? false : true  ;
            this.notessection = this.notessection == true ? false : true;
          }else {
            this.lowerSectionVar= true;
            this.notessection= true ;
          }
      }
      this.showNotesType= type;
      this.bracketsSection = false ;
      this.bracketColor.map((value, key)=>{
        value.selected= false;
      });
   }

  }


	
	addNotesToList(){
		if(this.shortDesc){
			if(this.editNotes){
				this.notesList[this.selectedNotesIndx].short = this.shortDesc;
				this.notesList[this.selectedNotesIndx].description = this.longDesc;
				this.editNotes = false;
				this.addNotes = false;
			} else {
				this.notesList.unshift({"short": this.shortDesc, "description": this.longDesc, "selected": false});
			}
		}
		
		this.shortDesc = null;
		this.longDesc = null;
	}
	
	selectNotesListItem(indx){
		this.selectedNotesIndx = indx;
		this.editNotes = true;
		this.addNotes = true;
		this.shortDesc = this.notesList[indx].short;
		this.longDesc = this.notesList[indx].description;
	}
	
	cancelNotesAddEdit(){
		this.editNotes = false;
		this.addNotes = false;
		this.shortDesc = null;
		this.longDesc = null;
	}
	
	deleteExistingNotes(){
		if(this.deleteNotes == true){
			this.notesList.splice(this.selectedNotesIndx, 1);
			this.editNotes = false;
			this.addNotes = false;
			this.shortDesc = null;
			this.longDesc = null;
			this.deleteNotes = false;
		} else {
			this.deleteNotes = true;
		}
  }
  
  openApplForm()
  {
    this.addNewAppl= this.addNewAppl== false ? true : false;
  }

  saveApplData()
  {
    if(this.applIndex || this.applIndex=='0')
    {
        this.applList[this.applIndex].name=this.applFormListData[0].name;
    }else {
      this.applList.push({'name': this.applFormListData[0].name , 'appl': true, 'img':'', 'edit_mode': false });

    }
    this.applIndex='';
    this.addNewAppl= false;
    this.applList.map((val, key)=>
    {
          val.edit_mode= false;
    });

    this.applFormListData = [
      {'name': '', 'appl': true, 'img': '', 'edit_mode': false }
    ];
    
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
			this.showImgName = this.imgURL;
		  }
		  
		}
	 
    }

    editApplMode(index)
    {
      this.applList.map((val, key)=>
      {
          if(index!=key)
          {
            val.edit_mode= false;
          }
      })
      this.applList[index].edit_mode= this.applList[index].edit_mode== true ? false : true;
      this.applFormListData[0].name=  this.applList[index].name;

      if( this.applList[index].edit_mode)
      {
       
        if(this.applList[index].img)
        {
          this.showImgName= 'assets/appl/'+this.applList[index].img;
        }else {
          this.showImgName= '';
        }
        this.addNewAppl= true;
        this.applIndex=index;
        this.applFormListData[0].name=  this.applList[index].name;
      }else {
        this.showImgName= '';
        this.addNewAppl= false;
        this.applIndex='';
        this.applFormListData[0].name=  '';
      }
    
    }

    deleteApplImg()
    {
      this.applList[this.applIndex].img= '';
      this.showImgName=''
    }
    
    closeLowerSection()
    {
      this.lebelTypeArrayData.map((val, key)=>{
        val.selected= false; 
      })
      this.hideEditPencil=  false ;
      this.lowerSectionVar= false;
      this.lwAndUwVar= false ;
      this.applVar= false;
      this.hygSection=   false ;
      this.notessection= false;
      this.type='';
      this.showNotesType= '';
    }
}
