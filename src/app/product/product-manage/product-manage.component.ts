import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {
  productPath: string;
  productForm: FormGroup;
  imageForm: FormGroup;
  serving: (string|number)[];
  fabIcon: string;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.productPath = 'products/001';
    this.serving = [1, 2, 3, 4, 'More'];
    this.createProductDetailForm();
    this.createImageForm();
   }

   showImageDetails(image) {
     console.log('Image details: ', image);
     if (image) {
      //  this.imageForm.get('path').setValue(image.path);
      //  this.imageForm.get('url').setValue(image.url);
      this.imageForm.setValue({
        path: image.path,
        url: image.url
      });
     } else {
       this.imageForm.reset();
     }
   }

  ngOnInit() { }

  createImageForm() {
    this.imageForm = this.fb.group({
        path: ['', Validators.required],
        url: ['', Validators.required],
    });
  }

  createProductDetailForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0.0, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: [true, Validators.required],
      orderType: ['instant', Validators.required],
    });
  }

  rebuildProductForm(product: Product): Product {
    console.log('Populating productForm with input fooditem data.', product);

    Object.keys(this.productForm.value).forEach(item => {
      this.productForm.get(`${item}`).patchValue(product[item]);
    });
    return product;
  }

  postItem(imageData, productdata) {
    const fooditem: Product = {
      isNew: true,
      id: '2',
      title: productdata.title,
      price: productdata.price,
      isNonVeg: productdata.isNonVeg,
      orderType: productdata.orderType,
      serving: productdata.serving,
      images: {path: imageData.path, url: imageData.url},
      likeCount: 0,
      createdAt: new Date(),
      createdBy: {
        uid: this.auth.currUser.uid,
        name: this.auth.currUser.displayName,
        profilePicURL: this.auth.currUser.photoURL}
    };
    console.log('Fooditem>>>> ', fooditem);
  }
  // prepareProduct(form: FormGroup) {
  //   const tempProduct: Product = {
  //     id: '',
  //     title: form.get('title').value,
  //     price: form.get('price').value,

  //   };
  //   console.log(tempProduct);
  // }

}
