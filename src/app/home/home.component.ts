import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  userGeo: string;
  userGeoSelected: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.userGeo = null;
    this.userGeoSelected = false;
  }

  ngOnInit() {
  }

  collectUserGeoInfo(geo) {
    console.log(geo);
    this.userGeo = geo;
    this.userGeoSelected = true;
  }

  resetInput() {
    this.userGeo = null;
    this.myControl.reset();
  }

  googleSignIn() {
    this.auth.googleSignin();
  }

  enterTheApp() {
    console.log('TODO: Collect user geo information: ', this.userGeo);
    console.log('TODO: Login Anonymously');
    this.auth.loginAnonymously(this.userGeo).then( () => {
      console.log('TODO: Redirect user to product/list page');
      this.router.navigate(['/']);
    });
    console.log('TODO: Create Guest user in firebase');

  }

}
