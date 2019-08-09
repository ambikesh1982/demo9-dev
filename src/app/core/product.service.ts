import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay, catchError } from 'rxjs/operators';
import { Fooditem, Filter, ImageObj } from './models';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentFilter$: BehaviorSubject<Filter | null>;
  fooditems$: Observable<Fooditem[]>;
  fooditemRoot: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.fooditemRoot = 'fooditems';
  }

  // ..... Firebase getter methods ..... //
  get newFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }


  // getFooditemList(): Observable<Fooditem[]> {
  //   return this.currentFilter$.pipe(
  //     switchMap((filter) =>
  //       this.afs.collection<Fooditem>(this.fooditemRoot, ref => {
  //         let query: firebase.firestore.Query = ref.orderBy('createdAt', 'desc');
  //         if (filter.orderType != null) {
  //           // Change orderType from boolean to string value: OrderType in db is a string;
  //           query = query.where('orderType', '==', filter.orderType ? 'instant' : 'preOrder');
  //         }
  //         if (filter.isNonVeg != null) {
  //           query = query.where('isNonVeg', '==', filter.isNonVeg);
  //         }
  //         return query;
  //       }).valueChanges()
  //     ),
  //     shareReplay(),
  //     catchError(e => {
  //       console.error('error from getFooditemList()>>', e);
  //       return throwError(e);
  //     }));
  // }


  getFooditemList(): Observable<Fooditem[]> {
    return this.afs.collection<Fooditem>(this.fooditemRoot).valueChanges();
  }

  applyFilter(filter: Filter) {
    this.currentFilter$.next(filter);
  }

  clearFilters() {
    this.currentFilter$.next({});
  }

  getFooditemByID(productId: string): Observable<Fooditem> {
    const productDoc = `${this.fooditemRoot}/${productId}`;
    return this.afs.doc<Fooditem>(productDoc).valueChanges();
  }

  getFooditemsByUser(uid: string): Observable<Fooditem[]> {
    return this.afs.collection<Fooditem>(this.fooditemRoot, ref => {
      let query: firebase.firestore.Query = ref;
      query = query.where('createdBy.id', '==', uid);
      return query;
    }).valueChanges();
  }

  async addUpdateFooditem(fooditem: Fooditem) {
    const fooditemDoc = `${this.fooditemRoot}/${fooditem.id}`;
    return this.afs.doc<Fooditem>(fooditemDoc).set(fooditem, {merge: true})
      .then(_ => console.log('New fooditem created!!'))
      .catch(err => console.log('Error during add/update fooditem: ', err));
  }


  deleteFooditem(fooditem: Fooditem): Promise<any> {
    const productDoc = `${this.fooditemRoot}/${fooditem.id}`;
    return this.afs.doc<Fooditem>(productDoc).delete()
      .then(_ => {
        console.log('1. Fooditem deleted>>>');
        console.log('2. Cleaning storage>>> ', fooditem.image.path);
        this.storage.ref(fooditem.image.path).delete();

    })
      .catch(err => console.log('Error during delete fooditem: ', err));
  }

}
