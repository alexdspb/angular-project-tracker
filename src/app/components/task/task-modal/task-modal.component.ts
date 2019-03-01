import {Component, OnInit, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {EventEmitter} from '@angular/core';

import {ApiService} from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Project} from '../../../models/Project';
import {Employee} from '../../../models/Employee';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.less']
})
export class TaskModalComponent implements OnInit {
    @Output() saveTask: EventEmitter<Task> = new EventEmitter();
    task: Task;
    projects: Project[];
    employees: Employee[];
    // edit form
    taskForm = new FormGroup({
        Id: new FormControl(''),
        Name: new FormControl('', [Validators.required]),
        ProjectId: new FormControl('', [Validators.required]),
        TypeId: new FormControl('', [Validators.required]),
        StatusId: new FormControl('', [Validators.required]),
        Estimate: new FormControl('', [Validators.required]),
        StartDate: new FormControl('', [Validators.required]),
        EndDate: new FormControl('', [Validators.required]),
        ReporterId: new FormControl('', [Validators.required]),
        ResponsibleId: new FormControl('', [Validators.required]),
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
        // load task from model if empty
        this.task = this.task ? this.task : new Task();
        // reformat task to form values
        const controls = {
            Id: this.task.Id,
            Name: this.task.Name,
            ProjectId: this.task.ProjectId,
            TypeId: this.task.TypeId,
            StatusId: this.task.StatusId,
            Estimate: this.task.Estimate,
            StartDate: this.dateParserFormatter.parse(this.task.StartDate),
            EndDate: this.dateParserFormatter.parse(this.task.EndDate),
            ReporterId: this.task.ReporterId,
            ResponsibleId: this.task.ResponsibleId,
            Description: this.task.Description,
        };
        this.taskForm.setValue(controls);
        // get project list from server
        this.apiService.getProjects().subscribe(projects => this.projects = projects);
        this.apiService.getEmployees().subscribe(employees => this.employees = employees);
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.taskForm.controls;
    }

    onSave(form) {
        this.submitted = true;

        if (this.taskForm.invalid) {
            return;
        }

        // reformat form values to task
        this.task = {
            ...this.task,
            Name: form.Name.trim(),
            ProjectId: +form.ProjectId,
            TypeId: +form.TypeId,
            StatusId: +form.StatusId,
            Estimate: +form.Estimate,
            StartDate: this.dateParserFormatter.format(form.StartDate),
            EndDate: this.dateParserFormatter.format(form.EndDate),
            ReporterId: +form.ReporterId,
            ResponsibleId: +form.ResponsibleId,
            Description: form.Description,
        };

        this.loading = true;
        const subscription = this.task.Id ? this.apiService.putTask(this.task) : this.apiService.postTask(this.task);
        // save on server
        subscription.subscribe({
            next: task => {
                this.loading = false;
                this.error = false;
                this.activeModal.close(task);
            },
            error: error => {
                console.error(error);
                this.loading = false;
                this.error = error;
            },
            complete: () => {
            }
        });
    }

}
