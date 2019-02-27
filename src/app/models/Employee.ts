import {Position} from './Position';
import {Location} from './Location';

export class Employee {
    Id: number;
    First: string;
    Last: string;
    Birthday: string;
    Email: string;
    Password: string;
    Address: string;
    Skype: string;
    Phone: string;
    ImageUrl: string;
    PositionId: number;
    Position: Position;
    LocationId: number;
    Location: Location;
    FullName: string;
}
