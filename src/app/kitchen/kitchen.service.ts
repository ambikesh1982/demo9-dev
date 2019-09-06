import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IKitchen, IMenuItem } from './kitchen';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchenCollPath: string;
  menuSubCollPath: string;
  db: firebase.firestore.WriteBatch;
  increment;
  decrement;

  constructor(private afs: AngularFirestore) {
    this.kitchenCollPath = 'kitchen';
    this.menuSubCollPath = 'menuItems';
    this.db = this.afs.firestore.batch();
    this.increment = firebase.firestore.FieldValue.increment(1);
    this.decrement = firebase.firestore.FieldValue.increment(-1);
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get newFirebaseDocumentKey() {
    return this.afs.createId();
  }

  getKitchenList(): Observable<IKitchen[]> {
    // return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({idField: 'kid'});
    return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({ idField: 'kid' });
  }

  getKitchenDetails(id: string) {
    const myKitchen = `${this.kitchenCollPath}/${id}`;
    return this.afs.doc<any>(myKitchen).valueChanges();
  }

  getMenuItems(kid: string): Observable<IMenuItem[]> {
    const path = `kitchen/${kid}/menuItems`;
    return this.afs.collection<IMenuItem>(path).valueChanges({idField: 'id'});
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

  async deleteMenuItem(menuItemDoc: string) {
    this.afs.doc(menuItemDoc).delete();
  }

  async createKitchen(kitchen: IKitchen) {
    const userDoc = this.afs.collection('users').doc(kitchen.ownerId);
    this.afs.collection(this.kitchenCollPath).add(kitchen)
      .then( resp => userDoc.set({ kitchenId: resp.id }, { merge: true }))
      .then(_ => console.log('New fooditem created!!'))
      .catch(err => console.log('Error during add/update fooditem: ', err));
  }


  updateKitchen(kid: string) {}
  deleteKitchen(kid: string) {}
  addMenuItems() {}
  updateMenuItems(id: string) {}
  deleteMenuItems(id: string) {}


 }
