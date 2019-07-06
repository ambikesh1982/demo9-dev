import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { Routes, RouterModule } from '@angular/router';
import { SocialGuard } from '../core/social.guard';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


const productRoutes: Routes = [
  {
    path: 'product/:id',
    component: ProductManageComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    canActivate: [SocialGuard]
  },
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
  }
];

@NgModule({
  declarations: [ProductListComponent, ProductManageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }
