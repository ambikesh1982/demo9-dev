import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyKitchenComponent } from './my-kitchen/my-kitchen.component';
import { MyKitchenResolver } from './myKitchen.resolver';
import { Routes, RouterModule } from '@angular/router';
import { SocialGuard } from '../core/social.guard';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const kitchenRoutes: Routes = [
  { path: ':uid',
    component: MyKitchenComponent,
    canActivate: [SocialGuard],
    resolve: {myKitchen: MyKitchenResolver}
  }
];

@NgModule({
  declarations: [MyKitchenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(kitchenRoutes),
  ],
  providers: [MyKitchenResolver]
})
export class KitchenModule { }
