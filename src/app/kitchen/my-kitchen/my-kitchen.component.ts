import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KitchenService } from '../kitchen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { IMenuItem, IKitchen } from '../kitchen';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/core/dialog.service';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})

export class MyKitchenComponent implements OnInit {
  myKitchen: IKitchen;
  menuItems$: Observable<IMenuItem[]>;
  menuForm: FormGroup;
  menu: IMenuItem;
  kitchenId: string;
  hasMenuItems: boolean;
  canNavigateAway: boolean;
  showMenuTemplate: boolean;


  constructor(
    private dialog: DialogService,
    private route: ActivatedRoute,
    private ks: KitchenService,
    private fb: FormBuilder,
    private router: Router) {
      this.showMenuTemplate = false;
      this.canNavigateAway = true;
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

  showAddMenuTemplate(resp: boolean) {
    this.showMenuTemplate = resp;
    this.canNavigateAway = !resp;
  }


  addMenuItem(dataFromMenuForm) {
    const menu = dataFromMenuForm;
    menu.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.createMenuItem(this.kitchenId, menu)
      .then(resp => {
        this.menuForm.reset();
        this.showAddMenuTemplate(false);
      });
    console.log('Data from menu form: ', this.kitchenId, '-', dataFromMenuForm);
  }

  removeMenuItem(menuId: string) {
    const menuItemDoc = `kitchen/${this.kitchenId}/menuItems/${menuId}`;
    this.ks.deleteMenuItem(menuItemDoc)
      .then(resp => console.error('menu item removed >>>', menuItemDoc))
      .catch( e => console.log('error in deleting menu item: ', e));
  }

  goBackToHome() {
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.canNavigateAway) {
      return this.dialog.openDialog('Discard the changes...?');
    }
    return this.canNavigateAway;
  }

}
