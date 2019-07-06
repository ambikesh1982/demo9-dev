import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocialGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.getCurrentUser();
    if (user.isAnonymous ) {
      console.log('Anonymous User >>>>>> : Redirecting to User page');
      this.router.navigate(['user', user.uid], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
