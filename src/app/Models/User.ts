import { Availability } from "../Availability";

export class User{
    userId!: number;
    name?: string;
    username = '';
    password = '';
    userBookings!: User[];
    userAvailabilities!: Availability[];
}