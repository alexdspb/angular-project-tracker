import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Timesheet} from '../../../models/Timesheet';

// Font Awesome
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: '[app-timesheet-task]',
    templateUrl: './timesheet-task.component.html',
    styleUrls: ['./timesheet-task.component.less'],
})
export class TimesheetTaskComponent implements OnInit {
    @Input() task: Task;
    @Input() dates: string[];
    @Input() timesheets: Timesheet[];
    hoursByDates: number[] = []; // keeps amount of hours for each date
    hoursTotal: number = 0; // keeps amount of hours for task row
    timesheet: Timesheet; // Timesheet for edit in modal

    // Font Awesome
    faPlus = faPlus;

    constructor(private apiService: ApiService, private modalService: NgbModal) {
    }

    ngOnInit() {
        // get only tasksheets from current task
        this.timesheets = this.timesheets.filter(item => item.TicketId === this.task.Id);

        // reset counter
        this.hoursTotal = 0;

        // aggregate hours by dates
        for (const dateItem of this.dates) {
            let hours = 0;
            for (const timesheet of this.timesheets) {
                if (timesheet.Date.substr(0, 10) === dateItem.substr(0, 10)) {
                    hours = timesheet.LoggedTime;
                }
            }
            this.hoursByDates.push(hours);
        }

        // aggregate hours total
        this.hoursTotal = this.hoursByDates.reduce((a, b) => a + b, 0);
    }

    showTimesheetModal(task: Task, date: string, modal: object): void {
        // create template for timesheet
        this.timesheet = {
            LoggedTime: 0,
            Date: new Date().toISOString(),
            TicketId: task.Id,
            Comment: '',
            Id: 0,
        };
        // or find in timesheets by task and date
        for (const item of this.timesheets) {
            if (item.TicketId === task.Id && item.Date.substr(0, 10) === date) {
                this.timesheet = item;
            }
        }

        console.log(this.timesheet);
        // open modal
        this.modalService.open(modal, {ariaLabelledBy: 'timesheet-modal-title'}).result.then((result) => {
            console.log(result);
            console.log(this.timesheet);
            // save on server
            // update in ui
            this.timesheet = undefined;
        }, (reason) => {
            console.log(reason);
            this.timesheet = undefined;
        });
    }
}
