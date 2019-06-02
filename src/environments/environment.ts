// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2f1CqoyF3XhEuIPBXidqfXWTKPFyueIY&libraries=places',

  firebase: {
    apiKey: 'AIzaSyBN2Z4XVfAAwMVP_ox6rTR5I7mS4C7yyk0',
    authDomain: 'f00dz9-app.firebaseapp.com',
    databaseURL: 'https://f00dz9-app.firebaseio.com',
    projectId: 'f00dz9-app',
    storageBucket: 'f00dz9-app.appspot.com',
    messagingSenderId: '625229359791'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
