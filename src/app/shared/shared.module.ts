import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';
import { MaterialModule } from '../material/material.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppShellComponent } from './app-shell/app-shell.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './truncate.pipe';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';


const SHARED_COMPONENTS = [
  AppShellComponent,
  DialogConfirmComponent,
  ProductCardComponent,
  GooglePlacesDirective,
  ImgUploadComponent,
  TruncatePipe
];

@NgModule({
  declarations: [
    AppShellComponent,
    GooglePlacesDirective,
    ImgUploadComponent,
    ProductCardComponent,
    TruncatePipe,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [SHARED_COMPONENTS],
  entryComponents: [
    DialogConfirmComponent
  ]
})
export class SharedModule { }
