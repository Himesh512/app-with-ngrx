import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authServ: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authServ.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}