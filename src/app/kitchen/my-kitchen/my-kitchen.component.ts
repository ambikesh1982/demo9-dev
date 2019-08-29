import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KitchenService } from '../kitchen.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})
export class MyKitchenComponent implements OnInit {
  myKitchen: any;
  foodPosts$: any;
  selectedItems: any;
  myOrder: {}[];
  itemsInOrder = 0;
  orderValue = 0;

  constructor(private route: ActivatedRoute, private ks: KitchenService) {
    this.myOrder = [];
   }

  ngOnInit() {
    this.myKitchen = this.route.snapshot.data.myKitchen;
    this.foodPosts$ = this.ks.getFoodPosts(this.myKitchen.id).pipe(
      tap(items => {
          items.forEach(item => {
            this.myOrder.push(item);
          });
          console.log('foodPosts>>', this.myOrder);
      })
    ).subscribe();
  }

  trackItem(index: number, item: any) {
    // console.log('trackItem', item.fid);
    return item ? item.fid : null;
  }

  updateMyOrder(id: string, qty: number) {
    const index = this.myOrder.findIndex(i => i.id === id);
    this.myOrder[index].qty = this.myOrder[index].qty + qty;
    console.log('index>> ', this.myOrder[index]);
    this.orderReducer();
  }

  orderReducer(): {}[] {
    const myOrder = this.myOrder.filter(i => i.qty > 0);
    this.itemsInOrder = myOrder.map(i => i.qty).reduce((a,c) => a + c, 0);
    this.orderValue = myOrder.map(i => i.qty * i.price).reduce((a, t) => a + t, 0);
    return myOrder;
  }

  prepareOrder() {
    const order = {}
    console.log('MyOrder: ', this.orderReducer());
  }



}
