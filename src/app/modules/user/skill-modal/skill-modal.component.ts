import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Skill} from '../../../models/Skill';
import {Employee} from '../../../models/Employee';
import {SkillLevel} from '../../../models/SkillLevel';
import {EmployeeSkill} from '../../../models/EmployeeSkill';

@Component({
    selector: 'app-skill-modal',
    templateUrl: './skill-modal.component.html',
    styleUrls: ['./skill-modal.component.less']
})
export class SkillModalComponent implements OnInit {
    skill: Skill;
    skills: Skill[];
    skillLevels: SkillLevel[];
    employee: Employee;
    // modal form
    skillForm = new FormGroup({
        EmployeeId: new FormControl('', [Validators.required, Validators.min(1)]),
        SkillId: new FormControl('', [Validators.required, Validators.min(1)]),
        LevelId: new FormControl('', [Validators.required, Validators.min(1)]),
    });
    loading = false;
    submitted = false;
    error = false;

    constructor(
        private activeModal: NgbActiveModal,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
        this.apiService.getSkills().subscribe(skills => {
            this.skills = skills;

            // Get Levels
            this.skillLevels = this.apiService.getSkillLevels();

            // reformat skill to form values
            const controls = {
                SkillId: this.skill.Id,
                LevelId: this.skill.LevelId,
                EmployeeId: this.employee.Id,
            };
            this.skillForm.setValue(controls);
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.skillForm.controls;
    }

    onSave(form) {
        this.submitted = true;

        if (this.skillForm.invalid) {
            return;
        }

        this.loading = true;
        // create skill from form values (as numbers)
        const {SkillId, LevelId, EmployeeId} = this.skillForm.value;
        const employeeSkill: EmployeeSkill = {SkillId: +SkillId, LevelId: +LevelId, EmployeeId: +EmployeeId};
        // close modal and pass skill to parent component
        this.activeModal.close(employeeSkill);
    }
}
