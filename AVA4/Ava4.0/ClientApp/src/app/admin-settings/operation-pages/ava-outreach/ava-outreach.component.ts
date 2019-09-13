import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-ava-outreach',
  templateUrl: './ava-outreach.component.html',
  styleUrls: ['./ava-outreach.component.css']
})
export class AvaOutreachComponent implements OnInit, OnDestroy {
	
	boxHt: any;
	active:boolean=true;
	showDropdown=false;
	dropdown_options=["No Show","Pending","Continuing Treatment","Payment Reminders","Recall","Missed Appt","New lead"]
	option_clicked=false;
	option_chosen="Choose Sequence Type";
	show_library=false;
	selectedTemplateContent: any='';
	highlightedText: any;
	highlightedText_sub:any;
	caretPos: any = 0;
	expand_btn=true;
	chat_btn=false;
	notification_btn=false;
	email_btn=false;
	showAll=false;
	show_editor=false;
	openInfo=false;
	subjectContent:any='';
	search_input="+["
	sub=false;
	adult=true;
	showDropPrd=false;
	prd_quant=1;
	period="Day(s)";
	prd_time="12 pm";
	defaultLang=true;
	plc_holderContent:any;
	plc_holderSubject:any;
	plc_interval:any;

	@HostListener('window:resize', ['$event']) onResize(event) {
		this.initalizeFrame();
	}

	prds:any[]=["Hour(s)","Day(s)","Week(s)","Month(s)"]

