import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


import { Subscription } from 'rxjs';
import { MessageService } from '../../core/message.service';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-outreachmain',
  templateUrl: './outreachmain.component.html',
  styleUrls: ['./outreachmain.component.css']
})
export class OutreachmainComponent implements OnInit  {
	
	accordHt: any = window.innerHeight-70-4;
	acord_bottom_margin: any; 
	acord_cont_ht: any;
	itemclicked = true;
	expendpatient_Detail= false;
	expendpatient_Detail_height: any =70 ;
	next_appoinment_date="Tues, June 3rd - Obs1";

	showdd:boolean = false;
	dd_id: any;
	
	_ddoptionsArr:any[] = [];
	ddplaceholder: any;
	UWlistArraylength: any;

	accord_label_ht: any = 25;
	zoomWd: any;
	borderWd = 1;
	fontsize = 12;

	Treatment_status: any[] = [
        {"option": "Pending"}, 
        {"option": "Confirm"}
       
        
        ];
	
	panelArr: any[] = [
						{title: 'Treatment', checked: true},
						{title: 'Finances', checked: false}, 
						{title: 'Communication', checked: false},
					  ];
	
	chair_labelArr: any[] = [
	
	{label: '1', patient: 'Sheev Palpatine', dr: 'Dr. Roberts', seated: '07:32', progress: '100', bookingtime: '1 hr', bookingtimeMin: null, excesstime: '+16m', profileimg: 'assets/492730210.png'}, 
	
	{label: '5', patient: "Padme Amidala", dr: null, seated: '8:28', 'progress': 80, bookingtime: null, bookingtimeMin: '45m', excesstime: 0}, 
	
	{label: '3', patient: 'Qui-Gonn Jinn', dr: 'Dr. Tobler', seated: '07:45', progress: '100', bookingtime: null, bookingtimeMin: '45m', excesstime: 0}, 
	
	{label: '4', patient: 'Aayla Secura', dr: 'Dr. Doria', seated: '8:03', progress: '50', bookingtime: '1 hr', bookingtimeMin: null, excesstime: 0}];
	
