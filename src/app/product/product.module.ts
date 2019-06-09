import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { Routes, RouterModule } from '@angular/router';
import { loggedIn, canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { SocialGuard } from '../core/social.guard';

// const socialGuard = map( (user: firebase.User) => user.isAnonymous ? ['product/manage'] : ['login']);

const redirectUnauthorizedToHome =  redirectUnauthorizedTo(['/']);

const productRoutes: Routes = [
  {
    path: 'manage',
    component: ProductManageComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    canActivate: [SocialGuard]
    // resolve: { product: ProductResolver },
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
    ...canActivate(redirectUnauthorizedToHome)
    // resolve: { products: ProductListResolver}
  }
];

@NgModule({
  declarations: [ProductListComponent, ProductManageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }
