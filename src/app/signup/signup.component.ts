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
        validator: this.mustMatch('password', 'confirmpassword')
      });
  }


  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  signUp() {

    if(this.signupForm.invalid){
      return;
    }

    this.signupSubmit = true;
    if (this.signupForm.valid) {
      this.http.post<any>("http://localhost:3004/register", this.signupForm.value).
        subscribe(res => {
          alert("Signup successful");
          this.signupForm.reset();
        }, err => {
          alert("something went wrong");
        })
    }
  }
}
