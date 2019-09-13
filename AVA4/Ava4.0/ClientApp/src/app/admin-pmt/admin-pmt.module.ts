import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminPMT_routing } from './admin-pmt.routing';
import { PmsComponent } from './pms/pms.component';
import { SearchboxComponent, SearchboxDD } from './searchbox/searchbox.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PmtOperationsComponent } from './pmt-operations/pmt-operations.component';
import { HrComponent } from './operation-pages/hr/hr.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
	FlexLayoutModule,
	PerfectScrollbarModule,
	FlexLayoutModule,
	MatDialogModule,
	MatIconModule,
	AdminPMT_routing
  ],
  declarations: [PmsComponent, SearchboxComponent, SearchboxDD, PmtOperationsComponent, HrComponent],
  entryComponents: [SearchboxDD]
})
export class AdminPmtModule { }
