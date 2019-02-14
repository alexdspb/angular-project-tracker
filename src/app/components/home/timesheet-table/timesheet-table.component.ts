import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Timesheet} from '../../../models/Timesheet';
// Font Awesome
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-timesheet-table',
    templateUrl: './timesheet-table.component.html',
    styleUrls: ['./timesheet-table.component.less']
})
export class TimesheetTableComponent implements OnInit {
    private numberOfDates: number = 7;
    private date: string = '';
    private prevLink: string = '';
    private nextLink: string = '';
    private dates: string[] = [];
    private timesheets: Timesheet[] = [];
    private projects: Project[] = [];

    // Font Awesome
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
    }

    ngOnInit() {
        // get date from GET request
        this.date = this.route.snapshot.queryParams.date ?
            new Date(this.route.snapshot.queryParams.date).toISOString().substr(0, 10) :
            new Date().toISOString().substr(0, 10);

        // set date from
        this.dates.push(this.date.substr(0, 10));
        // add following dates
        while (this.dates.length < this.numberOfDates) {
            let dateToAdd = new Date([...this.dates].pop());
            dateToAdd.setDate(dateToAdd.getDate() + 1);
            this.dates = [...this.dates, dateToAdd.toISOString().substr(0, 10)];
        }

        // get timesheets by dates
        this.apiService.getTimesheetsByDates([...this.dates].shift(), [...this.dates].pop()).subscribe(data => {
            this.timesheets = data;

            // get projects
            this.apiService.getProjects().subscribe((data) => {
                this.projects = data.slice(0, 2);
            });
        });

        // set prev and next links
        let prevDate = new Date([...this.dates].shift());
        prevDate.setDate(prevDate.getDate() - this.numberOfDates);
        this.prevLink = this.router.createUrlTree(
            [this.route.snapshot.routeConfig.path],
            { queryParams: {date: prevDate.toISOString().substr(0, 10)} }
        ).toString();
        let nextDate = new Date([...this.dates].pop());
        nextDate.setDate(nextDate.getDate() + 1);
        this.nextLink = this.router.createUrlTree(
            [this.route.snapshot.routeConfig.path],
            { queryParams: {date: nextDate.toISOString().substr(0, 10)} }
        ).toString();
    }
}
