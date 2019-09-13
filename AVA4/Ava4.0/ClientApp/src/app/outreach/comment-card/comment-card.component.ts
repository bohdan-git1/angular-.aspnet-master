import { Component, OnInit, Output, EventEmitter, Inject, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {

  @Output() goback = new EventEmitter();
  @Output() passTextareadata = new EventEmitter();
  commentAlertform= {};
  @Input() commentAlert; 



  constructor() {

   
   }

  ngOnInit() {
    this.commentAlertform=this.commentAlert; 
  }

  backtoMain() {
    this.passTextareadata.emit(this.commentAlertform);
    this.goback.emit('back');
  }



}
