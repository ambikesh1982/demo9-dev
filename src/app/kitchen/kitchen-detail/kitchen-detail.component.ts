import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KitchenService } from '../kitchen.service';
import { IKitchen, IMenuItem, IOrder } from '../kitchen';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {
  kitchen: IKitchen;
  menuItems$: Observable<IMenuItem[]>;
  menuItems: IMenuItem[];
  order: IOrder;
  summary: {count: number, total: number};

  constructor(private route: ActivatedRoute, private ks: KitchenService) {
    this.summary = {count: 0, total: 0};
   }

  ngOnInit() {
    this.kitchen = this.route.snapshot.data.myKitchen;
    this.menuItems$ = this.ks.getMenuItems(this.kitchen.kid).pipe(
      tap(items => this.menuItems = items)
    );
  }

  updateMyOrder(id: string, qty: number) {
    const index = this.menuItems.findIndex((item: IMenuItem) => item.id === id);
    this.menuItems[index].qty = this.menuItems[index].qty + qty;
    const itemsToOrder = this.menuItems.filter(i => i.qty > 0);
    this.summary = this.orderReducer(itemsToOrder);

    const order: IOrder = {
      buyerInfo: {uid: '123456', name: 'temp'},
      kitchenInfo: {kid: this.kitchen.kid, name: this.kitchen.title},
      orderValue: this.summary.total,
      itemsCount: this.summary.count,
      items: itemsToOrder
    };

    this.order = order;

  }

  orderReducer(items: IMenuItem[]): {count: number, total: number} {
    const itemsCount = items.map(i => i.qty).reduce((a, c) => a + c, 0);
    const orderValue = items.map(i => i.qty * i.price).reduce((a, t) => a + t, 0);
    return { count: itemsCount, total: orderValue};
  }

  prepareOrder() {
    console.log('My Order >> ', this.order);
  }


}
