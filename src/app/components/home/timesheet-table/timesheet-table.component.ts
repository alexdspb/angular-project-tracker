import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';

const numberOfDates = 7;

@Component({
    selector: 'app-timesheet-table',
    templateUrl: './timesheet-table.component.html',
    styleUrls: ['./timesheet-table.component.less']
})
export class TimesheetTableComponent implements OnInit {
    private projects: object[] = [];
    private dates: number[] = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getProjects().subscribe((data) => {
            this.projects = data.slice(0, 1);
        });

        // set date from
        let fromDate = new Date('2019-02-08');
        this.dates.push(fromDate.toISOString().substr(0, 10));
        // add following dates
        while (this.dates.length < numberOfDates) {
            let nextDate = new Date([...this.dates].pop());
            nextDate.setDate(nextDate.getDate() + 1);
            this.dates = [...this.dates, nextDate.toISOString().substr(0, 10)];
        }
    }

}
