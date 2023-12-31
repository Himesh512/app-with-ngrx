import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	maxDate: any;
	constructor(private authServ: AuthService) { }

	ngOnInit() {
		this.maxDate = new Date();
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	onSubmit(form: NgForm) {
		this.authServ.registerUser({
			email: form.value.email,
			password: form.value.password
		});
	}
}
