import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Project} from '../models/Project';
import {Task} from '../models/Task';
import {Timesheet} from '../models/Timesheet';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiUrl = 'http://aac-vm.universe.dart.spb:8080';
    private apiKey = 'aMcQDFR%2bxi%2bQAp5hRpCM59g6UcMrXHyo3gm0IHqk70g%3d';

    private httpOptions = {
        headers: new HttpHeaders({
            Accept:  'application/json',
            API_KEY: this.apiKey
        })
    };

    taskStatuses = [
        '',
        'Open',
        'Development',
        'Ready for QA',
        'Test',
        'Closed'
    ];
    activeTaskStatuses = [1, 2, 3, 4];

    constructor(private http: HttpClient) {
    }

    // Get Employees
    getEmployees(): Observable<any[]> {
        const url = `${this.apiUrl}/api/employees`;
        return this.http.get<any[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Get Projects
    getProjects(): Observable<Project[]> {
        const url = `${this.apiUrl}/api/projects`;
        return this.http.get<Project[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Get Tasks by Project
    getTasksByProjectId(id: number): Observable<Task[]> {
        const url = `${this.apiUrl}/api/projects/${id}/tickets`;
        return this.http.get<Task[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Get Timesheets by Task
    getTimesheetsByTaskId(id: number): Observable<Timesheet[]> {
        const url = `${this.apiUrl}/api/tasks/${id}/timesheets`;
        return this.http.get<Timesheet[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Get Timesheets by Dates
    getTimesheetsByDates(startDate, endDate): Observable<Timesheet[]> {
        const url = `${this.apiUrl}/api/timesheets/search`;
        const params = new HttpParams()
            .set('startDate', startDate)
            .set('endDate', endDate);
        const httpOptions = Object.assign({...this.httpOptions}, {params})
        return this.http.get<Timesheet[]>(url, httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Put Timesheet
    putTimesheet(timesheet: Timesheet): Observable<Timesheet> {
        const url = `${this.apiUrl}/api/timesheets`;
        return this.http.put<Timesheet>(url, timesheet, this.httpOptions)
            .pipe(tap(response => this.logRequest(`PUT ${url}`, response)));
    }


    private logRequest(request, response) {
        //console.log(request, response);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(operation, error);
            return of(result as T);
        };
    }

}
