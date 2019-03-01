import {Employee} from './Employee';

export class Task {
    Id: number = 0;
    Name: string = '';
    Description: string = '';
    Estimate: number = 0;
    StartDate: string = new Date().toISOString();
    EndDate: string = new Date().toISOString();
    StatusId: number = 0;
    ResponsibleId: number = 0;
    Responsible: Employee;
    TypeId: number = 0;
    ProjectId: number = 0;
    ReporterId: number = 0;
    Reporter: Employee;
}
