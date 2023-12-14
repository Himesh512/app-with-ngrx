import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.authServ.logout();
    }
}
