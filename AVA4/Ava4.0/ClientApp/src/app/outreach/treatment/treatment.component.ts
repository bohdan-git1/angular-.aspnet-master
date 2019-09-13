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
	medicalAlertdata='Allergic to Codiene.  Laytex, is austistic (don’t make direct eye contact). Hippa release has not been signed';
	commentAlertdata='Parents are divorced. Mom (Clarissa) is bringing Stella into the office but all financial information should be sent to Dad (Peter).';
	
	medicalAlertdataLength: any;
	moreMedicalAlertInfo: boolean= false;
	

	diagnosisArr: any [] = [
		{'title': 'Chief Concerns', 'selected': false, 'ddoptions': [
			{'title': 'Concerns', 'suboptn': [
				{'title': 'Crowding', 'time': ''},
				{'title': 'Crookedness', 'time': ''},
				{'title': 'Overbite', 'time': ''},
				{'title': 'Overjet', 'time': ''},
				{'title': 'Teeth Stick Out', 'time': ''},
				{'title': 'TMJ Symptoms', 'time': ''},
				{'title': 'Crossbite', 'time': ''},
				{'title': 'Bite Off', 'time': ''},
				{'title': 'Openbite', 'time': ''},
				{'title': 'Thumb/Finger Habit', 'time': ''},
				{'title': 'Missing Teeth', 'time': ''},
				{'title': 'Extra Teeth', 'time': ''},
				{'title': 'Wear on teeth', 'time': ''},
				{'title': '2nd Opinion', 'time': ''},
				{'title': 'Impacted', 'time': ''},
				{'title': 'Spaces', 'time': ''},
				{'title': 'Clenching & Grinding', 'time': ''},
				{'title': 'Underbite', 'time': ''},
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
				{'title': 'Constricted Upper & Lower Arches', 'time': ''},
				{'title': 'Constricted Upper Arch', 'time': ''},
				{'title': 'Constricted Lower Arch', 'time': ''},
				{'title': 'Anterior 1 tooth', 'time': ''},
				{'title': 'Posterior Right', 'time': ''},
				{'title': 'Posterior Left', 'time': ''},
				{'title': 'Anterior Partial'}
			]},
			{'title': 'Crossbite', 'suboptn': [
				{'title': 'Posterior Bilateral', 'time': ''},
				{'title': 'Posterior R', 'time': ''},
				{'title': 'Posterior L', 'time': ''},
				{'title': 'Anterior Complete', 'time': ''},
				{'title': 'Anterior 1 Tooth', 'time': ''},
				{'title': 'Anterior Partial', 'time': ''},
				{'title': 'Lateral R', 'time': ''},
				{'title': 'Lateral L', 'time': ''},
				{'title': 'Scissors Bilateral', 'time': ''},
				{'title': 'Scissors R', 'time': ''},
				{'title': 'Scissors L'}
			]},
			{'title': 'Crowding', 'suboptn': [
				{'title': 'U&L Mild', 'time': ''},
				{'title': 'U&L Moderate', 'time': ''},
				{'title': 'U&L Severe', 'time': ''},
				{'title': 'U Mild', 'time': ''},
				{'title': 'U Moderate', 'time': ''},
				{'title': 'U Severe', 'time': ''},
				{'title': 'L Mild', 'time': ''},
				{'title': 'L Moderate', 'time': ''},
				{'title': 'L Severe'}
			]},
			{'title': 'Dental Class', 'suboptn': [
				{'title': 'Class I', 'time': ''},
				{'title': 'Class II', 'time': ''},
				{'title': 'Class III', 'time': ''},
				{'title': 'Supra Cl I', 'time': ''},
				{'title': 'Class II right', 'time': ''},
				{'title': 'Class II left', 'time': ''},
				{'title': 'Class III right', 'time': ''},
				{'title': 'End to end cuspid', 'time': ''},
				{'title': 'ETE Molar/Cuspid', 'time': ''},
				{'title': 'Supra Cl I Right', 'time': ''},
				{'title': 'Supra Cl I Left'}
			]},
			{'title': 'Impacted Teeth', 'suboptn': [
				{'title': 'Impacted'}
			]},
			{'title': 'Midlines', 'suboptn': [
				{'title': 'Upper Midline To The Right', 'time': ''},
				{'title': 'Upper Midline To The Left', 'time': ''},
				{'title': 'Lower Midline To The Right', 'time': ''},
				{'title': 'Lower Midline To The Left', 'time': ''},
				{'title': 'Midlines are Okay', 'time': ''},
				{'title': 'Overbite'}
			]},
			{'title': 'Missing Teeth', 'suboptn': [
				{'title': 'Missing Permanent', 'time': ''},
			]},
			{'title': 'Openbite', 'suboptn': [
				{'title': 'Anterior', 'time': ''},
				{'title': 'Posterior R', 'time': ''},
				{'title': 'Posterior L', 'time': ''},
				{'title': 'Posterior Bilateral', 'time': ''},
				{'title': 'Lateral R', 'time': ''},
				{'title': 'Lateral L'}
			]},
			{'title': 'Overjet', 'suboptn': [
				{'title': 'Mild', 'time': ''},
				{'title': 'Moderate', 'time': ''},
				{'title': 'Severe', 'time': ''},
				{'title': 'ETE', 'time': ''},
				{'title': 'ETE w/ shift', 'time': ''},
				{'title': 'Minimal', 'time': ''},
				{'title': 'Dental Protrusion'}
			]},
			{'title': 'Rotations', 'suboptn': [
				{'title': 'U&L Mild', 'time': ''},
				{'title': 'U&L Moderate', 'time': ''},
				{'title': 'U&L Severe', 'time': ''},
				{'title': 'U Mild', 'time': ''},
				{'title': 'U Moderate', 'time': ''},
				{'title': 'U Severe', 'time': ''},
				{'title': 'L Mild', 'time': ''},
				{'title': 'L Moderate', 'time': ''},
				{'title': 'L Severe'}
			]},
			{'title': 'Wear on teeth', 'suboptn': [
				{'title': 'Slight & Localized', 'time': ''},
				{'title': 'Moderate & Localized', 'time': ''},
				{'title': 'Severe & Localized', 'time': ''},
				{'title': 'Slight & Generalized', 'time': ''},
				{'title': 'Moderate & Generalized', 'time': ''},
				{'title': 'Severe & Generalized'}
			]},
			{'title': 'Small U Laterals', 'suboptn': [
				{'title': 'U Right & Left', 'time': ''},
				{'title': 'U Right', 'time': ''},
				{'title': 'U Left', 'time': ''},
				{'title': 'Bond Peg Laterals', 'time': ''},
				{'title': 'Small Maxillary Incisors', 'time': ''},
				{'title': 'Small sized Mandibular Incisors', 'time': ''},
				{'title': 'Post Tx Resto'}
			]},
			{'title': 'Spacing', 'suboptn': [
				{'title': 'U&L Mild', 'time': ''},
				{'title': 'U&L Moderate', 'time': ''},
				{'title': 'U&L Severe', 'time': ''},
				{'title': 'U Mild', 'time': ''},
				{'title': 'U Moderate', 'time': ''},
				{'title': 'U Severe', 'time': ''},
				{'title': 'L Mild', 'time': ''},
				{'title': 'L Moderate', 'time': ''},
				{'title': 'L Severe', 'time': ''},
				{'title': 'Diastema', 'time': ''},
				{'title': 'Diastema with Freunum Involvement'}
			]},
		]},
		{'title': 'Perio', 'selected': false,  'ddoptions': [
			{'title': 'Amount of Gum Showing', 'suboptn': [
				{'title': 'Deficient', 'time': ''},
				{'title': 'Excessive', 'time': ''},
				{'title': 'Moderate'}
			]},
			{'title': 'Gingiva', 'suboptn': [
				{'title': 'Recession - #’s', 'time': ''},
				{'title': 'Inflamed', 'time': ''},
				{'title': 'Swollen', 'time': ''},
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
				{'title': 'Clenching', 'time': ''},
				{'title': 'No Clenching'}
			]},
			{'title': 'Grinding', 'suboptn': [
				{'title': 'Night Time Grinding', 'time': ''},
				{'title': 'No Grinding'}
			]},
			{'title': 'Habits', 'suboptn': [
				{'title': 'Thumb', 'time': ''},
				{'title': 'Finger', 'time': ''},
				{'title': 'Tongue Thrust Swallow', 'time': ''},
				{'title': 'Poor Tongue Posture', 'time': ''},
			]},
			{'title': 'Supernumerary Teeth', 'suboptn': [
				{'title': 'Supernumerary', 'time': ''}
			]},
		]},
	];
	
	doctordetailsArr: any [] = [
		{'id': 1, 'title': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jim Holmes', 'designation':'OS', 'selected': true},
				{'doctorname': 'Dr. Jane Nolan', 'designation':'Pedo', 'selected': true},
				{'doctorname': 'Dr. Brett Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Eric Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Nathan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Stone', 'designation':'Admin', 'selected': false},
		]},
	
		{'id': 2, 'title': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Canyon Jenny Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Canyon Tyson Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Canyon Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Eric Canyon Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Canyon Nathan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Canyon Stone', 'designation':'Admin', 'selected': false},
		]},
		
		{'id': 3, 'title': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Creek Jenny Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Creek Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Creek Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Eric Tobler Creek', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Creek Nathan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Creek Stone', 'designation':'Admin', 'selected': false},
		]},
		
		{'id': 4, 'title': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Ston Jenny Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Ston Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Ston Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Ston Eric Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Nathan Ston Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Ston Stone', 'designation':'Admin', 'selected': false},
		]},
		
		{'id': 5, 'title': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Orem Jenny Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Orem Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Orem Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Orem Eric Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Nathan Orem Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Orem Stone', 'designation':'Admin', 'selected': false},
		]},
		
		{'id': 6, 'title': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jordan Jenny Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Jordan Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Jordan Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Jordan Eric Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Nathan Jordan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Jordan Kate Stone', 'designation':'Admin', 'selected': false},
		]},
	
		{'id': 7, 'title': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Care Mcmurtrey', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Care Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Brett Care Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Care Eric Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Care Nathan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Stone Care', 'designation':'Admin', 'selected': false},
		]},
		
		{'id': 8, 'title': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Mcmurtrey Moab', 'designation':'DDS', 'selected': false},
				{'doctorname': 'Dr. Tyson Moab Perrero', 'designation':'Ortho', 'selected': false},
				{'doctorname': 'Dr. Moab Brett Tobler', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Eric Tobler Moab', 'designation':'DDS', 'selected': false},
		  {'doctorname': 'Dr. Moab Nathan Tobler', 'designation':'Ortho', 'selected': false},
		  {'doctorname': 'Kate Stone Moab', 'designation':'Admin', 'selected': false},
		]},
			
	  ];


	  doctorFilterArray=[
			{'id': 12, 'doctorname': 'Addison, Mary', 'designation': 'Ortho', 'selected': false, 'accept': false,
			'clinicnames': [ 
				{ 'clinicname': 'Sunshine Dentistry', 'selected': false, 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'},
								
				{ 'clinicname': 'Riverside Dental Care', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
			]
			},

			{'id': 13, 'doctorname': 'Adomson, Larry',  'designation': 'DDS', 'selected': false,  'accept': false,
			'clinicnames': [ 
				{ 'clinicname': 'Sunshine Larry Dentistry', 'selected': false, 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'},
								
				{ 'clinicname': 'Riverside Larry Dental Care', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
			]
			},

			{'id': 14, 'doctorname': 'Bentley, George', 'location': 'Lehi, UT',  'designation': 'Admin', 'selected': false,  'accept': false,
			'clinicnames': [ 
			{ 'clinicname': 'Sunshine George Dentistry', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'},
			]
			},

			{'id': 15, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,
			'clinicnames': [ 
			{ 'clinicname': 'Sunshine John Dentistry', 'selected': false, 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'},
							
			{ 'clinicname': 'Riverside John Dental Care', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
			]
			},

			{'id': 16, 'doctorname': 'Thompson, Harry', 'location': 'Moab, UT' , 'designation': 'Ortho', 'selected': false , 'accept': false,
			'clinicnames': [ 
			{ 'clinicname': 'Sunshine Dental Dentistry', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'},
							
			{ 'clinicname': 'Riverside  Dental Care', 'selected': false, 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
			]
			},
	  ];


	  doctorFilterArrayForOut=[
		{'id': 17, 'doctorname': 'Addison, Mary', 'location': 'Spanish Fork, UT', 'designation': 'Ortho', 'selected': false, 'accept': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
			{ 'clinicname': 'Sunshine Dentistry', 'city': 'Spanish Forke', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
							
			{ 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 18, 'doctorname': 'Adomson, Larry', 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
			{ 'clinicname': 'Sunshine Larry Dentistry', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
							
			{ 'clinicname': 'Riverside Larry Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 19, 'doctorname': 'Bentley, George', 'designation': 'Admin', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine George Dentistry', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside George Dental Care', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 20, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside John Dental Care', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 21, 'doctorname': 'Thompson, Harry', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine Dental Dentistry', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},
  ];


	
	

	  doctordetailsArrForOut: any [] = [
		{'id': 1, 'title': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jim Holmes', 'designation':'OS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Jane Nolan', 'designation':'Pedo', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
	
		{'id': 2, 'title': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Canyon Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Canyon Tyson Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Canyon Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Canyon Tobler', 'designation':'DDS', 'selected': true, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Canyon Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Canyon Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 3, 'title': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Creek Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Creek Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Creek Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler Creek', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Creek Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Creek Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 4, 'title': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Ston Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Ston Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Ston Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Ston Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Ston Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Ston Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 5, 'title': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Orem Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Orem Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Orem Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Orem Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Orem Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Orem Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 6, 'title': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jordan Jenny Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Jordan Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Jordan Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Jordan Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Nathan Jordan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Jordan Kate Stone', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
	
		{'id': 7, 'title': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Care Mcmurtrey', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Care Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Brett Care Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Care Eric Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Care Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone Care', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
		
		{'id': 8, 'title': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
				{'doctorname': 'Dr. Jenny Mcmurtrey Moab', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Tyson Moab Perrero', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
				{'doctorname': 'Dr. Moab Brett Tobler', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Eric Tobler Moab', 'designation':'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Dr. Moab Nathan Tobler', 'designation':'Ortho', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		  {'doctorname': 'Kate Stone Moab', 'designation':'Admin', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com'},
		]},
			
	  ];
	
	lastlistArr: any[] = [{name: 'Obi- Wan Kenobi'}, {name: 'Sheeve Palpatine'}, {name: 'Jar Jar Binks'}, {name: 'Darth Maul'}, {name: 'Qui - Gonn Jinn'}, {name: 'Padme Amidala'}, {name: 'Sio Bibble'}, {name: 'Poe Dameron'}, {name: 'Aayla Secura'}, {name: 'Jessika Pava'}];
	
	windowHt: any;
	zoomviewport: any = 100;
	
	windowContHt: any;
	tableHt: any;
	
	treatmentArr: any[] = [
		{"date": "07/30/19 09:43", "UW": "019x025N", "LW": "", "Hyg": "5", "Appl": "", "St": "JP", "dr": "Thom", "notes": "Trimmed U de's - gave pt wax to help cheek heal", "next_notes": "Eval Only", "Proc": "Eval", "U": "", "Wks": "6 wks", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "11/14/18 16:22", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "Cont. U clear ret. FT", "next_notes": "6 mo Ret Ck Dec 2018", "Proc": "Ret", "U": "", "Wks": "", "elastic" : true, "delete_icon": false, "deleted": false},
		
		{"date": "08/14/18 07:55", "UW": "019x025N", "LW": "018nit", "Hyg": "3", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "CUW Chain UR6-UL2 L 7-7 Reshape U 1's Start gor tri’s off 3's", "next_notes": "", "Proc": "Keep", "U": "", "Wks": "3 mo", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "06/30/18 09:43", "UW": "", "LW": "", "Hyg": "3", "Appl": "", "St": "KK", "dr": "Thom", "notes": "Retie chk 7's", "next_notes": "Retie", "Proc": "Ret", "U": "", "Wks": "5 wk", "elastic" : true, "delete_icon": false, "deleted": false},
		
		{"date": "03/02/18 09:22", "UW": "019x025N", "LW": "018nit", "Hyg": "2", "Appl": "Cont", "St": "LF", "dr": "Thom", "notes": "L18x25NITI", "next_notes": "U/18X25NITI", "Proc": "", "U": "", "Wks": "", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "12/28/17 07:32", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "", "St": "MR", "dr": "Rem", "notes": "Z Bend U 1's Ck Sp Closure", "next_notes": "Ck DB", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "12/28/17 07:32", "UW": "", "LW": "018nit", "Hyg": "3", "Appl": "", "St": "MR", "dr": "Rem", "notes": "Z Bend U 1's Ck Sp Closure", "next_notes": "Ck DB", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "09/12/17 09:40", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "JP", "dr": "Rem", "notes": "PT in for emerg LR5 off, replaced bracket", "next_notes": "Keep NV", "Proc": "Eval", "U": "", "Wks": "3 mo", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "07/28/17 15:45", "UW": "", "LW": "018nit", "Hyg": "1", "Appl": "Cont", "St": "MR", "dr": "Thom", "notes": "Retie LR3 in box", "next_notes": "A-CH", "Proc": "Ret", "U": "", "Wks": "6 wk", "elastic" : true, "delete_icon": false, "deleted": false},
		
		{"date": "06/29/17 07:55", "UW": "019x025N", "LW": "018nit", "Hyg": "3", "Appl": "", "St": "KK", "dr": "Rem", "notes": "Ret3", "next_notes": "Ret4", "Proc": "Eval", "U": "", "Wks": "1 mo", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "10/14/16 14:52", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "KK", "dr": "Thom", "notes": "Cut L/AW Distal to 6's TQ U/Post", "next_notes": "956-DB full 3-3, Imp Pano/Ceph", "Proc": "", "U": "", "Wks": "", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "04/20/16 07:50", "UW": "", "LW": "018nit", "Hyg": "5", "Appl": "", "St": "LF", "dr": "Thom", "notes": "CUW Chain UR6-UL2 L 7-7", "next_notes": "", "Proc": "Keep", "U": "", "Wks": "6 mo", "elastic" : false, "delete_icon": false, "deleted": false},
		
		{"date": "03/25/16 07:55", "UW": "", "LW": "", "Hyg": "4", "Appl": "", "St": "KK", "dr": "Rem", "notes": "Mesial out lower left 2. Chain U & L 6-6", "next_notes": "NV check lower left 2 & Verticas", "Proc": "Eval", "U": "", "Wks": "1 mo", "elastic" : true, "delete_icon": false, "deleted": false},
		
		{"date": "10/14/16 14:52", "UW": "", "LW": "018nit", "Hyg": "4", "Appl": "Cont", "St": "KK", "dr": "Thom", "notes": "Ret2", "next_notes": "Ret3", "Proc": "Eval", "U": "", "Wks": "", "elastic" : false, "delete_icon": false, "deleted": false},
	
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
	
	newTxCard_Row: any = {"date": "", "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true, 'deleted': false,  "multiple_application": [], "multiple_application_status": false, "show_applicant": false};
	
	txCardUW_option: any = [{"label": "012 SS"}, {"label": "014 NT"}, {"label": "014 SS"}, {"label": "016 N"}, {"label": "016 SS"}, {"label": "018 N"}, {"label": "018 SS"}, {"label": "16x22 NT"}, {"label": "16x22 SS"}, {"label": "17x25 SS"}, {"label": "17x25TMA"}, {"label": "18"}, {"label": "18x25 N"}, {"label": "18x25 SS"}, {"label": "19x25 SS"}, {"label": "19x25TMA"}, {"label": "21x25 SS"}, {"label": "21x25Brd"}, {"label": "NONE"}, {"label": "U18/24SS"}];
	
	txCardLW_option: any = [{"label": "012 SS"}, {"label": "014 NT"}, {"label": "014 SS"}, {"label": "016 N"}, {"label": "016 SS"}, {"label": "018 N"}, {"label": "018 SS"}, {"label": "16x22 NT"}, {"label": "16x22 SS"}, {"label": "17x25 SS"}, {"label": "17x25TMA"}, {"label": "18"}, {"label": "18x25 N"}, {"label": "18x25 SS"}, {"label": "19x25 SS"}, {"label": "19x25TMA"}, {"label": "21x25 SS"}, {"label": "21x25Brd"}, {"label": "NONE"}, {"label": "U18/24SS"}];
	
	txCardHg_option: any = [{"label": 5}, {"label": 4}, {"label": 3}, {"label": 2}, {"label": 1}];
	
	txCardAppl_option: any = [{"label": "Amer"}, {"label": "B.P."}, {"label": "Band RPE"}, {"label": "Bond RPE"}, {"label": "FcBow HG"}, {"label": "FORCES"}, {"label": "GAC"}, {"label": "Haw/pont"}, {"label": "Hawley"}, {"label": "Hyrax"}, {"label": "J HookHG"}, {"label": "L Hawley"}, {"label": "L Schwtz"}, {"label": "L SpAlgn"}, {"label": "Ling 3-3"}, {"label": "Pont 1/2"}, {"label": "Rev. HG"}, {"label": "TPB"}, {"label": "U Hawley"}, {"label": "L Schwtz"}, {"label": "L SpAlgn"}, {"label": "U/LFeaGa"}, {"label": "UNITEK"}];
	
	txCardDr_option: any = [{"label": "Dr. Thom"}, {"label": "Dr. Tobl"}, {"label": "Dr. Jones"}, {"label": "Dr. Jones"}, {"label": "Dr. Poll"}];
	
	refInArray : any[] = [{patientname: 'John Smith', 'date': '06/12/19', 'thanks': true}, {patientname: 'Paula Jones', 'date': '07/12/19',  'thanks': false}];
	
	refOutArray : any[] = this.refInArray;
	
	docReffInArr: any[] = [
		{'id': 20, 'doctorname': 'Smith, John', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
		},
		
		{'id': 21, 'doctorname': 'Thompson, Harry', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'location': {'clinicname': 'Riverside  Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
		}
	];
	
	curentDentist: any = {'id': 1, 'doctorname': 'Dr. Tyson Moab Perrero', 'designation': 'Ortho', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'date': '06/12/19', 'location': {'clinicname': 'Sunshine John Dentistry', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242'}
	};

	moreProfessionalval: boolean= false;
	doctordetailsSelectArrlen: any=0;
	countFilterLocationAndDoc: any =0;
	refInArraySelectArrlen: any=0;
	refInThxArraySelectArrlen: any=0;
	morePatientReferralval: boolean= false;
	morePatientReferralThx: boolean= false;
	heightFormedicalAlert: any;
	mgBottomFormedicalAlert: any;


	relnData:any[] = [
		{'relationtype': 'MO - Mother', 
		'fname': 'Clarissa Marcum', 
		'mname': 'Clarissa Marcum', 
		'lname': 'Clarissa Marcum', 
		'preferredName': 'Clarissa Marcum',
		'email': 'marcumclarissa@gmail.com', 
		'phone':'(555) 555-1363', 
		'streetAdd': 'Kirkland & Ellis law',
		'city': 'krrtr',
		 'state': 'wfg',
		 'zip': '65076',
		 'dateOfBirth': '09/56/1970',
		 'ssn': '9065',
		 'workPhone': '6558957',
		'employer': 'Kirkland & Ellis law', 
		'insurance': 'Aetna',
		'empid': 'er8',
		 'group': '787-54-3323', 
 		 'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		

		  {'relationtype': 'FA - Father', 
		  'fname': 'Peter K. Goslin', 
		  'mname': 'Peter K. Goslin', 
		  'lname': 'Peter K. Goslin', 
		  'preferredName': 'Clarissa Marcum',
		  'email': 'tymarcumclarissa@gmail.com', 
		  'phone':'(555) 555-1363', 
		  'streetAdd': 'Kirkland & Ellis law',
		  'city': 'krrtr',
		   'state': 'wfg',
		   'zip': '65076',
		   'dateOfBirth': '09/56/1970',
		   'ssn': '9065',
		   'workPhone': '6558957',
		  'employer': 'Kirkland & Ellis law', 
		  'insurance': 'Aetna',
		  'empid': 'er8',
		   'group': '787-54-3323', 
			'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		
			{'relationtype': 'SP - Spouse', 
			'fname': 'Spencer Marcum', 
			'mname': 'Spencer Marcum', 
			'lname': 'Spencer Marcum', 
			'preferredName': 'Clarissa Marcum',
			'email': 'ewyiuhmarcumclarissa@gmail.com', 
			'phone':'(555) 555-1363', 
			'streetAdd': 'Kirkland & Ellis law',
			'city': 'krrtr',
			 'state': 'wfg',
			 'zip': '65076',
			 'dateOfBirth': '09/56/1970',
			 'ssn': '9065',
			 'workPhone': '6558957',
			'employer': 'Kirkland & Ellis law', 
			'insurance': 'Aetna',
			'empid': 'er8',
			 'group': '787-54-3323', 
			  'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},

	];
	
	prefessionalReffArr: any = [
	{'id': 18, 'doctorname': 'Adomson, Larry', 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [
			{ 'clinicname': 'Sunshine Larry Dentistry', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
							
			{ 'clinicname': 'Riverside Larry Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 19, 'doctorname': 'Bentley, George', 'designation': 'Admin', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com',
		'clinicnames': [ 
		{ 'clinicname': 'Sunshine George Dentistry', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false},
						
		{ 'clinicname': 'Riverside George Dental Care', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'phone': '360-892-4242', 'selected': false}
		]
		}];

		openNoteVal: boolean= false;
		openNextNoteVal: boolean= false;

		poc_option: any = [{"label": "Poc1"}, {"label": "Poc2"}, {"label": "Poc3"}, {"label": "Poc4"}, {"label": "Poc5"}];
		u_option: any = [{"label": "Eval"}, {"label": "Ret"}, {"label": "Keep"}];
		wks_option: any = [{"label": "6 wks"}, {"label": "3 mo"}, {"label": "5 wk"}];

		futureAppointmentDate= "07/30/19 09:43 AM";
		futureAppointmentVal: boolean= false;
		
		errorMessage: any;
		errorVal: boolean= false;
		multipleSearchAppointmentBar: boolean= false;
		searchBoxHg1St: any;
		searchBoxHg2Nd: any;
		searchBoxHg3Nd: any;
		remainingBoxHg: any;
		filterProcedureCode: any[];

		procedurecodeLibrary: any = 
		[
			{"code": "101", "name": "Initial - Child", "time" : "2", "timespan": "days", 'selected': false},
			{"code": "102", "name": "Initial - Adult", "time" : "1", "timespan": "days", 'selected': false},
			{"code": "103", "name": "Initial - Transfer In", "time" : "6", "timespan": "weeks", 'selected': false}, 
			{"code": "104", "name": "Initial - Transfer Retent", "time" : "3", "timespan": "months", 'selected': false}, 
			{"code": "105", "name": "Initial - Second Opinion", "time" : "1", "timespan": "day", 'selected': false}, 
			{"code": "106", "name": "Recall", "time" : "1", "timespan": "month", 'selected': false}
		];

		addToProcedureName: any;
		addToProcedureCode: any;
		addToProcedureTime: any;
		addToProcedureUnit: any="day";
		showUnitVar: boolean= false;
		@ViewChild('listboxscroll') listboxscroll: PerfectScrollbarComponent;
		@ViewChild('listboxscroll1') listboxscroll1: PerfectScrollbarComponent;
		//multiple_application: any={};
		showSelectedMultipleAppointmentVar: boolean= false;

  constructor(public todoListDialog: MatDialog, private messageService: MessageService) { }

  ngOnInit() {

	
	this.medicalAlertdataLength= this.medicalAlertdata.length;
	
	 this.doctordetailsArr.filter(item => {
		 item.doctoroptions.filter( items =>{
			if (items.selected===true)
			{
	 			this.doctordetailsSelectArrlen++;
				
			}
		})
	});

	this.refInArraySelectArrlen= this.refInArray.length;
	this.refInArray.filter( items =>{
		   if (items.thanks===false)
		   {
				this.refInThxArraySelectArrlen++;
			   
		   }
	   });
   
	this.heightFormedicalAlert=25;
	this.mgBottomFormedicalAlert=0;

	this.messageService.getMessage().subscribe(message => {
		if(message.event == 'savedoctorFilterforCls'){
		  
		   
			this.doctorFilterArray= message.data;
			var countFilterLocationAndDoc1=0;

			this.doctorFilterArray.map(function(element,key) {
			  var count=0;
			  
			  element.clinicnames.map(function(element1, key1){
				if(element1.selected==true)
				{
				  count=1;
				}
			  });  
			  if(count==1)
			  {
				element.accept=true;
				countFilterLocationAndDoc1++
				
			  }else {
				element.accept=false;
			  }
			 });
			
			 message.event='';
			 this.countFilterLocationAndDoc= countFilterLocationAndDoc1;
			 console.log(this.countFilterLocationAndDoc);
			
		   }
		  
		   
		});
		
		console.log(this.countFilterLocationAndDoc);
	
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
	
	this.tableHt = this.windowContHt - 100;
	
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


	moreProfessionalReferral()
	{
		this.moreProfessionalval= this.moreProfessionalval==false? true: false;

	}

	morePatientReferral()
	{
		this.morePatientReferralval= this.morePatientReferralval==false? true: false;

	}

	morePatientReferralThxF()
	{
		this.morePatientReferralThx= this.morePatientReferralThx==false? true: false;

	}
	moreMedicalAlert()
	{
		this.moreMedicalAlertInfo= this.moreMedicalAlertInfo==false? true: false;
		if(this.moreMedicalAlertInfo)
		{
			this.heightFormedicalAlert=60;
			this.mgBottomFormedicalAlert=10;
		}else {
			this.heightFormedicalAlert=25;
			this.mgBottomFormedicalAlert=0;
		}
		
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

	currentRelationData(evt)
	{
		this.relnData=evt;
	}

	doctordetailsSelectArrlenFun(evt)
	{
		this.doctordetailsSelectArrlen=evt;
	}

	
	passTextareaData(evt)
	{
		this.medicalAlertdata=evt;
		this.medicalAlertdataLength= this.medicalAlertdata.length;

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

	refInArrayEmit(evt)
	{
		var refInThxArraySelectArrlen1 =0;
		this.refInArray=evt;
		this.refInArraySelectArrlen= this.refInArray.length;
		this.refInArray.filter( items =>{
			if (items.thanks===false)
			{
				refInThxArraySelectArrlen1++;
				this.refInThxArraySelectArrlen= refInThxArraySelectArrlen1;
			}
			
		});
	//console.log(this.refInThxArraySelectArrlen);
 
	}
	
	flipSlide(type){
		this.rotateOnY -= 180;
		this.showrotetedList=true;
		this.rotetedType=type;
	}
	
	diagnosticRot(savemode) {
		
		if(savemode){
			this.messageService.sendMessage('updatedata', true);
		}
		
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
		this.newTxCard_Row = {"date": dt, "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true , 'deleted': false, "multiple_application": [], "multiple_application_status": false, "show_applicant": false};
		//this.newTxCard_Row = {"date": "", "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true, "multiple_application": [{}]};

		
		/*let dt:any = new Date();
		
		let newRow: any = {"date": dt, "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : false};
		
		this.treatmentArr.unshift(newRow);*/	
				
		var today = new Date();
		var dd = today.getDate();

		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();	
		
		
		var time= this.formatAMPM(new Date);
		var todayDate = mm+'/'+dd+'/'+yyyy+' '+time;

		

		if(Date.parse(todayDate) < Date.parse(this.futureAppointmentDate)){
			this.futureAppointmentVal= true;
		 }else{
			this.futureAppointmentVal= false;
		 }
		 //alert(todayDate);
		 //alert(this.futureAppointmentDate)
	}


	 formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	  }
	  
	

	  glodBackGroundOff1()
	  {
		 
		this.openNoteVal= false;
		this.newTxCard_Row.notes= this.newTxCard_Row.notes;
	  }

	  glodBackGroundOff2()
	  {
		this.openNextNoteVal= false;
		this.newTxCard_Row.next_notes= this.newTxCard_Row.next_notes;
	  }
	
	saveRow() {
	
		if (this.newTxCard_Row.UW!='' &&
		this.newTxCard_Row.LW !='' &&
		this.newTxCard_Row.Hyg !='' &&
		this.newTxCard_Row.dr !='' &&
		this.newTxCard_Row.Proc!='' &&
		this.newTxCard_Row.U!='' &&
		this.newTxCard_Row.Wks!='')
		{
			
			var appointmentDateAfter = new Date(this.newTxCard_Row.date);
			var dd = appointmentDateAfter.getDate();
			var mm = appointmentDateAfter.getMonth()+1; 
			var yyyy = appointmentDateAfter.getFullYear();
			
			var time= this.formatAMPM(appointmentDateAfter);
			var appointmentDateTimeAfterdays = mm+'/'+dd+'/'+yyyy+' '+time;

			this.newTxCard_Row.date=appointmentDateTimeAfterdays;

			var count=0; 
			this.procedurecodeLibrary.map((value, key)=>{
				if(value.selected== true)
				{
					count=1;
					this.newTxCard_Row.multiple_application.push({"code": value.code, "name": value.name, "time" : value.time, "timespan": value.timespan});
				}
			})
			if(count==1)
			{
				this.newTxCard_Row.multiple_application_status=true ; 
			}else {
				this.newTxCard_Row.multiple_application_status=false ; 
			}
			
			this.newTxCard_Row.show_applicant=false ; 

			this.newTxCard_Row.deleted= false; 	
			this.treatmentArr.unshift(this.newTxCard_Row);
			this.addBtnClicked = false;
			this.openNoteVal= false;
			this.openNextNoteVal= false;

			this.procedurecodeLibrary.map((value, key)=>{
				value.selected= false;
			})
			this.newTxCard_Row = {"date": '', "UW": "", "LW": "", "Hyg": "", "Appl": "", "St": "", "dr": "", "notes": "", "next_notes": "", "Proc": "", "U": "", "Wks": "", "elastic" : true , 'deleted': false, "multiple_application": [], "multiple_application_status": false, "show_applicant": false};

			
		}
	
		console.log(this.treatmentArr);
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
		}else if(which == 'Poc'){
			this.newTxCard_Row.Proc = evt;
		}else if(which == 'U'){
			this.newTxCard_Row.U = evt;
		}else if(which == 'Wks'){
			this.newTxCard_Row.Wks = evt;
		}
	}
	
	updateDentist(evt){
		//console.log(evt);
		this.curentDentist = evt;
	}
	
	updatepofessionalRef(evt) {
		this.docReffInArr.unshift(evt);
	}


	openNote()
	{
		this.openNoteVal=this.openNoteVal==false? true: false;
		this.newTxCard_Row.notes= this.newTxCard_Row.notes;
		this.newTxCard_Row.next_notes= this.newTxCard_Row.next_notes;
		this.openNextNoteVal= false;
	}
	openNextNote()
	{
		this.openNextNoteVal=this.openNextNoteVal==false? true: false;
		this.newTxCard_Row.next_notes= this.newTxCard_Row.next_notes;
		this.newTxCard_Row.notes= this.newTxCard_Row.notes;
		this.openNoteVal= false;
		
	}
	
	checkDeleteButton(index)
	{
		this.treatmentArr.map((value, key)=>{
			if(key!=index)
			{
				value.delete_icon=false;
			}
			
		})
		this.treatmentArr[index].delete_icon=this.treatmentArr[index].delete_icon ==false ? true : false;
	}

	deleteItem(index, selecteddate)
	{
		this.errorVal= false;
		var After30Days = new Date(selecteddate);
		After30Days.setDate(After30Days.getDate() + 30);

		var appointmentDateAfter30days = new Date(After30Days);
		var dd = appointmentDateAfter30days.getDate();
		var mm = appointmentDateAfter30days.getMonth()+1; 
		var yyyy = appointmentDateAfter30days.getFullYear();
		
		var time= this.formatAMPM(appointmentDateAfter30days);
		var appointmentDateTimeAfter30days = mm+'/'+dd+'/'+yyyy+' '+time;

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();	
		var time= this.formatAMPM(new Date);
		var todayDate = mm+'/'+dd+'/'+yyyy+' '+time;


		if(Date.parse(todayDate) < Date.parse(appointmentDateTimeAfter30days)){
			this.treatmentArr[index].deleted=true;
		 }else{
			this.errorVal= true;
			this.errorMessage="This item can't be deleted";
		 }

	}

	btnAction(item)
	{
		this.treatmentArr.map((value, key)=>{
				value.delete_icon=false;
		})
		this.errorVal= false;
	}

	showMultipleAppointment()
	{
		this.filterProcedureCode = this.procedurecodeLibrary;
		this.multipleSearchAppointmentBar= this.multipleSearchAppointmentBar== true? false: true;
		this.searchHeight()
	}

	searchHeight(){
		this.searchBoxHg1St= (this.filterProcedureCode.length*30)+110;
		if(this.searchBoxHg1St>=190)
			{
				this.searchBoxHg1St=190;
			}
	
		
			if(this.filterProcedureCode.length==0)
			{
				this.searchBoxHg2Nd=36;
				this.searchBoxHg1St=50;
			}else {
				this.searchBoxHg2Nd=this.searchBoxHg1St-50;
			}
	
			this.remainingBoxHg= this.searchBoxHg1St- this.searchBoxHg2Nd; 
	  }

	  showUnit()
	  {
		  this.showUnitVar= this.showUnitVar== true ? false : true;
	  }

	  selectUnit(selUnit)
	  {
		this.addToProcedureUnit= selUnit;
		this.showUnitVar= false ;
	  }


	  addNewProcedureCode()
	  {
	
		
		/*if(typeof this.addToProcedureName !='undefined' && typeof this.addToProcedureCode !='undefined' && typeof this.addToProcedureTime !='undefined' &&  this.addToProcedureName !='' &&  this.addToProcedureCode !='' && this.addToProcedureTime!='')
		{

			this.procedurecodeLibrary.push({'code': this.addToProcedureCode , 'name': this.addToProcedureName, 'time': this.addToProcedureTime, 'timespan': this.addToProcedureUnit,  'selected': false});
		
			this.filterProcedureCode= this.procedurecodeLibrary;
		}
		this.addToProcedureName='';
		this.addToProcedureCode='';
		this.addToProcedureTime='';

		setTimeout(() =>{
			this.listboxscroll.directiveRef.scrollToBottom(0, 500);
			this.listboxscroll1.directiveRef.scrollToY(0, 500);
		}, 100);
	
		this.searchHeight();*/
		this.multipleSearchAppointmentBar= false;
	
	  }

	  selectForstepBox(indx)
	  {
		 
		this.procedurecodeLibrary[indx].selected = this.procedurecodeLibrary[indx].selected==true ? false : true ;
		this.filterProcedureCode= this.procedurecodeLibrary;
		
	  }

	  showSelectedMultipleAppointment(index)
	  {
		  	
			this.treatmentArr[index].show_applicant= this.treatmentArr[index].show_applicant== false ? true : false; 
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
