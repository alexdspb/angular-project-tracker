import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiUrl = 'http://aac-vm.universe.dart.spb:8080';
    private apiKey = 'aMcQDFR%2bxi%2bQAp5hRpCM59g6UcMrXHyo3gm0IHqk70g%3d';

    private httpOptions = {
        headers: new HttpHeaders({
            'Accept':  'application/json',
            'Content-Type':  'application/json',
            'API_KEY': this.apiKey
        })
    };

    constructor(private http: HttpClient) {
    }

    // Get Employees
    getEmployees(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/employees`, this.httpOptions)
    }

    // Get Projects
    getProjects(): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/api/projects`, this.httpOptions)
    }

    // Get Tasks by Project
    getTasksByProjectId(id: number): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/api/projects/${id}/tickets`, this.httpOptions)
    }

    // Get Timesheets by Task
    getTimesheetsByTaskId(id: number): Observable<object[]> {
        return this.http.get<object[]>(`${this.apiUrl}/api/tasks/${id}/timesheets`, this.httpOptions)
            .pipe(
                tap(response => console.log(response))
            )
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(operation, error);
            return of(result as T);
        };
    }

}
