import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderPlaced: Observable<any>;
  orderReceived;
  uid;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('uid');
    });

    console.log('Uid from pram-map: ', this.uid);

    this.orderPlaced = this.orderService.getOrdersPlaced(this.uid)
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        ));

    // this.orderReceived = this.orderService.myOrdersReceived$;
  }

}
