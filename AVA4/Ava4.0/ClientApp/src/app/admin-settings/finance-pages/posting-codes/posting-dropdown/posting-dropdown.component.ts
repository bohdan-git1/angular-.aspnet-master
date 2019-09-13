import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../../core/message.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-posting-dropdown',
  templateUrl: './posting-dropdown.component.html',
  styleUrls: ['./posting-dropdown.component.css']
})
export class PostingDropdownComponent implements OnInit {

  
  @Input() options: any;
  @Input() selectEditOption: any;
  @Input() ddplaceholder: any;
  @Input() selectIndex: any;
  @Input() selectActiveIndex: any;

  @Input() dropdown: any;

  

  @Input() selectOption: any;
  @Input() selectActiveOption: any;

  @Input() postingcodeData: any;
  @Input() postingcodeCloneData: any;


  left: any='';
  @Output() typeName = new EventEmitter();
  @Output() postingcodeCloneDataArray = new EventEmitter();

  

  dropdownboxHG: any;
	showdd:boolean = false;
	dd_id: any;
	subscription:Subscription;
	_ddoptionsArr:any[] = [];
  UWlistArraylength: any;
  
  selectedIndex: any;

  public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};

  constructor(private dataService:MessageService) { }

  ngOnInit() {
      if(this.selectOption)
      {
        this.selectedIndex=this.selectOption;
        this.ddplaceholder= this.selectedIndex;
      }else if (this.selectActiveOption)
      {
        if(this.selectActiveOption=='Y')
        {
          var Active= 'Active';
        }else {
          var Active= 'Inactive';
        }

        this.selectedIndex=Active;
        this.ddplaceholder= this.selectedIndex;
        
      }

      if(this.options.length>3)
      {
        this.dropdownboxHG=90;
      }else {
        this.dropdownboxHG=this.options.length*30;
      }

      if(this.selectEditOption)
      {
        this.ddplaceholder=this.selectEditOption;
      }

     this.initializeDropdown();
    
    this.subscription = this.dataService.getMessage().subscribe(message => {
      if(message.event == 'dropdownstate'){
        if(this.dd_id != message.data.dd_id){
          this.showdd = false;
        }
      }
    });
    
    }
    
 
  
  showddoptions(){
	this.showdd = this.showdd == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showdd});
  }


  
  initializeDropdown() {
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
	this._ddoptionsArr = JSON.parse(JSON.stringify(this.options));
	
	this._ddoptionsArr.map(item => {
		item.selected = false;
	})
	  }
  
  selectDdOption(indx){

  this.showdd = false;
	this._ddoptionsArr.map(item => {
		item.selected = false;
	});
	
  this.ddplaceholder = this._ddoptionsArr[indx].option;

 
      
    if(this.selectIndex || this.selectIndex==0)
      {
        var myJSON1 = JSON.stringify(this.postingcodeCloneData);
        this.postingcodeData = JSON.parse((myJSON1));

          this.postingcodeData[this.selectIndex].depositType = this.ddplaceholder;
          this.postingcodeCloneData=this.postingcodeData;
      }
      if(this.selectActiveIndex || this.selectActiveIndex==0)
      {
        var myJSON1 = JSON.stringify(this.postingcodeCloneData);
        this.postingcodeData = JSON.parse((myJSON1));
        
       
          if(this.ddplaceholder=='Active')
          {
            var Active= 'Y';
          }else {
            var Active= 'N';
          }
          this.postingcodeData[this.selectActiveIndex].active = Active;
          this.postingcodeCloneData=this.postingcodeData;
      }

    this.postingcodeCloneDataArray.emit(this.postingcodeCloneData );

    this.typeName.emit(this.ddplaceholder );
    this._ddoptionsArr[indx].selected = true;
   
  }
  
  onClickedOutside() {
	this.showdd = false;
  }



}
