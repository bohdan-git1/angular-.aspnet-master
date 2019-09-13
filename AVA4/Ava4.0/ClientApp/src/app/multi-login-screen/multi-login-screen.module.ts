import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLoginComponent } from './multi-login/multi-login.component';
import { RouterModule, Routes } from '@angular/router';
import {SlideshowModule} from 'ng-simple-slideshow';
import { FormsModule } from '@angular/forms';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
//import { MultiLoginService } from './multi-login.service';

const routes:Routes=[
  {path:'mLog',component:MultiLoginComponent}
]

@NgModule({
  imports: [
    CommonModule,
    SlideshowModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MultiLoginComponent, ImageCarouselComponent],
  // providers:[MultiLoginService]
})
export class MultiLoginScreenModule { }
