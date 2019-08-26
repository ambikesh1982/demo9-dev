import { Injectable } from '@angular/core';
import { Fooditem } from '../core/models';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

interface ICartItem {
  sellerInfo: {};
  items: [{
    id: string;
    title: string;
    isNonVeg: boolean;
    // qty: firebase.firestore.FieldValue;
    // price: firebase.firestore.FieldValue;
    qty: number;
    price: number;
  }];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCollection = 'cart';
  currUser;
  getCartSize$ = new BehaviorSubject(0);
  cartDocRef: AngularFirestoreDocument;
  incrementByOne = firebase.firestore.FieldValue.increment(1);
  decrementByOne = firebase.firestore.FieldValue.increment(-1);


  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.prepareCart();
  }

  async prepareCart() {
    const user = await this.auth.getCurrentUser();
    console.log('Current UserID/CartID: ', user.uid);
    this.cartDocRef = this.afs.collection(this.cartCollection).doc(user.uid);
  }

  add2Cart(fi: Fooditem) {
    // Add item to the cart under collection<cart>/document<userid>
    // cart->buyerId->orders
    const ci = this.prepareItemForCart(fi);
    this.cartDocRef.set(ci, { merge: true }).then(resp => {
      console.log('add2Cart(fi: Fooditem): Success >>> ', resp);
    }).catch(e => {
      console.error('add2Cart(fi: Fooditem): Error >>>', e);
    });
  }

  private prepareItemForCart(fi: Fooditem): ICartItem {
    const addQtyByOne = firebase.firestore.FieldValue.increment(1);
    // const reducyQtyByOne = firebase.firestore.FieldValue.increment(-1);
    const addPrice = firebase.firestore.FieldValue.increment(fi.price);
    // const reducePrice = firebase.firestore.FieldValue.increment(fi.price * -1);
    const cartItem: ICartItem = {
      sellerInfo: { uid: fi.createdBy.uid, name: fi.createdBy.name },
      items: [{
        id: fi.id,
        title: fi.title,
        isNonVeg: fi.isNonVeg,
        // qty: addQtyByOne,
        // price: addPrice
        qty: 1,
        price: fi.price
      }]
    };
    return cartItem;

  }
}
