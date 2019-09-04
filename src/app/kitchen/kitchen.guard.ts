import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KitchenGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.getCurrentUser();
    if (user.kitchenId) {
      console.log('User already has kitchen >>>>>> ', user.kitchenId);
      this.router.navigate(['my-kitchen', user.kitchenId]);
      return false;
    }
    console.error('No kitchen found: Setup a new one >>>>>> ');
    return true;

}
}
