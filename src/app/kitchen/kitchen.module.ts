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
import { CreateKitchenComponent } from './create-kitchen/create-kitchen.component';
import { SocialGuard } from '../core/social.guard';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { KitchenGuard } from './kitchen.guard';
import { NavigateAwayGuard } from '../core/navigate-away.guard';


const kitchenRoutes: Routes = [
  { path: ':kid',
    component: KitchenDetailComponent,
    canDeactivate: [NavigateAwayGuard],
    canActivate: [AuthGuard],
    resolve: {myKitchen: MyKitchenResolver}
  },
  {
    path: 'kitchen/new',
    component: CreateKitchenComponent,
    canActivate: [SocialGuard, KitchenGuard],
    resolve: { myKitchen: MyKitchenResolver }
  },
  {
    path: 'my-kitchen/:kid',
    component: MyKitchenComponent,
    canActivate: [SocialGuard],
    resolve: { myKitchen: MyKitchenResolver }
  },
  {
    path: '',
    component: KitchenListComponent,
    // canActivate: [AuthGuard],
    // resolve: { myKitchen: MyKitchenResolver }
  }
];

@NgModule({
  declarations: [MyKitchenComponent, KitchenListComponent, KitchenDetailComponent, CreateKitchenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(kitchenRoutes),
  ],
  providers: [MyKitchenResolver, KitchenGuard]
})
export class KitchenModule { }
