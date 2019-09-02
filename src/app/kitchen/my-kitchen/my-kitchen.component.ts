import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KitchenService } from '../kitchen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { IMenuItem } from '../kitchen';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})

export class MyKitchenComponent implements OnInit {
  myKitchen: any;
  menuItems$: Observable<IMenuItem[]>;
  menuForm: FormGroup;
  menu: IMenuItem;
  kitchenId: string;
  hasMenuItems: boolean;


  constructor(
    private route: ActivatedRoute,
    private ks: KitchenService,
    private location: Location,
    private fb: FormBuilder) {
      this.createMenuForm();
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kitchenId = params.get('kid');
    });

    this.myKitchen = this.route.snapshot.data.myKitchen;
    this.menuItems$ = this.ks.getMenuItems(this.kitchenId).pipe(
      tap( resp => this.hasMenuItems = !!resp)
    );
  }

  createMenuForm() {
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      price: [0.0, Validators.required],
      isNonVeg: [true, Validators.required],
      qty: [0, Validators.required],
    });
  }


  addMenuItem(kid: string, dataFromMenuForm) {
    const menu = dataFromMenuForm;
    menu.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.createMenuItem(this.kitchenId, menu)
      .then(resp => {
        console.log('Menu item added: ', resp.id);
        this.menuForm.reset();
      });
    console.log('Data from menu form: ', this.kitchenId, '-', dataFromMenuForm);
  }

  removeMenuItem(id) {
    console.error('TODO: Remove menu item: ', id);
  }

  goBack() {
    this.location.back();
  }

}
