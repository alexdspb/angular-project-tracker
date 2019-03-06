import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import {ApiService} from '../../services/api.service';
import {Employee} from '../../models/Employee';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<Employee>;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
    }

    public get currentUser(): Employee {
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) {
        return this.apiService.login(login, password)
            .pipe(tap(user => {
                // login successful
                if (user) {
                    // do not store password
                    delete user.Password;
                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
