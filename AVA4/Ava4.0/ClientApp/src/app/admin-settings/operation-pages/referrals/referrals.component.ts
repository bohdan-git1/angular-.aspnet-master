import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MessageService } from '../../../core/message.service';


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {
	
	rotateOnY = 0;
	selectorHeight: any;
	selectorTop: any;
	accordOpen = false;
	
	addMarketingInfoItem:boolean = false;
	showEditOption:boolean = false;
	prevSelectedIndx: any;
	boxHt: any;
	
	locationListArr: any [] = [
		{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 1, 'doctorname': 'Dr. Jenny Mcmurtrey', 'firstname': 'Jenny', 'middlename': '', 'lastname': 'Mcmurtrey', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 2, 'doctorname': 'Dr. Tyson Perrero', 'firstname': 'Tyson', 'middlename': '', 'lastname': 'Perrero', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 3, 'doctorname': 'Dr. Michael Tobler', 'firstname': 'Michael', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
	
		{'id': 2, 'clinicname': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 5, 'doctorname': 'Dr. Karen Mullins', 'firstname': 'Karen', 'middlename': '', 'lastname': 'Mullins', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 6, 'doctorname': 'Dr. Nathan Tobler', 'firstname': 'Nathan', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		
		},
		
		{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 8, 'doctorname': 'Dr. Nelson Remington', 'firstname': 'Nelson', 'middlename': '', 'lastname': 'Remington', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 9, 'doctorname': 'Dr. Brett Tobler', 'firstname': 'Brett', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 10, 'doctorname': 'Dr. Jane Paulson', 'firstname': 'Jane', 'middlename': '', 'lastname': 'Paulson', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
		
		{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 11, 'doctorname': 'Dr. Larry Adomson', 'firstname': 'Larry', 'middlename': '', 'lastname': 'Adomson', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 12, 'doctorname': 'Dr. George Bentley', 'firstname': 'George', 'middlename': '', 'lastname': 'Bentley', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 13, 'doctorname': 'Dr. John Smith', 'firstname': 'John', 'middlename': '', 'lastname': 'Smith', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 14, 'doctorname': 'Dr. Harry Thompson', 'firstname': 'Harry', 'middlename': '', 'lastname': 'Thompson', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
		
		{'id': 5, 'clinicname': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 2, 'doctorname': 'Dr. Tyson Perrero', 'firstname': 'Tyson', 'middlename': '', 'lastname': 'Perrero', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 14, 'doctorname': 'Dr. Harry Thompson', 'firstname': 'Harry', 'middlename': '', 'lastname': 'Thompson', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
		
		{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 5, 'doctorname': 'Dr. Karen Mullins', 'firstname': 'Karen', 'middlename': '', 'lastname': 'Mullins', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 13, 'doctorname': 'Dr. John Smith', 'firstname': 'John', 'middlename': '', 'lastname': 'Smith', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 10, 'doctorname': 'Dr. Jane Paulson', 'firstname': 'Jane', 'middlename': '', 'lastname': 'Paulson', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
	
		{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 8, 'doctorname': 'Dr. Nelson Remington', 'firstname': 'Nelson', 'middlename': '', 'lastname': 'Remington', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 12, 'doctorname': 'Dr. George Bentley', 'firstname': 'George', 'middlename': '', 'lastname': 'Bentley', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 3, 'doctorname': 'Dr. Michael Tobler', 'firstname': 'Michael', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 13, 'doctorname': 'Dr. John Smith', 'firstname': 'John', 'middlename': '', 'lastname': 'Smith', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
		
		{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'zip':'4565', 'ext':'566', 'fax':'5656', 'email': 'jg@gmail.com', 'notes':'kh', 'phone': '360-892-4242', 'selected': false, 'doctoroptions': [
			{'id': 9, 'doctorname': 'Dr. Brett Tobler', 'firstname': 'Brett', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 6, 'doctorname': 'Dr. Nathan Tobler', 'firstname': 'Nathan', 'middlename': '', 'lastname': 'Tobler', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'},
			
			{'id': 5, 'doctorname': 'Dr. Karen Mullins', 'firstname': 'Karen', 'middlename': '', 'lastname': 'Mullins', 'group': [ { 'label': 'Dentist' }], 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com', 'nickname': 'jrje', 'birthday': '12/09/2000', 'notes': 'hi'}
			
		], 
		latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
		previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
		marketinginfo: [
		{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
		{"date": "07/14/19", "info": "Lunch & Learn"},
		{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
		{"date": "01/17/18", "info": "Lunch & Learn"},
		{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
		]
		},
	  ];
	  
	  doctorListArr: any[] =[
		{'id': 1, 'doctorname': 'Dr. Jenny Mcmurtrey', 'firstname': 'Jenny', 'middlename': '', 'lastname': 'Mcmurtrey', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]},
		
		{'id': 2, 'doctorname': 'Dr. Tyson Perrero', 'firstname': 'Tyson', 'middlename': '', 'lastname': 'Perrero', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 5, 'clinicname': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]},
		
		{'id': 3, 'doctorname': 'Dr. Michael Tobler', 'firstname': 'Michael', 'middlename': '', 'lastname': 'Tobler', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 1, 'clinicname': 'Apex Dental', 'city': 'Riverton', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]},
		
		{'id': 5, 'doctorname': 'Dr. Karen Mullins', 'firstname': 'Karen', 'middlename': '', 'lastname': 'Mullins', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 2, 'clinicname': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
			
			{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
		
		{'id': 6, 'doctorname': 'Dr. Nathan Tobler', 'firstname': 'Nathan', 'middlename': '', 'lastname': 'Tobler', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 2, 'clinicname': 'Canyon View Dental Clinic', 'city': 'Spanish Fork', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
		
		{'id': 7, 'doctorname': 'Dr. Patrick Nobel', 'firstname': 'Patrick', 'middlename': '', 'lastname': 'Nobel', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'clinicname': 'Sunshine Dentistry', 'city': 'Spanish Forke', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
		
		{'id': 8, 'doctorname': 'Dr. Nelson Remington', 'firstname': 'Nelson', 'middlename': '', 'lastname': 'Remington', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 9, 'doctorname': 'Dr. Brett Tobler', 'firstname': 'Brett', 'middlename': '', 'lastname': 'Tobler', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 8, 'clinicname': 'Riverside Dental Care', 'city': 'Moab', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
		
		{'id': 10, 'doctorname': 'Dr. Jane Paulson', 'firstname': 'Jane', 'middlename': '', 'lastname': 'Paulson', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 3, 'clinicname': 'Hobble Creek Dental', 'city': 'Springville', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
		
		{'id': 11, 'doctorname': 'Dr. Larry Adomson', 'firstname': 'Larry', 'middlename': '', 'lastname': 'Adomson', 'designation': 'DDS', 'selected': false, 'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'clinicname': 'Riverside Larry Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 12, 'doctorname': 'Dr. George Bentley', 'firstname': 'George', 'middlename': '', 'lastname': 'Bentley', 'designation': 'DDS', 'selected': false,  'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 13, 'doctorname': 'Dr. John Smith', 'firstname': 'John', 'middlename': '', 'lastname': 'Smith', 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 6, 'clinicname': 'Sunshine Dentistry', 'city': 'West Jordan', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
			
			{'id': 7, 'clinicname': 'Riverside Dental Care', 'city': 'St. George', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},

		{'id': 14, 'doctorname': 'Dr. Harry Thompson', 'firstname': 'Harry', 'middlename': '', 'lastname': 'Thompson', 'designation': 'DDS', 'selected': false , 'accept': false,'phone':'360-888-9999', 'email':'Jimbob@gmail.com','nickname': 'Mcmurtrey','birthday' : '04/04/1990','notes' : 'Info','group': [ { 'label': 'Dentist' }],
		'clinicnames': [ 
			{'id': 4, 'clinicname': 'Stonehaven Dental', 'city': 'Lehi', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false},
							
			{'id': 5, 'clinicname': 'Stonehaven Dental', 'city': 'Orem', 'state': 'UT', 'addr': '123 Main Street, Ste 112', 'location' : 'St. George','zip': '343','ext' :'454','fax': '454','email': 'text@gmail.com','notes': 'hi', 'phone': '360-892-4242', 'selected': false}
		]
		},
  ];
	
	
	drGroupArr: any[] = [
		{"label": "Group", "selected": false}, {"label": "Dentist", "selected": false}, {"label": "Oral Surgeon", "selected": false}, {"label": "Periodontist", "selected": false}, {"label": "Pedodontist", "selected": false}, {"label": "Endodontist", "selected": false}, {"label": "Prosthodontist", "selected": false}
	]
	
	selectedParctice: any = {};
	addMode:boolean = false;
	editMode:boolean = false;
	
	addPractice: any = {};
	editPractice: any = {};

	defaultDoctor:boolean = false;
	
	doctorAlocationFilter: boolean= false;
	searchPlaceholderTxt: any;
	searchDoctorArr:any[] = [];
	searchLocationArr:any[] = [];
	selectedLocationObj:any = {};
	selecedDoctorObj: any = {};
	
	showgrpdrpdn:boolean = false;
	selectedGrp: any = "Group";

  constructor(public mat_dialog: MatDialog) { }

  ngOnInit() {
	this.initalizeFrame();
	this.doctorAlocationFilterFn();
  }
  
  initalizeFrame() {
    const topHt: any = 139;
    const bottomHt: any = 130;
    this.boxHt = window.innerHeight - (topHt + bottomHt);
  }

  doctorAlocationFilterFn() {

	this.accordOpen = false;

    if(this.defaultDoctor == true) {
		this.defaultDoctor = false;
		this.searchPlaceholderTxt = 'Find by location';
		this.searchLocationArr = this.locationListArr;
		this.searchLocationArr.map(item => {
			item.selected = false;
		});
		this.selectGrpOptn(0);
		
    } else {
		this.defaultDoctor = true;
		this.searchPlaceholderTxt = 'Find doctor...';
		this.searchDoctorArr = this.doctorListArr;
		this.searchDoctorArr.map(item => {
			item.selected = false;
		});
    }
  }
  
  openAddEditSection(action){
	if(action == 'add'){
		this.addMode = true;
		this.editMode = false;
		this.selectedParctice = this.addPractice;
	} else {
		this.addMode = false;
		this.editMode = true;
		this.selectedParctice = this.editPractice;
	}
	
	this.rotateOnY -= 180;
  }
  
  flipCard() {
	this.rotateOnY -= 180;
	this.addMode = false;
	this.editMode = false;
  }
  
  showDetailsforDoctor(evt, indx) {
	
	this.searchLocationArr.map(item => {
		item.selected = false;
	});
	
	this.searchLocationArr[indx].selected = true;
	this.editPractice = this.searchLocationArr[indx];
	this.selectedLocationObj= this.searchLocationArr[indx];

	setTimeout(() => {
		if(this.prevSelectedIndx == indx){
			if(this.accordOpen == true){
				this.accordOpen = false;
			} else {
				this.accordOpen = true;
			}
			
			if(this.showEditOption == true){
				this.showEditOption = false;
			} else {
				this.showEditOption = true;
			}
			
		} else {
			this.accordOpen = true;
			this.showEditOption = true;
		}
		
		this.selectorTop = evt.target.parentElement.offsetTop-1;
		this.selectorHeight = evt.target.parentElement.offsetHeight;
		
		if(this.accordOpen == false){
			this.searchLocationArr.map(item => {
				item.selected = false;
			});
		}
		this.prevSelectedIndx = indx;
	});
  }


  showDetailsforLocation(evt, indx) {
	
	this.searchDoctorArr.map(item => {
		item.selected = false;
	});
	
	this.searchDoctorArr[indx].selected = true;
	this.editPractice = this.searchDoctorArr[indx];
	this.selecedDoctorObj= this.searchDoctorArr[indx];

	
	setTimeout(() => {
		if(this.prevSelectedIndx == indx){
			if(this.accordOpen == true){
				this.accordOpen = false;
			} else {
				this.accordOpen = true;
			}
			
			if(this.showEditOption == true){
				this.showEditOption = false;
			} else {
				this.showEditOption = true;
			}
			
		} else {
			this.accordOpen = true;
			this.showEditOption = true;
		}
		
		this.selectorTop = evt.target.parentElement.offsetTop-1;
		this.selectorHeight = evt.target.parentElement.offsetHeight;
		
		if(this.accordOpen == false){
			this.searchDoctorArr.map(item => {
				item.selected = false;
			});
		}
		
		this.prevSelectedIndx = indx;
	});
  }
  
  showAddPanel() {
	this.addMarketingInfoItem = true;
  }
  
  addMarketingItem() {
	this.addMarketingInfoItem = false;
  }
  
  getBoxTitle() {
	let title: any;
		if(this.addMode == false && this.editMode == false){
			title = "DOCTORS";
		} else if(this.addMode == true && this.editMode == false){
			title = "NEW INFORMATION";
		} else if(this.addMode == false && this.editMode == true){
			title = "EDIT INFORMATION";
		}
	
	return title;
  }
  
  openEditDialog(){
	
	let selectedData: any;
	if(this.defaultDoctor){
		selectedData = this.selecedDoctorObj;
	} else {
		selectedData = this.selectedLocationObj;
	}
		
	const dialogRef = this.mat_dialog.open(EditReferralDialog, {
		panelClass: 'editReffralModal',
		backdropClass: 'whitebackdrop',
		data: {'defaultDoctor': this.defaultDoctor, 'selectedData': selectedData}
	});
  }
  
  openEditDialog_innerItem(section, id, index){
	
	let selectedData: any;
	let _defaultdoc: boolean;
	let inxd: any;
		
	if(section == 'doctor'){
		_defaultdoc = false;
		
		inxd = this.doctorListArr.findIndex(elem => {
			return elem.id == id;
		});
		
		selectedData = this.doctorListArr[inxd]['clinicnames'][index];
		
		let locid: any = selectedData.id;
		let docArr: any[] = this.locationListArr.filter(item => {
			return item.id == locid;
		});
		selectedData['doctoroptions'] = docArr[0].doctoroptions;
		
	} else {
		_defaultdoc = true;
		
		inxd = this.locationListArr.findIndex(elem => {
			return elem.id == id;
		});
		
		selectedData = this.locationListArr[inxd]['doctoroptions'][index];
		
		let docid: any = selectedData.id;
		
		let clinicnameArr: any[] = this.doctorListArr.filter(item => {
			return item.id == docid;
		});
		
		selectedData['clinicnames'] = clinicnameArr[0].clinicnames;
	}
	
	console.log(JSON.stringify(selectedData));
	
	const dialogRef = this.mat_dialog.open(EditReferralDialog, {
		panelClass: 'editReffralModal',
		backdropClass: 'whitebackdrop',
		data: {'defaultDoctor': _defaultdoc, 'selectedData': selectedData}
	});
	
  }
  
  preventDblClickSelection(event){
	 if (event.detail > 1) event.preventDefault();
  }
  
  search(evt){
	
	let searchTxt: any = evt.target.value;
	let searchItem: any = searchTxt.toLowerCase();
	
	if(this.defaultDoctor){
		if(searchItem.length > 1){
			if(this.selectedGrp != 'Group'){
				let filterbyGrp: any[] = this.doctorListArr.filter(item => {
					return item.group.filter(groupItem=>{
						return groupItem.label.toLowerCase().includes(this.selectedGrp.toLowerCase())
					})

				})
								
				this.searchDoctorArr = filterbyGrp.filter(item => {
					return (item.doctorname.toLowerCase().includes(searchItem));
				})
				
			} else {
				this.searchDoctorArr = this.doctorListArr.filter(item => {
					return (item.doctorname.toLowerCase().includes(searchItem));
				})
			}
			
			if(this.searchDoctorArr.length == 0){
				this.searchDoctorArr.push({"doctorname": "No doctor found!"});
			}
			
		} else {
			this.searchDoctorArr = this.doctorListArr;
		} 
	} else {
		if(searchItem.length > 1){
			this.searchLocationArr = this.locationListArr.filter(item => {
				return (item.clinicname.toLowerCase().includes(searchItem));
			});
			
			if(this.searchDoctorArr.length == 0){
				this.searchDoctorArr.push({"doctorname": "No doctor found!"});
			}
		} else {
			this.searchLocationArr = this.locationListArr;
		}
	}
  }
  
  selectGrpOptn(indx){
	this.drGroupArr.map(item => {
		item.selected = false;
	});
	this.drGroupArr[indx].selected = true;
	this.selectedGrp = this.drGroupArr[indx].label;
	this.showgrpdrpdn = false;
  }
  
  formDataTnsf(evtData)
	{
		this.dataSaveprocessFordoctorArrayFn(evtData);
		this.dataSaveprocessForlocationArrayFn(evtData);
		this.flipCard();
		//console.log(this.doctorListArr);
		//console.log(this.locationListArr);
	}

	dataSaveprocessFordoctorArrayFn(evtData)
	{
			var evtData= evtData;

		//........Save process in doctor array.........//
		
		var checknameFdcArray='No'; 
		var doctorIndexFdcArray ;

		var checklocationFdcArray= 'No'; 
		var locationIndexFdcArray ;


		this.doctorListArr.map(
			(element, key)=>{
				if(element.firstname==evtData.fname && element.lastname==evtData.lname && element.email==evtData.doctorEmail && element.birthday==evtData.bod)
				{
					 checknameFdcArray='Yes'; 
					 doctorIndexFdcArray=key;
				}

			
					
				if(checknameFdcArray=='Yes')
				{
					element.clinicnames.map(
						(element1, key1)=>{
							if( element1.location==evtData.locationadd && element1.clinicname==evtData.selectedDropdownval && element1.city==evtData.city && element1.state==evtData.state && element1.phone==evtData.phone )
							{
								checklocationFdcArray='Yes'; 
								locationIndexFdcArray=key1;
							}
						}
					);
				}

			}
		);

		if(checknameFdcArray=='Yes' && checklocationFdcArray=='Yes')
		{
			this.doctorListArr[doctorIndexFdcArray].doctorname= 'Dr.'+evtData.displayname;
			this.doctorListArr[doctorIndexFdcArray].middlename= evtData.mname;
			this.doctorListArr[doctorIndexFdcArray].designation= evtData.degree;
			this.doctorListArr[doctorIndexFdcArray].phone= evtData.cellphone;
			this.doctorListArr[doctorIndexFdcArray].notes= evtData.doctornote;
			this.doctorListArr[doctorIndexFdcArray].nickname= evtData.nickname;
			this.doctorListArr[doctorIndexFdcArray].birthday= evtData.bod;

      evtData.professionalGP.map((element, key)=>{
				this.doctorListArr[doctorIndexFdcArray].group.push({"label" : element});
			}
			);
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].addr= evtData.address;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].city= evtData.city;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].state= evtData.state;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].phone= evtData.phone;


			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].ext= evtData.ext;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].zip= evtData.zip;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].fax= evtData.fax;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].email= evtData.locationEmail;
			this.doctorListArr[doctorIndexFdcArray].clinicnames[locationIndexFdcArray].notes= evtData.locationNote;

		}

		if(checknameFdcArray=='Yes' && checklocationFdcArray=='No')
		{
			this.doctorListArr[doctorIndexFdcArray].doctorname= 'Dr.'+evtData.displayname;
			this.doctorListArr[doctorIndexFdcArray].middlename= evtData.mname;
			this.doctorListArr[doctorIndexFdcArray].designation= evtData.degree;
			this.doctorListArr[doctorIndexFdcArray].phone= evtData.cellphone;
			this.doctorListArr[doctorIndexFdcArray].notes= evtData.doctornote;
			this.doctorListArr[doctorIndexFdcArray].nickname= evtData.nickname;
			this.doctorListArr[doctorIndexFdcArray].birthday= evtData.bod;

      evtData.professionalGP.map((element, key)=>{
				this.doctorListArr[doctorIndexFdcArray].group.push({"label" : element});
			}
			);

	
			this.doctorListArr[doctorIndexFdcArray].clinicnames.push({
				'id': Math.floor(Math.random() * 90 + 10),
				'clinicname': evtData.selectedDropdownval,
				"location": evtData.locationadd,
				"addr": evtData.address,
				"city": evtData.city,	
				"state": evtData.state,	
				"zip" : evtData.zip,
				"phone" : evtData.phone,
				"ext": evtData.ext,
				"fax": evtData.fax,	
				"email":  evtData.locationEmail, 
				"notes": evtData.locationNote,
				'selected': false,
			});

		}

		if(checknameFdcArray=='No' && checklocationFdcArray=='No')
		{
				var professional_groupArray  =[];
				evtData.professionalGP.map((element, key)=>{
					professional_groupArray.push({"label" : element});
				}
				);

				var clinicnamesArray  =[];
				clinicnamesArray.push({
					'id': Math.floor(Math.random() * 90 + 10),"clinicname": evtData.selectedDropdownval,	"location": evtData.locationadd,	"addr": evtData.address,	"city": evtData.city,	"state": evtData.state,	"zip" : evtData.zip,"phone" : evtData.phone,	"ext": evtData.ext,	"fax": evtData.fax,	"email":  evtData.locationEmail,	"notes": evtData.locationNote
				})

			this.doctorListArr.push({
				'id': Math.floor(Math.random() * 90 + 10)	, 'doctorname': 'Dr.'+evtData.displayname, 'firstname': evtData.fname, 'middlename': evtData.mname, 'lastname': evtData.lname, 	"nickname": evtData.nickname ,	"birthday": evtData.bod ,	"notes": evtData.doctornote, 'designation': evtData.degree,'selected': false, 'phone': evtData.cellphone,'email': evtData.doctorEmail,
				'group': professional_groupArray, 'clinicnames': clinicnamesArray
		  	});
		}
		//........End Save process in doctor array.........//

	}

	dataSaveprocessForlocationArrayFn(evtData)
	{
			var evtData= evtData;

	// Save process in location array..............//

		var checknameFloArray='No'; 
		var locationIndexFloArray ;
		
		var checklocationFloArray= 'No'; 
		var doctorIndexFloArray ;

		this.locationListArr.map(
			(element, key)=>{
				if(element.location==evtData.locationadd && element.clinicname==evtData.selectedDropdownval && element.city==evtData.city && element.state==evtData.state && element.phone==evtData.phone )
				{
					checknameFloArray='Yes'; 
					locationIndexFloArray=key;
				}


				if(checknameFloArray=='Yes')
				{
						element.doctoroptions.map(
							(element1, key1)=>{
							
								if(element1.firstname==evtData.fname && element1.lastname==evtData.lname && element1.email==evtData.doctorEmail && element1.birthday==evtData.bod)
								{
									checklocationFloArray='Yes'; 
									doctorIndexFloArray=key1;
								}
							}
						);
				}
			}
		);

		if(checknameFloArray=='Yes' && checklocationFloArray=='Yes')
		{
			this.locationListArr[locationIndexFloArray].clinicname= evtData.selectedDropdownval;
			this.locationListArr[locationIndexFloArray].location= evtData.locationadd;
			this.locationListArr[locationIndexFloArray].addr= evtData.address;
			this.locationListArr[locationIndexFloArray].city= evtData.city;
			this.locationListArr[locationIndexFloArray].state= evtData.state;
			this.locationListArr[locationIndexFloArray].zip= evtData.zip;
			this.locationListArr[locationIndexFloArray].phone= evtData.phone;
			this.locationListArr[locationIndexFloArray].ext= evtData.ext;

			this.locationListArr[locationIndexFloArray].fax= evtData.fax;
			this.locationListArr[locationIndexFloArray].email= evtData.locationEmail;
			this.locationListArr[locationIndexFloArray].notes= evtData.locationNote;

			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].doctorname= 'Dr.'+evtData.displayname;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].designation= evtData.degree;

			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].firstname= evtData.fname;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].middlename= evtData.mname;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].lastname= evtData.lname;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].nickname= evtData.nickname;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].birthday= evtData.bod;

			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].phone= evtData.cellphone;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].email= evtData.doctorEmail;
			this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].notes= evtData.doctornote;
			evtData.professionalGP.map((element, key)=>{
				this.locationListArr[locationIndexFloArray].doctoroptions[doctorIndexFloArray].group.push({"label" : element});
			}
			);
		}


		if(checknameFloArray=='Yes' && checklocationFloArray=='No')
		{
			this.locationListArr[locationIndexFloArray].clinicname= evtData.selectedDropdownval;
			this.locationListArr[locationIndexFloArray].location= evtData.locationadd;
			
			this.locationListArr[locationIndexFloArray].addr= evtData.address;
			this.locationListArr[locationIndexFloArray].city= evtData.city;
			this.locationListArr[locationIndexFloArray].state= evtData.state;
			this.locationListArr[locationIndexFloArray].zip= evtData.zip;
			this.locationListArr[locationIndexFloArray].phone= evtData.phone;
			this.locationListArr[locationIndexFloArray].ext= evtData.ext;

			this.locationListArr[locationIndexFloArray].fax= evtData.fax;
			this.locationListArr[locationIndexFloArray].email= evtData.locationEmail;
			this.locationListArr[locationIndexFloArray].notes= evtData.locationNote;

			var professional_groupArray  =[];
			evtData.professionalGP.map((element, key)=>{
				professional_groupArray.push({"label" : element, "selected": false});
			}
			);

			this.locationListArr[locationIndexFloArray].doctoroptions.push({
				'id': Math.floor(Math.random() * 90 + 10),
				'doctorname': 'Dr.'+ evtData.displayname,
				'designation': evtData.degree,
			  'firstname': evtData.fname,
				'middlename': evtData.mname,
				'lastname': evtData.lname,
				'nickname': evtData.nickname,
			  'birthday' : evtData.bod,
				'phone': evtData.cellphone,
				'email': evtData.doctorEmail,
				'notes': evtData.doctornote,
				'group' : professional_groupArray
			})

		}

		if(checknameFloArray=='No' && checklocationFloArray=='No')
		{
			var professional_groupArray  =[];
			evtData.professionalGP.map((element, key)=>{
				professional_groupArray.push({"label" : element, "selected": false});
			}
			);
			var doctorlistarray  =[];
			doctorlistarray.push({
				'id': Math.floor(Math.random() * 90 + 10),
				'doctorname': 'Dr.'+ evtData.displayname,
				'designation': evtData.degree,
			  'firstname': evtData.fname,
				'middlename': evtData.mname,
				'lastname': evtData.lname,
				'nickname': evtData.nickname,
			  'birthday' : evtData.bod,
				'phone': evtData.cellphone,
				'email': evtData.doctorEmail,
				'notes': evtData.doctornote,
				'group' : professional_groupArray
			})

			this.locationListArr.push({


				'id': Math.floor(Math.random() * 90 + 10) , 'clinicname': evtData.selectedDropdownval, 'city': evtData.city, 'state': evtData.state, 'addr': evtData.address, 'phone': evtData.phone, 
				'selected': false, 
				'location': evtData.locationadd,
				'zip': evtData.zip,
				'ext': evtData.ext,
				'fax': evtData.fax,
				'email': evtData.locationEmail,
				'notes': evtData.locationNote,
				'doctoroptions': doctorlistarray,
				latupdatedcount: {"year": "2019", "newreferral": "16", "startedtreatment": "31%", "revenue": "31200"},
				previousyearcount: [{"year": "2018", "referral": "3"}, {"year": "2017", "referral": "1"}, {"year": "2016", "referral": "0"}],
				marketinginfo: [
				{"date": "12/15/18", "info": "Gingerbread cookies & sparkling cider basket"},
				{"date": "07/14/19", "info": "Lunch & Learn"},
				{"date": "05/05/18", "info": "Cinco de mayo chips, salsa & juaritos"},
				{"date": "01/17/18", "info": "Lunch & Learn"},
				{"date": "09/12/17", "info": "Cinco de mayo chips, salsa & juaritos"}
				]

			});
		}
	// End Save process in location array..............//

	}
	
	
  
  
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class EditReferralDialog implements OnInit {
  
  editableData: any;
  defaultDoctor: any;
 
  constructor(public messageService: MessageService,public _matDialogRef: MatDialogRef<EditReferralDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
	this.editableData = this.data.selectedData;
	this.defaultDoctor = this.data.defaultDoctor;

	this.messageService.getMessage().subscribe(message => {
			if(message.event == 'closemodal' && message.data.event == 'close'){
				this.cancel();
			}
		});
    }
  
  cancel(): void {
    this._matDialogRef.close(null);
  } 

}


