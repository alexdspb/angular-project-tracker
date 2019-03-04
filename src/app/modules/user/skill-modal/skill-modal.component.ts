import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Skill} from '../../../models/Skill';
import {Employee} from '../../../models/Employee';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.less']
})
export class SkillModalComponent implements OnInit {
  skill: Skill;
  employee: Employee;
  // modal form
  skillForm = new FormGroup({
    EmployeeId: new FormControl('', [Validators.required]),
    SkillId: new FormControl('', [Validators.required]),
    LevelId: new FormControl('', [Validators.required]),
  });
  loading = false;
  submitted = false;
  error = false;

  constructor(
      private activeModal: NgbActiveModal,
      private apiService: ApiService,
  ) { }

  ngOnInit() {
    console.log(this.skill);
    // reformat skill to form values
    const controls = {
      SkillId: this.skill.Id,
      LevelId: this.skill.LevelId,
      EmployeeId: this.skill.LevelId,
    };
    this.skillForm.setValue(controls);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.skillForm.controls;
  }

  onSave(form) {
    console.log(form);
    this.submitted = true;

    if (this.skillForm.invalid) {
      return;
    }

    this.loading = true;
    // todo: save or create skill
    setTimeout(() => {
      this.activeModal.close();
    }, 1000);
  }
}
