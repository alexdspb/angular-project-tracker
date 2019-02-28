export class Project {
    Id: number = 0;
    Name: string = '';
    Description: string = '';
    CustomerName: string = '';
    StartDate: string = new Date().toISOString();
    EndDate: string = new Date().toISOString();
    ImageUrl: string = '';
}
