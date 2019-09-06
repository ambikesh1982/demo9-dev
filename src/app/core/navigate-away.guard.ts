import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigateAwayGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent): Observable<boolean> | boolean {
    console.log('From canDeactivagte guard!!!');
    return component.canDeactivate();
  }

}
