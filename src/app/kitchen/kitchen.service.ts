import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IKitchen, IMenuItem } from './kitchen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchenCollPath: string;
  constructor(private afs: AngularFirestore) {
    this.kitchenCollPath = 'kitchen';
  }

  getKitchenList(): Observable<IKitchen[]> {
    // return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({idField: 'kid'});
    return this.afs.collection<IKitchen>(this.kitchenCollPath).valueChanges({ idField: 'kid' });
  }

  getKitchenDetails(uid: string) {
    const myKitchen = `${this.kitchenCollPath}/${uid}`;
    return this.afs.doc<any>(myKitchen).valueChanges();
  }

  getMenuItems(kid: string): Observable<IMenuItem[]> {
    const path = `kitchen/${kid}/menu`;
    return this.afs.collection<IMenuItem>(path).valueChanges();
  }

  createKitchen() {}
  updateKitchen(kid: string) {}
  deleteKitchen(kid: string) {}
  addMenuItems() {}
  updateMenuItems(id: string) {}
  deleteMenuItems(id: string) {}


 }
