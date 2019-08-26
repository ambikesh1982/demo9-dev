import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/models';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';

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
    private cart: CartService,
    private router: Router) { }

  ngOnInit() {
    this.fooditems = this.productService.getFooditemList();
  }

  actUponCardAction(action: string, fi: Fooditem) {
    switch (action) {
      case 'add':
        // this.router.navigate(['add-product', itemId]);
        console.log('TODO: Add order');
        this.addOrder(fi);
        break;
      case 'edit':
        this.router.navigate(['product', fi.id]);
        break;
    }

  }


  addOrder(fi: Fooditem) {
    this.cart.add2Cart(fi);
    }

}
