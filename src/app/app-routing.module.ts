import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/login',
    pathMatch: 'full'
  },
  {
    path: 'account/login',
    component: LoginComponent
  },
  {
    path: 'account/signup',
    component: SignupComponent
  },
  {
    path: 'account/profile',
    component: ProfileComponent
  },
  { path: 'account/forgot-password', 
    component: ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
