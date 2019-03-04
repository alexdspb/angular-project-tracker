import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

import {Employee} from '../../../models/Employee';
import {Skill} from '../../../models/Skill';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../auth.service';
import {SkillModalComponent} from '../skill-modal/skill-modal.component';
import {EmployeeSkill} from '../../../models/EmployeeSkill';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
    currentUser: Employee;
    user: Employee;
    skypeLink: string;
    skills: Skill[];

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private authService: AuthService,
        private modalService: NgbModal,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.apiService.getEmployee(id).subscribe(employee => {
                this.user = employee;

                // sanitize, then bypass link
                this.skypeLink = this.sanitizer.sanitize(SecurityContext.URL, this.user.Skype);
                this.skypeLink = this.sanitizer.bypassSecurityTrustUrl(`skype:${this.skypeLink}`);

                this.currentUser = this.authService.currentUser;
                this.apiService.getEmployeeSkills(id).subscribe(skills => this.skills = skills);
            });
        }
    }

    showSkillModal(skill: Skill = new Skill()) {
        // open modal
        const modalRef = this.modalService.open(SkillModalComponent);
        // pass properties to component
        modalRef.componentInstance.skill = skill;
        modalRef.componentInstance.employee = this.user;
        // deal with result
        modalRef.result.then(employeeSkill => {
            this.saveEmployeeSkill(employeeSkill);
        }, () => {});
    }

    saveEmployeeSkill(employeeSkill: EmployeeSkill) {
        // try to find existing skill
        const existing = this.skills.filter(item => (item.Id === employeeSkill.SkillId));
        if (existing.length) {
            // update existing skill
            this.apiService.putSkill(employeeSkill).subscribe(skill => {
                // update skills in UI
                this.apiService.getEmployeeSkills(this.user.Id).subscribe(skills => this.skills = skills);
            });
        } else {
            // create new skill
            this.apiService.postSkill(employeeSkill).subscribe(skill => {
                // add new skill in UI
                this.skills.push(skill);
            });
        }
    }

}
