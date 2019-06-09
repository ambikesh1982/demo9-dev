import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

    constructor(private auth: AuthService, private router: Router) { }
  async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {
      const user = await this.auth.currentUser;
      if (!!user) {
        return true;
      } else {
        console.log('Unauthorised User >>>>>> : Redirecting to home page');
        // this.router.navigate(['user', user.uid], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
  
}
