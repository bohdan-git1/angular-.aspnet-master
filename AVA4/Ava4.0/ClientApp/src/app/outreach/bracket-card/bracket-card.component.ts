import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bracket-card',
  templateUrl: './bracket-card.component.html',
  styleUrls: ['./bracket-card.component.css']
})
export class BracketCardComponent implements OnInit {
	
	bracketArr: any[] = [
		{"label": "U Lingual", "color": "#B48CF6", "selected": false},
		{"label": "L Lingual", "color": "#8CF1E4", "selected": false},
		{"label": "GAC SL", "color": "#FD7474", "selected": false},
		{"label": "GAC SL U Clear", "color": "#74B3FD", "selected": false},
		{"label": "In-Ovation X", "color": "#F6CC61", "selected": false},
		{"label": "In-Ovation X", "color": "#F6CC61", "selected": false}
	];
	
	braketTeethArr: any[] = [
		{"side": "left-top",
		"teethelem": [{"label": 8, "selected": false, "brackettype": "#646464"}, {"label": 7, "selected": false, "brackettype": "#646464"}, {"label": 6, "selected": false, "brackettype": "#646464"}, {"label": 5, "selected": false, "brackettype": "#646464"}, {"label": 4, "selected": false, "brackettype": "#646464"}, {"label": 3, "selected": false, "brackettype": "#646464"}, {"label": 2, "selected": false, "brackettype": "#646464"}, {"label": 1, "selected": false, "brackettype": "#646464"}]},
		
		{"side": "right-top",
		"teethelem": [{"label": 1, "selected": false, "brackettype": "#646464"}, {"label": 2, "selected": false, "brackettype": "#646464"}, {"label": 3, "selected": false, "brackettype": "#646464"}, {"label": 4, "selected": false, "brackettype": "#646464"}, {"label": 5, "selected": false, "brackettype": "#646464"}, {"label": 6, "selected": false, "brackettype": "#646464"}, {"label": 7, "selected": false, "brackettype": "#646464"}, {"label": 8, "selected": false, "brackettype": "#646464"}]},
		
		{"side": "left-bottom",
		"teethelem": [{"label": 8, "selected": false, "brackettype": "#646464"}, {"label": 7, "selected": false, "brackettype": "#646464"}, {"label": 6, "selected": false, "brackettype": "#646464"}, {"label": 5, "selected": false, "brackettype": "#646464"}, {"label": 4, "selected": false, "brackettype": "#646464"}, {"label": 3, "selected": false, "brackettype": "#646464"}, {"label": 2, "selected": false, "brackettype": "#646464"}, {"label": 1, "selected": false, "brackettype": "#646464"}]},
		
		{"side": "right-bottom",
		"teethelem": [{"label": 1, "selected": false, "brackettype": "#646464"}, {"label": 2, "selected": false, "brackettype": "#646464"}, {"label": 3, "selected": false, "brackettype": "#646464"}, {"label": 4, "selected": false, "brackettype": "#646464"}, {"label": 5, "selected": false, "brackettype": "#646464"}, {"label": 6, "selected": false, "brackettype": "#646464"}, {"label": 7, "selected": false, "brackettype": "#646464"}, {"label": 8, "selected": false, "brackettype": "#646464"}]}
		
	];
	
	newBracketColorArr: any[] = [{"color": "#FCFF7C", "selected": false}, {"color": "#FFE0E0", "selected": false}, {"color": "#F37BC3", "selected": false}, {"color": "#4EC8F0", "selected": false}, {"color": "#FF772B", "selected": false}, {"color": "#84FF79", "selected": false}]
	
	showBracketDdr: boolean = false;
	selectedBracket: any = '';
	_selectall_Teeth:boolean = false;
	addnewBrckt:boolean = false;
	addnew_selected: any;
	newbracketlabel: any;
	selectedBracktColr:any[] = [];
	@Output() getSelected = new EventEmitter();
	
  constructor() { }

  ngOnInit() {
	this.selectBracket(0);
  }
  
  selectBracket(indx){
	this.bracketArr[indx].selected = this.bracketArr[indx].selected==true ? false : true;
	
	this.selectedBracktColr = this.bracketArr.filter(item => {
		return item.selected==true;
	});
	
	this.selectedBracket = this.bracketArr[indx];
	
	if(this._selectall_Teeth == true){
		this.selectallTeeth(false);
	}
	this.showBracketDdr = false;
	
	this.getSelected.emit(this.selectedBracktColr);
  }
  
  selectTeeth(arrIndx, indx){
	this.braketTeethArr[arrIndx].teethelem[indx].selected = this.braketTeethArr[arrIndx].teethelem[indx].selected==true? false : true;
	
	this._selectall_Teeth = false;
	this._selectall_Teeth
	if(this.braketTeethArr[arrIndx].teethelem[indx].selected==true){
		this.braketTeethArr[arrIndx].teethelem[indx].brackettype = this.selectedBracket.color;
	} else {
		this.braketTeethArr[arrIndx].teethelem[indx].brackettype = "#646464";
	}
  }
  
  selectallTeeth(calloutside) {
	
	if(calloutside == true){
		this._selectall_Teeth = this._selectall_Teeth==true ? false : true;
	}
	
	this.braketTeethArr.map(elem => {
		elem.teethelem.map(item => {
			if(this._selectall_Teeth==true){
				item.selected = true;
				item.brackettype = this.selectedBracket.color;
			} else {
				item.selected = false;
				item.brackettype = "#646464";
			}
		})
	});
  }
  
  selectBrcktColor(indx){
	this.newBracketColorArr.map(item => {
		item.selected = false;
	});
	
	this.newBracketColorArr[indx].selected = this.newBracketColorArr[indx].selected == true ? false : true;
	
	this.addnew_selected = this.newBracketColorArr[indx].color;
	
  }
  
  addnewbrcktToList(){
	if(this.newbracketlabel != null && this.addnew_selected != null){
		let newlistItem: any = {"label": this.newbracketlabel, "color": this.addnew_selected};
		this.bracketArr.push(newlistItem);
		this.newbracketlabel = null;
		this.addnew_selected = null;
		this.addnewBrckt = false;
	} else {
		this.addnewBrckt = false;
	}
  }

}
