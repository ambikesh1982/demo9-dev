import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [OrderListComponent, OrderHistoryComponent],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }
