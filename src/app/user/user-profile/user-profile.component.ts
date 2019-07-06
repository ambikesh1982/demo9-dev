import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/core/models';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: Observable<AppUser>;

  constructor(private router: Router, private auth: AuthService) {
    this.currentUser = this.auth.currUser$;
  }

  loginGoogle(address: string) {
    this.auth.upgradeAnonymosToSocial().then(() => this.router.navigate(['/']));
    // this.auth.googleSignin(address);

  }

  ngOnInit() {
  }

}
