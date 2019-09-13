import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class MultiLoginService {

  //loggedInUsers=new EventEmitter<any[]>();
  // loggedInUsers=new Subject<any[]>()
  selLoc=new EventEmitter<any>();
  loc='';
  loggedInUsers=new Subject<any>();
  
  users=[
    {"shortname":"EJ", "FirstName":"Elsa","LastName":"Jones", "image":"/assets/images-1.png","break":false},
    {"shortname":"KJ", "FirstName":"Kera","LastName":"James", "image":"/assets/images.png","break":true},
    {"shortname":"OL", "FirstName":"Ophelia","LastName":"Parcell", "image":"/assets/profile_4.png","break":false},
    {"shortname":"JS", "FirstName":"Jack","LastName":"Smith", "image":"/assets/495827904.png","break":false},
    {"shortname":"MJ", "FirstName":"Michael","LastName":"Jonath", "image":"/assets/images.png","break":false},
    {"shortname":"ML", "FirstName":"Miara","LastName":"Lawrence", "image":"/assets/492730210.png","break":true}
  ]

  constructor() {
   }

  getLoggedInUsers():Observable<any>{
    return this.loggedInUsers.asObservable()
  }
  initializeUsers(){
    //console.log(this.users.length)
    this.loggedInUsers.next(this.users);
    console.log(this.loc);
    this.selLoc.emit(this.loc);
  }

 
  add(data){
    this.users.push(data);
  }

  selectLocation(data){
    this.loc=data;
    console.log(this.loc)
    this.selLoc.emit(this.loc)
  }

  
}
