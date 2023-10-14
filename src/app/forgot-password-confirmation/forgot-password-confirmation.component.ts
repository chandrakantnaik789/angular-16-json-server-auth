import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-confirmation',
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrls: ['./forgot-password-confirmation.component.scss']
})
export class ForgotPasswordConfirmationComponent {
  otp: string | null = '';
  originalOTP: string | null = '';
  newPassword: string = '';
  otpMatched: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(){
    this.originalOTP = localStorage.getItem('otp');

    if(!this.originalOTP){
      this.router.navigateByUrl('/account/forgot-password');
    }

  }
  
  confirmPasswordReset() {
    if(this.otp == this.originalOTP){
      this.otpMatched = true;
    }
    else {
      alert('OTP not match');

      return;
    }


  }

  changePassword(){
    const userId = localStorage.getItem('userId')!;
    const email = localStorage.getItem('email')!;

    this.http.patch('http://localhost:3004/users/'+userId, {
      email,
      password: this.newPassword
    }).subscribe(v=> {
      alert('password successfully reset');

      if(this.otpMatched){
        localStorage.removeItem('otp');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/account/login');
    });

    
  }
}
