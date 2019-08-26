import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchenCollPath: string;
  constructor(private afs: AngularFirestore) {
    this.kitchenCollPath = 'kitchen';
  }

  getKitchenDetails(uid: string) {
    const myKitchen = `${this.kitchenCollPath}/${uid}`;
    return this.afs.doc<any>(myKitchen).valueChanges();
  }

  getFoodPosts(uid: string) {
    const path = `kitchen/${uid}/foodPosts`;
    return this.afs.collection(path).valueChanges();
  }
}
