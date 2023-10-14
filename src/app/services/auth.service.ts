import { Injectable } from '@angular/core';
//import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  sendOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem('otp', otp);
  }

}
