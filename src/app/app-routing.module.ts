// const routes: Routes = [
//   {
//     path: '', component: ShellComponent, data: { title: 'APP_SHELL_PAGE' },
//     children: [
//       { path: 'cart', loadChildren: () => import('./app-cart/app-cart.module').then(m => m.AppCartModule) },
//       { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
//       { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
//       { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
//       { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
//       { path: 'admin', loadChildren: () => import('./app-admin/app-admin.module').then(m => m.AppAdminModule) },
//       { path: '', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
//       { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule) },
//     ]
//   },
//   // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
//   { path: 'home', component: HomeComponent, data: { title: 'APP_HOME_PAGE' }, canActivate: [UnAuthGuard] },
//   { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent, data: { title: 'PAGE_NOT_FOUND_PAGE' } }
// ];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    ...canActivate(redirectLoggedInToHome)
   },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
