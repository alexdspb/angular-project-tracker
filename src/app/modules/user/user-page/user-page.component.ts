import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Employee} from '../../../models/Employee';
import {Skill} from '../../../models/Skill';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
    currentUser: Employee;
    user: Employee;
    skills: Skill[];
    // modal form
    skillForm = new FormGroup({
        Name: new FormControl(''),
        Description: new FormControl(''),
        Estimate: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl(''),
        TypeId: new FormControl(''),
    });

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private authService: AuthService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.apiService.getEmployee(id).subscribe(employee => {
                this.user = employee;
                this.currentUser = this.authService.currentUser;
                this.apiService.getEmployeeSkills(id).subscribe(skills => this.skills = skills);
            });
        }
    }

    showSkillModal(modal) {
        this.modalService.open(modal).result.then(() => {
            // todo: add form
            // todo: save skills
            // todo: add skills
        }, () => {});
    }

}
