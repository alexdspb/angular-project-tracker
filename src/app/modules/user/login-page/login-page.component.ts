import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Employee} from '../../../models/Employee';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
    // login form
    loginForm = new FormGroup({
        login: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        if (this.authService.currentUser) {
            this.router.navigate(['/']);
        }
    }

    onSubmit() {
        const {login, password} = this.loginForm.value;

        if (!login.trim() || !password.trim()) {
            return;
        }

        this.authService.login(login, password).subscribe(user => {
            if (user) {
                this.router.navigate(['/']);
            }
        });
    }

}
