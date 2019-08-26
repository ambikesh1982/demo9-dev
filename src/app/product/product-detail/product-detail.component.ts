import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  fooditem: Fooditem;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.fooditem = this.route.snapshot.data.product;
  }

}
