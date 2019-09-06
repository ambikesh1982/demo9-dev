import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KitchenService } from '../kitchen.service';
import { IKitchen, IMenuItem, IOrder } from '../kitchen';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/core/dialog.service';
import { AuthService } from 'src/app/core/auth.service';
import { AppUser } from 'src/app/core/models';

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
  kitchenId;
  canNavigateAway: boolean;
  currUser: AppUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: DialogService,
    private ks: KitchenService,
    private location: Location) {
      this.canNavigateAway = true;
      this.summary = {count: 0, total: 0};
      this.currUser = this.auth.currUser;
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kitchenId = params.get('kid');
    });
    this.kitchen = this.route.snapshot.data.myKitchen;
    this.menuItems$ = this.ks.getMenuItems(this.kitchenId).pipe(
      tap(items => {
        this.menuItems = items;
        console.log('menuItems >>>', items);
      })
    );
  }

  updateMyOrder(id: string, qty: number) {
    const index = this.menuItems.findIndex((item: IMenuItem) => item.id === id);
    this.menuItems[index].qty = this.menuItems[index].qty + qty;
    const itemsToOrder = this.menuItems.filter(i => i.qty > 0);
    this.summary = this.orderReducer(itemsToOrder);
    if (this.summary.count > 0) {
      const order: IOrder = {
        buyerInfo: { uid: this.currUser.uid, name: this.currUser.displayName },
        kitchenInfo: { kid: this.kitchenId, name: this.kitchen.title },
        orderValue: this.summary.total,
        itemsCount: this.summary.count,
        items: itemsToOrder
      };
      this.order = order;
      this.canNavigateAway = false;
    } else {
      this.canNavigateAway = true;
    }
  }

  orderReducer(items: IMenuItem[]): {count: number, total: number} {
    const itemsCount = items.map(i => i.qty).reduce((a, c) => a + c, 0);
    const orderValue = items.map(i => i.qty * i.price).reduce((a, t) => a + t, 0);
    return { count: itemsCount, total: orderValue};
  }

  prepareOrder() {
    console.log('My Order >> ', this.order);
  }

  goBack() {
    this.router.navigate(['/']);
    // this.location.back();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.canNavigateAway) {
      return this.dialog.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
  }

}
