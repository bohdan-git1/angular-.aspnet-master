import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiLoginService } from '../multi-login.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-multi-login',
  templateUrl: './multi-login.component.html',
  styleUrls: ['./multi-login.component.css'],
  
})
export class MultiLoginComponent implements OnInit {

  imageUrlArray:any[]=["/assets/slide-img2.jpg","/assets/slide-img3.jpg","/assets/slide-img4.jpg","/assets/slide-img5.jpg"];
  loggedInUsers:any[]=[];
  initialroutePath:any = '/main/ava';
  subscription:Subscription;
  loc:any;
  codeVerify=false;
  userFullName:any;
  displayImg:any;
  userBreak:any;
  inputCode='';
  errDiv=false;
  errMsg='';
  constructor(private router:Router, private userSer:MultiLoginService) { }



  ngOnInit() {
    //this.imageUrlArray=["/assets/slide-img2.jpg","/assets/slide-img3.jpg","/assets/slide-img4.jpg","/assets/slide-img5.jpg"];

    setTimeout(() => {
      this.userSer.initializeUsers();
      
    });
    
    this.subscription=this.userSer.getLoggedInUsers().subscribe(res=>{
      this.loggedInUsers=res;
    });
    this.userSer.selLoc.subscribe(res=>{
      this.loc=res;
    })
    
  }

  backToSchedule(){
    this.router.navigate([this.initialroutePath,{outlets: {scheduleoutlet:['schedule']}}]);
  }

  loginVerify(data){
    console.log(data)
    let fname=data.FirstName[0].toUpperCase()+data.FirstName.split(data.FirstName[0])[1];
    let lname=data.LastName[0].toUpperCase()+data.LastName.split(data.LastName[0])[1];
    this.userFullName=fname+" "+lname;
    this.displayImg=data.image;
    this.userBreak=data.break;
    this.codeVerify=!this.codeVerify
  }

  newUserLogin(){
    this.router.navigate(['/'])
  }

  checkValidation()
  {
    if(this.inputCode.length==0){
      this.errDiv=true;
      this.errMsg="Please provide a code to continue";
    }
    else if(this.inputCode.length!=4){
      this.errDiv=true;
      this.errMsg="Code must be of Four characters only";
    }
    else{
      this.router.navigate([this.initialroutePath,{outlets: {scheduleoutlet:['schedule']}}]);
      setTimeout(()=>{
        this.errDiv=false;
        this.errMsg=null;
        this.userBreak=false;
        this.userFullName=null;
        this.displayImg=null;
        this.codeVerify=false;
      })
      

    }
  }
  
  closeModal(){
  this.codeVerify=false;
  this.errDiv=false;
  this.errMsg=null;
  this.inputCode=null;
  }

}
