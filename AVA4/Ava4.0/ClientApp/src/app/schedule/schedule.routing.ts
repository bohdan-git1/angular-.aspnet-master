//Lazyloading ts

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SchedularComponent } from './schedular/schedular.component';

 const routes: Routes = [
	{path: '', component: SchedularComponent},
	/*{path: 'schedule', component: SchedularComponent}*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Schedulerouting {}
