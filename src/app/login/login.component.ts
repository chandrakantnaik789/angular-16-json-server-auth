import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup
  loginFormSubmit= false;
  constructor(
    private formbuilder : FormBuilder,
    private http : HttpClient
    ){ }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login(){
   this.loginFormSubmit = true;
   //console.log(this.loginForm.value);
   this.http.get<any>('http://localhost:3000/signUpUsers').
   subscribe(res => {
    const user = res.find((a : any) =>{
      return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
    });
    if(user){
      alert('Login Successful');
      this.loginForm.reset();
    }
    else{
      alert('User not found');
    }
   },
   err =>{
    alert("something went wrong");
   })
  }
}
