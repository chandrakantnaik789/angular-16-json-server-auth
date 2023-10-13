import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  signupSubmit = false;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{1,20}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/)]],
      confirmpassword: ['', Validators.required],
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{1,50}$/)]],
      phonenumber: '',
      email: ''
    },
      {
        // validators: this.mustMatch('password', 'confirmPassword')
      });
  }
  signUp() {
    this.signupSubmit = true;
    if (this.signupForm.valid) {
      this.http.post<any>("/register", this.signupForm.value).
        subscribe(res => {
          alert("Signup successful");
          this.signupForm.reset();
        }, err => {
          alert("something went wrong");
        })
    }
  }
}
