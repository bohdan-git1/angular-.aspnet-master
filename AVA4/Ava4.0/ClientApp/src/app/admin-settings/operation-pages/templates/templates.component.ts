import { Component, OnInit, HostListener} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  
})
export class TemplatesComponent implements OnInit {
	
	boxHt: any;

	addtemplateArray: any={};
	updatetemplateArray: any={};
	templateboxHt: any;
	selectIndex: any; 
	checkexistTemplate: boolean=false;
	
	selectedTemplateContent: any;
	caretPos: any = 0;
	highlightedText: any;

	templateSubArr: any[] = [
		{"label": "Deband Phase 1 to dentist", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}, 
		{"label": "Deband letter to dentist", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that  [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}, 
		{"label": "Phosflur rinse (Poor OH) - to dentist", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that  [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}, 
		{"label": "Recall visit to dentist", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that  [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}, 
		{"label": "Oral Hygiene Poor to dentist", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that  [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}, 
		{"label": "Extraction Letter", "selected": false, "content": "Dr. [Doctor First Name] [Doctor Last Name]\n[Practice Full Address]\n\nRE: [Patient's First Name] [Patient's Last Name]\n\nDear [Doctor First Name],\n\nWe are pleased to inform you that  [Patient's First Name] has completed orthodontic therapy and all orthodontic appliances have been removed. This treatment has, as originally planned, eliminated much of the pre-existing deformity within the limits of the patient cooperation and normal physiological growth and development of the dentition and skeletal components.\n\nA resonable amount of settlement is to be expected. Therefore, orthodontic retainers have been inserted and we shall keep [Patient's First Name] under observation for a minimum of two years to evaluate the development of the third molars and observe settings changes.\n\nIt is advised that a complete examination including a caries check, prophy and flouride, and PA X-rays be scheduled. Perhaps your office would like to notify [Patient's First Name] and/or parents of an available opportunity. Please be advised that our office has scheduled final records in 6 to 8 weeks from now, at which time a panographic X-ray will be emailed or mailed to you for your records.\n\nShould there be any questions concerning please do not hesitate to call.\n\nSincerely,\n[Doctor Signature]"}];
	
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
	this.initalizeFrame();
	this.selectTemplateSub(0);
  }
  
  initalizeFrame(){
	let topHt:any = 139;
	let bottomHt: any = 110;
	this.boxHt = window.innerHeight - (topHt + bottomHt);
  }
  
  selectTemplateSub(indx){
	this.templateSubArr.map(item => {
		item.selected = false;
	});
	
	this.selectedTemplateContent = '';
	
	this.templateSubArr[indx].selected = true;
	this.updatetemplateArray.selectedSub = this.templateSubArr[indx].label;
	this.selectedTemplateContent = this.templateSubArr[indx].content;
	this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));

	this.selectIndex= indx;
		if(this.templateSubArr.length>=1)
		{
			this.checkexistTemplate=true ;
		}else {
			this.checkexistTemplate=false ;
		}

	}
	
	addTemplate() {
		if(this.addtemplateArray.name){
			this.templateSubArr.push({"label": this.addtemplateArray.name, "selected": false, "content":"Add content here..."});
			this.templateboxHt= this.templateSubArr.length*34;
			if(	this.templateboxHt>= 600)
			{
				this.templateboxHt=600;

			}
			
			this.addtemplateArray.name = '';
		}
	}

	deleteTemplate(index) {
		this.templateSubArr.splice(index, 1);
		if(this.templateSubArr.length>=1)
		{
			this.selectTemplateSub(0);
			this.checkexistTemplate=true ;
			this.templateboxHt= this.templateSubArr.length*34;
		}else {
			this.checkexistTemplate=false ;
			this.templateboxHt=0;
		}
	
	}
	
	updateTemplateField(selectIndex, type) {
		
		if(type=='title' && this.updatetemplateArray.selectedSub!='') {
			this.templateSubArr[selectIndex]["label"]=this.updatetemplateArray.selectedSub;
		}

	}
	
	getTemplateBody(evnt){
		console.log("hello: ", JSON.stringify(evnt.target.value));
	}
	
	
	dropItem(evnt){
		//console.log(evnt);
		this.addtagtoContent(evnt.dropData)
	}
	
	getCaretPos(oField) {
		if (oField.selectionStart || oField.selectionStart == '0') {
		   this.caretPos = oField.selectionStart;
		}
		
		this.selectedTemplateContent = oField.value;
		this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));
	}
	
	applyHighlights(text) {
		return text
			.replace(/\n$/g, '\n\n')
			.replace(/\[{1}[\w\s\'\/]*\]{1}/g, '<mark style="color: transparent; background-color: #4EC8F0;">$&</mark>');
	}
	
	defaultLang:boolean = true;
	
	selectLanguage() {
		this.defaultLang = this.defaultLang == true ? false : true;
	}
	
	clickTag(elem){
		this.addtagtoContent(elem);
	}
	
	addtagtoContent(tagelem){
		let drpdata: any = tagelem;
		let cursorBeforeData: any = this.selectedTemplateContent.substring(0, this.caretPos);
		let cursorAfterData: any = this.selectedTemplateContent.substring(this.caretPos, this.selectedTemplateContent.length);
		
		this.selectedTemplateContent = `${cursorBeforeData} [${drpdata}] ${cursorAfterData}`;
		this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));
	}

}
