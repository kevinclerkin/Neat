export interface Booking{
    id?: number;
    service: string;
    available: string;
    dateTime: string;
    clientName: string;
    clientEmail: string;
}

export interface EventData{
    title: string;
    duration: string;
}