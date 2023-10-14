import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MailService {

  constructor(private http: HttpClient) {}

  sendOtpEmail(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem('otp', otp);
    localStorage.setItem('email', email);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          `Basic YXBpOjQ2NDBhNmVmM2NiMWY3YmQ3NmIzYmYyN2VhYTY0ZjQ1LTU0NjVlNTgzLWY1MzBhYzRh`,
      }),
    };

    const formdata = new FormData();
    formdata.append(
      'from',
      'Mailgun Sandbox <postmaster@sandboxfac98fa68d924c62b467c5375f82ddd2.mailgun.org>'
    );
    formdata.append('to', `User <chandrakantnaik789@gmail.com>`);
    formdata.append('cc', `User <chandrakantnaik789@gmail.com>`);
    formdata.append('subject', 'Hello User');
    formdata.append(
      'text',
      `Here is your OTP ${otp}`
    );

    return this.http
      .post(
        'https://api.mailgun.net/v3/sandboxfac98fa68d924c62b467c5375f82ddd2.mailgun.org/messages',
        formdata,
        httpOptions
      );
  }
}
