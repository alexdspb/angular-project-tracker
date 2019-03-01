export class Task {
    Id: number = 0;
    Name: string = '';
    Description: string = '';
    Estimate: number = 0;
    StartDate: string = new Date().toISOString();
    EndDate: string = new Date().toISOString();
    StatusId: number;
    ResponsibleId: number;
    TypeId: number;
    ProjectId: number;
    ReporterId: number;
}
