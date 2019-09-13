import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

showDropdown:boolean=false;
showDropdownforphone:boolean=false;

showDropdownforcommunication:boolean=false;



communication_entry_boxactive_var: boolean= false;

//communication_entry_boxactive  = 'msg';
communication_entry_boxactive:any;
height_width_set_email='30';
height_width_set_call='30';
height_width_set_msg='26';

width_set='';
setto_emailid='';
setto_emailid_for_msg='';
height_width_set_communication='';

setto_call='';
 
setto_commu='';

patientName:any;
pName:any;
dropdownOption:any;
dropdownforphoneOption: any;

dropdownforcommunicationOption="Sequence templates";

communicationDropdownArr=[
  { "label": "Brush & Floss every night"},
	{"label":"Rubber bands"},
	{"label":"Appliance wear - retainer"},
	{"label":"Appliance wear - LHA"}
	
];

relatives=[
  {firstname:'Clarissa', lastname:'Marcum',phn:'360-555-8888',maildId:'cmMarcus@yahoo.com', relation:'MO'},
  {firstname:'Peter', lastname:'Goslin',phn:'360-606-4385',maildId:' peterg@gmail.com', relation:'FA'},
  {firstname:'Spencer', lastname:'Marcum',phn:'360-888-9999',maildId:'spencer@gmail.com', relation:'SF'}
]


templetesDropdownArr=[
  { "label": "Templates"},
	{"label":"Excuse Slip"},
	{"label":"Appointment"},
	{"label":"Financial"},
	{"label":"Insurance"},
];


phonenoDropdownArr=[
  { "label": "(858) 888-8889"},
];


communications=[
  {type:'audio', audioTime:'03m 58s',msgContent:null, sentBy:'LF', sentOn:'11/11/2018', responses:[]},

  {type:'mail', audioTime:null, msgContent:"Hello Peter, We did reach out to Blue Cross of Washington and they have reviewed and changed the claim. Attached is the new bill. Thanks!", sentBy:'KP', sentOn:'11/09/2018',responses:[]},

  {type:'chat', audioTime:null, msgContent:"Hey Clarissa. Just wanted to reach out and see if Stella was released from the hospital yet and how shes doing now.", sentBy:'LF', sentOn:'10/30/2018',responses:[
    {sentRecvd:'received', msgContent:"Yes, she was thanks for checking up on us.", sentBy:null},
    {sentRecvd:'sent', msgContent:"Good! We’ll be glad to have you back in the office.", sentBy:'LF'},
    {sentRecvd:'received', msgContent:"She is doing alot better! Thank you.", sentBy:null}
  ]},

  {type:'audio', audioTime:'02m 37s', msgContent:null, sentBy:'LF', sentOn:'02/10/2018', responses:[]},

  {type:'chat', audioTime:null, msgContent:"Hey Clarissa. When Grandma brought Stella in today, she accidentally left her new retainer sitting here in the chair! I have grabbed it for you and we will have it when you come to pick it up!", sentBy:'HH', sentOn:'09/30/2018',responses:[
    {sentRecvd:'received', msgContent:'Oh no! I will have grandma run back over in an hour or so. Thanks.', sentBy:null}
  ]},

  {type:'audio', audioTime:'46s', msgContent:null, sentBy:'KP', sentOn:'10/02/2018', responses:[]},
  
  {type:'mail', audioTime:null, msgContent:'Hello Peter, Have you heard back from your insurance carrier yet? Let us know!',sentBy:'avaBot',sentOn:'11/09/2018', responses:[]}
]

  constructor(private ser: MessageService) { }

  ngOnInit() {
    // this.ser.getMessage().subscribe(res=>{
    //   if(res.event==="openpatienttab"){
    //     this.patientName=this.currentPatient(res.data.patient)
    //   }
    // });
    // this.pName=this.patientName;
   this.dropdownOptionselected(0);

   this.dropdownOptionforphoneselected(0);

   this.dropdownOptionselectedforcommunication(0);

  }

  // currentPatient(data){
  //   console.log(data)
  //   let expr=`(PA) ${data.firstname} ${data.lastname}`;
  //   return expr;
  // }
  
  dropDownselect(){
    if(this.showDropdown==true){
	  this.showDropdown=false;
	}else{
	    this.showDropdown=true;
	}
  }

  

  dropDownselectforcommunication(){
    if(this.showDropdownforcommunication==true){
	  this.showDropdownforcommunication=false;
	}else{
	    this.showDropdownforcommunication=true;
	}
  }


  dropdownOptionselectedforcommunication(indx){
    this.dropdownforcommunicationOption=this.communicationDropdownArr[indx].label;

  }

  dropdownOptionselected(indx){
    this.dropdownOption=this.templetesDropdownArr[indx].label;

  }


  dropdownOptionforphoneselected(indx){
    this.dropdownforphoneOption=this.phonenoDropdownArr[indx].label;

  }


  dropDownselectforphone(){
    if(this.showDropdownforphone==true){
	  this.showDropdownforphone=false;
	}else{
	    this.showDropdownforphone=true;
	}
  }


  communication(communication_type)
  {
    this.setto_emailid='';
    this.setto_call= '';
    this.setto_emailid_for_msg='';
    this.communication_entry_boxactive_var=true;

     
      if(communication_type=='email')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_email='26';
      }

      if(communication_type=='call')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_call='26';
      }

      if(communication_type=='msg')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_msg='26';
      }

      if(communication_type=='communication')
      {
        this.communication_entry_boxactive = communication_type;
        this.height_width_set_communication='26';
      }

      

  }


  selectemail(relative)
  {
      this.setto_emailid=relative.maildId;
      this.setto_call= '';
      this.setto_emailid_for_msg='';
      this.setto_commu='';
      
  }

  selectformsg(relative)
  {
      this.setto_emailid_for_msg=relative.phn;
      this.setto_call= '';
      this.setto_emailid='';
      this.setto_commu='';
  }
  selectforcommu(mailId){
    this.setto_commu=mailId;
    //console.log(this.setto_commu)
    this.setto_call= '';
    this.setto_emailid='';
    this.setto_emailid_for_msg='';
  }
  

  send_email(){
    this.setto_emailid='';
  }

  send_msg(){
    this.setto_emailid_for_msg='';
  }

  savenotes(){
    this.setto_call= '';
  }

  sendCommu(){
    this.setto_commu='';
  }


  selectcall(setcall)
  {
    this.setto_call= setcall;
    this.setto_emailid='';
    this.setto_emailid_for_msg='';

  }
}
