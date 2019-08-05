import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';
import { MaterialModule } from '../material/material.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';


const SHARED_COMPONENTS = [
  ProductCardComponent,
  GooglePlacesDirective,
  ImgUploadComponent,
];

@NgModule({
  declarations: [GooglePlacesDirective, ImgUploadComponent, ProductCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
