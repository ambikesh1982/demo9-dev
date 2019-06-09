import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { map } from 'rxjs/operators';
import { canActivate, loggedIn } from '@angular/fire/auth-guard';

// const socialGuardforLogin = map((user: firebase.User) => user ? ['user', user.uid] : ['login']);


const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
  ]
})
export class LoginModule { }
