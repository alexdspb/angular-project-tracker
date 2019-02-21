import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Task} from '../../../models/Task';
import {FormControl, FormGroup} from '@angular/forms';

// Font Awesome
import {faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit {
    private projects: Project[];
    private project: Project;
    private tasks: Task[] = [];
    private tasksByStatuses: object = {};
    // modal form
    taskForm = new FormGroup({
        Name: new FormControl(''),
        Description: new FormControl(''),
        Estimate: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl(''),
        TypeId: new FormControl(''),
    });

    // Font Awesome
    faTrashAlt = faTrashAlt;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        for (let status of this.apiService.taskStatuses) {
            this.tasksByStatuses[status.id] = [];
        }

        // get projects
        this.apiService.getProjects().subscribe(projects => {
            this.projects = projects;

            // behavior if no project selected
            if (!this.route.snapshot.queryParams.projectId) {
                return;
            }

            // get project
            this.apiService.getProjectById(this.route.snapshot.queryParams.projectId).subscribe(project => {
                this.project = project;

                // get tasks
                this.apiService.getTasksByProjectId(project.Id).subscribe(tasks => {
                    this.tasks = tasks;

                    for (let task of tasks) {
                        this.tasksByStatuses[task.StatusId].push(task);
                    }
                });
            });
        });

    }

    onDrop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            const task: Task = {...event.item.data, StatusId: event.container.id};
            this.apiService.putTask(task).subscribe();
        }
    }

    showTaskModal(modal: object, task: Task|null) {
        // create template for Task if task not passed
        task = task ? task : {
            Id: 0,
            Name: '',
            Description: '',
            Estimate: 0,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            StatusId: this.apiService.taskStatuses[0].id,
            ResponsibleId: 4010,
            TypeId: this.apiService.taskTypes[0].id,
            ProjectId: this.project.Id,
            ReporterId: 4010,
        };
        // set values from task to controls
        const controls = (
            ({Name, Description, Estimate, StartDate, EndDate, TypeId}) =>
            ({Name, Description, Estimate, StartDate, EndDate, TypeId})
        )(task);
        this.taskForm.setValue(controls);

        // open modal
        this.modalService.open(modal, {ariaLabelledBy: 'timesheet-modal-title'}).result.then((result) => {
            // on modal save
            console.log(result);
            task = Object.assign(task, this.taskForm.value);
            if (task.Id === 0) {
                // add to server
                this.apiService.postTask(task).subscribe(addedTask => {
                    // add to component
                    this.tasks.push(addedTask);
                    this.tasksByStatuses[task.StatusId].push(addedTask);
                });
            }
            else {
                // edit on server
                this.apiService.putTask(task).subscribe();
            }
        }, (reason) => {
            // on modal dismiss
            console.log(reason);
        });
    }
}
