import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Project} from '../models/Project';
import {Task} from '../models/Task';
import {Timesheet} from '../models/Timesheet';
import {Employee} from '../models/Employee';
import {Position} from '../models/Position';
import {Location} from '../models/Location';
import {Status} from '../models/Status';
import {TaskType} from '../models/TaskType';
import {EmployeeProject} from '../models/EmployeeProject';
import {Skill} from '../models/Skill';
import {SkillLevel} from '../models/SkillLevel';
import {EmployeeSkill} from '../models/EmployeeSkill';

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

    taskStatuses: Status[] = [
        {Id: 1, Name: 'Open', IsActive: true},
        {Id: 2, Name: 'Development', IsActive: true},
        {Id: 3, Name: 'Ready for QA', IsActive: true},
        {Id: 4, Name: 'Test', IsActive: true},
        {Id: 5, Name: 'Closed', IsActive: false}
    ];

    taskTypes: TaskType[] = [
        {Id: 1, Name: 'Technical task'},
        {Id: 2, Name: 'Bug'},
        {Id: 3, Name: 'Improvement'},
        {Id: 4, Name: 'New Feature'},
        {Id: 5, Name: 'Task'},
    ];

    positions: Position[] = [
        {Id: 1, Name: 'PM'},
        {Id: 2, Name: 'Developer'},
        {Id: 3, Name: 'QA'},
    ];

    locations: Location[] = [
        {Id: 1, Name: 'New York'},
        {Id: 2, Name: 'London'},
        {Id: 3, Name: 'Kharkiv'},
        {Id: 4, Name: 'St.Petersburg'},
        {Id: 5, Name: 'Voronezh'},
        {Id: 6, Name: 'Kherson'},
        {Id: 7, Name: 'Zug'},
        {Id: 8, Name: 'Kyiv'},
        {Id: 9, Name: 'Dnepr'},
        {Id: 10, Name: 'Odessa'},
        {Id: 11, Name: 'Lublin'},
        {Id: 12, Name: 'Buenos Aires'},
        {Id: 13, Name: 'Wroclaw'},
        {Id: 14, Name: 'Riga'},
        {Id: 15, Name: 'Sofia'},
        {Id: 16, Name: 'Wroclaw'},
    ];

    skillLevels: SkillLevel[] = [
        {Id: 1, Name: 'Trainee'},
        {Id: 2, Name: 'Junior'},
        {Id: 3, Name: 'Middle'},
        {Id: 4, Name: 'Senior'},
    ];

    constructor(private http: HttpClient) {
    }

    taskStatus(id: number): Status | null {
        if (!id) {
            return null;
        }
        return this.taskStatuses.filter(status => status.Id === id).shift();
    }

    taskType(id: number): TaskType | null {
        if (!id) {
            return null;
        }
        return this.taskTypes.filter(taskType => taskType.Id === id).shift();
    }

    location(id: number) {
        if (!id) {
            return null;
        }
        return this.locations.filter(location => location.Id === id).shift();
    }

    /* Employees */

    // Get Employee
    getEmployee(id: number): Observable<Employee> {
        const url = `${this.apiUrl}/api/employees/${id}`;
        return this.http.get<Employee>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Get Employees
    getEmployees(): Observable<Employee[]> {
        const url = `${this.apiUrl}/api/employees`;
        return this.http.get<Employee[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Post Employee
    postEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/api/employees`;
        return this.http.post<Employee>(url, employee, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    // Put Employee
    putEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/api/employees`;
        return this.http.put<Employee>(url, employee, this.httpOptions)
            .pipe(tap(response => this.logRequest(`PUT ${url}`, response)));
    }

    // Delete Employee
    deleteEmployee(employee: Employee): Observable<number> {
        const url = `${this.apiUrl}/api/employees/${employee.Id}`;
        return this.http.delete<number>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`DELETE ${url}`, response)));
    }

    /* Skills */

    // Get all Skills
    getSkills(): Observable<Skill[]> {
        const url = `${this.apiUrl}/api/skills`;
        return this.http.get<Skill[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    getSkillLevels(): SkillLevel[] {
        return this.skillLevels;
    }

    // Get Employee Skills
    getEmployeeSkills(id: number): Observable<Skill[]> {
        const url = `${this.apiUrl}/api/skills/${id}`;
        return this.http.get<Skill[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Post Skill
    postSkill(employeeSkill: EmployeeSkill): Observable<Skill> {
        const url = `${this.apiUrl}/api/skills`;
        return this.http.post<Skill>(url, employeeSkill, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    // Put Skill
    putSkill(employeeSkill: EmployeeSkill): Observable<Skill> {
        const url = `${this.apiUrl}/api/skills`;
        return this.http.put<Skill>(url, employeeSkill, this.httpOptions)
            .pipe(tap(response => this.logRequest(`PUT ${url}`, response)));
    }

    // Delete Skill
    deleteSkill(skillId: number, employeeId: number): Observable<number> {
        const url = `${this.apiUrl}/api/skills`;
        const params = new HttpParams()
            .set('id', `${skillId}`)
            .set('empId', `${employeeId}`);
        const httpOptions = {...this.httpOptions, params};
        return this.http.delete<number>(url, httpOptions)
            .pipe(tap(response => this.logRequest(`DELETE ${url}`, response)));
    }

    /* Team */

    // Get Team by Project
    getTeamByProjectId(id: number): Observable<Employee[]> {
        const url = `${this.apiUrl}/api/team/${id}`;
        return this.http.get<Employee[]>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    deleteMemberFromTeam(memberId: number, projectId: number): Observable<EmployeeProject> {
        const url = `${this.apiUrl}/api/team`;
        const params = {EmployeeId: memberId, ProjectId: projectId};
        const httpOptions = Object.assign({...this.httpOptions}, {params});
        return this.http.delete<EmployeeProject>(url, httpOptions)
            .pipe(tap(response => this.logRequest(`DELETE ${url}`, response)));
    }

    addEmployeeToTeam(employeeId: number, projectId: number): Observable<Employee> {
        const url = `${this.apiUrl}/api/team`;
        const body = {EmployeeId: employeeId, ProjectId: projectId};
        return this.http.post<Employee>(url, body, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    // Login
    login(login: string, password: string): Observable<Employee> {
        const url = `${this.apiUrl}/api/employees/login`;
        const body = {Login: login, Password: password};
        return this.http.post<Employee>(url, body, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    /* Projects */

    // Get Project by id
    getProjectById(id: number): Observable<Project> {
        const url = `${this.apiUrl}/api/projects/${id}`;
        return this.http.get<Project>(url, this.httpOptions)
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

    // Post Project
    postProject(project: Project): Observable<Project> {
        const url = `${this.apiUrl}/api/projects`;
        return this.http.post<Project>(url, project, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    // Put Project
    putProject(project: Project): Observable<Project> {
        const url = `${this.apiUrl}/api/projects`;
        return this.http.put<Project>(url, project, this.httpOptions)
            .pipe(tap(response => this.logRequest(`PUT ${url}`, response)));
    }

    // Delete Project
    deleteProject(project: Project): Observable<number> {
        const url = `${this.apiUrl}/api/projects/${project.Id}`;
        return this.http.delete<number>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`DELETE ${url}`, response)));
    }

    /* Tasks */

    // Get Task
    getTask(id: number): Observable<Task> {
        const url = `${this.apiUrl}/api/tasks/${id}`;
        return this.http.get<Task>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`GET ${url}`, response)));
    }

    // Post Task
    postTask(task: Task): Observable<Task> {
        const url = `${this.apiUrl}/api/tasks`;
        return this.http.post<Task>(url, task, this.httpOptions)
            .pipe(tap(response => this.logRequest(`POST ${url}`, response)));
    }

    // Put Task
    putTask(task: Task): Observable<Task> {
        const url = `${this.apiUrl}/api/tasks`;
        return this.http.put<Task>(url, task, this.httpOptions)
            .pipe(tap(response => this.logRequest(`PUT ${url}`, response)));
    }

    // Delete Task
    deleteTask(task: Task): Observable<number> {
        const url = `${this.apiUrl}/api/tasks/${task.Id}`;
        return this.http.delete<number>(url, this.httpOptions)
            .pipe(tap(response => this.logRequest(`DELETE ${url}`, response)));
    }

    /* Timesheets */

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
        // console.log(request, response);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(operation, error);
            return of(result as T);
        };
    }

}
