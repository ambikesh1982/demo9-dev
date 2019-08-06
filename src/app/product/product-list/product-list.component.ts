import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/models';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  fooditems: Observable<Fooditem[]>;

  constructor(
    public auth: AuthService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.fooditems = this.productService.getFooditemList();
  }

  actUponCardAction(event, itemId) {
    console.log('actUponCardAction: ', itemId);
    this.router.navigate(['product', itemId]);

  }

}
