import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppUser } from './models';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private af: AngularFireAuth, private router: Router) {
    this.currUser$ = this.af.authState.pipe(
      tap( resp => {
        if (resp) {
          console.log('<<<< User loggedin >>>>', resp);
        } else {
          console.log('<<<< User not loggedin >>>>');
        }
      })
    );
  }

  get currentUser(): Promise<AppUser> {
    return this.currUser$.pipe(first()).toPromise();
  }

  async loginAnonymously(geo: string) {
    console.log('AuthService.loginAnonymously()...');
    return this.af.auth.signInAnonymously()
      .then((credential: firebase.auth.UserCredential) => {
        const anomymousUser: AppUser = {
          uid: credential.user.uid,
          isAnonymous: credential.user.isAnonymous,
          displayName: 'Guest',
          photoURL: '/assets/profile_placeholder.png',
          address: geo
        };
        this.currUser = anomymousUser;
        console.log('TODO: loginAnonymously(): User Data - ', this.currUser);
  });
}

async logout() {
  await this.af.auth.signOut();
  this.currUser = null;
  this.router.navigate(['/']);
}

}