	patientInChair: any = {id: 3, label: '9', patient: 'Lydia Adams', 'firstname': 'Lydia', 'lastname': 'Adams', 'dob': '06/19/1986', dr: 'Dr. Roberts', seated: '08:28', progress: '40', bookingtime: null, bookingtimeMin: '10m', excesstime: null, 'profileimg': '../assets/492730210.png', 'appntType': 'appl'};
	
	
	patientDetails:any[] = [
		{"id": 1, "firstname": "Adam", "lastname": "Carter", "dob": "07/03/1968", "status": "Start Needed", "visitdate": "01/07/2019", "email": "adamcarter@gmail.com", "phone": "(801) 999-9999", "address": "234 W Main Street Salt Lake City, UT 84109", "is_patient": true, "profileimg": "../assets/profile_4.png", "appntType": "appl"},
		
		{"id": 2, "firstname": "Derrick", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true, "profileimg": "assets/495827904.png", "appntType": "dband"},
		
		{"id": 3, "firstname": "Lydia", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "adams.derrick@netsuite.com", "phone": "(801) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": true, "profileimg": "assets/492730210.png", "appntType": "exam"},
		
		{"id": 4, "firstname": "Samantha", "lastname": "Adams", "dob": "06/19/1986", "status": "Retention", "visitdate": "01/07/2019", "email": "samjones@ucsd.edu", "phone": "(619) 555-8888", "address": "1656 Grand ave Draper, UT 84070", "is_patient": false, "profileimg": "", appntType: ""},
		
		{"id": 5, "firstname": "Greg", "lastname": "Adamson", "dob": "07/03/1972", "status": "Start Needed", "visitdate": "01/07/2019", "email": "gregadamson@yahoo.com", "phone": "(858) 337-8888", "address": "229 W 1060 S Orem, UT 84058", "is_patient": true, "profileimg": "assets/profile_4.png", "appntType": "exam"},
		
		{id: 11, firstname:'Sheev', lastname: 'Palpatine', stratTime: '07:30', endTime: '08:30', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 12, firstname:'Kylo', lastname: 'Ren', stratTime: '08:30', endTime: '09:15', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 13, firstname:'Mace', lastname: 'Windu', stratTime: '09:15', endTime: '09:30', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 14, firstname:'Leia', lastname: 'Organa', stratTime: '09:30', endTime: '09:45', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'}, 
	   {id: 15, firstname:'Mace', lastname: 'Windu', stratTime: '09:45', endTime: '10:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'},
	   {id: 16, firstname:'Luke', lastname: 'Skywalker', stratTime: '10:30', endTime: '11:00', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl'},
	   {id: 17,firstname:'Jabba', lastname: 'The Hutt', stratTime: '11:00', endTime: '11:30', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	  
	   {id: 18, firstname:'Sheev', lastname: 'Palpatine', stratTime: '11:30', endTime: '12:00', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 19,firstname:'Kylo', lastname: 'Ren', stratTime: '12:05', endTime: '13:00', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 20,firstname:'Mace', lastname: 'Windu', stratTime: '13:00', endTime: '13:45', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 21,firstname:'Leia', lastname: 'Organa', stratTime: '13:50', endTime: '14:25', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'}, 
	   {id: 22,firstname:'Mace', lastname: 'Windu', stratTime: '09:45', endTime: '10:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'},
	   {id: 23,firstname:'Luke', lastname: 'Skywalker', stratTime: '15:00', endTime: '15:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl'},
	   {id: 24,firstname:'Jabba', lastname: 'The Hutt', stratTime: '15:45', endTime: '16:20', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 25,firstname:'Sheev', lastname: 'Palpatine', stratTime: '17:00', endTime: '17:20', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 26,firstname:'Kylo', lastname: 'Ren', stratTime: '17:30', endTime: '18:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 27, firstname:'June', lastname: 'Binks', stratTime: '08:00', endTime: '8:15', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
		{id: 28, firstname:'Han', lastname: 'Solo', stratTime: '08:15', endTime: '08:25', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
		{id: 29, firstname:'Max', lastname: '', stratTime: '08:30', endTime: '08:45', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
		{id: 30, firstname:'Pamela', lastname:'', stratTime: '09:00', endTime: '09:10', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
		{id: 31, firstname:'Trevor', lastname:'', stratTime: '09:10', endTime: '09:20', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
		{id: 32, firstname:'Lennor', lastname:'', stratTime: '09:20', endTime: '09:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'adj'},
		{id: 33, firstname:'Bail', lastname: 'Organa', stratTime: '09:30', endTime: '10:30', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
		{id: 34, firstname:'Anakin', lastname: 'Skywalker', stratTime: '10:30', endTime: '10:40', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/495827904.png', appntType: 'record'},
		{id: 35, firstname:'General', lastname: 'Hux', stratTime: '11:00', endTime: '12:00', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start'},
		{id: 36, firstname:'June', lastname: 'Binks', stratTime: '12:00', endTime: '12:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
		{id: 37, firstname:'Han', lastname: 'Solo', stratTime: '12:45', endTime: '13:00', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
		{id: 38, firstname:'Max', lastname: '', stratTime: '13:00', endTime: '13:20', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
		{id: 39, firstname:'Pamela', lastname:'', stratTime: '13:30', endTime: '14:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
		{id: 40, firstname:'Trevor', lastname:'', stratTime: '14:45', endTime: '15:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
		{id: 41, firstname:'Lennor', lastname:'', stratTime: '15:15', endTime: '16:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'adj'},
		{id: 42, firstname:'Bail', lastname: 'Organa', stratTime: '16:00', endTime: '16:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
		{id: 43, firstname:'Anakin', lastname: 'Skywalker', stratTime: '16:45', endTime: '17:15', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/495827904.png', appntType: 'record'},
		{id: 44, firstname:'General', lastname: 'Hux', stratTime: '17:30', endTime: '18:20', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start'},
		{id: 45, firstname:'Chewbacca', lastname:'', stratTime: '07:00', endTime: '08:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 46, firstname:'Aayla', lastname: 'Secura', stratTime: '08:00', endTime: '8:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 47, firstname:'Rey', lastname: '', stratTime: '08:30', endTime: '09:00', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 48, firstname:'Padme', lastname: 'Amidala', stratTime: '09:00', endTime: '09:15', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 49, firstname:'Chewbacca', lastname:'', stratTime: '09:15', endTime: '09:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 50, firstname:'Aayla', lastname: 'Secura', stratTime: '09:30', endTime: '10:15', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 51, firstname:'Rey', lastname: '', stratTime: '10:15', endTime: '10:25', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 52, firstname:'Padme', lastname: 'Amidala', stratTime: '10:25', endTime: '10:35', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 53, firstname:'Chewbacca', lastname:'', stratTime: '10:35', endTime: '11:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 54, firstname:'Aayla', lastname: 'Secura', stratTime: '11:00', endTime: '11:45', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 55, firstname:'Rey', lastname: '', stratTime: '11:45', endTime: '11:55', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 56, firstname:'Chewbacca', lastname:'', stratTime: '12:00', endTime: '12:40', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 57, firstname:'Aayla', lastname: 'Secura', stratTime: '12:40', endTime: '13:35', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 58, firstname:'Rey', lastname: '', stratTime: '13:40', endTime: '14:10', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 59, firstname:'Padme', lastname: 'Amidala', stratTime: '14:25', endTime: '15:00', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 60, firstname:'Chewbacca', lastname:'', stratTime: '15:00', endTime: '15:25', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 61, firstname:'Aayla', lastname: 'Secura', stratTime: '15:30', endTime: '15:55', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 62, firstname:'Rey', lastname: '', stratTime: '16:00', endTime: '16:45', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 63, firstname:'Padme', lastname: 'Amidala', stratTime: '17:00', endTime: '17:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 64, firstname:'Chewbacca', lastname:'', stratTime: '17:30', endTime: '18:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 65, firstname:'Qui-Gon', lastname: 'Jinn', stratTime: '07:00', endTime: '07:15', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 66, firstname:'Obi-Wan', lastname: 'Kenobi', stratTime: '08:00', endTime: '9:00', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 68, firstname:'Jabba', lastname: 'Hutt', stratTime: '09:00', endTime: '09:30', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start'},
	   {id: 69, firstname:'Poe', lastname: 'Dameron', stratTime: '09:30', endTime: '10:00', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'adj'},
	   
	   {id: 70, firstname:'Luke', lastname: 'Skywalker', stratTime: '10:00', endTime: '11:20', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl'},
	   {id: 71, firstname:'Sheev', lastname: 'Palpatine', stratTime: '11:30', endTime: '12:00', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 72, firstname:'Kylo', lastname: 'Ren', stratTime: '12:05', endTime: '13:00', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 73, firstname:'Mace', lastname: 'Windu', stratTime: '13:00', endTime: '13:45', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 74, firstname:'Leia', lastname: 'Organa', stratTime: '13:50', endTime: '14:45', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'}, 
	   {id: 75, firstname:'Mace', lastname: 'Windu', stratTime: '09:45', endTime: '10:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'},
	   {id: 76, firstname:'Luke', lastname: 'Skywalker', stratTime: '15:00', endTime: '15:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl'},
	   {id: 77, firstname:'Jabba', lastname: 'The Hutt', stratTime: '15:45', endTime: '16:45', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 78, firstname:'Sheev', lastname: 'Palpatine', stratTime: '17:00', endTime: '17:20', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
	   {id: 79, firstname:'Kylo', lastname: 'Ren', stratTime: '17:30', endTime: '18:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 80, firstname:'General', lastname: 'Hux', stratTime: '07:50', endTime: '08:00', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband'},
	   {id: 81, firstname:'Poe', lastname: 'Dameron', stratTime: '08:00', endTime: '08:45', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 82, firstname:'Finn', lastname: '',  stratTime: '08:45', endTime: '09:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 83, firstname:'Pamela', lastname:'', stratTime: '9:30', endTime: '11:45', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},

	   {id: 84, firstname:'June', lastname: 'Binks', stratTime: '12:15', endTime: '12:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
	   {id: 85, firstname:'Han', lastname: 'Solo', stratTime: '12:35', endTime: '13:00', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 86, firstname:'Max', lastname: '', stratTime: '13:05', endTime: '13:20', accesscode: '000607', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 87, firstname:'Pamela', lastname:'', stratTime: '13:40', endTime: '14:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 88, firstname:'Trevor', lastname:'', stratTime: '14:50', endTime: '15:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 89, firstname:'Lennor', lastname:'', stratTime: '15:25', endTime: '16:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'adj'},
	   {id: 90, firstname:'Bail', lastname: 'Organa', stratTime: '16:10', endTime: '16:45', accesscode: '000302', payment: true, alergy: true, profileimg: 'assets/images-1.png', appntType: 'dband'},
	   {id: 91, firstname:'Anakin', lastname: 'Skywalker', stratTime: '16:45', endTime: '17:15', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/495827904.png', appntType: 'record'},
	   {id: 92, firstname:'General', lastname: 'Hux', stratTime: '17:45', endTime: '18:20', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'start'},
	   {id: 93, firstname:'Kylo', lastname: 'Ren', stratTime: '08:00', endTime: '08:30', accesscode: '000204', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'adj'},
	   {id: 94, firstname:'Jango', lastname: 'Fett', stratTime: '08:30', endTime: '8:40', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 95, firstname:'BB-8', lastname: '', stratTime: '08:50', endTime: '09:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   
	   {id: 96, firstname:'Aayla', lastname: 'Secura', stratTime: '10:30', endTime: '11:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},  
	   {id: 97, firstname:'Padme', lastname: 'Amidala', stratTime: '14:40', endTime: '15:00', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 98, firstname:'Chewbacca', lastname:'', stratTime: '15:10', endTime: '15:25', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 99, firstname:'Aayla', lastname: 'Secura', stratTime: '15:35', endTime: '15:55', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 100, firstname:'Rey', lastname: '', stratTime: '16:10', endTime: '16:45', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 101, firstname:'Padme', lastname: 'Amidala', stratTime: '17:05', endTime: '17:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 102, firstname:'Chewbacca', lastname:'', stratTime: '17:40', endTime: '18:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 103, firstname:'General', lastname: 'Hux', stratTime: '07:50', endTime: '08:00', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband'},
	   {id: 104, firstname:'Poe', lastname: 'Dameron', stratTime: '08:00', endTime: '08:45', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 105, firstname:'Finn', lastname: '',  stratTime: '08:45', endTime: '09:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   
		
	   {id: 106, firstname:'General', lastname: 'Hux', stratTime: '10:50', endTime: '11:15', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband'},
	   {id: 107, firstname:'Poe', lastname: 'Dameron', stratTime: '14:00', endTime: '15:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 108, firstname:'Finn', lastname: '',  stratTime: '16:00', endTime: '17:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 109, firstname:'Chewbacca', lastname:'', stratTime: '07:00', endTime: '08:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 110, firstname:'Aayla', lastname: 'Secura', stratTime: '08:00', endTime: '8:30', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 111, firstname:'Rey', lastname: '', stratTime: '08:30', endTime: '09:00', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 112, firstname:'Padme', lastname: 'Amidala', stratTime: '09:00', endTime: '09:15', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   
	   {id: 113, firstname:'Chewbacca', lastname:'', stratTime: '09:15', endTime: '09:30', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 114, firstname:'Aayla', lastname: 'Secura', stratTime: '09:30', endTime: '10:15', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 115, firstname:'Rey', lastname: '', stratTime: '10:15', endTime: '10:25', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},
	   {id: 116, firstname:'Padme', lastname: 'Amidala', stratTime: '10:25', endTime: '10:35', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   
	   {id: 117, firstname:'Chewbacca', lastname:'', stratTime: '10:35', endTime: '11:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/495827904.png', appntType: 'adj'},
	   {id: 118, firstname:'Aayla', lastname: 'Secura', stratTime: '11:00', endTime: '11:45', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 119, firstname:'Rey', lastname: '', stratTime: '11:45', endTime: '11:55', accesscode: '000607', payment: true, alergy: false, profileimg: 'assets/images.png', appntType: 'exam'},

	   {id: 120, firstname:'Kylo', lastname: 'Ren', stratTime: '13:00', endTime: '13:35', accesscode: '000204', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'adj'},
	   {id: 121, firstname:'Jango', lastname: 'Fett', stratTime: '14:50', endTime: '15:25', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'},
	   {id: 122, firstname:'BB-8', lastname: '', stratTime: '16:45', endTime: '18:00', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 123, firstname:'Sheev', lastname: 'Palpatine', stratTime: '07:30', endTime: '08:30', accesscode: '000401', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'appl'},
		{id: 124, firstname:'Kylo', lastname: 'Ren', stratTime: '08:30', endTime: '09:15', accesscode: '000302', payment: false, alergy: false, profileimg: 'assets/images.png', appntType: 'dband'},
	   {id: 125, firstname:'Mace', lastname: 'Windu', stratTime: '09:15', endTime: '09:30', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	   {id: 126, firstname:'Leia', lastname: 'Organa', stratTime: '09:30', endTime: '09:45', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'}, 
	   {id: 127, firstname:'Mace', lastname: 'Windu', stratTime: '09:45', endTime: '10:30', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'exam'},
	   {id: 128, firstname:'Luke', lastname: 'Skywalker', stratTime: '10:30', endTime: '11:00', accesscode: '000302', payment: true, alergy: false, profileimg: 'assets/images-1.png', appntType: 'appl'},
	   {id: 129, firstname:'Jabba', lastname: 'The Hutt', stratTime: '11:00', endTime: '11:30', accesscode: '000607', payment: false, alergy: true, profileimg: 'assets/492730210.png', appntType: 'exam'},
	  
	   {id: 130, firstname:'General', lastname: 'Hux', stratTime: '10:50', endTime: '11:15', accesscode: '000204', payment: false, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'dband'},
	   {id: 131, firstname:'Poe', lastname: 'Dameron', stratTime: '14:00', endTime: '15:25', accesscode: '000401', payment: false, alergy: false, profileimg: 'assets/images-1.png', appntType: 'adj'},
	   {id: 133, firstname:'Finn', lastname: '',  stratTime: '16:00', endTime: '17:15', accesscode: '000204', payment: true, alergy: false, profileimg: 'assets/profile_4.png', appntType: 'exam'}
	];
	
	notifictn_listArray: any[] = [
		{'time': '48 s', 'name': 'Adam Swasey', 'purpose': 'Case Presentation'},
		{'time': '3 m', 'name': 'Arrow Smith', 'purpose': 'Case Presentation'},
		{'time': '15 m', 'name': 'Angel Acosta', 'purpose': 'Case Presentation'},
		{'time': '22 m', 'name': 'Braiden Maxwell', 'purpose': 'New Lead'},
		{'time': '48 m', 'name': 'Caroline Jimmel', 'purpose': 'New Lead'},
		{'time': '1 hr', 'name': 'Cindy Douit', 'purpose': 'New Lead'},
		{'time': '2 hr', 'name': 'Dalia Andrade', 'purpose': 'New Lead'},
		{'time': '2 hr', 'name': 'Dover Benson', 'purpose': 'New Lead'},
		{'time': '3 hr', 'name': 'Errick Munic', 'purpose': 'New patient scheduler'},
		{'time': '3 hr', 'name': 'Francis Kerplots', 'purpose': 'New patient scheduler'},
		{'time': '3 hr', 'name': 'Gianna Angelucci', 'purpose': 'New patient scheduler'},
		{'time': '4 hr', 'name': 'Hailey Rose', 'purpose': 'New patient thank you'},
		{'time': '4 hr', 'name': 'Ignacio Juarez', 'purpose': 'New patient thank you'},
		{'time': '3 hr', 'name': 'Francis Kerplots', 'purpose': 'New patient tracker'},
		
		{'time': '3 hr', 'name': 'Gianna Angelucci', 'purpose': 'New patient tracker'},
		{'time': '4 hr', 'name': 'Hailey Rose', 'purpose': 'New patient welcome'},
		{'time': '4 hr', 'name': 'Ignacio Juarez', 'purpose': 'New patient welcome'},
		{'time': '1 d', 'name': 'Jason Keoki', 'purpose': 'New patient welcome'},
		{'time': '1 d', 'name': 'Jimi Isomes', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Kendell Lear', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Lamont Perez', 'purpose': 'Recall'},
		{'time': '1 d', 'name': 'Meri Monsu', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Nick Mims', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Nixon Janis', 'purpose': 'Uncommitted'},
		{'time': '1 d', 'name': 'Pippa Knox', 'purpose': 'Virtual Consult'},
		{'time': '1 d', 'name': 'Stephen Woods', 'purpose': 'Virtual Consult'},
		{'time': '2 d', 'name': 'Tyler Christensen', 'purpose': 'Virtual Consult'},
		{'time': '2 d', 'name': 'Winston Hill', 'purpose': 'Virtual Consult'}
		
	];
	
	patient_info: any = {};
	subscription:Subscription;
	postTreatment:boolean = false;
	activatedRouterParam:Subscription;
	notification_Available:boolean = false;

	fnameerror:boolean=false;
	doberror:boolean=false;
	lasterror:boolean=false;
	phoneerror:boolean=false;
	emailerror:boolean=false;
	
	phonemask: any = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	dobmask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
	
					  
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.itemclicked = false;
		this.accordHt = window.innerHeight-70-4;
		
		let borderWd = 1/window.devicePixelRatio;
		this.zoomWd = this.accord_label_ht/window.devicePixelRatio + 2*borderWd;
		this.fontsize = 12/window.devicePixelRatio;
		
		this.acord_bottom_margin = window.innerHeight - 70 - 4 - (this.zoomWd*this.panelArr.length);
		this.acord_cont_ht = this.acord_bottom_margin;
	}

	public config: PerfectScrollbarConfigInterface = {suppressScrollX: false};

	editImg: boolean= false;
	confirmEditImgVar: boolean= false;
	showImgName: any;
	imgURL: any='';
	files: NgxFileDropEntry[] = [];



	
	constructor(public todoListDialog: MatDialog, private activatedRoute:ActivatedRoute, private messageService: MessageService) { }

	ngOnInit() {
	
		this.accordHt = window.innerHeight-70-4;
		
		
		let borderWd = 1/window.devicePixelRatio;
		this.zoomWd = this.accord_label_ht/window.devicePixelRatio + 2*borderWd;
		this.fontsize = 12/window.devicePixelRatio;
		
		//console.log('zoomwd: ', this.zoomWd, window.devicePixelRatio);
		
		this.acord_bottom_margin = window.innerHeight - 70 - 4 - (this.zoomWd*this.panelArr.length);		
		this.acord_cont_ht = this.acord_bottom_margin;
		
		this.activatedRouterParam = this.activatedRoute.params.subscribe(data => {
			
			let patientid = data.patientid;
			this.postTreatment = data.posttreatment == ('false' || false) ? false : true;
		  
			setTimeout(() => {
				let _pinfo: any = this.patientDetails.filter(item => {
					return item.id == patientid;
				});
				this.patient_info = _pinfo[0];
				
				this.messageService.sendMessage('posttreatment',data.posttreatment);
				if(data.section == 'treatment'){
					this.activePanel(0);
				} else if(data.section == 'finance'){
					this.activePanel(1);
				} else {
					this.activePanel(2);
				}
			});
			
		});

		this.initializeDropdown();

	}
	
	dateMask() {
		const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
		return {mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], keepCharPositions: true, pipe: autoCorrectedDatePipe };
	}


	firstname_chk_fn(firstname)
	{
		this.fnameerror=firstname==''? true: false;
	}

	lastname_chk_fn(lastname)
	{
		this.lasterror=lastname==''? true: false;
	}

	phnumber_chk_fn(phoneno)
	{
		this.phoneerror=phoneno==''? true: false;

		/*if(isNaN(phoneno) && phoneno!='')
		{
			this.phoneerror=true;
		}else if(phoneno!='') {
			this.phoneerror=false;
			console.log(this.phoneerror);
		}*/
	
	}

	email_chk_fn(email)
	{
		var emailchk= this.validateEmail(email);
		if(emailchk)
		{
			this.emailerror=false;
		}else {
			this.emailerror=true;
		}
	}

	dob_chk_fn(dob)
	{
		this.doberror=dob==''? true: false;

		var res = dob.split("/");
		if(res.length==3)
		{
			if(res[0]>31)
			{
				this.doberror= true;
				console.log(this.doberror);
			}else 
			if(res[1]>12)
			{
				this.doberror= true;
				console.log(this.doberror);
			}else 
			if(res[2].length<4 || res[2].length>4)
			{ 
				this.doberror= true;
			}
		}else {
			this.doberror= true;
		}
		
	}

	showddoptions(){
		this.showdd = this.showdd == true ? false : true;
	  }
	  
	  initializeDropdown() {
		this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
		this._ddoptionsArr = JSON.parse(JSON.stringify(this.Treatment_status));
		
		this._ddoptionsArr.map(item => {
			item.selected = false;
		})
		
		this.ddplaceholder = this._ddoptionsArr[0].option;
	  }
	  
	  selectDdOption(indx){
		this._ddoptionsArr.map(item => {
			item.selected = false;
		});
		
		this.ddplaceholder = this._ddoptionsArr[indx].option;
		this._ddoptionsArr[indx].selected = true;
		this.showdd = false;
	  }
	  
	  /*onClickedOutside() {
		this.showdd = false;
	  }*/
	
	/*ngOnDestroy() {
		this.patient_info = null;
		console.log('call ondestory');
		this.activatedRouterParam.unsubscribe();
		console.log('call unsubscribed');
	}*/
	
	activePanel(indx){
	
		this.panelArr.map(item => {
			item.checked = false;
		});
		
		this.panelArr[indx].checked = true;
		this.itemclicked = true;
	}
	
	showPostTreatment(evt) {
		
		if(evt == 'treatment'){
			this.activePanel(0);
		} else if(evt == 'finance'){
			this.activePanel(1);
		} else {
			this.activePanel(2);
		}
		
		this.messageService.sendMessage('openpatienttab', {"patient": this.patient_info, "posttreatment": true, "section": evt});
	}


	expend_patientDetail() {
		if(this.expendpatient_Detail == true) {
			this.expendpatient_Detail = false; 
			this.expendpatient_Detail_height =70;
		} else {
			this.expendpatient_Detail = true; 
			this.expendpatient_Detail_height = 400;

		}
	}


	medicalHistory(patient_info)
	{
		const createAppnt_dialogRef = this.todoListDialog.open(MedicalHistory, {
			panelClass: 'patientModal',
			backdropClass: 'whitebackdrop',
		
			data: {patient_info: patient_info}
		});
	}
	
	notificationAvailable(){
		this.notification_Available = this.notification_Available == true ? false : true;
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	
	createAppntPopup() {
		const createAppnt_dialogRef = this.todoListDialog.open(CreateAppointment, {
			panelClass: 'patientModal',
			backdropClass: 'whitebackdrop',
		  data: {}
		});
	}


	editprofileImage()
	{
		this.editImg= this.editImg==true? false: true;
	}

	confirmEditImg()
	{
		this.confirmEditImgVar= true;
		this.showImgName=this.patient_info.profileimg;
	}
	cancelModal()
	{
		this.confirmEditImgVar= false;
		this.editImg= this.editImg==true? false: true;
	}

    preview(files) {
		if (files.length === 0)
		  return;
	 
		var mimeType = files[0].type;
		var obj1 = {};
		if (mimeType.match(/image\/*/) == null) {
		  return;
		}else {
		  var onlyName= files[0].name.split('.');
		  obj1['name'] = onlyName[0];
  
		  var reader = new FileReader();
	   
		  reader.readAsDataURL(files[0]); 
		  reader.onload = (_event) => { 
			this.imgURL = reader.result; 
			this.showImgName = this.imgURL;
		  }
		  
		}
	 
	  }


	  public dropped(files: NgxFileDropEntry[]) {
		this.files = files;
		  for (const droppedFile of files) {
			
			if (droppedFile.fileEntry.isFile) {
				
			  const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
			  fileEntry.file((file: File) => {
			   var obj = {};
				//console.log(file.type) ;
	
				 var onlyName= droppedFile.relativePath.split('.');
				 obj['name'] = onlyName[0];
	  
				 var reader = new FileReader();
				 reader.readAsDataURL(file); 
				 reader.onload = (_event) => { 
				  this.imgURL = reader.result; 
				
				  obj['img'] = this.imgURL;
				  this.showImgName =this.imgURL;
				}
	
			  });
			 
			} else {
			  // It was a directory (empty directories are added, otherwise only files)
			  const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
			  //console.log(droppedFile.relativePath, fileEntry);
			}
			//count=count+1;
			//console.log(count);
			return;
		  }
		}
	   
		public fileOver(event){
		}
	   
		public fileLeave(event){
		}


	  saveAndCloseModal(){
		this.patient_info.profileimg= this.showImgName;
		this.confirmEditImgVar= false;
		this.editImg= this.editImg==true? false: true;
	  }

}

@Component({
	selector: 'app-medical-history',
	templateUrl: './medical-history/medical-history.component.html',
	styleUrls: ['./medical-history/medical-history.component.css']
  })
  
export class MedicalHistory implements OnInit {
	patient_info: any;
	closeModal_subscription: Subscription;
	
	constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<MedicalHistory>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
	  
	  this.patient_info = this.data.patient_info;
		  
	  this.closeModal_subscription = this.messageService.getMessage().subscribe(message => {
		  if(message.event == 'closemodal'){
			  this.cancelModal();
		  }
		  
	  })
	}

	cancelModal(): void {
	  this._matDialogRef.close(null);
	}
}

@Component({
  selector: 'create-appointment-component',
  templateUrl: './create-appointment-component.html',
  styleUrls: ['./create-appointment-component.css']
})
export class CreateAppointment implements OnInit {
  closeModal_subscription: Subscription;
  constructor(private messageService: MessageService, public _matDialogRef: MatDialogRef<CreateAppointment>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	this.closeModal_subscription = this.messageService.getMessage().subscribe(message => {
		if(message.event == 'closemodal'){
			this.cancel();
		}
		
	})
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
}
  