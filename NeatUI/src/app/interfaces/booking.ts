export interface Booking{
    id?: number;
    clientName: string;
    clientEmail: string;
    teamMemberId: number;
    serviceId: number;
    dateTime: string;
}