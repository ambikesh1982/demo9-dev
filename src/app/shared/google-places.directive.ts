/// <reference types="@types/googlemaps" />
import { Directive, OnInit, Output, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { ScriptLoadService } from '../core/script-load.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';


@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {

  private element: HTMLInputElement;
  @Output() addressFromGoogle: EventEmitter<any> = new EventEmitter();

  constructor(
    private script: ScriptLoadService,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    ) {
      this.element = elementRef.nativeElement;
    }

  ngOnInit() {
    console.log('Start loading google maps scrtip...');
    this.script.load({ name: 'googleMap', url: environment.googleMapURL, id: 'googleMap'})
      .then(resp => {
        this.placeAutoComplete(this.element);
      });
  }

  placeAutoComplete(searchElement: HTMLInputElement) {
    const autoComplete = new google.maps.places.Autocomplete(searchElement);

    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autoComplete.getPlace();
        if (place.geometry) {
          const geoInfo = new firebase.firestore.GeoPoint(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
          this.addressFromGoogle.emit(geoInfo);
        } else {
          console.log('No such place found! please retry...');
          this.addressFromGoogle.emit(null);
        }
      });
    });
  }

}
