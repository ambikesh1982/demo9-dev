import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { FirebaseImage, Fooditem } from 'src/app/core/models';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  unsubscribe$ = new Subject<void>();
  fooditem: Fooditem;
  productForm: FormGroup;
  imageForm: FormGroup;
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
    this.createProductDetailForm();
    this.createImageForm();
   }

   showImageDetails(image: FirebaseImage) {
     console.log('Image details: ', image);
     if (image) {
      this.imageForm.setValue({
        path: image.path,
        url: image.url
      });
     } else {
       this.imageForm.reset();
     }
   }

  ngOnInit() {
    this.fooditem = this.route.snapshot.data.product;
    console.log('Fooditem from the resolver: ', this.fooditem);
    if (this.fooditem) {
      console.log('>>>> ExistingItem: Populate form with fooditem details. <<<<');
      this.isNewFooditem = false;
      this.rebuildProductForm(this.fooditem);
    }
    if (this.fooditem === undefined) {
      console.log('>>>> NewItem: Initailize empty form. <<<<');
      this.isNewFooditem = true;
      this.newItemID = this.productService.newFirebaseDocumentKey;
    }

    // Controlling form behaviour(previous, next)
    const mergedForms$ = merge(this.imageForm.statusChanges, this.productForm.statusChanges);
    mergedForms$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(formStatus => {
      if (formStatus === 'VALID') {
              this.disableFabAction = false;
            } else {
              this.disableFabAction = true;
            }
    });
  }

  ngAfterViewInit() {
    this.stepper.selectionChange.pipe(takeUntil(this.unsubscribe$))
    .subscribe(c => {
      this.disableFabAction = !c.selectedStep.completed;
      console.log('From stepper >>>>', c.selectedStep.completed);
    });
  }

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

  rebuildProductForm(product: Fooditem): Fooditem {
    console.log('Populating productForm with input fooditem data.', product);

    Object.keys(this.productForm.value).forEach(item => {
      this.productForm.get(`${item}`).patchValue(product[item]);
    });
    return product;
  }

  stepperAction(stepper: MatStepper) {


    if (stepper.selectedIndex === 1) {
        this.prepareProduct(this.imageForm.value, this.productForm.value);
    } else {
      stepper.next();
      this.disableFabAction = true;
    }
    console.log('Stepper event: ', stepper);
  }

  prepareProduct(imageData, productdata) {
    const fooditem = {
      isNew: this.isNewFooditem,
      id: this.newItemID,
      title: productdata.title,
      price: productdata.price,
      isNonVeg: productdata.isNonVeg,
      orderType: productdata.orderType,
      serving: productdata.serving,
      image: {path: imageData.path, url: imageData.url},
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
    }).catch(e => console.error('addUpdateFooditem() Failed '));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
