import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

import {Employee} from '../../../models/Employee';
import {Skill} from '../../../models/Skill';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../auth.service';
import {SkillModalComponent} from '../skill-modal/skill-modal.component';
import {EmployeeSkill} from '../../../models/EmployeeSkill';
import {UserModalComponent} from '@modules/user/user-modal/user-modal.component';
import {Project} from '@models/Project';

// Font Awesome
import {faPlus, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
    currentUser: Employee;
    user: Employee;
    skypeLink: SafeUrl;
    skills: Skill[];
    projects: Project[];

    // Font Awesome
    faPlus = faPlus;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;

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

                // get projects
                this.apiService.getProjectsByEmployeeId(this.user.Id).subscribe(projects => {
                    this.projects = projects;
                });

            });
        }
    }

    showUserModal(user: Employee) {
        // open modal
        const modalRef = this.modalService.open(UserModalComponent);
        // pass properties to component
        modalRef.componentInstance.user = user;
        // deal with result
        modalRef.result.then(result => {
            if (typeof result === 'object') {
                this.user = result as Employee;
            }
        }, () => {});
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

    deleteSkill(skill: Skill) {
        this.apiService.deleteSkill(skill.Id, this.user.Id).subscribe(deletedId => {
            if (deletedId) {
                this.skills = this.skills.filter(item => item.Id !== deletedId);
            }
        });
    }

}
