import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';
import { MaterialModule } from '../material/material.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppShellComponent } from './app-shell/app-shell.component';
import { RouterModule } from '@angular/router';


const SHARED_COMPONENTS = [
  AppShellComponent,
  ProductCardComponent,
  GooglePlacesDirective,
  ImgUploadComponent,
];

@NgModule({
  declarations: [GooglePlacesDirective, ImgUploadComponent, ProductCardComponent, AppShellComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
