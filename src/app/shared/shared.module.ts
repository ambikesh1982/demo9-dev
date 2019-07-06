import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';
import { MaterialModule } from '../material/material.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';

const SHARED_COMPONENTS = [
  GooglePlacesDirective,
  ImgUploadComponent,
];

@NgModule({
  declarations: [GooglePlacesDirective, ImgUploadComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
