import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, take, catchError, tap } from 'rxjs/operators';
import { Fooditem } from '../core/models';
import { ProductService } from '../core/product.service';


@Injectable()
export class ProductResolver implements Resolve<Fooditem> {

  constructor(
    private db: ProductService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fooditem> {
    const id = route.paramMap.get('id');
    return this.db.getFooditemByID(id).pipe(
      delay(2000), // added a delay to test loading spinner. To be removed later.
      take(1),
      tap(resp => {
        console.log('ProductResolver: resp >>', resp);
      }),
      catchError(e => {
        console.error('ProductResolver: error >>', e);
        return of(null);
      })
    );

  }
}
