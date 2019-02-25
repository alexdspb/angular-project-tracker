import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.less']
})
export class LoginModalComponent implements OnInit {

    // modal form
    loginForm = new FormGroup({
        login: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private activeModal: NgbActiveModal,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
    }

    onLogin() {
        const {login, password} = this.loginForm.value;

        if (!login.trim() || !password.trim()) {
            return;
        }


        this.authService.login(login.trim(), password.trim()).subscribe(user => {
            // todo: form validation
            if (user) {
                this.activeModal.close();
            }
        }, error => {
            console.log(error);
        });
    }

}
