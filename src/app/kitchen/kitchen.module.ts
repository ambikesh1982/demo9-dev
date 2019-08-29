import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyKitchenComponent } from './my-kitchen/my-kitchen.component';
import { MyKitchenResolver } from './myKitchen.resolver';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../core/auth.guard';
import { KitchenListComponent } from './kitchen-list/kitchen-list.component';
import { KitchenDetailComponent } from './kitchen-detail/kitchen-detail.component';

const kitchenRoutes: Routes = [
  { path: ':kid',
    component: KitchenDetailComponent,
    canActivate: [AuthGuard],
    resolve: {myKitchen: MyKitchenResolver}
  },
  {
    path: '',
    component: KitchenListComponent,
    // canActivate: [AuthGuard],
    // resolve: { myKitchen: MyKitchenResolver }
  }
];

@NgModule({
  declarations: [MyKitchenComponent, KitchenListComponent, KitchenDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(kitchenRoutes),
  ],
  providers: [MyKitchenResolver]
})
export class KitchenModule { }
