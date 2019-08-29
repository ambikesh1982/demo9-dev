import { Component, OnInit } from '@angular/core';
import { KitchenService } from '../kitchen.service';
import { Observable } from 'rxjs';
import { IKitchen } from '../kitchen';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {
  kitchens$: Observable<IKitchen[]>;
  constructor(private ks: KitchenService) { }

  ngOnInit() {
    this.kitchens$ = this.ks.getKitchenList();
  }

}
