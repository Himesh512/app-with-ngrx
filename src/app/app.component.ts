import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app-with-ngrx';

    constructor(private authService: AuthService) {

    }

    // TO DO 
    // 97 number
    ngOnInit(): void {
        this.authService.initAuthListner();
    }
}
