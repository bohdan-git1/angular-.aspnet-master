import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
	
	@ViewChild('profilescroll') profilescroll: PerfectScrollbarComponent;
	
	search_options: string[] = ['Becca Kurfin', 'Beckham Gray', 'Becky Smith', 'Belamy Wilson', 'Berry Holmes', 'Bethany Roland'];
	showlastList: boolean = false;
	
	showrotetedList: boolean= false;
	rotetedType='';
	medicalAlertdata='Allergic to codiene, is austistic (don’t make direct eye contact). Hippa release has not been signed';
	commentAlertdata='Parents are divorced. Mom (Clarissa) is bringing Stella into the office but all financial information should be sent to Dad (Peter).';
	
	diagnosisArr: any [] = [
		{'title': 'Chief Concerns', 'selected': false, 'ddoptions': [
			{'title': 'Concerns', 'suboptn': [
				{'title': 'Crowding'},
				{'title': 'Crookedness'},
				{'title': 'Overbite'},
				{'title': 'Overjet'},
				{'title': 'Teeth Stick Out'},
				{'title': 'TMJ Symptoms'},
				{'title': 'Crossbite'},
				{'title': 'Bite Off'},
				{'title': 'Openbite'},
				{'title': 'Thumb/Finger Habit'},
				{'title': 'Missing Teeth'},
				{'title': 'Extra Teeth'},
				{'title': 'Wear on teeth'},
				{'title': '2nd Opinion'},
				{'title': 'Impacted'},
				{'title': 'Spaces'},
				{'title': 'Clenching & Grinding'},
				{'title': 'Underbite'},
				{'title': 'Speech'}
			]}
		]},
		
		{'title': 'Profile', 'selected': false, 'ddoptions': [
			{'title': 'Straight Profile', 'suboptn': []},
			{'title': 'Full Profile', 'suboptn': []},
			{'title': 'Recessive Lower Jaw', 'suboptn': []},
			{'title': 'Prognathic Lower Jaw', 'suboptn': []},
			{'title': 'Convex', 'suboptn': []},
			{'title': 'Concave', 'suboptn': []},
		]},
		
		{'title': 'Frontal', 'selected': false, 'ddoptions': []},
		{'title': 'Vertical', 'selected': false, 'ddoptions': []},
		{'title': 'Dental', 'selected': false, 'ddoptions': [
			{'title': 'Ankylosed Teeth', 'suboptn': [
				{'title': 'Ankylosed'}
			]},
			{'title': 'Constricted Arches', 'suboptn': [
				{'title': 'Constricted Upper & Lower Arches'},
				{'title': 'Constricted Upper Arch'},
				{'title': 'Constricted Lower Arch'},
				{'title': 'Anterior 1 tooth'},
				{'title': 'Posterior Right'},
				{'title': 'Posterior Left'},
				{'title': 'Anterior Partial'}
			]},
			{'title': 'Crossbite', 'suboptn': [
				{'title': 'Posterior Bilateral'},
				{'title': 'Posterior R'},
				{'title': 'Posterior L'},
				{'title': 'Anterior Complete'},
				{'title': 'Anterior 1 Tooth'},
				{'title': 'Anterior Partial'},
				{'title': 'Lateral R'},
				{'title': 'Lateral L'},
				{'title': 'Scissors Bilateral'},
				{'title': 'Scissors R'},
				{'title': 'Scissors L'}
			]},
			{'title': 'Crowding', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'}
			]},
			{'title': 'Dental Class', 'suboptn': [
				{'title': 'Class I'},
				{'title': 'Class II'},
				{'title': 'Class III'},
				{'title': 'Supra Cl I'},
				{'title': 'Class II right'},
				{'title': 'Class II left'},
				{'title': 'Class III right'},
				{'title': 'End to end cuspid'},
				{'title': 'ETE Molar/Cuspid'},
				{'title': 'Supra Cl I Right'},
				{'title': 'Supra Cl I Left'}
			]},
			{'title': 'Impacted Teeth', 'suboptn': [
				{'title': 'Impacted'}
			]},
			{'title': 'Midlines', 'suboptn': [
				{'title': 'Upper Midline To The Right'},
				{'title': 'Upper Midline To The Left'},
				{'title': 'Lower Midline To The Right'},
				{'title': 'Lower Midline To The Left'},
				{'title': 'Midlines are Okay'},
				{'title': 'Overbite'}
			]},
			{'title': 'Missing Teeth', 'suboptn': [
				{'title': 'Missing Permanent'},
			]},
			{'title': 'Openbite', 'suboptn': [
				{'title': 'Anterior'},
				{'title': 'Posterior R'},
				{'title': 'Posterior L'},
				{'title': 'Posterior Bilateral'},
				{'title': 'Lateral R'},
				{'title': 'Lateral L'}
			]},
			{'title': 'Overjet', 'suboptn': [
				{'title': 'Mild'},
				{'title': 'Moderate'},
				{'title': 'Severe'},
				{'title': 'ETE'},
				{'title': 'ETE w/ shift'},
				{'title': 'Minimal'},
				{'title': 'Dental Protrusion'}
			]},
			{'title': 'Rotations', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'}
			]},
			{'title': 'Wear on teeth', 'suboptn': [
				{'title': 'Slight & Localized'},
				{'title': 'Moderate & Localized'},
				{'title': 'Severe & Localized'},
				{'title': 'Slight & Generalized'},
				{'title': 'Moderate & Generalized'},
				{'title': 'Severe & Generalized'}
			]},
			{'title': 'Small U Laterals', 'suboptn': [
				{'title': 'U Right & Left'},
				{'title': 'U Right'},
				{'title': 'U Left'},
				{'title': 'Bond Peg Laterals'},
				{'title': 'Small Maxillary Incisors'},
				{'title': 'Small sized Mandibular Incisors'},
				{'title': 'Post Tx Resto'}
			]},
			{'title': 'Spacing', 'suboptn': [
				{'title': 'U&L Mild'},
				{'title': 'U&L Moderate'},
				{'title': 'U&L Severe'},
				{'title': 'U Mild'},
				{'title': 'U Moderate'},
				{'title': 'U Severe'},
				{'title': 'L Mild'},
				{'title': 'L Moderate'},
				{'title': 'L Severe'},
				{'title': 'Diastema'},
				{'title': 'Diastema with Freunum Involvement'}
			]},
		]},
		{'title': 'Perio', 'selected': false,  'ddoptions': [
			{'title': 'Amount of Gum Showing', 'suboptn': [
				{'title': 'Deficient'},
				{'title': 'Excessive'},
				{'title': 'Moderate'}
			]},
			{'title': 'Gingiva', 'suboptn': [
				{'title': 'Recession - #’s'},
				{'title': 'Inflamed'},
				{'title': 'Swollen'},
				{'title': 'Generalized Recession'}
			]}
		]},
		{'title': 'Intra Oral', 'selected': false, 'ddoptions': []},
		{'title': 'TMJ', 'selected': false, 'ddoptions': [
			{'title': 'Clicking', 'suboptn': []},
			{'title': 'Noisy', 'suboptn': []},
			{'title': 'Painful', 'suboptn': []},
			{'title': 'Locking', 'suboptn': []},
			{'title': 'Sore Muscles', 'suboptn': []},
			{'title': 'Deviated Path of Opening', 'suboptn': []},
			{'title': 'Headaches', 'suboptn': []},
			{'title': 'Popping', 'suboptn': []}
		]},
		{'title': 'Other', 'selected': false, 'ddoptions': [
			{'title': 'Breathing', 'suboptn': [
				{'title': 'Mouth'}
			]},
			{'title': 'Clenching', 'suboptn': [
				{'title': 'Clenching'},
				{'title': 'No Clenching'}
			]},
			{'title': 'Grinding', 'suboptn': [
				{'title': 'Night Time Grinding'},
				{'title': 'No Grinding'}
			]},
			{'title': 'Habits', 'suboptn': [
				{'title': 'Thumb'},
				{'title': 'Finger'},
				{'title': 'Tongue Thrust Swallow'},
				{'title': 'Poor Tongue Posture'},
			]},
			{'title': 'Supernumerary Teeth', 'suboptn': [
				{'title': 'Supernumerary'}
			]},
		]},
	];
	
	lastlistArr: any[] = [{name: 'Obi- Wan Kenobi'}, {name: 'Sheeve Palpatine'}, {name: 'Jar Jar Binks'}, {name: 'Darth Maul'}, {name: 'Qui - Gonn Jinn'}, {name: 'Padme Amidala'}, {name: 'Sio Bibble'}, {name: 'Poe Dameron'}, {name: 'Aayla Secura'}, {name: 'Jessika Pava'}];
	
	windowHt: any;
	zoomviewport: any = 100;
	
	windowContHt: any;
	tableHt: any;
	
	treatmentArr: any[] = [
		{"date": "11/30/18 09:43", "UW": "019x025N", "LW": "", "Hyg": "5", "Appl": "", "St": "JP", "dr": "Thom", "notes": "Trimmed U de's - gave pt wax to help cheek heal", "next_notes": "Eval Only", "Proc": "Eval", "U": "", "Wks": "6 wks", "elastic" : false},
		
		{"date": "11/14/18 16:22", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "Cont. U clear ret. FT", "next_notes": "6 mo Ret Ck Dec 2018", "Proc": "Ret", "U": "", "Wks": "", "elastic" : true},
		
		{"date": "08/14/18 07:55", "UW": "019x025N", "LW": "018nit", "Hyg": "3", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "CUW Chain UR6-UL2 L 7-7 Reshape U 1's Start gor tri’s off 3's", "next_notes": "", "Proc": "Keep", "U": "", "Wks": "3 mo", "elastic" : false},
		
		{"date": "06/30/18 09:43", "UW": "", "LW": "", "Hyg": "3", "Appl": "", "St": "KK", "dr": "Thom", "notes": "Retie chk 7's", "next_notes": "Retie", "Proc": "Ret", "U": "", "Wks": "5 wk", "elastic" : true},
		
		{"date": "03/02/18 09:22", "UW": "019x025N", "LW": "018nit", "Hyg": "2", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "L18x25NITI", "next_notes": "U/18X25NITI", "Proc": "", "U": "", "Wks": "", "elastic" : false},
		
		{"date": "12/28/17 07:32", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "", "St": "MR", "dr": "Rem", "notes": "Z Bend U 1's Ck Sp Closure", "next_notes": "Ck DB", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false},
		
		{"date": "12/28/17 07:32", "UW": "", "LW": "018nit", "Hyg": "3", "Appl": "", "St": "MR", "dr": "Rem", "notes": "Z Bend U 1's Ck Sp Closure", "next_notes": "Ck DB", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false},
		
		{"date": "09/12/17 09:40", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "JP", "dr": "Rem", "notes": "PT in for emerg LR5 off, replaced bracket", "next_notes": "Keep NV", "Proc": "Eval", "U": "", "Wks": "3 mo", "elastic" : false},
		
		{"date": "07/28/17 15:45", "UW": "", "LW": "018nit", "Hyg": "1", "Appl": "Cont", "St": "MR", "dr": "Thom", "notes": "Retie LR3 in box", "next_notes": "A-CH", "Proc": "Ret", "U": "", "Wks": "6 wk", "elastic" : true},
		
		{"date": "06/29/17 07:55", "UW": "019x025N", "LW": "018nit", "Hyg": "3", "Appl": "", "St": "KK", "dr": "Rem", "notes": "Ret3", "next_notes": "Ret4", "Proc": "Eval", "U": "", "Wks": "1 mo", "elastic" : false},
		
		{"date": "10/14/16 14:52", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "KK", "dr": "Thom", "notes": "Cut L/AW Distal to 6's TQ U/Post", "next_notes": "956-DB full 3-3, Imp Pano/Ceph", "Proc": "", "U": "", "Wks": "", "elastic" : false},
		
		{"date": "04/20/16 07:50", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "", "St": "LF", "dr": "Thom", "notes": "CUW Chain UR6-UL2 L 7-7", "next_notes": "", "Proc": "Keep", "U": "", "Wks": "6 mo", "elastic" : false},
		
		{"date": "03/25/16 07:55", "UW": "", "LW": "", "Hyg": "4", "Appl": "", "St": "KK", "dr": "Rem", "notes": "Mesial out lower left 2. Chain U & L 6-6", "next_notes": "NV check lower left 2 & Verticas", "Proc": "Eval", "U": "", "Wks": "1 mo", "elastic" : true},
		
		{"date": "10/14/16 14:52", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "KK", "dr": "Thom", "notes": "Ret2", "next_notes": "Ret3", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false},
	];
	
	slideArr:any[] = [{'slidename': 'relationship', show: false}];
	animateFirstCard: any = 0;
	currentSlide: any = 0;
	
	rotateOnY: any = 0;
	diagnosticRotateY: any = 0;
	
	consq_visit = false;
	
	postTreatment: boolean = false;
	subscription:Subscription;
	elasticSection:boolean = false;
	
	diagnosisTxt: any;
	addBtnClicked: boolean = false;
	
	location='Location #2';
	doctor='Dr. Thomson';
	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};
	
	newTxCard_Row: any = {"date": "", "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true};
	
	txCardUW_option: any = [{"label": "012 SS"}, {"label": "014 NT"}, {"label": "014 SS"}, {"label": "016 N"}, {"label": "016 SS"}, {"label": "018 N"}, {"label": "018 SS"}, {"label": "16x22 NT"}, {"label": "16x22 SS"}, {"label": "17x25 SS"}, {"label": "17x25TMA"}, {"label": "18"}, {"label": "18x25 N"}, {"label": "18x25 SS"}, {"label": "19x25 SS"}, {"label": "19x25TMA"}, {"label": "21x25 SS"}, {"label": "21x25Brd"}, {"label": "NONE"}, {"label": "U18/24SS"}];
	
	txCardLW_option: any = [{"label": "012 SS"}, {"label": "014 NT"}, {"label": "014 SS"}, {"label": "016 N"}, {"label": "016 SS"}, {"label": "018 N"}, {"label": "018 SS"}, {"label": "16x22 NT"}, {"label": "16x22 SS"}, {"label": "17x25 SS"}, {"label": "17x25TMA"}, {"label": "18"}, {"label": "18x25 N"}, {"label": "18x25 SS"}, {"label": "19x25 SS"}, {"label": "19x25TMA"}, {"label": "21x25 SS"}, {"label": "21x25Brd"}, {"label": "NONE"}, {"label": "U18/24SS"}];
	
	txCardHg_option: any = [{"label": 5}, {"label": 4}, {"label": 3}, {"label": 2}, {"label": 1}];
	
	txCardAppl_option: any = [{"label": "Amer"}, {"label": "B.P."}, {"label": "Band RPE"}, {"label": "Bond RPE"}, {"label": "FcBow HG"}, {"label": "FORCES"}, {"label": "GAC"}, {"label": "Haw/pont"}, {"label": "Hawley"}, {"label": "Hyrax"}, {"label": "J HookHG"}, {"label": "L Hawley"}, {"label": "L Schwtz"}, {"label": "L SpAlgn"}, {"label": "Ling 3-3"}, {"label": "Pont 1/2"}, {"label": "Rev. HG"}, {"label": "TPB"}, {"label": "U Hawley"}, {"label": "L Schwtz"}, {"label": "L SpAlgn"}, {"label": "U/LFeaGa"}, {"label": "UNITEK"}];
	
	txCardDr_option: any = [{"label": "Dr. Thom"}, {"label": "Dr. Tobl"}, {"label": "Dr. Jones"}, {"label": "Dr. Jones"}, {"label": "Dr. Poll"}];
	
  constructor(public todoListDialog: MatDialog, private messageService: MessageService) { }

  ngOnInit() {
	
	/*this.windowHt = window.innerHeight - 138 - 70;*/
	
	
	/*console.log("visit date: ", window.localStorage.getItem('visitdate'))*/
	
	
	/*let today:any = new Date();
	let visitDate: any = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
	
	if(window.localStorage.getItem('visitdate') != null || window.localStorage.getItem('visitdate') != undefined){
		let storagevisitDate = window.localStorage.getItem('visitdate');
		
		if(visitDate == storagevisitDate){
			this.consq_visit = true;
			this.diagnosticRotateY = -180;
		} else {
			this.consq_visit = false;
		}
	}
	
	window.localStorage.setItem('visitdate', visitDate);
	console.log('this.consq_visit', this.consq_visit);*/
	
	this.subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'posttreatment'){
			console.log(typeof(message.data));
			this.postTreatment = message.data == ('false' || false) ? false : true ;
			
			if(this.postTreatment == true){
				this.diagnosticRotateY = -180;
			} else {
				this.diagnosticRotateY = 0;
			}
		}
	});
	
	
	if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
		this.zoomviewport = Number(window.localStorage.getItem('zoomview'));
	}
	
	this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 138 - 70);
	this.windowContHt = window.innerHeight - 81 - 70 - 4;
	
	this.tableHt = this.windowContHt - 200;
	
	if(this.tableHt <= 120){
		this.tableHt = 120;
	}
  }
  
	showLast() {
		this.showlastList = this.showlastList === true ? false : true;
	}
	
	zoomView(dir) {
		if(dir == 'in'){
			this.zoomviewport -= 5;
		} else {
			this.zoomviewport += 5;
		}
		if(this.zoomviewport < 25){
			this.zoomviewport = 25;
		}
		
		if(this.zoomviewport > 200){
			this.zoomviewport = 200;
		}
		
		this.windowHt = (window.innerHeight/(this.zoomviewport/100) - 138 - 70);
		
		setTimeout(() => {
			this.profilescroll.directiveRef.update();
		}, 500);
		
		window.localStorage.setItem('zoomview', this.zoomviewport);
	}
	
	/*openTodoList(evt: MouseEvent) {
		
		const target = new ElementRef(evt.currentTarget);
			let dialog_config: any = {data: { trigger: target}, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'searchboxClass'};

			const dialogRef = this.todoListDialog.open(TodoListDialog, dialog_config);
			
			dialogRef.afterClosed().subscribe( _res => {
				if(_res != undefined){
					//console.log(_res);
				}
			});
	}*/
	
	gotoNextSlide(slideNum){
		this.currentSlide = slideNum;
		this.slideArr[this.currentSlide].show = true;
		this.animateFirstCard -= 200;
	}
	
	goback(evt){
		if(evt == 'back'){
			/*this.animateFirstCard = 0;
			setTimeout(() => {
				this.slideArr[this.currentSlide].show = false;
			}, 500);*/
			
			this.rotateOnY -= 180;
		}
	}
	
	passTextareaData(evt)
	{
		this.medicalAlertdata=evt;
	}
	passTextareaCommentData(evt)
	{
		this.commentAlertdata=evt;
	}

	locationShow(evt)
	{
		this.location=evt;
	}
	doctorShow(evt)
	{
		this.doctor=evt;;
	}
	
	flipSlide(type){
		this.rotateOnY -= 180;
		if(type=='Relationships')
		{
			this.showrotetedList=true;
			this.rotetedType='Relationships';
		}
		if(type=='MedicalAlert')
		{
			this.showrotetedList=true;
			this.rotetedType='MedicalAlert';
		}
		if(type=='Comment')
		{
			this.showrotetedList=true;
			this.rotetedType='Comment';
		}
		if(type=='patientPreferences')
		{
			this.showrotetedList=true;
			this.rotetedType='patientPreferences';
		}
		
	}
	
	diagnosticRot() {
		this.diagnosticRotateY -= 180;
	}	
	
	imageModal(callfrom){
		const createAppnt_dialogRef = this.todoListDialog.open(ImageModal, {
			panelClass: 'patientModal',
			backdropClass: 'whitebackdrop',
		
			data: {showsection: callfrom}
		});
	}
	
	showElasticSection(){
		this.elasticSection = true;
	}
	
	closeElasticSection() {
		this.elasticSection = false;
	}
	
	addRow() {
		this.addBtnClicked = true;
		let dt:any = new Date();
		this.newTxCard_Row = {"date": dt, "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true};
		
		
		
		/*let dt:any = new Date();
		
		let newRow: any = {"date": dt, "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : false};
		
		this.treatmentArr.unshift(newRow);*/
		
		
	}
	
	saveRow() {
		this.treatmentArr.unshift(this.newTxCard_Row);
		this.addBtnClicked = false;
	}
	
	getValue(evt, which){
		if(which == 'dr'){
			this.newTxCard_Row.dr = evt;
		} else if(which == 'Appl'){
			this.newTxCard_Row.Appl = evt;
		} else if(which == 'Hyg'){
			this.newTxCard_Row.Hyg = evt;
		} else if(which == 'LW'){
			this.newTxCard_Row.LW = evt;
		} else if(which == 'UW'){
			this.newTxCard_Row.UW = evt;
		}
	}
}


