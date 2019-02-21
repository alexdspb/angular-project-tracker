import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Employee} from '../../../models/Employee';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
    private loggedInUser: Employee = new Employee();
    // login form
    loginForm = new FormGroup({
        login: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        const {login, password} = this.loginForm.value;

        if (!login || !password) {
            return;
        }

        this.apiService.userLogin(login, password).subscribe(response => {
            if (response.Email === login && response.Password === password) {
                this.loggedInUser = response;
            }
        });
    }

}
