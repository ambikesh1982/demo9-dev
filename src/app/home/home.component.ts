import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  userGeo: string;

  constructor(private auth: AuthService) {
    this.userGeo = null;
  }

  ngOnInit() {
  }

  collectUserGeoInfo(geo) {
    this.userGeo = geo;
  }

  enterTheApp() {
    console.log('TODO: Collect user geo information: ', this.userGeo);
    console.log('TODO: Login Anonymously');
    this.auth.loginAnonymously(this.userGeo);
    console.log('TODO: Create Guest user in firebase');

  }

}
