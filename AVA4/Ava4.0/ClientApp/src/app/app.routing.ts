//Lazyloading ts

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{path: '', loadChildren: "./login/login.module#LoginModule"},
	{path: 'main', loadChildren: './accordion/accordion.module#AccordionModule' },
	{path: 'multiLogin', loadChildren:'./multi-login-screen/multi-login-screen.module#MultiLoginScreenModule'}
];

export const Approuting: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
