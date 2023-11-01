import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

    @Output() closeSideNav = new EventEmitter<void>();
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth: boolean = false;
    authSubscription !: Subscription;

    constructor(private authServ: AuthService) { }
    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.authSubscription = this.authServ.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    toggleSideNav() {
        this.closeSideNav.emit();
    }

    onLogout() {
        this.toggleSideNav();
        this.authServ.logout();
    }
}
