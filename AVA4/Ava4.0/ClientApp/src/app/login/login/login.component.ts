import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationExtras, RouterOutlet, ActivationStart, NavigationCancel, NavigationError } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {BrowserModule} from '@angular/platform-browser'
import { MultiLoginService } from 'src/app/multi-login-screen/multi-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	initialroutePath:any = '/main/ava';
	loginform: FormGroup;
	submitted: boolean = false;

  loading: boolean = false;
  defaultUserType:boolean = false;
  autoPlayVar: boolean= false;
  videoUrl: SafeResourceUrl;
  empBeded='uZR3dx3iq5o';

  constructor(private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private userSer:MultiLoginService) {

    this.videoUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.empBeded+"?autoplay=0&mute=1");

	this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {

	this.loginform = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required]
	});


  }

  chengeUserType() {
      if(this.defaultUserType == true) {
      this.defaultUserType = false;
      } else {
      this.defaultUserType = true;
      }
    }

  signin() {
	this.submitted = true;
	if(this.loginform.valid){

    let temp={
      "shortname":this.loginform.controls['username'].value,
      "FirstName":"Jonath",
      "LastName":"Doe",
      "image":"/assets/images.png",
      "break":false
    }
    this.userSer.add(temp);
		this.router.navigate([this.initialroutePath, 'admin']);
	}
  }

  playVideoFn()
  {
      //this.autoPlayVar= true;
     this.autoPlayVar= this.autoPlayVar== false ? true: false;

      this.videoUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.empBeded+"?autoplay=1&mute=1");

  }



}

