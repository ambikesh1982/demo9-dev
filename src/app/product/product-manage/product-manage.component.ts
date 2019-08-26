import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Fooditem, ImageObj } from 'src/app/core/models';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit, OnDestroy {

  fooditem: Fooditem;
  productStorageBucket: string;
  productForm: FormGroup;
  serving: (string|number)[];
  fabIcon: string;
  disableFabAction: boolean;
  isNewFooditem: boolean;
  newItemID: string;

  constructor(private auth: AuthService,
              private productService: ProductService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.disableFabAction = true;
    this.serving = [1, 2, 3, 4, '4+'];
    this.createProductForm();
   }

  ngOnInit() {
    this.fooditem = this.route.snapshot.data.product;
    console.log('Fooditem from the resolver: ', this.fooditem);
    if (this.fooditem) {
      console.log('>>>> ExistingItem: Populate form with fooditem details. <<<<');
      this.isNewFooditem = false;
      this.disableFabAction = false;
      this.productStorageBucket = `products/${this.fooditem.id}`;
      this.rebuildProductForm(this.fooditem);
    }
    if (this.fooditem === undefined) {
      console.log('>>>> NewItem: Initailize empty form. <<<<');
      this.isNewFooditem = true;
      this.newItemID = this.productService.newFirebaseDocumentKey;
      this.productStorageBucket = `products\${this.newItemID}`;
    }
  }

  createProductForm() {
    this.productForm = this.fb.group({
      image: this.fb.group({
        path: ['', Validators.required],
        url: ['', Validators.required],
      }),
      title: ['', Validators.required],
      price: [0.0, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: [true, Validators.required],
      orderType: ['instant', Validators.required],
    });
  }

  storeImageDetails(image: ImageObj) {
    console.log('Image details: ', image);
    if (image) {
      this.productForm.get('image').setValue(image);
    } else {
      this.productForm.get('image').reset();
    }
  }

  rebuildProductForm(product: Fooditem): Fooditem {
    console.log('Populating productForm with input fooditem data.', product);

    Object.keys(this.productForm.value).forEach(item => {
      this.productForm.get(`${item}`).patchValue(product[item]);
    });
    return product;
  }


  prepareProduct(productdata) {
    const fooditem = {
      isNew: this.isNewFooditem,
      id: this.isNewFooditem ? this.newItemID : this.fooditem.id,
      title: productdata.title,
      price: productdata.price,
      isNonVeg: productdata.isNonVeg,
      orderType: productdata.orderType,
      serving: productdata.serving,
      image: productdata.image,
      likeCount: 0,
      createdAt: new Date(),
      createdBy: {
        uid: this.auth.currUser.uid,
        name: this.auth.currUser.displayName,
        photoURL: this.auth.currUser.photoURL}
    };
    console.log('Fooditem>>>> ', fooditem);
    this.productService.addUpdateFooditem(fooditem)
    .then(_ => {
      this.router.navigate(['/']);
    }).catch(e => console.error('addUpdateFooditem() Failed ', e));
  }

  onPostFooditem(fromValue) {
    this.prepareProduct(fromValue);
  }

  ngOnDestroy() {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }

}
