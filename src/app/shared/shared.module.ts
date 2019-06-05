import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';
import { MaterialModule } from '../material/material.module';

const SHARED_COMPONENTS = [
  GooglePlacesDirective
];

@NgModule({
  declarations: [GooglePlacesDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
