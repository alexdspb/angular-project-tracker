import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';

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
    // controls
    controls: FormControl[] = [];
    // modal controls
    modalControls = {
        date: new FormControl(''),
        loggedTime: new FormControl(''),
        comment: new FormControl(''),
    };

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

            // controls
            this.controls.push(new FormControl({
                value: hours,
                disabled: (hours > 0)
            }));
        }

        // aggregate hours total
        this.hoursTotal = this.hoursByDates.reduce((a, b) => a + b, 0);
    }

    showTimesheetModal(task: Task, date: string, modal: object): void {
        // create template for timesheet
        const i = this.dates.indexOf(date);
        let timesheet: Timesheet = {
            LoggedTime: (i === -1) ? 0 : this.controls[i].value,
            Date: date,
            TicketId: task.Id,
            Comment: '',
            Id: 0,
        };
        // or find in timesheets by task and date
        for (const item of this.timesheets) {
            if (item.TicketId === task.Id && item.Date.substr(0, 10) === date) {
                timesheet = item;
            }
        }

        // set values from task to controls
        this.modalControls.date.setValue(timesheet.Date);
        this.modalControls.loggedTime.setValue(timesheet.LoggedTime);
        this.modalControls.comment.setValue(timesheet.Comment);
        // open modal
        this.modalService.open(modal, {ariaLabelledBy: 'timesheet-modal-title'}).result.then((result) => {
            // on modal save
            console.log(result);
            // save on server
            timesheet = {...timesheet,
                LoggedTime: this.modalControls.loggedTime.value,
                Comment: this.modalControls.comment.value};
            this.apiService.putTimesheet(timesheet).subscribe(data => data);
            // update in ui
            const dateIndex = this.dates.indexOf(this.modalControls.date.value.substr(0, 10));
            if (dateIndex !== -1 && this.controls[dateIndex]) {
                this.controls[dateIndex].setValue(this.modalControls.loggedTime.value);
            }
            // also update this.timesheets for data consistency
            for (const i in this.timesheets) {
                if (this.timesheets[i].Id === timesheet.Id) {
                    this.timesheets[i] = timesheet;
                }
            }
        }, (reason) => {
            // on modal dismiss
            console.log(reason);
        });
    }
}
