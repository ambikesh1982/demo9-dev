import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, take, catchError, tap, map } from 'rxjs/operators';
import { Fooditem } from '../core/models';
import { KitchenService } from './kitchen.service';
import { IKitchen } from './kitchen';


@Injectable()
export class MyKitchenResolver implements Resolve<any> {

  constructor(
    private ks: KitchenService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKitchen> {
    const kid = route.paramMap.get('kid');
    return this.ks.getKitchenDetails(kid).pipe(
      delay(2000), // added a delay to test loading spinner. To be removed later.
      take(1),
      tap(resp => console.log('MyKitchenResolver: resp >>', resp)),
      catchError(e => {
        const message = `Retrieval error: ${e}`;
        console.error('MyKitchenResolver: error >>', e);
        return of({kitchen: null, error: message});
        // return of({ product: null, error: message });
      })
    );

  }
}
