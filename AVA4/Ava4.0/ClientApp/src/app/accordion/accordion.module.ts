import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Main_routing } from './accordion.routing';

import { MainComponent } from './main/main.component';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
	RouterModule,
	Main_routing,
	FormsModule,
	ReactiveFormsModule,
	MatProgressSpinnerModule,
  ],
  
  exports: [
	RouterModule,
  ],
  
  declarations: [MainComponent],
  
    
})
export class AccordionModule { }
