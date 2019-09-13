import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css']
})
export class DropdownlistComponent implements OnInit {
	
	@Input() public listLabel;
	@Input() public dialogAlign;

  constructor(public overlaydialog: MatDialog) { }

  ngOnInit() {
  }
  
	onShowDialog(evt: MouseEvent): void {
		const target = new ElementRef(evt.currentTarget);
		let dialog_config: any;

		if(this.dialogAlign == 'left'){
			dialog_config = {data: { trigger: target, align: this.dialogAlign }, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'panelClass'};
		} else {
			dialog_config = {data: { trigger: target, align: this.dialogAlign }, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'panelClass-right'};
		}

		const dialogRef = this.overlaydialog.open(DDListExpansion, dialog_config);
		
		dialogRef.afterClosed().subscribe( _res => {
		});
	}

}


@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DDListExpansion implements OnInit {
  private readonly _matDialogRef: MatDialogRef<DDListExpansion>;
  private readonly triggerElementRef: ElementRef;
  
  dialogAlign: string;
  
  showSeat: any[] = [false, false, false, false];
  
  constructor(_matDialogRef: MatDialogRef<DDListExpansion>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, align: string }) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
	
	this.dialogAlign = data.align;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
		
	if(this.dialogAlign == 'left'){
		matDialogConfig.position = { left: `${rect.left}px`, top: `${rect.bottom + 5}px` };
	} else {
		matDialogConfig.position = { left: `${rect.left - rect.width - 10}px`, top: `${rect.bottom + 5}px` };
	}
    
    matDialogConfig.width = '342px';
    matDialogConfig.height = '400px';
	
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }
  cancel(): void {
    this._matDialogRef.close(null);
  }
  
  showBottom(indx){
	
	/*let toggle = this.showSeat[indx];
	
	toggle != toggle;
	
	
	
	this.showSeat[indx] = toggle;*/
	
	if(this.showSeat[indx] == true){
		this.showSeat[indx] = false;
	} else {
		this.showSeat[indx] = true;
	}
	
  }
}
