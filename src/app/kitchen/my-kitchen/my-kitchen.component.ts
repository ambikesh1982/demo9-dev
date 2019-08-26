import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KitchenService } from '../kitchen.service';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})
export class MyKitchenComponent implements OnInit {
  myKitchen: any;
  foodPosts$: any;

  constructor(private route: ActivatedRoute, private ks: KitchenService) { }

  ngOnInit() {
    this.myKitchen = this.route.snapshot.data.myKitchen;
    this.foodPosts$ = this.ks.getFoodPosts(this.myKitchen.kid);
  }


}
