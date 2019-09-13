//Lazyloading ts

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OutreachmainComponent } from './outreachmain/outreachmain.component';

export const routes: Routes = [
	{path: '', component: OutreachmainComponent},
	/*{path: 'outreach', component: OutreachmainComponent}*/

];

export const Outreachrouting: ModuleWithProviders = RouterModule.forChild(routes);