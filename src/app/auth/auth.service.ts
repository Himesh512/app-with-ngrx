import { User } from "./use.model";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs"; 
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user! : User | null;

    constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return {
            ...this.user
        };
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }  
}