import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from '../kitchen/kitchen';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AuthService } from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // ordersPlaced(id: string) {
  //   return this.afs.collection<ICheckout>(this.ordersColl, ref => ref.where('buyer.id', '==', id)).snapshotChanges();
  // }

  // myOrdersPlaced$ = this.afs.collection<IOrder>('orders', ref => ref.where('buyerInfo.uid', '==', this.uid)).snapshotChanges().pipe(
  //   catchError(e => {
  //     console.error('Error while fetching kitchens from firebase: ', e);
  //     return EMPTY;
  //   })
  // );



  constructor( private afs: AngularFirestore) {}

  getOrdersPlaced(uid: string) {
    return this.afs.collection<IOrder>('orders', ref => ref.where('buyerInfo.uid', '==', uid)).snapshotChanges().pipe(
      catchError(e => {
        console.error('Error while fetching kitchens from firebase: ', e);
        return EMPTY;
      })
    );
  }
}
