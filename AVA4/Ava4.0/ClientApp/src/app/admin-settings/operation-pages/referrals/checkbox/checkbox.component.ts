import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
	
	@Input() chkboxlabel: any;
  @Input() selected:boolean;
  @Input() isArraychek;
  @Input() group;
  error: boolean= false;
  @Output() errorTnsf= new EventEmitter();

  
	
  constructor() { }

  ngOnInit() {
    
  }
  
  selectChkbox(){
  
    this.selected = !this.selected;
    if(this.isArraychek)
    {
          var count=0;
          this.group.map( element1=>{
          if(this.chkboxlabel==element1.label)
            {
              element1.selected=  this.selected;
            }
            if(element1.selected==true)
            {
              count=1;
            }

        })
        if(count==1)
        {
          this.error= false;
        }else {
          this.error= true;
        }
       
    }else {
      var count=0;
      this.group.map( element1=>{
        if(this.chkboxlabel==element1.label)
        {
          element1.selected=  this.selected;
        }else {
          element1.selected=  false;
        }

        if(element1.selected==true)
            {
              count=1;
            }

        })

        if(count==1)
        {
          this.error= false;
        }else {
          this.error= true;
        }

    }
    this.errorTnsf.emit(this.error);

  }

}
