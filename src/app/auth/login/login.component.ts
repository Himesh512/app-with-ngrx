import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });    
  }

  onSubmit() {
    this.authServ.login({
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		});
  }
}
