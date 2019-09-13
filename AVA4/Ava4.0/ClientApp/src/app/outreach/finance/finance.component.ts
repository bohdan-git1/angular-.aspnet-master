import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
	
	@ViewChild('financecontent') financecontent: ElementRef;
	@Input() showMinimum: boolean;
	
	markerlblArr: any[] = [{'label': '$200'}, {'label': '$200'}, {'label': '$200'}, {'label': '$200'}, {'label': '$200'}];
	markerdata1: any = {'ontrack': false, 'value': '96'};
	
	markerlblArr2: any[] = [{'label': '$0'}, {'label': '$0'}, {'label': '$0'}, {'label': '$0'}, {'label': ''}];
	markerdata2: any = {'ontrack': true, 'value': '0'};
	
	markerlblArr3: any[] = [{'label': '$250'}, {'label': '$0'}, {'label': '$0'}, {'label': '$0'}, {'label': ''}];
	markerdata3: any = {'ontrack': true, 'value': '18'};
	
	relnData:any[] = [
		{'id': 1, 'relationtype': 'MO', 'name': 'Clarissa Marcum', 'email': 'marcumclarissa@gmail.com', 'mobile':'(555) 555-1363', 'employer': 'Kirkland & Ellis law', 'carrier': 'Aetna', 'group': '787-54-3323', 'street':'1314 Emery ave.', 'city':'Encinitas, CA', 'zip': '92109', 'fulladdress': '1314 Emery ave. Encinitas, CA 92109', 'phone': '(555) 555-7721', 'dob': '11/07/1978', 'ssn': '888-88-8888', 'emplrid': '23648503843', 'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
		
		{'id': 2, 'relationtype': 'FA', 'name': 'Peter K. Goslin', 'email': 'peter_goslin@gmail.com', 'mobile':'(555) 555-9611', 'employer': 'Trifin Labs', 'carrier': 'Blue Cross of Washington', 'group': '543-99-3333', 'street':'1800 Grand ave.', 'city':'San Diego, CA', 'zip': '92109', 'fulladdress': '1800 Grand ave. San Diego, CA 92109', 'phone': '(555) 555-4782', 'dob': '05/20/1975', 'ssn': '888-88-8888', 'emplrid': '83810984892', 'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}, {'relationtype': 'CH', 'name': 'Maverick Goslin'}]},
		
		{'id': 3, 'relationtype': 'SA', 'name': 'Spencer Marcum', 'email': 'spen.mar@gmail.com', 'mobile':'(555) 555-1363', 'employer': '', 'carrier': '', 'group': '', 'street':'1314 Emery ave.', 'city':'Encinitas, CA', 'zip': '92109', 'fulladdress': '1314 Emery ave. Encinitas, CA 92109', 'phone': '', 'dob': '09/23/1973', 'ssn': '', 'emplrid': '', 'allrelation': [{'relationtype': 'CH', 'name': 'Stella Goslin'}, {'relationtype': 'CH', 'name': 'Lydia Goslin'}]},
	];
	
	ledgeData:any[] = [
		{"id": "2", "source": "FA", "relationtype": "FA", "type": "Reg", "firstname": "Peter", "lastname": "Goslin", "balance": "2400", "duenow": "800", "charge": "3,000.00", "adj": "260.00", "pay": "2,100.00", "brkupbalance": "800.00", "ledger": [
		{"source": "FA", "note": "false", "paymentdate": "04/15/2017", "duedate": "04/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "100.00", "Authorized": "Authorized 44883C", "balance": "2400.00"}, {"source": "FA", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "800.00", "Authorized": "Authorized AAVV22", "balance": "2700.00"}, {"source": "FA", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CompTx", "charge": "3500.00", "adj": "", "pay": "800.00", "Authorized": "Authorized AAVV22", "balance": "3500.00"}, {"source": "FA", "paymentdate": "01/01/2017", "duedate": "01/01/2017", "postingcode": "Check", "charge": "", "adj": "", "pay": "250.00", "Authorized": "#4453", "balance": ".00"}, {"source": "note", "paymentdate": "02/15/2017", "duedate": "Filed BC ins. Max to pay 1200 at 50%", "postingcode": "", "charge": "", "adj": "", "pay": "", "Authorized": "", "balance": "follow up: 03/18/2017"}, {"source": "FA", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CompTx", "charge": "3500.00", "adj": "", "pay": "", "Authorized": "", "balance": "3500.00"}, {"source": "FA", "paymentdate": "01/01/2017", "duedate": "01/01/2017", "postingcode": "Records", "charge": "250.00", "adj": "", "pay": "", "Authorized": "", "balance": "250.00"}]},
		
		{"id":"10", "source": "INS", "relationtype": "FA", "type": "Ins 1", "firstname": "Blue Cross of Washington", "lastname": "", "balance": "1000", "duenow": "0", "charge": "4,000.00", "adj": "350.00", "pay": "4,000.00", "brkupbalance": "0.00", "ledger": [
		{"source": "INS", "paymentdate": "04/15/2017", "duedate": "04/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "100.00", "Authorized": "Authorized 44883C", "balance": "2400.00"}, {"source": "INS", "paymentdate": "03/15/2017", "duedate": "03/18/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "200.00", "Authorized": "Authorized 22Cx55", "balance": "2500.00"}, {"source": "note", "paymentdate": "02/15/2017", "duedate": "Filed BC ins. Max to pay 1200 at 50%", "postingcode": "", "charge": "", "adj": "", "pay": "", "Authorized": "", "balance": "follow up: 03/18/2017"}, {"source": "INS", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "800.00", "Authorized": "Authorized AAVV22", "balance": "2700.00"}, {"source": "INS", "paymentdate": "01/01/2017", "duedate": "01/01/2017", "postingcode": "Check", "charge": "", "adj": "", "pay": "250.00", "Authorized": "#4453", "balance": ".00"}, {"source": "INS", "paymentdate": "03/15/2017", "duedate": "03/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "200.00", "Authorized": "Authorized 22Cx55", "balance": "2500.00"}, {"source": "INS", "paymentdate": "01/01/2017", "duedate": "01/01/2017", "postingcode": "Check", "charge": "", "adj": "", "pay": "250.00", "Authorized": "#4453", "balance": ".00"}]},
		
		{"id":"1", "source": "MO", "relationtype": "MO", "type": "Reg", "firstname": "Clarissa", "lastname": "Marcum", "balance": "975", "duenow": "250", "charge": "2,000.00", "adj": "50.00", "pay": "1,850.00", "brkupbalance": "250.00", "ledger": [
		{"source": "note", "paymentdate": "02/15/2017", "duedate": "Filed BC ins. Max to pay 1200 at 50%", "postingcode": "", "charge": "", "adj": "", "pay": "", "Authorized": "", "balance": "follow up: 03/18/2017"}, {"source": "MO", "paymentdate": "04/15/2017", "duedate": "04/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "100.00", "Authorized": "Authorized 44883C", "balance": "2400.00"}, {"source": "MO", "paymentdate": "03/15/2017", "duedate": "03/18/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "200.00", "Authorized": "Authorized 22Cx55", "balance": "2500.00"}, {"source": "MO", "paymentdate": "04/15/2017", "duedate": "04/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "100.00", "Authorized": "Authorized 44883C", "balance": "2400.00"}, {"source": "MO", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CCard", "charge": "", "adj": "", "pay": "800.00", "Authorized": "Authorized AAVV22", "balance": "2700.00"}, {"source": "MO", "paymentdate": "02/15/2017", "duedate": "02/15/2017", "postingcode": "CompTx", "charge": "3500.00", "adj": "", "pay": "", "Authorized": "Authorized 22Cx55", "balance": "2500.00"}, {"source": "MO", "paymentdate": "01/01/2017", "duedate": "01/01/2017", "postingcode": "Check", "charge": "", "adj": "", "pay": "250.00", "Authorized": "#4453", "balance": "3500.00"}]}
	];
	
	ledgerArr:any[] = [];
	
	selectedItem: any;
	pagetitlepos: any = 0;
	
	showLedger: boolean = false;
	showInsruance: boolean = false;
	showPayschedule: boolean = false;
	individualbg: any = '#FFFFFF';
	individualLedger: boolean = false;
	
	insuranceArr: any[] = [{"firstname": "Peter", "lastname": "Goslin", "active": false}, {"firstname": "Clarissa", "lastname": "Marcum", "active": false}];
	
	continious: boolean = false;
	showSendModal:boolean = false;
	selectedIndividual: any;
	

  constructor() { }

  ngOnInit() {
	
	//this.pagetitlepos = (window.innerHeight - 144 - 70 - 4) - this.financecontent.nativeElement.offsetHeight/2;
	
	setTimeout(() => {
		this.pagetitlepos = (window.innerHeight - 144 - 70 - 4) - this.financecontent.nativeElement.offsetHeight - 50;
	});
	
	this.insuranceTabBtnActive(0);
  }
  
  showSection(whichsection) {
	if(whichsection == 'ledger'){
		if(this.individualLedger == false){
			this.showLedger = this.showLedger == true ? false : true;
		}
		this.showInsruance = false;
		this.getLedgerData();
	} else if(whichsection == 'insurance'){
		this.showInsruance = this.showInsruance == true ? false : true;
		this.showLedger = false;
	} else if(whichsection == 'payschedule'){
		this.showPayschedule = this.showPayschedule == true ? false : true;
	}
		
	setTimeout(() => {
		let contHt = window.innerHeight - 144 - 70 - 4;
		
		if(this.financecontent.nativeElement.offsetHeight > contHt){
			this.pagetitlepos = 20;
		} else {
			this.pagetitlepos = (window.innerHeight - 144 - 70 - 4) - this.financecontent.nativeElement.offsetHeight - 50;
		}
	})
	
  }
  
  selectRelation(indx) {
	this.selectedItem = this.relnData[indx];
	
	setTimeout(() => {
		let contHt = window.innerHeight - 144 - 70 - 4;
		
		if(this.financecontent.nativeElement.offsetHeight > contHt){
			this.pagetitlepos = 20;
		} else {
			this.pagetitlepos = (window.innerHeight - 144 - 70 - 4) - this.financecontent.nativeElement.offsetHeight - 50;
		}
	})
  }
  
  getRelationtypeCol(entrytype) {
	let bgcol: any;
	if(entrytype == 'MO'){
		bgcol = '#fec2c2';
	} else if(entrytype == 'FA'){
		bgcol = '#d1f9f4';
	} else if(entrytype == "INS"){
		bgcol = '#e1d1fb';
	} else if(entrytype == 'note'){
		bgcol = '#feffca';
	}
	
	return bgcol;
  }
  
  getBalanceAndDue() {
	let balanceDue: any = {totalBalance: 0, totalDue: 0};
	
	this.ledgeData.map(item => {
		if(item.source != "INS"){
			balanceDue.totalBalance += Number(item.balance);
			balanceDue.totalDue += Number(item.duenow);
		}
	});
	
	return balanceDue;
  }
  
  getLedgerData(){
	this.ledgerArr = [];
	this.ledgeData.map(item => {
		this.ledgerArr.push(...item.ledger);
	});
	this.individualLedger = false;
	this.individualbg = '#ffffff';
	this.selectedItem=null;
  }
  
  getIndividualLedger(indx){
	this.ledgerArr = [];
	this.ledgerArr.push(...this.ledgeData[indx].ledger);
	this.individualbg = this.getRelationtypeCol(this.ledgeData[indx].source);
	this.selectedIndividual = indx;
	
	this.showLedger = true;
	this.individualLedger = true;
	
	let indiv_id: any = this.ledgeData[indx].relationtype;
	let selected_reln = this.relnData.filter(item => {
		return item.relationtype == indiv_id;
	})
	
	this.selectedItem = selected_reln[0];
	
	setTimeout(() => {
		let contHt = window.innerHeight - 144 - 70 - 4;
		
		if(this.financecontent.nativeElement.offsetHeight > contHt){
			this.pagetitlepos = 20;
		} else {
			this.pagetitlepos = (window.innerHeight - 144 - 70 - 4) - this.financecontent.nativeElement.offsetHeight - 50;
		}
	})
  }
  
  sortDate(a, b){
	return new Date(b.paymentdate).getTime() - new Date(a.paymentdate).getTime()
  }
  
  insuranceTabBtnActive(indx){
	this.insuranceArr.map(item => {
		item.active = false;
	});
	this.insuranceArr[indx].active = true;
	
  }
  
  sendClicked(){
	this.showSendModal = true;
	setTimeout(() => {
		this.showSendModal = false;
	}, 2000)
  }

}
