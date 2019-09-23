import { Component, OnInit } from '@angular/core';
import { KitchenService } from '../kitchen.service';
import { Observable } from 'rxjs';
import { IKitchen } from '../kitchen';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AuthService } from 'src/app/core/auth.service';
import { AppUser } from 'src/app/core/models';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {
  kitchens$: Observable<IKitchen[]>;
  currentUser: AppUser;
  emptyList = true;

  constructor(private ks: KitchenService, private auth: AuthService, private router: Router) {
    this.currentUser = this.auth.currUser;
   }

  ngOnInit() {
    this.kitchens$ = this.ks.kitchens$.pipe(
      tap( kitchens => {
        console.log('Fetching kitchens for the list: ', kitchens);
        if (kitchens.length !== 0) {
          this.emptyList = false;
          console.log('# of kitchens returned: ', kitchens.length);
        }
      })
    );
  }


  navigateTo(kitchen: IKitchen) {
    console.log('Kitchen selected: ', kitchen);
    if (kitchen.ownerId === this.currentUser.uid) {
      this.router.navigate(['kitchen', kitchen.id, 'my-kitchen']);
    } else {
      this.router.navigate(['kitchen', kitchen.id]);
    }
  }

}
