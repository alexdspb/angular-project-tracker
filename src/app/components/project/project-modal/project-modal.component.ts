import {Component, OnInit, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {EventEmitter} from '@angular/core';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';

@Component({
    selector: 'app-project-modal',
    templateUrl: './project-modal.component.html',
    styleUrls: ['./project-modal.component.less']
})
export class ProjectModalComponent implements OnInit {
    @Output() saveProject: EventEmitter<Project> = new EventEmitter();
    project: Project;
    // edit form
    projectForm = new FormGroup({
        Id: new FormControl(''),
        Name: new FormControl('', [Validators.required]),
        CustomerName: new FormControl('', [Validators.required]),
        StartDate: new FormControl('', [Validators.required]),
        EndDate: new FormControl(''),
        Description: new FormControl('', [Validators.required]),
    });
    loading = false;
    submitted = false;
    error = false;

    constructor(
        private activeModal: NgbActiveModal,
        private calendar: NgbCalendar,
        private dateParserFormatter: NgbDateParserFormatter,
        private apiService: ApiService,
    ) {
    }

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
    get f() {
        return this.projectForm.controls;
    }

    onSave(form) {
        this.submitted = true;

        if (this.projectForm.invalid) {
            return;
        }

        // reformat project with correct dates
        this.project = {
            ...form,
            StartDate: this.dateParserFormatter.format(form.StartDate),
            EndDate: this.dateParserFormatter.format(form.EndDate),
        };

        this.loading = true;
        const subscription = this.project.Id ? this.apiService.putProject(this.project) : this.apiService.postProject(this.project);
        // save on server
        subscription.subscribe({
            next: project => {
                this.loading = false;
                this.error = false;
                this.activeModal.close(project);
            },
            error: error => {
                console.error(error);
                this.loading = false;
                this.error = error;
            },
            complete: () => {}
        });
    }

}
