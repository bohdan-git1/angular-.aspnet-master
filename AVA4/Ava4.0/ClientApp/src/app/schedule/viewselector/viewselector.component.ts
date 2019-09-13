import { Component, OnInit, Inject, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-viewselector',
  templateUrl: './viewselector.component.html',
  styleUrls: ['./viewselector.component.css']
})
export class ViewselectorComponent implements OnInit {
	
	@Output() selectedView = new EventEmitter();
	@Input() viewarr: any[];
	@Input() selectedItem: any;

  constructor(public listPopup: MatDialog) {
	
	
  }

  ngOnInit() {
  }
  
  openList(evt: MouseEvent) {
	const target = new ElementRef(evt.currentTarget);
		let dialog_config: any = {data: { trigger: target, dataArr: this.viewarr, active: this.selectedItem }, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'panelClass'};

		const dialogRef = this.listPopup.open(ListPopUp, dialog_config);
		
		dialogRef.afterClosed().subscribe( _res => {
			if(_res != undefined){
				//console.log(_res)
				this.selectedView.emit(_res.value);
				this.selectedItem = _res.active;
			}
		});
  }
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class ListPopUp implements OnInit {
  private readonly _matDialogRef: MatDialogRef<ListPopUp>;
  private readonly triggerElementRef: ElementRef;
  
  views:any[];
  selectedItem: any;
  zoomviewport: any = 1;
  
  constructor(_matDialogRef: MatDialogRef<ListPopUp>, @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, dataArr: any, active: any }) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	
	this.views = data.dataArr;
	this.selectedItem = data.active;
	
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
	
	if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
		this.zoomviewport = Number(window.localStorage.getItem('zoomview'))/100;
	}
		
	matDialogConfig.position = { left: `${(rect.left - 80)}px`, top: `${rect.top - 65}px` };
    
    matDialogConfig.width = '70px';
    matDialogConfig.height = '85px';
	
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
  
  selectView(_value, _item){
	if(this.selectedItem != _item){
		this.selectedItem = _item;
		this._matDialogRef.close({'value': _value, 'active': this.selectedItem});
	} else {
		this._matDialogRef.close(null);
	}
  }
  
  
}
