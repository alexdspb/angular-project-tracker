import {Component, OnInit, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';

// Font Awesome
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.less']
})
export class ProjectModalComponent implements OnInit {
  project: Project;
  returnUrl: string;
  // edit form
  projectForm = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl(''),
    CustomerName: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    Description: new FormControl(''),
  });

  // Font Awesome
  faTrashAlt = faTrashAlt;

  constructor(
      private activeModal: NgbActiveModal,
      private router: Router,
      private calendar: NgbCalendar,
      private dateParserFormatter: NgbDateParserFormatter,
      private apiService: ApiService,
  ) {}

  ngOnInit() {
    // load project from model if empty
    this.project = this.project ? this.project : new Project();
    // set form controls
    const controls = {
      Id: this.project.Id,
      Name: this.project.Name,
      CustomerName: this.project.CustomerName,
      StartDate: this.dateParserFormatter.parse(this.project.StartDate),
      EndDate: this.dateParserFormatter.parse(this.project.EndDate),
      Description: this.project.Description,
    };
    this.projectForm.setValue(controls);
  }

  // convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  saveProject(form) {
    // todo: validate form
    // reformat project with correct dates
    const project: Project = {
      ...form,
      StartDate: this.dateParserFormatter.format(form.StartDate),
      EndDate: this.dateParserFormatter.format(form.EndDate),
    };
    if (project.Id) {
      // update on server
      this.apiService.putProject(project).subscribe(response => {
        // todo: update UI
      });
    } else {
      // create on server
      this.apiService.postProject(project).subscribe(response => {
        // todo: update UI
      });
    }
  }

}
