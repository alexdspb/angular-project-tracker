import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.less']
})
export class LoginModalComponent implements OnInit {
    loading = false;
    submitted = false;

    // modal form
    loginForm = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private activeModal: NgbActiveModal,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onLogin() {
        const {login, password} = this.loginForm.value;

        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(login.trim(), password.trim()).subscribe(user => {
            if (user) {
                this.activeModal.close();
            }
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

}
