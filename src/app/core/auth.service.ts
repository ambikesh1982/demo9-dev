import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { AppUser } from './models';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap, switchMap, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

interface AppUser {
  uid: string;
  isAnonymous: boolean;
  displayName?: string;
  photoURL?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser$: Observable<AppUser | null>;
  currUser: AppUser | null;
  dbAppUserRoot = 'users';

  constructor(private db: AngularFirestore, private af: AngularFireAuth, private router: Router) {
    this.currUser$ = this.af.authState.pipe(
      switchMap( user => {
        if (user) {
          console.log('Raw User-info from firebase-auth: ', user);
          return this.getAppUser(user.uid).pipe(
          tap( cu => this.currUser = cu )
          );
        } else {
          this.currUser = null;
          return of(null);
        }
      }),
      tap(user => localStorage.setItem('app-user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('app-user')))
    );
  }


  // ..... App User ..... //
  getAppUser(uid: string): Observable<AppUser> {
    const userDoc = `${this.dbAppUserRoot}/${uid}`;
    return this.db.doc<AppUser>(userDoc).valueChanges();
  }

  getCurrentUser(): Promise<AppUser> {
    return this.currUser$.pipe(first()).toPromise();
  }

  async upgradeAnonymosToSocial() {
    const provider = new auth.GoogleAuthProvider();
    const credential: firebase.auth.UserCredential = await this.af.auth.signInWithPopup(
      provider
    );
    this.af.auth.currentUser.linkWithPopup(provider).then(resp => {
      console.log('ToDo: Update User info');
      const upgradedUser: AppUser = {
        uid: resp.user.uid,
        isAnonymous: resp.user.isAnonymous,
        displayName: resp.user.displayName,
        photoURL: resp.user.photoURL
      };
      this.addUpdateUserDB(upgradedUser);
      console.log('Anonymous User upgraded: ', resp);
    });
  }

  async loginAnonymously(geo: string): Promise<void> {
    console.log('#Event: loginAnonymously()#');
    return this.af.auth.signInAnonymously()
      .then((credential: firebase.auth.UserCredential) => {
        console.log(credential);
        const anomymousUser: AppUser = {
          uid: credential.user.uid,
          isAnonymous: credential.user.isAnonymous,
          address: geo,
          displayName: 'Guest',
          photoURL: '/assets/profile_placeholder.png'
        };

        // Save user data to fireabase...
        console.log('loginAnonymously(): Sign in successfull...');
        this.addUpdateUserDB(anomymousUser);

      })
      .catch(
        (e: firebase.FirebaseError) => {
          this.handleAuthErrors(e);
        });
  }

  async googleSignin() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential: firebase.auth.UserCredential = await this.af.auth.signInWithPopup(
        provider
      );
      this.router.navigate(['/user/', credential.user.uid]);
      // // Prepare user data //
      // const googleUser: AppUser = {
      //   uid: credential.user.uid,
      //   isAnonymous: credential.user.isAnonymous,
      //   displayName: credential.user.displayName,
      //   photoURL: credential.user.photoURL,
      //   // providerId: credential.user.providerId,
      //   // geoInfo: geo
      // };
      // this.addUpdateUserDB(googleUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
  }

  async addUpdateUserDB(user: AppUser) {
    const userDoc = `${this.dbAppUserRoot}/${user.uid}`;
    const userRef: AngularFirestoreDocument<AppUser> = this.db.doc(userDoc);
    return userRef
      .set(user, { merge: true })
      .then(_ => {
        // this.notify.openSnackBar(userData.displayName + 'saved!!');
      })
      .catch(e => {
        console.log('Error: User not created' + e);
      });
  }

  upgradeAnonymousUser() {
    // TODO: Upgrade anonymous user to google.
  }


  async signOut() {
    await this.af.auth.signOut();
    // this.notify.openSnackBar('We will miss you!');
    this.router.navigate(['/']);
  }


  handleAuthErrors(e: firebase.FirebaseError) {
    // this.notify.openSnackBar(e.code);
    // Firebase Auth Error Codes...
    // auth/app-deleted
    // auth/app-not-authorized
    // auth/argument-error
    // auth/invalid-api-key
    // auth/invalid-user-token
    // auth/network-request-failed
    // auth/operation-not-allowed
    // auth/requires-recent-login
    // auth/too-many-requests
    // auth/unauthorized-domain
    // auth/user-disabled
    // auth/user-token-expired
    // auth/web-storage-unsupported
    switch (e.code) {
      case 'auth/operation-not-allowed':
        console.log('Error:... auth not enabled in the Firebase Console.');
        break;
      default:
        console.error('Error:...', e.code);
        console.error('Error:...', e.message);
        break;
    }

  }


}
