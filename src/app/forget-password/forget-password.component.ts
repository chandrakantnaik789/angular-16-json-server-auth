import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MailService } from '../services/mail.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  constructor(
    private router: Router,
    private mailService: MailService,
    private http: HttpClient
  ) {}

  users = [];

  ngOnInit() {
    this.http.get('http://localhost:3004/users/').subscribe((v: any) => {
      this.users = v;
    });
  }

  email = '';

  forgot() {
    const user:any = this.users.find((v:any)=> v.email.toLocaleLowerCase() == this.email.toLocaleLowerCase());
    if(!user){
      alert("No such user exists");
      return;
    }

    localStorage.setItem('userId', user.id);

    this.mailService.sendOtpEmail(this.email).subscribe((v) => {
      alert('OTP sent in your mail');
      this.router.navigateByUrl('/account/forgot-password-confirmation');
    });
  }
}
