import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


const ordersRoutes: Routes = [
  {
    path: ':uid',
    component: OrderListComponent,
    // canActivate: [AuthGuard],
    // resolve: { myKitchen: MyKitchenResolver }
  }
];

@NgModule({
  declarations: [OrderListComponent, OrderHistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ordersRoutes),
  ]
})
export class OrdersModule { }
