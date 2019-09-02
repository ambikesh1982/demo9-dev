import { Component, OnInit } from '@angular/core';
import { IKitchen } from '../kitchen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { KitchenService } from '../kitchen.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.scss']
})
export class CreateKitchenComponent implements OnInit {

  newKitchen: IKitchen;
  kitchenForm: FormGroup;
  productStorageBucket;
  ownerId: string;

  constructor(
    private auth: AuthService,
    private ks: KitchenService,
    private fb: FormBuilder,
    private location: Location) {
    this.createKitchenForm();
   }

  ngOnInit() {
    console.log('CurrentUser from AuthService: ', this.auth.currUser);
    this.ownerId = this.auth.currUser.uid;
  }

  goBack() {
    this.location.back();
  }


  createKitchenForm() {
    this.kitchenForm = this.fb.group({
      ownerId: [this.auth.currUser.uid, Validators.required],
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

  addAddress($event) {
    this.kitchenForm.get('address').setValue($event);
  }

  resetInput() {
    this.kitchenForm.get('address').reset();
  }

  async createKitchen(dataFromKitchenForm) {
    const kitchen: IKitchen = dataFromKitchenForm;
    kitchen.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.createKitchen(kitchen);
    console.log('Todo: Create Kitchen >>> ', kitchen);
  }
  storeImageDetails(event) {
    console.log('Image >>>', event);
    this.kitchenForm.get('image').setValue(event);
  }

}
