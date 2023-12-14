import { User } from "./use.model";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, onAuthStateChanged } from "@angular/fire/auth";
import { FirebaseApp } from "@angular/fire/app";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean = false

    constructor(
        private router: Router,
        private pAuth: FirebaseApp,
        private fAuth: Auth,
        private trainService: TrainingService
    ) { }

    initAuthListner() {
        onAuthStateChanged(this.fAuth, (data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        });
    }

    registerUser(authData: AuthData) {
        const auth = getAuth(this.pAuth);
        createUserWithEmailAndPassword(
            auth,
            authData.email,
            authData.password
        ).then((userCredential) => {
            console.log(userCredential);
            this.authSuccessfully()
        }).catch((error) => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        const auth = getAuth();
        signInWithEmailAndPassword(
            auth,
            authData.email,
            authData.password
        ).then((userCredential) => {
            this.authSuccessfully();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("login error", error);
        });
    }

    logout() {
        this.trainService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}