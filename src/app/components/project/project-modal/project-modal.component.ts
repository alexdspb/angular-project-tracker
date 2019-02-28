import {Component, OnInit, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
  ) { }

  ngOnInit() {
    // set form controls
    const controls = {
      Name: this.project.Name,
      CustomerName: this.project.CustomerName,
      StartDate: this.project.StartDate.substr(0, 10),
      EndDate: this.project.EndDate.substr(0, 10),
      Description: this.project.Description,
    };
    this.projectForm.setValue(controls);
  }

  // convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  deleteProject(project) {
    console.error('deleteProject()', project);
    this.activeModal.dismiss();
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

}
