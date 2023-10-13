import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginFormSubmit = false;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginFormSubmit = true;

    const loginObj = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.http
      .post<any>('http://localhost:3004/login', loginObj)
      .pipe(
        catchError((error) => {
          alert('User not found');
          
          return of(null);
        })
      )
      .subscribe(({ accessToken, user }) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        if (user) {
          alert('Login Successful');
          this.loginForm.reset();
          this.router.navigateByUrl('/account/profile');
        }
      });
  }
}
