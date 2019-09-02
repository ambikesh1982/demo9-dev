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

  constructor(private afs: AngularFirestore) {
    this.kitchenCollPath = 'kitchen';
    this.menuSubCollPath = 'menuItems';
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
    return this.afs.collection<IMenuItem>(path).add(menu);
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
