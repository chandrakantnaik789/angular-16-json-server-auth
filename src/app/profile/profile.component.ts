import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private http : HttpClient,) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      profilePicture: [''],
      fullname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      password: [''],
      confirmpassword: [''],
      id: ['']
    });

    const user = JSON.parse(localStorage.getItem('user')!);

    this.profileForm.patchValue(user);
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      return
    }

    const {id, confirmpassword} = this.profileForm.value;

    this.profileForm.patchValue({ password: confirmpassword });

    this.http.put('http://localhost:3004/users/'+id, this.profileForm.value).subscribe(v=> {
      this.updateValue(v);
      alert('user successfully updated');
    });
  }

  updateValue(user: any){
    localStorage.setItem('user', user);
    this.profileForm.patchValue(user);
  }

  onSkip() {
    // Handle the "Skip" button click event
  }

}
