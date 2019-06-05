import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppUser } from './models';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap } from 'rxjs/operators';

interface AppUser {
  uid: string;
  isAnonymous: boolean;
  displayName: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser$: Observable<AppUser | null>;
  currUser: AppUser | null;

  constructor(private auth: AngularFireAuth) {
    this.currUser$ = this.auth.authState.pipe(
      tap( user => {
        if (user) {
          console.log('<<<< User loggedin >>>>', user);
        } else {
          console.log('<<<< User not loggedin >>>>');
        }
      })
    );
  }

  get currentUser(): Promise<AppUser> {
    return this.currUser$.pipe(first()).toPromise();
  }

  async loginAnonymously() {
    console.log('AuthService.loginAnonymously()...');
    return this.auth.auth.signInAnonymously()
      .then((credential: firebase.auth.UserCredential) => {
        const anomymousUser: AppUser = {
          uid: credential.user.uid,
          isAnonymous: credential.user.isAnonymous,
          displayName: 'Guest',
          photoURL: '/assets/profile_placeholder.png'
        };
        this.currUser = anomymousUser;
  });
}

}
