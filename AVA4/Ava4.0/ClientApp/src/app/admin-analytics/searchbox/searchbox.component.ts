import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

	@Input() placeholder: any;
	@Input() optionsArr: any[] = [];
	@Input() zoomable: boolean = false;

  constructor(public searchboxDD: MatDialog) { }

  ngOnInit() {
	
  }
  
  openDropdown(evt: MouseEvent) {
		const target = new ElementRef(evt.currentTarget);
			let dialog_config: any = {data: { trigger: target, dataArr: this.optionsArr, zoomable: this.zoomable}, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'searchboxClass'};

			const dialogRef = this.searchboxDD.open(SearchboxDD, dialog_config);
			
			dialogRef.afterClosed().subscribe( _res => {
				if(_res != undefined){
					//console.log(_res)
					
				}
			});
	}

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class SearchboxDD implements OnInit {
  private readonly _matDialogRef: MatDialogRef<SearchboxDD>;
  private readonly triggerElementRef: ElementRef;
  
  optionsArr:any[];
  zoomviewport: any = 1;
  zoomable:boolean;
  
  constructor(_matDialogRef: MatDialogRef<SearchboxDD>, @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, dataArr: any, zoomable: boolean}) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	this.zoomable = data.zoomable;
	
	this.optionsArr = data.dataArr;
	
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
	
	if(this.zoomable == true){
		if(window.localStorage.getItem('zoomview') != null || window.localStorage.getItem('zoomview') != undefined) {
			this.zoomviewport = Number(window.localStorage.getItem('zoomview'))/100;
		}
	} else {
		this.zoomviewport = 1;
	}
			
	matDialogConfig.position = { left: `${(rect.left) + (rect.width - 360)}px`, top: `${rect.bottom + 10*this.zoomviewport}px` };
    
    matDialogConfig.width = '360px';
    matDialogConfig.height = '500px';
	
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
  }
}
