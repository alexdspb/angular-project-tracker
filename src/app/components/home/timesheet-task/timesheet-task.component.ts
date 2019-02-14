import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Timesheet} from '../../../models/Timesheet';

@Component({
    selector: '[app-timesheet-task]',
    templateUrl: './timesheet-task.component.html',
    styleUrls: ['./timesheet-task.component.less'],
})
export class TimesheetTaskComponent implements OnInit {
    @Input() task: Task;
    @Input() dates: string[];
    @Input() timesheets: Timesheet[];
    hoursByDates: number[] = [];
    hoursTotal: number = 0; // keeps amount of hours for task row

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        // get only tasksheets from current task
        this.timesheets = this.timesheets.filter(item => item.TicketId === this.task.Id);

        // reset counter
        this.taskHoursAmount = 0;

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

}
