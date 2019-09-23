import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  @Input() title: string;

  constructor(public auth: AuthService, private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  ngOnInit() {
  }

  googleSignIn() {
    this.auth.upgradeAnonymosToSocial();
  }

}