@Component({
  selector: 'image-modal-component',
  templateUrl: './image-modal-component.html',
  styleUrls: ['./image-modal-component.css']
})
export class ImageModal implements OnInit {
  showsection: any;
  closeModal_subscription: Subscription;
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<ImageModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	
	this.showsection = this.data.showsection;
		
	this.closeModal_subscription = this.messageService.getMessage().subscribe(message => {
		
		console.log(message);
		
		if(message.event == 'closemodal' && message.data.event == 'close'){
			this.cancelModal();
		} else if(message.event == 'closemodal' && message.data.event == 'opengallery'){
			this.showsection = 'uploadimage';
		}
		
	})
  }
  
  cancelModal(): void {
    this._matDialogRef.close(null);
  }
}


@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class TodoListDialog implements OnInit {
  private readonly _matDialogRef: MatDialogRef<TodoListDialog>;
  private readonly triggerElementRef: ElementRef;
  
  tolistArr: any[] = [
	{'desc': 'Update Pano', 'date': 'Nov 5.', 'checked': true, 'pastdate': false},
	{'desc': '(MO) Clarissa Marcum needs to sign Hippa release form.', 'date': 'Nov 7', 'checked': false, 'pastdate': true},
	{'desc': 'Send extraction letter to Dr. Smith', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Refer patient to periodontist', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Thank patient for Jackie Mendoza refferal', 'date': 'Nov 7', 'checked': false, 'pastdate': false},
	{'desc': 'Update Pano', 'date': 'April 7, 2019', 'checked': false, 'pastdate': false},
	];
	
	checkedIcon: any[] = [];
	allChecked: boolean = false;
	showAddtodo = false;
	
	@ViewChild('descptn') descptn: ElementRef;
	@ViewChild('dt') dt: ElementRef;
	@ViewChild('todolistscroll') todolistscroll: PerfectScrollbarComponent;
  
  constructor(_matDialogRef: MatDialogRef<TodoListDialog>, @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef}) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
			
	matDialogConfig.position = { left: `${rect.left - (190-14)/2}px`, top: `${(rect.bottom - 23)}px` };
    
    matDialogConfig.width = '190px';
    matDialogConfig.height = '220px';
	
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
	
	this.tolistArr.map(() => {
		this.checkedIcon.push({'checked-icon': true, showcheckicon: false});
	})
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
  
  mouseOver(indx, dir){
	if(dir == 'over'){
		this.checkedIcon[indx]['showcheckicon'] = true;
	} else {
		this.checkedIcon[indx]['showcheckicon'] = false;
	}
  }
  
  checkedTodoItem(indx){
	this.tolistArr[indx].checked = true;
	
	for(let i=0; i<this.tolistArr.length; i++){
		if(this.tolistArr[i].checked == true){
			this.allChecked = true;
		} else {
			this.allChecked = false;
			break;
		}
	}
  }
  
  showAddtodoInput(){
	this.showAddtodo = true;
  }
  
  addTodoItem(evt){
	
	if(this.descptn.nativeElement.value != '' && this.dt.nativeElement.value != '' && evt.which == 13){
		this.tolistArr.push({'desc': this.descptn.nativeElement.value, 'date': this.dt.nativeElement.value, 'checked': false, 'pastdate': false});
		this.checkedIcon.push({'checked-icon': true, showcheckicon: false});
		this.allChecked = false;
		
		this.descptn.nativeElement.value = '';
		this.dt.nativeElement.value = '';
		
		this.descptn.nativeElement.blur();
		this.dt.nativeElement.blur();
		
		setTimeout(() => {
			this.todolistscroll.directiveRef.scrollToBottom(0, 300);
		}, 500);
		
		
	}
	
  }
}