	for_Adult:any[]=[
		{"patientType":"adult", "data":[
			{"id":"A1","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"notification", "content":"Call [Contact's First Name] [Contact's Last Name] and see why the missed their last appt/set a new one","subject":null, 
			"content_espanol":"Llámalos [Patient's First Name] [Patient's Last Name] para ver por qué se perdieron su última cita y establecieron una nueva."},
			{"id":"A2","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"email", "content":"Hi [Contact's First Name], I noticed that you missed your last appointment on [Last Appt Date] and I wanted to reach out to see if you were ready to schedule another appointment! Click this link to set a date that works for you!", "subject":"Missed appointment","content_espanol":" Hola [Patient's First Name], ¡Noté que no asistió a su última cita en esta fecha y quise comunicarme con usted para ver si estaba listo para programar otra cita! Haga clic en este enlace para establecer una fecha que funcione para usted! "},
			{"id":"A3","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"chat", "content":"Hey [Contact's First Name], We have this link waiting for you to set your next appointment. We will see you soon!","subject":null, "content_espanol":"Hola [Patient's First Name], Tenemos este enlace a la espera de que programe su próxima cita. ¡Te veremos pronto!"},
			{"id":"A4","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"chat", "content":"Call [Contact's First Name] [Contact's Last Name]and see why the missed their last appt/set a new one","subject":null,"content_espanol":"Llámalos [Patient's First Name] [Patient's Last Name] y ver por qué perdieron su última cita / establecer una nueva"}
		]}
	];
	for_Child:any[]=[
		{"patientType":"child", "data":[
			{"id":"C1","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"chat", "content":"Call [Contact's First Name] [Contact's Last Name] and see if they are ready to set a follow up appointment for [Patient's First Name] it has been 3 weeks since last appointment.","subject":null, "content_espanol":"Llámalos [Patient's First Name] [Patient's Last Name] y ver por qué perdieron su última cita / establecer una nueva"},
			{"id":"C2","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"email", "content":"Hi [Responsible party first name], I noticed that you missed your last appointment for [Patient's First Name] on [Last Appt Date] and I wanted to reach out to see if you were ready to schedule another appointment! Click this link to set a date that works for you!", "subject":"Missed appointment","content_espanol":" Hola [Patient's First Name], ¡Noté que no asistió a su última cita en esta fecha y quise comunicarme con usted para ver si estaba listo para programar otra cita! Haga clic en este enlace para establecer una fecha que funcione para usted! "},
			{"id":"C3","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"notification", "content":"Call [Responsible party first name] [Responsible party last name] and see why the missed their last appt/set a new one","subject":null, "content_espanol":"Llámalos [Patient's First Name] [Patient's Last Name] para ver por qué se perdieron su última cita y establecieron una nueva."},
			{"id":"C4","prd_drop":false,"prd":"Day(s)","time":"12 pm","prd_quant":"1","msg_type":"chat", "content":"Hey [Responsible party first name], We have this link waiting for you to set [Patient's First Name] next appointment. We will see you soon!","subject":null,"content_espanol":"Hola [Patient's First Name], Tenemos este enlace a la espera de que programe su próxima cita. ¡Te veremos pronto!"},
		]}
	];
	commentsArr:any[]=[]
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
	this.initalizeFrame();
	this.commentsArr=this.for_Adult;
	this.plc_holderContent="Type content here...";
	this.plc_holderSubject="Type subject here...";
	
  }

  checkPlcHolders(){
	if(this.defaultLang){
		this.plc_holderContent="Type content here..."
		this.plc_holderSubject="Type subject here..."
	}
	else{
		this.plc_holderContent="Escriba contenido aquí ...";
		this.plc_holderSubject="Escriba el asunto aquí ..."
	}
  }




  check_Id(data:any){
	this.commentsArr[0].data.forEach(ele=>{
		if(ele.id!=data.toString()){
			ele.prd_drop=false;
		}
	})
  }

  updatePrdQuant(ind:number,event:any){
	this.commentsArr[0].data[ind].prd_quant=event.target.value.toString();
	console.log(this.commentsArr[0].data[ind].prd_quant);
  }
  updateTime(ind:number,event:any){
	this.commentsArr[0].data[ind].time=event.target.value;
	console.log(this.commentsArr[0].data[ind].time);
  }
  active_Adult(){
	this.commentsArr=this.for_Adult;
  }
  active_Child(){
	  this.commentsArr=this.for_Child;
  }
  
  initalizeFrame(){
	let topHt:any = 210;
	let bottomHt: any = 110;
	
	this.boxHt = window.innerHeight - (topHt + bottomHt);
  }
  
	htghlightColor(state){
		if(state=='active'){
			this.active=true;
		}else{
			this.active=false;
		}
	}


	clickTag(elem){
		this.addtagtoContent(elem);
	}
	addtagtoContent(tagelem){
		let drpdata: any = tagelem;
		let dataContent;
		// if(this.sub===true){
		// 	dataContent=this.subjectContent;
		// }
		// else{
		// 	dataContent=this.selectedTemplateContent;
		// }
		dataContent=this.selectedTemplateContent;
		let cursorBeforeData: any = dataContent.substring(0, this.caretPos);
		let cursorAfterData: any = dataContent.substring(this.caretPos, this.selectedTemplateContent.length);
		
			this.selectedTemplateContent = `${cursorBeforeData} [${drpdata}] ${cursorAfterData}`;
			this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));
		
		
	}

	getCaretPos(oField) {
		if (oField.selectionStart || oField.selectionStart == '0') {
		   this.caretPos = oField.selectionStart;
		}
		// if(this.sub==true){
		// 	this.subjectContent = oField.value;
		// 	this.highlightedText_sub = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.subjectContent));
		// }
		// else{
		// 	this.selectedTemplateContent = oField.value;
		// 	this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));
		// }
		this.selectedTemplateContent = oField.value;
		this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(this.selectedTemplateContent));
		
	}
	applyHighlights(text) {
		return text
			.replace(/\n$/g, '\n\n')
			.replace(/\[{1}[\w\s\'\/]*\]{1}/g, '<mark style="color: transparent; background-color: #4EC8F0;">$&</mark>');
	}
	
	dropItem(evnt){
		//console.log(evnt);
		this.addtagtoContent(evnt.dropData)
	}
	
	getHighlightedtContent(txt){
		let markedtxt: any = this.sanitizer.bypassSecurityTrustHtml(this.applyHighlights(txt));
		return markedtxt;
	}





	chatClick(){
		if(this.chat_btn===true){
			if(this.selectedTemplateContent==''){
				this.chat_btn=true;
				this.showAll=false;
				this.expand_btn=false;
				this.show_editor=true;
			}
			else{
				if(this.adult==true){
					var idA=this.for_Adult.length+1;
					var tempA;
					if(this.defaultLang){
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"chat",
							"content":this.selectedTemplateContent,
							"subject":null,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"chat",
							"content":'Switch to Espanol mode to see comment',
							"subject":null,
							"content_espanol":this.selectedTemplateContent 
						}
					}
					this.for_Adult[0].data.push(tempA);
					this.active_Adult();
					
				}
				else{
					var idC=this.for_Child.length+1;
					var tempC
					if(this.defaultLang){
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"chat",
							"content":this.selectedTemplateContent,
							"subject":null,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"chat",
							"content":'Switch to Espanol mode to see comment',
							"subject":null,
							"content_espanol":this.selectedTemplateContent 
						}
					} 
					this.for_Child[0].data.push(tempC);
					this.active_Child();
				}
				this.selectedTemplateContent=null;
				this.period="Day(s)";
				this.prd_time="12 pm";
				this.prd_quant=1;
				this.chat_btn=false;
				this.showAll=false;
				this.expand_btn=true;
				this.show_editor=false;
				this.subjectContent=null;
				this.highlightedText=null;
			}
			
		}
		else{
			this.chat_btn=true;
			this.showAll=false;
			this.expand_btn=false;
			this.show_editor=true;
		}
	}










	notifyClick(){
		if(this.notification_btn===true){
			if(this.selectedTemplateContent==''){
				this.notification_btn=true;
				this.showAll=false;
				this.expand_btn=false;
				this.show_editor=true;
			}
			else{
				if(this.adult==true){
					var idA=this.for_Adult.length+1;
					var tempA;
					if(this.defaultLang){
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"notification",
							"content":this.selectedTemplateContent,
							"subject":null,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"notification",
							"content":'Switch to Espanol mode to see comment',
							"subject":null,
							"content_espanol":this.selectedTemplateContent 
						}
					}
					this.for_Adult[0].data.push(tempA);
					this.active_Adult();
				}
				else{
					var idC=this.for_Child.length+1;
					var tempC
					if(this.defaultLang){
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"notification",
							"content":this.selectedTemplateContent,
							"subject":null,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"notification",
							"content":'Switch to Espanol mode to see comment',
							"subject":null,
							"content_espanol":this.selectedTemplateContent 
						}
					}

					this.for_Child[0].data.push(tempC);
					this.active_Child();
				}
				this.selectedTemplateContent=null;
				this.period="Day(s)";
				this.prd_time="12 pm";
				this.prd_quant=1;
				this.notification_btn=false;
				this.subjectContent=null;
				this.highlightedText=null;
				this.showAll=false;
				this.expand_btn=true;
				this.show_editor=false;
			}
		}
		else{
			
			this.notification_btn=true;
			this.showAll=false;
			this.expand_btn=false;
			this.show_editor=true;
		}
	}











	emailClick(){
		if(this.email_btn===true){
			if(this.selectedTemplateContent=='' || this.subjectContent==''){
				this.email_btn=true;
				this.showAll=false;
				this.expand_btn=false;
				this.show_editor=true;
			}
			else{
				if(this.adult==true){
					var idA=this.for_Adult.length+1;
					var tempA;
					if(this.defaultLang){
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"email",
							"content":this.selectedTemplateContent,
							"subject":this.subjectContent,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempA={
							"id":"A"+idA.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"email",
							"content":'Switch to Espanol mode to see comment',
							"subject":this.subjectContent,
							"content_espanol":this.selectedTemplateContent 
						}
					}

					this.for_Adult[0].data.push(tempA);
					this.active_Adult();
				}
				else{
					var idC=this.for_Child.length+1;
					var tempC
					if(this.defaultLang){
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"email",
							"content":this.selectedTemplateContent,
							"subject":this.subjectContent,
							"content_espanol":'Cambia al modo inglés para ver el comentario.' 
						}
					}
					else{
						tempC={
							"id":"A"+idC.toString(),
							"prd_drop":false,
							"prd":this.period,
							"time":this.prd_time.toString(),
							"prd_quant":this.prd_quant.toString(),
							"msg_type":"email",
							"content":'Switch to Espanol mode to see comment',
							"subject":this.subjectContent,
							"content_espanol":this.selectedTemplateContent 
						}
					}

					this.for_Child[0].data.push(tempC);
					this.active_Child();
				}
				this.selectedTemplateContent=null;
				this.period="Day(s)";
				this.prd_time="12 pm";
				this.prd_quant=1;
				this.subjectContent=null;
				this.highlightedText=null;
				this.email_btn=false;
				this.showAll=false;
				this.expand_btn=true;
				this.show_editor=false;
			}
		}
		else{
			this.email_btn=true;
			this.showAll=false;
			this.expand_btn=false;
			this.show_editor=true;
		}
	}





	del_commentBox(){
		this.email_btn=false;
		this.chat_btn=false;
		this.notification_btn=false;
		this.expand_btn=true;
		this.showAll=true;
		this.show_editor=false;
		this.subjectContent=null;
		this.selectedTemplateContent=null;
		this.highlightedText=null;
	}





	deleteComment(ind:number){
		if(this.adult==true){
			this.for_Adult[0].data.splice(ind,1);
			// this.active_Adult();
			this.commentsArr=this.for_Adult
		}
		else{
			this.for_Child[0].data.splice(ind,1);
			// this.active_Child();
			this.commentsArr=this.for_Child;
		}
		this.initalizeFrame();
	}

	ngOnDestroy(){
		//clearInterval(this.plc_interval);
	}

}
