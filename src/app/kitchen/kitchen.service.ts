import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IKitchen, IMenuItem, IOrder } from './kitchen';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import * as firebase from 'firebase';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchenCollPath = 'kitchen';
  ordersCollPath = 'orders';
  menuSubCollPath = 'menuItems';
  db: firebase.firestore.WriteBatch;
  increment;
  decrement;

  kitchens$ = this.afs.collection<IKitchen>('kitchen').valueChanges({ idField: 'id' }).pipe(
    catchError( e => {
      console.error('Error while fetching kitchens from firebase: ', e);
      return EMPTY;
    })
  );

  constructor(private afs: AngularFirestore) {
    this.increment = firebase.firestore.FieldValue.increment(1);
    this.decrement = firebase.firestore.FieldValue.increment(-1);
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get newFirebaseDocumentKey() {
    return this.afs.createId();
  }

  // getKitchenList(): Observable<IKitchen[]> {
  //   // return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({idField: 'kid'});
  //   return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({ idField: 'id' });
  // }

  getKitchenDetails(id: string) {
    if (id === 'new') {
      return of(this.initializeKitchen());
    }
    const myKitchen = `${this.kitchenCollPath}/${id}`;
    return this.afs.doc<any>(myKitchen).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  getMenuItems(kid: string): Observable<IMenuItem[]> {
    const path = `kitchen/${kid}/menuItems`;
    return this.afs.collection<IMenuItem>(path).valueChanges({idField: 'id'}).pipe(
      catchError(this.handleError)
    );
  }

  createMenuItem(kid: string, menu: IMenuItem) {
    const path = `kitchen/${kid}/menuItems`;
    const itemId = this.newFirebaseDocumentKey;
    const itemDocRef = this.afs.collection(path).doc(itemId).ref;
    const kitchenDocRef = this.afs.doc(`kitchen/${kid}`).ref;
    const batch = this.afs.firestore.batch();
    batch.set(itemDocRef, menu);
    batch.set(kitchenDocRef, { menuItemsCount: this.increment}, {merge: true});
    return batch.commit();
    // return this.afs.collection<IMenuItem>(path).add(menu);
  }

  async deleteMenuItem(kid: string, itemId: string) {
    const path = `kitchen/${kid}/menuItems`;
    const itemDocRef = this.afs.collection(path).doc(itemId).ref;
    const kitchenDocRef = this.afs.doc(`kitchen/${kid}`).ref;
    const batch = this.afs.firestore.batch();
    batch.delete(itemDocRef);
    batch.set(kitchenDocRef, { menuItemsCount: this.decrement }, { merge: true });
    return batch.commit();
  }

  async createKitchen(kitchen: IKitchen): Promise<void> {
    const batch = this.afs.firestore.batch();
    const userDocRef = this.afs.collection('users').doc(kitchen.ownerId).ref;
    const kitchenDocRef = this.afs.collection(this.kitchenCollPath).doc(kitchen.id).ref;

    batch.set(kitchenDocRef, kitchen, { merge: true });
    batch.set(userDocRef, { kitchenId: kitchen.id }, { merge: true });
    return batch.commit();
  }

  async updateKitchen(kitchen: IKitchen): Promise<void> {
    const kitchenDocRef = this.afs.collection(this.kitchenCollPath).doc(kitchen.id).ref;
    return kitchenDocRef.set(kitchen, {merge: true});
  }


  initializeKitchen(): IKitchen {
    return {
      ownerId: null,
      title: null,
      address: null,
      image: {path: '', url: ''},
      description: null,
      menuItemsCount: 0,
      likeCount: 0,
      createdAt: null,
      id: null
    };
  }

  // ownerId: string;
  // title: string;
  // address: string;
  // image: { path: string, url: string };
  // description: string;
  // // pureVeg: boolean;
  // menuItemsCount: number;
  // likeCount: number;
  // createdAt: firebase.firestore.FieldValue;
  // id?: string;


  deleteKitchen(kid: string) {}
  addMenuItems() {}
  updateMenuItems(id: string) {}
  deleteMenuItems(id: string) {}

  async addOrder(order: IOrder) {
    const orderId = this.newFirebaseDocumentKey;
    order.orderId = orderId;
    console.log('TODO: Add order to database: ', order);
    return this.afs.collection(this.ordersCollPath).doc(orderId).set(order, {merge: true});
  }


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


 }
