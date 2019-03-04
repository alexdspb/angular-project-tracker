import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Task} from '../../../models/Task';
import {FormControl, FormGroup} from '@angular/forms';

// Font Awesome
import {faTrashAlt, faArrowRight, faEdit} from '@fortawesome/free-solid-svg-icons';

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
    private modalTask: Task;
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
    faArrowRight = faArrowRight;
    faEdit = faEdit;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        for (let status of this.apiService.taskStatuses) {
            this.tasksByStatuses[status.Id] = [];
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

    openTaskPage(task: Task) {
        this.router.navigateByUrl(`/tasks/${task.Id}`);
    }

    showTaskModal(modal: object, task: Task|null) {
        // create template for Task if task not passed
        this.modalTask = task ? task : {
            Id: 0,
            Name: '',
            Description: '',
            Estimate: 0,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            StatusId: this.apiService.taskStatuses[0].Id,
            ResponsibleId: 4010,
            Responsible: null,
            TypeId: this.apiService.taskTypes[0].Id,
            ProjectId: this.project.Id,
            ReporterId: 4010,
            Reporter: null,
        };
        // set values from task to controls
        const controls = (
            ({Name, Description, Estimate, StartDate, EndDate, TypeId}) =>
            ({Name, Description, Estimate, StartDate, EndDate, TypeId})
        )(this.modalTask);
        this.taskForm.setValue(controls);
        this.taskForm.patchValue({
            StartDate: this.modalTask.StartDate ? this.modalTask.StartDate.substr(0, 10) : this.modalTask.StartDate,
            EndDate: this.modalTask.EndDate ? this.modalTask.EndDate.substr(0, 10) : this.modalTask.EndDate,
        });

        // open modal
        this.modalService.open(modal, {ariaLabelledBy: 'timesheet-modal-title'}).result.then((result) => {
            // on modal save
            console.log(result);
            task = Object.assign(this.modalTask, this.taskForm.value);
            if (this.modalTask.Id === 0) {
                // add to server
                this.apiService.postTask(this.modalTask).subscribe(addedTask => {
                    // add to component
                    this.tasks.push(addedTask);
                    this.tasksByStatuses[this.modalTask.StatusId].push(addedTask);
                });
            }
            else {
                // edit on server
                this.apiService.putTask(this.modalTask).subscribe();
            }
        }, (reason) => {
            // on modal dismiss
            console.log(reason);
        });
    }

    deleteTask(task: Task) {
        this.modalService.dismissAll();
        this.apiService.deleteTask(task).subscribe(response => {
            if (response === task.Id) {
                this.tasks = this.tasks.filter(item => item.Id !== task.Id);
                this.tasksByStatuses[task.StatusId] = this.tasksByStatuses[task.StatusId].filter(item => item.Id !== task.Id);
            }
        });
    }
}
