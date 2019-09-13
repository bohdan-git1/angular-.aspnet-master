import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';

import { MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [
	{ path:"", component: LoginComponent },
]

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(routes),
	FormsModule,
	ReactiveFormsModule,
	FlexLayoutModule,
	MatProgressSpinnerModule
  ],
  declarations: [LoginComponent],
  exports: [RouterModule],
})
export class LoginModule { }
