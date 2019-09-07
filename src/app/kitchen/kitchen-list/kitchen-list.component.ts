import { Component, OnInit } from '@angular/core';
import { KitchenService } from '../kitchen.service';
import { Observable } from 'rxjs';
import { IKitchen } from '../kitchen';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AuthService } from 'src/app/core/auth.service';
import { AppUser } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {
  kitchens$: Observable<IKitchen[]>;
  currentUser: AppUser;

  constructor(private ks: KitchenService, private auth: AuthService, private router: Router) {
    this.currentUser = this.auth.currUser;
   }

  ngOnInit() {
    this.kitchens$ = this.ks.getKitchenList();
  }

  navigateTo(kitchenId: string, ownerId: string) {
    console.log('kitchenId:ownerId', kitchenId, ' - ', ownerId);
    if (ownerId === this.currentUser.uid) {
      this.router.navigate(['my-kitchen/', kitchenId]);
    } else {
      this.router.navigate([kitchenId]);
    }
    // if (this.currentUser.uid === )
    // [kitchen.ownerId == currentUser.uid ? 'my-kitchen/', user.kitchenId : kitchen.id]
  }

}
