import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goals-card',
  templateUrl: './goals-card.component.html',
  styleUrls: ['./goals-card.component.css']
})
export class GoalsCardComponent implements OnInit {
	
	@Input() boxHt: any;
	addGoal:any = {};
	goalsPlanArr=[
	  {"label" : "Expansion", "selected": false, "edit_mode": false  },
	  {"label" : "Jaw Growth" , "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Asymmetry", "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Crowding" , "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Rotations", "selected": false, "edit_mode": false},
	  {"label" : "Tooth Extractions", "selected": false, "edit_mode": false},
	  {"label" : "Close Space", "selected": false, "edit_mode": false},
	  {"label" : "Stabilize Bite", "selected": false, "edit_mode": false},
	  {"label" : "Correct Following", "selected": false, "edit_mode": false},
	  {"label" : "Eliminate Habit" , "selected": false, "edit_mode": false},
	  {"label" : "Addn’l Tx Goals", "selected": false, "edit_mode": false},
	];
	
  constructor() { }

  ngOnInit() {
  }
  
	goal_edit_mode_on(index) {
		this.goalsPlanArr.forEach(function(element,key) {
			if(element.selected==true && key!=index) {
				element.selected= false;
				element.edit_mode= false;
			}
		});
		this.goalsPlanArr[index].selected = this.goalsPlanArr[index].selected==false ? true : false;
	}

	goal_edit(index) {
		this.goalsPlanArr.forEach(function(element,key) {
		  if(element.edit_mode==true && key!=index)
			{
			  element.edit_mode= false;
			  element.selected= false;
			}
		 });
		this.goalsPlanArr[index].edit_mode = this.goalsPlanArr[index].edit_mode==false ? true : false;
	}

	upadte_goal_name(name, index) {
		if(name.target.value !='' ) {
			this.goalsPlanArr[index].label =  name.target.value ;
		}
		this.goal_edit(index);
		this.goal_edit_mode_on(index);
	}

	delete_goal_from_list(index) {
		this.goalsPlanArr.splice(index, 1);
	}

	add_goal_item() {
		if(this.addGoal.add_goal) {
			this.goalsPlanArr.push({'label' :this.addGoal.add_goal,  "selected": false, "edit_mode": false});
			this.addGoal.add_goal = '';
		}
	}

}
