import { Component, OnInit, OnDestroy } from '@angular/core';
import { IKitchen } from '../kitchen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { KitchenService } from '../kitchen.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.scss']
})
export class CreateKitchenComponent implements OnInit, OnDestroy {

  kitchen: IKitchen;
  kitchen$: Observable<IKitchen>;
  kitchenForm: FormGroup;
  productStorageBucket = 'kitchen';
  isNewKitchen: boolean;

  constructor(
    private auth: AuthService,
    private ks: KitchenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.createEmptyForm(); // Create empty form
  }

  ngOnInit() {
    this.kitchen$ = this.route.paramMap.pipe(
      switchMap(params => {
        const kid = params.get('kid');
        this.isNewKitchen = kid === 'new';
        console.log('isNewKitchen: ', this.isNewKitchen);
        if (kid) {
          return this.ks.getKitchenDetails(kid);
        } else {
          return of(null);
        }
      }),
      tap((kitchen: IKitchen) => {
        console.log('Kitchen details >>>> ', kitchen);
        this.kitchen = kitchen;
        this.populateKitchenForm(this.kitchen);
      })
    );
  }

  populateKitchenForm(kitchen: IKitchen) {
    // Patch form fileds from the kitchen returned(New or Existing)
    this.kitchenForm.patchValue({
      ownerId: this.auth.currUser.uid,
      title: kitchen.title,
      description: kitchen.description,
      address: kitchen.address,
      image: kitchen.image // Cannot convert undefined or null to object
    });
  }


  createEmptyForm() {
    this.kitchenForm = this.fb.group({
      ownerId: ['', Validators.required],
      title: ['', Validators.required],
      address: ['', Validators.required],
      image: this.fb.group({
        path: ['', Validators.required],
        url: ['', Validators.required],
      }),
      description: ['', Validators.required],
      menuItemsCount: [0, Validators.required],
      likeCount: [0, Validators.required],
    });
  }

  addAddress(address) {
    console.log('Address from from: ', address);
    this.kitchenForm.get('address').patchValue(address);
    console.log('Kitchen Form: Address update: ', this.kitchenForm.value);
  }

  addImage(image) {
    console.log('Image >>>', image);
    this.kitchenForm.get('image').patchValue(image);
  }

  resetInput() {
    this.kitchenForm.get('address').reset();
  }

  async createKitchen(dataFromKitchenForm) {
    const tempKitchen = { ...this.kitchen, ...this.kitchenForm.value };
    if (this.isNewKitchen) { // For new kitchen
      const tempKitchenId = this.ks.newFirebaseDocumentKey;
      tempKitchen.id = tempKitchenId;
      tempKitchen.createdAt = this.ks.serverTimestampFromFirestore;
      this.ks.createKitchen(tempKitchen).then(
        () => {
          console.log('Redirecting to>>>', tempKitchen.id);
          this.router.navigate(['kitchen', tempKitchen.id, 'my-kitchen']);
        }).catch(e => console.error('createKitchen: ', e));
    } else {
      this.ks.updateKitchen(tempKitchen).then(
        () => {
          console.log('Update kitchen: redirecting to >>>', tempKitchen.id);
          this.router.navigate(['kitchen', tempKitchen.id, 'my-kitchen']);
        }).catch(e => console.error('createKitchen: ', e));
    }
  }

  ngOnDestroy() {
    console.log('CreateKitchenComponent destroyed!!');
    this.resetInput();
  }

}
