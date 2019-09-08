import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppUser } from './core/models';
import { SnackbarNotificationService } from './core/snackbar-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'Yummz9*';
  title = null;
  isLoading: boolean;
  currUser$: Observable<AppUser>;

  constructor(public auth: AuthService, private router: Router, private notify: SnackbarNotificationService) {
    this.isLoading = false;
    this.router.events.subscribe((e: Event) => {
      this.checkRouterEvent(e);
    });
  }

  checkRouterEvent(e: Event): void {
    if (e instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (
      e instanceof NavigationEnd ||
      e instanceof NavigationCancel ||
      e instanceof NavigationError
    ) {
      this.isLoading = false;
    }
  }

  ngOnInit() {
    this.currUser$ = this.auth.currUser$.pipe(
      tap(user => this.notify.openSnackBar(`Welcome ${user.displayName} !`))
    );

    // of(0, 1, 2, 3, 4, 5).pipe(
    //   tap(x => console.log(x)),
    //   map(i => 2 / i),
    //   take(3),
    // ).subscribe(console.log);
  }

}
