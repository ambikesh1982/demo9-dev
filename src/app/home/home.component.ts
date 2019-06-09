import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  getGeoInfo(geo) {
    console.log('geoInfo returned from appGooglePlaces directive: ', geo);
  }

}
